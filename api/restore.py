""" Create tables (if they don't exist) for all models """
import api

app = api.create_app()

with app.app_context():
    api.db.create_all()
