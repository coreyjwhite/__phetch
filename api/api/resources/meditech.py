from datetime import date, timedelta
from flask_restful import Resource
import json
import pandas as pd
from sqlalchemy import desc, text
from config import Config
from .. import db
from ..models.local import MeditechAdministration, MeditechTransaction
from ..utils import exports, imports
from ..utils import serialize

path = Config.REPORT_PATH


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
        df.to_excel("~/onedrive/covid2.xlsx")
        return json.loads(df.to_json())


class LastAdminResource(Resource):
    def get(self):
        query = db.session.query(MeditechAdministration).order_by(desc("date"))
        return serialize([query.first()])


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
        return serialize([query.first()])


class UpdateAdminResource(Resource):
    def get(self):
        return imports.import_mar_admins(f"{path}admins.csv")


class UpdateFormularyResource(Resource):
    def get(self):
        return imports.import_formulary(f"{path}formulary.csv")


class UpdateTxResource(Resource):
    def get(self):
        return imports.import_transactions(f"{path}transactions.csv")
