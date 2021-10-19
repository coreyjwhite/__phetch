# -*- coding: utf-8 -*-
"""Data ETL functions using pandas.

The Python pandas library provides functions to extract data from disparate
sources and formats, transform both the data itself and its structure, and
load the results into other sources and formats.

Below are functions for importing predefined data and transforming it to match
the structure of the target database table.

"""

import pandas as pd
import sqlalchemy as sqla
from config import Config


def import_transactions(file):
    """Import a csv to the meditech_transaction table."""
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_csv(
        file,
        sep="|",
        parse_dates=["date"],
        header=0,
        names=[
            "date",
            "time",
            "rx_number",
            "drug",
            "mnemonic",
            "doses",
            "transaction_type",
            "control_level",
            "hazardous",
            "charge_type",
            "order_type",
            "inventory",
        ],
    )
    df["time"] = df["time"].astype(str).str.zfill(4)
    df["date"] = pd.to_datetime(df["date"].astype(str) + " " + df["time"])
    df = df.drop(columns=["time"])
    df.to_sql("meditech_transaction", con=engine, index=False, if_exists="append")

    return True


def import_formulary(file):
    """Import a csv to the meditech_formulary table."""
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_csv(
        file,
        sep="|",
        header=0,
        names=[
            "generic",
            "name",
            "strength",
            "disp_form",
            "mnemonic",
            "ndc",
            "hazardous",
            "disposal_cat",
        ],
    )
    df.to_sql("meditech_formulary", con=engine, index=False, if_exists="replace")

    return True


def import_mar_admins(file):
    """Import a csv to the mar_administration table."""
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_csv(
        file,
        sep="|",
        parse_dates=["date"],
        header=0,
        names=[
            "mnemonic",
            "rx",
            "admin_dose",
            "admin_dose_unit",
            "date",
            "time",
            "acct_number",
            "rx_number",
            "order_type",
            "age",
            "location",
            "prescriber",
        ],
    )
    df["time"] = df["time"].astype(str).str.zfill(4)
    df["date"] = pd.to_datetime(df["date"].astype(str) + " " + df["time"])
    df = df.drop(columns=["time", "age"])
    df.to_sql("meditech_administration", con=engine, index=False, if_exists="append")

    return True


def import_medorder_frequencies(file):
    """Import a Meditech "Mar Administrations" report to the mar_admins table.

    Args:
        file (str): Relative path to the csv file.

    """
    engine = sqla.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    df = pd.read_excel(file, header=0)
    df.to_sql("medorder_frequencies", con=engine, index=False, if_exists="append")

    return True
