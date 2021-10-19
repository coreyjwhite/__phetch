from datetime import date, datetime, timedelta
import json
from .. import db
from flask_restful import Resource
import numpy as np
import pandas as pd
from sqlalchemy import (
    and_,
    BigInteger,
    Date,
    DateTime,
    distinct,
    extract,
    func,
    text,
)
from sqlalchemy.sql.expression import case, cast, literal_column
from ..models.local import MedOrderFrequencies
from ..models.omnicell import (
    Omni,
    OmniAlias,
    OmniItem,
    OmniItemBin,
    OmniMedOrder,
    OmniPatient,
    OmniVendorItem,
    OmniXact,
    OmniXitem,
    OmniXomni,
)
from ..utils import array_of, conditional_filter, serialize

# Transactions sub-types needed in calculating overall product usage.
usage_xfer_types = ["G-DR", "G-VD", "G-VP", "I-UN", "R-UN", "U-VR", "D-DS"]
repackaging_items = [
    "RIML500ED",
    "CHOL10SYR",
    "DIAZ1MLSYR",
    "EPINE2PACK",
    "EPIN30D5DC",
    "GABAUDCUP",
    "HYDRLUDC",
    "KETOFOL",
    "MANNFILTER",
    "METH1MLS",
    "METH5MLS",
    "MIDA3.75ML",
    "MIDA5ML",
    "MIDA6.25ML",
    "MIDA7.5ML",
    "MORP.1L",
    "POLYVSS",
    "PHEN20SO",
    "SIMES",
]


def cast_omnitime(omnitime):
    """Function to construct a string-to-datetime case clause.

    Dates in the OmniCenterCPC01 database are stored as strings in the
    format YYYYMMDDHHMMSSSS. Neither SQL Server nor SQLAlchemy have built-in
    methods to convert these to datetime objects, so this method constructs
    a SQL clause to cast the string first as a BigInteger and then as a native
    SQL Server DateTime.

    Args:
        omnitime (str): The string representation of a datetime to be cast
            as a SQL Server datetime object.

    Returns:
        case: A SQLAlchemy SQL expression clause object.

    """

    return case(
        [
            (
                omnitime.notlike(""),
                cast(
                    func.format(cast(omnitime, BigInteger), '####-##-## ##:##:##"."##'),
                    DateTime,
                ),
            )
        ]
    )


def alias_subquery():
    subquery = (
        OmniAlias.query(OmniAlias.item_name.label("alias"), OmniAlias.item_id)
        .filter(OmniAlias.is_primary)
        .group_by(OmniAlias.item_id, OmniAlias.item_name)
        .subquery()
        .alias(name="aliases")
    )
    return subquery


def dispenses_subquery(xfer_subtype):
    disp_subquery = (
        OmniXact.query(
            OmniXact.omni_key,
            OmniXact.item_key,
            OmniXitem.item_id,
            OmniXomni.omni_stid,
        )
        .filter(OmniXact.xfersub.in_(xfer_subtype))
        .filter(~OmniXomni.omni_stid.in_(["ETCPM", "ETCSM", "ETSIMLABXT"]))
        .filter(OmniXitem.category == "")
        .filter(OmniXact.time_stamp < (date.today()))
        .filter(extract("month", OmniXact.time_stamp) == date.today().month)
        .filter(extract("year", OmniXact.time_stamp) == date.today().year)
        .join(OmniXomni, OmniXact.omni_key == OmniXomni.omni_key, isouter=True)
        .join(OmniXitem, OmniXact.item_key == OmniXitem.item_key, isouter=True)
        .count()
    )
    return disp_subquery


def expiration_subquery(items=None, omnis=None):
    items = array_of(items)
    omnis = array_of(omnis)
    subquery = (
        OmniItemBin.query(
            OmniItemBin.omni_stid,
            OmniItemBin.item_id,
            OmniItemBin.expiration.cast(Date).label("expiration"),
        )
        .filter(conditional_filter(OmniItemBin.item_id.in_, items))
        .filter(conditional_filter(OmniItemBin.omni_stid.in_, omnis))
        .subquery()
        .alias(name="expirations")
    )
    return subquery


def frequencies_subquery():
    subquery = MedOrderFrequencies.query(
        MedOrderFrequencies.frequency, MedOrderFrequencies.daily_multiplier
    )
    return subquery


def medorder_subquery(items=None):
    items = array_of(items)
    subquery = (
        OmniMedOrder.query(
            OmniMedOrder.item_id,
            OmniMedOrder.frequency,
            OmniMedOrder.qty,
            OmniMedOrder.prn,
            OmniMedOrder.omni_stid,
        )
        .filter(conditional_filter(OmniMedOrder.item_id.in_, items))
        .filter(OmniMedOrder.is_active)
        .subquery()
    )
    return subquery


