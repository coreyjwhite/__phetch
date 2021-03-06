"""Parent class for all mapper classes."""

from .. import db


class BaseModel(db.Model):
    """Custom ORM base class.

    Attributes:
        __abstract__ (bool): sqlalchemy directive to ignore an ORM class when
            creating tables. The value is not inherited.
        __immutable__ (bool): Flags a table as read-only.

    """

    __abstract__ = True
    __immutable__ = True

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

    def as_dict(self):
        """Return a dict of columns and values."""
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}
