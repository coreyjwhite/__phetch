from datetime import date
import json
from flask import abort, request
from flask_restful import Resource
import pandas as pd
from sqlalchemy import extract, func
from .. import db
from ..models.local import (
    MeditechAdministration,
    MeditechTransaction,
    MonthlyStatistics,
)
from .omnicell import dispenses_subquery
from ..utils import serialize


class MonthlyDosesResource(Resource):
    def get(self):
        today = date.today()
        current_doses = (
            db.session.query(
                MeditechTransaction.date, func.sum(MeditechTransaction.doses)
            )
            .filter(extract("year", MeditechTransaction.date) == today.year)
            .filter(extract("month", MeditechTransaction.date) == today.month)
        )
        historical_doses = db.session.query(
            MonthlyStatistics.month,
            MonthlyStatistics.target,
            MonthlyStatistics.total_doses,
            MonthlyStatistics.adc,
            MonthlyStatistics.costs,
            MonthlyStatistics.charges,
        )
        df_hist = pd.DataFrame(data=historical_doses)
        df_curr = pd.DataFrame(data=current_doses, columns=["month", "total_doses"])
        df = df_hist.append(df_curr, ignore_index=True)
        df.at[len(df.index) - 1, "adc"] = dispenses_subquery(
            ["I-UN"]
        ) - dispenses_subquery(["U-VR", "R-UN"])
        print(df)
        return serialize(df)
