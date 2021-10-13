"""Parent class for local database mapper classes."""

from .. import db
from .base import BaseModel
from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.dialects.mysql import TINYINT


class LocalModel(BaseModel):
    """Custom ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore an ORM class when
            creating tables. The value is not inherited.
        __immutable__ (bool): Flags a table as read-only.

    """

    __abstract__ = True
    __immutable__ = False

    @classmethod
    def query(cls, *args):
        """Construct a scoped-session query.

        Args:
            *args: Variable length argument list of cls fields.

        Returns:
            query: SQLAlchemy Query object. This can be executed by calling
                one of its methods such as .all().

        """
        return db.session.query(*args)

    def add(self):
        """Insert an model instance into its mapper table.

        This method provides modules which import an ORM class a method for
        adding and committing an instance to its table without having to
        construct a Session object.

        """
        db.session.add(self)
        db.session.commit()

    def inactivate(self):
        """Inactivate a model instance."""
        self.is_active = 0


class MeditechAdministration(LocalModel):

    __tablename__ = "meditech_administration"

    id = Column(Integer, primary_key=True)
    mnemonic = Column(String(64))
    rx = Column(String(64))
    admin_dose = Column(Float)
    admin_dose_unit = Column(String(64))
    date = Column(DateTime)
    acct_number = Column(String(64))
    rx_number = Column(String(64))
    order_type = Column(String(64))
    location = Column(String(64))
    prescriber = Column(String(64))


class MeditechFormulary(LocalModel):

    __tablename__ = "meditech_formulary"

    id = Column(Integer, primary_key=True)
    generic = Column(String(64))
    name = Column(String(64))
    strength = Column(String(64))
    disp_form = Column(String(64))
    mnemonic = Column(String(64))
    ndc = Column(String(64))
    hazardous = Column(String(64))
    disposal_cat = Column(String(64))


class MeditechTransaction(LocalModel):

    __tablename__ = "meditech_transaction"

    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    rx_number = Column(String(64))
    drug = Column(String(64))
    mnemonic = Column(String(64))
    doses = Column(Float)
    transaction_type = Column(String(64))
    control_level = Column(Float)
    hazardous = Column(String(64))
    charge_type = Column(String(64))
    order_type = Column(String(64))
    inventory = Column(String(64))


class MedOrderFrequencies(LocalModel):

    __tablename__ = "medorder_frequencies"

    id = Column(Integer, primary_key=True)
    frequency = Column(String(64))
    freq_desc = Column(String(64))
    prn = Column(TINYINT)
    stat = Column(TINYINT)
    adm_times = Column(String(64))
    daily_multiplier = Column(Float)


class MonthlyStatistics(LocalModel):

    __tablename__ = "monthly_statistics"

    id = Column(Integer, primary_key=True)
    month = Column(DateTime)
    target = Column(Float)
    total_doses = Column(Float)
    adc = Column(Float)
    costs = Column(Float)
    charges = Column(Float)
