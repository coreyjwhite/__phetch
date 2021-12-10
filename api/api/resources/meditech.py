from datetime import date, timedelta
from flask_restful import Resource
import json
import pandas as pd
from sqlalchemy import desc, select, text
from sqlalchemy.sql import func
from config import Config
from .. import db
from ..models.local import MeditechAdministration, MeditechTransaction
from ..models.omnicell import OmniItem
from ..utils import exports, imports
from ..utils import serialize

path = Config.REPORT_PATH


class BehavioralQuery(Resource):
    def get(self):
        admin = (
            select(
                MeditechAdministration.mnemonic,
                MeditechAdministration.rx,
                MeditechAdministration.rx_number,
            )
            .filter(MeditechAdministration.location == "ER")
            .group_by(
                MeditechAdministration.mnemonic,
                MeditechAdministration.rx,
                MeditechAdministration.rx_number,
            )
            .subquery()
        )
        tx = (
            select(
                MeditechTransaction.rx_number,
                func.sum(MeditechTransaction.doses).label("doses"),
            )
            .filter(MeditechTransaction.inventory == "MAIN")
            .filter(MeditechTransaction.order_type == "MED")
            .group_by(MeditechTransaction.rx_number)
            .subquery()
        )
        query = (
            select(
                admin.c.mnemonic,
                admin.c.rx,
                func.sum(tx.c.doses),
            )
            .join(tx, tx.c.rx_number == admin.c.rx_number)
            .group_by(admin.c.mnemonic, admin.c.rx)
        )

        df = pd.DataFrame(data=db.session.execute(query).all())
        df.to_excel("~/ed_doses.xlsx")
        return True


class BackupResource(Resource):
    def get(self):
        return exports.dump()


class CovidResource(Resource):
    def get(self):
        covid_drugs = ["BAML700V", "CASIIMDE", "REMD100INJ"]
        query = (
            db.session.query(MeditechAdministration)
            .filter(MeditechAdministration.mnemonic.in_(covid_drugs))
            .filter(MeditechAdministration.date >= (date.today() - timedelta(days=7)))
            .filter(MeditechAdministration.date < (date.today()))
        )
        df = pd.DataFrame(data=query.all())
        print(df)
        df.to_excel("~/onedrive/covid2.xlsx")
        return json.loads(df.to_json())


class LastAdminResource(Resource):
    def get(self):
        query = select(MeditechAdministration).order_by(desc("date"))
        return db.session.execute(query).first().date


class LastFormularyResource(Resource):
    def get(self):
        sql = (
            "SELECT update_time FROM information_schema.tables "
            "WHERE table_schema = 'phetch' "
            "AND table_name = 'meditech_formulary'"
        )
        query = db.session.execute(sql)
        return serialize([query.first()])


class LastTxResource(Resource):
    def get(self):
        query = db.session.query(MeditechTransaction).order_by(desc("date"))
        return db.session.execute(query).first().date


class UpdateAdminResource(Resource):
    def get(self):
        return imports.import_mar_admins(f"{path}admins.csv")


class UpdateFormularyResource(Resource):
    def get(self):
        return imports.import_formulary(f"{path}formulary.csv")


class UpdateTxResource(Resource):
    def get(self):
        return imports.import_transactions(f"{path}transactions.csv")
