from flask import make_response
import pandas as pd


def array_of(input):
    if isinstance(input, str):
        input = [input]
    return input


def conditional_filter(clause, arg):
    items_filter = True
    if arg is not None:
        items_filter = clause(arg)
    return items_filter


def serialize(data, orient="records"):
    df = pd.DataFrame(data=data)
    result = df.to_json(orient=orient, date_format="iso")
    return make_response(result)