def medorder_frequencies_df(items=None):
    frequencies = frequencies_subquery()
    medorders = medorder_subquery(items=items)
    dfo = pd.DataFrame(data=db.session.query(medorders))
    dff = pd.DataFrame(data=frequencies.all())
    # Join orders with frequency data
    df = dfo.merge(dff, how="left", left_on="frequency", right_on="frequency")
    # Calculate daily doses from order quantities and frequency multipliers
    df["qty"] = df["qty"] * df["daily_multiplier"]
    df = (
        (
            df.drop(columns="daily_multiplier")
            .groupby(["item_id", "omni_stid", "prn"])
            .sum()
        )
        .rename(columns={"qty": "doses"})
        .reset_index()
        .rename(columns={"prn": "freq"})
    )
    df.loc[df.freq == "Y", "freq"] = "prn"
    df.loc[df.freq == "N", "freq"] = "routine"
    return df


def onhand_subquery(items=None, omnis=None):
    items = array_of(items)
    omnis = array_of(omnis)
    aliases = alias_subquery()
    subquery = (
        OmniItem.query(
            OmniItem.omni_stid,
            OmniItem.item_id,
            OmniItem.rx_disp,
            aliases.c.alias,
            OmniItem.ctrl_lvl,
            OmniItem.qty_onhand,
            OmniItem.qty_parlvl,
            OmniItem.qty_min,
            OmniItem.qty_alarm,
        )
        .filter(conditional_filter(OmniItem.item_id.in_, items))
        .filter(conditional_filter(OmniItem.omni_stid.in_, omnis))
        .filter(OmniItem.omni_bin != -1)
        .filter(OmniItem.is_mix == 0)
        .filter(OmniItem.category == "")
        .join(aliases, aliases.c.item_id == OmniItem.item_id, isouter=True)
        .subquery()
        .alias(name="onhands")
    )
    return subquery


def usage_array_df(days):
    seven_days_ago = date.today() - timedelta(days=days)
    di = pd.date_range(seven_days_ago, periods=days, freq="D")

    def f(x):
        x = x.reindex(di).fillna(0)
        return x

    subquery = (
        db.session.query(
            OmniXitem.item_id,
            cast(OmniXact.time_stamp, Date).label("day"),
            func.sum(OmniXact.qty).label("qty"),
        )
        .filter(OmniXact.xfersub.in_(usage_xfer_types))
        .filter(OmniXact.qty > -10)
        .filter(OmniXact.time_stamp >= (date.today() - timedelta(days=days)))
        .filter(OmniXact.time_stamp < (date.today()))
        .filter(OmniXitem.item_id.in_(repackaging_items))
        .join(OmniXitem, OmniXitem.item_key == OmniXact.item_key, full=True)
        .group_by(cast(OmniXact.time_stamp, Date), OmniXitem.item_id)
    )
    df = pd.DataFrame(data=subquery.all())
    df = (
        df.set_index("day")
        .groupby("item_id")
        .apply(f)
        .rename_axis(("item_id", "day"))
        .drop("item_id", axis=1)
        .reset_index()
    )
    # Group by item_id and collapse daily usages to dict
    df2 = (
        df.groupby(by="item_id")
        .apply(lambda x: x.drop(columns="item_id").to_dict("records"))
        .reset_index(name="daily")
    )
    # New column of average usage
    df2["average"] = (df.groupby(by="item_id").mean().reset_index())["qty"]
    # Reorder columns
    df2 = df2[["item_id", "average", "daily"]]
    # Group by item_id and merge average and daily usages column to nested dict
    df2 = (
        df2.groupby(by="item_id")
        .apply(lambda x: x.drop(columns="item_id").to_dict("records"))
        .reset_index(name="usage")
    )
    # Convert usage column from list to object
    df2["usage"] = df2["usage"].str[0]
    return df2


class RepackagingResource(Resource):
    def get(self, days):
        items = repackaging_items
        omnis = ["ETCPM", "ETCSM"]
        expiration = expiration_subquery(items, omnis)
        onhand = onhand_subquery(items, omnis)
        usage_df = usage_array_df(days)
        query = db.session.query(onhand, expiration.c.expiration).join(
            expiration, expiration.c.item_id == onhand.c.item_id, isouter=True
        )
        df_onhands = pd.DataFrame(data=query.all())
        df_onhands = (
            df_onhands.rename(
                columns={
                    "qty_onhand": "onhand",
                    "qty_parlvl": "parlvl",
                    "qty_min": "min",
                    "qty_alarm": "alarm",
                }
            )
            .groupby(
                by=[
                    "omni_stid",
                    "item_id",
                    "rx_disp",
                    "alias",
                    "ctrl_lvl",
                    "expiration",
                ],
                dropna=False,
            )
            .apply(
                lambda x: x[["onhand", "parlvl", "min", "alarm"]].to_dict("records")[0]
            )
            .reset_index(name="qty")
        )

        # Join orders with frequency data
        df_orders = medorder_frequencies_df(items)
        df_orders = (df_orders.groupby(["item_id", "freq"]).sum()).reset_index()
        df_orders = (
            df_orders.groupby("item_id").apply(
                lambda x: dict(zip(x["freq"], x["doses"]))
            )
        ).reset_index(name="orders")
        dfm = df_onhands.merge(
            df_orders,
            how="left",
            left_on=["item_id"],
            right_on=["item_id"],
        )
        dfm = dfm.merge(usage_df, how="left", left_on=["item_id"], right_on=["item_id"])
        dfm.sort_values(by=["rx_disp"])
        return serialize(dfm.to_dict())


