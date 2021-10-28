from .. import db
from .local import LocalModel
from sqlalchemy import Column, DateTime, Float, Integer, String


class SupplyItem(LocalModel):

    __tablename__ = "supply_item"

    id = Column(Integer, primary_key=True)
    description = Column(String(64))
    category = Column(Integer)
    mfg = Column(Integer)
    mfg_sku = Column(String(64))
    mm_id = Column(String(64))
    comment = Column(String(64))