class OmniResource(Resource):
    def get(self, omni):
        onhand = onhand_subquery(omnis=omni)
        expiration = expiration_subquery(omnis=omni)
        query = db.session.query(onhand).order_by(onhand.c.rx_disp)
        return serialize(query)


class OmnisResource(Resource):
    def get(self):
        query = db.session.query(
            Omni.omni_stid,
            Omni.omni_name,
            Omni.area,
            Omni.omni_stat,
            Omni.comm_ip,
        )
        return serialize(query)


class CensusResource(Resource):
    bedded_status = ["INP", "OPB", "ERM"]

    def get(self):
        query = (
            db.session.query(
                OmniPatient.pat_misc1.label("area"),
                func.count(OmniPatient.pat_id).label("census"),
            )
            .filter(OmniPatient.pat_stat == "A")
            .filter(OmniPatient.pat_type.in_(self.bedded_status))
            .filter(OmniPatient.room != "")
            .group_by(OmniPatient.pat_misc1)
        )
        return serialize(query)


class ExceptionsResource(Resource):
    def get(self):
        onhand = onhand_subquery(omnis="ETCPM")
        query = (
            db.session.query(
                onhand, OmniItemBin.loc_description, OmniVendorItem.vend_id
            )
            .join(OmniItemBin, OmniItemBin.item_id == onhand.c.item_id)
            .join(
                OmniVendorItem,
                OmniVendorItem.item_id == onhand.c.item_id,
                isouter=True,
            )
            .filter(OmniItemBin.loc_description.contains("CAR1"))
            .filter(OmniVendorItem.item_id == None)
        )
        return serialize(query)


class PopulationsResource(Resource):
    cf = [
        "LUMA100T",
        "LUMA100PKT",
        "LUMA150PKT",
        "LUMA200T",
        "IVAC150TK",
        "IVAC25PKT",
        "IVAC50PKT",
        "IVAC75PKT",
        "DORNA",
    ]
    dka = ["INSU-1111"]
    nas = ["MORP.1L"]
    renal = [
        "PRIS22",
        "PRIS1",
        "PERI1.5LC5",
        "PER2.5LC5",
        "PERI1.55L",
        "PERI2.55L",
        "PERI4.252L",
        "PERI4.255L",
    ]
    tpn = [
        "TPN CHARGE",
        "FAMO2VT",
        "ALBU25T100",
        "ALBU25T120",
        "ALBU25T50",
        "ALBU5T250",
        "ALBU25T50",
        "ALBU25T500",
        "TPN 3IN1",
        "HRTPN",
    ]

    def get(self):
        query = OmniMedOrder.query(
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.cf)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("cf"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.dka)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("dka"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.nas)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("nas"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.renal)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("renal"),
            func.count(
                case(
                    [
                        (
                            (OmniMedOrder.item_id.in_(self.tpn)),
                            OmniMedOrder.pat_id,
                        )
                    ],
                    else_=literal_column("NULL"),
                )
            ).label("tpn"),
        ).filter(OmniMedOrder.is_active)
        return serialize(query)


class IVResource(Resource):
    def get(self):
        frequencies = frequencies_subquery()
        medorders = medorder_subquery()
        query = (
            db.session.query(OmniItem.item_id, OmniItem.rx_disp)
            .filter(OmniItem.omni_stid == "ETMASTER")
            .filter(OmniItem.is_mix)
        )
        dfo = pd.DataFrame(data=medorders.all())
        dff = pd.DataFrame(data=frequencies.all())
        dfq = pd.DataFrame(data=query.all())
        # Join orders with frequency data
        df_merge = dfo.merge(dff, how="left", left_on="frequency", right_on="frequency")
        # Calculate daily doses from order quantities and frequency multipliers
        daily_doses = df_merge.qty * df_merge.daily_multiplier
        df_merge["daily_doses"] = daily_doses.where(df_merge.prn == "N", other=0)
        df_merge = df_merge.groupby("item_id")["daily_doses"].sum()
        df_merge = dfq.merge(
            df_merge, how="left", left_on="item_id", right_on="item_id"
        )
        # Sort case-insensitively by product name
        df_merge = df_merge.sort_values(by=["rx_disp"], key=lambda col: col.str.lower())
        return serialize(df_merge)
