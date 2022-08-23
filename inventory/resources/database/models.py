from inventory import db
from sqlalchemy.orm import relationship,backref
# from flask_login import UserMixin


class Item(db.Model):
    __tablename__ = 'items'
    ID = db.Column(db.Integer(), primary_key=True)
    barcode = db.Column(db.String(length=8), nullable=False, unique=True)
    serial = db.Column(db.String(length=8), nullable=True)
    manufacturer = db.Column(db.String(length=30), nullable=False)
    name = db.Column(db.String(length=30), nullable=False)
    category = db.Column(db.String(length=30), nullable=False)
    storage = db.Column(db.String(length=30), nullable=True)
    status = db.Column(db.String(length=30), nullable=True)
    notes = db.Column(db.String(length=1024), nullable=True)
    events = relationship('Event', secondary = 'link')


class Event(db.Model):
    __tablename__ = 'events'
    ID = db.Column(db.Integer(), primary_key=True)
    event_name = db.Column(db.String(length=30),nullable=False,unique=True)
    event_date_start = db.Column(db.DateTime())
    event_date_end = db.Column(db.DateTime())
    event_client = db.Column(db.String(length=30),nullable=False)
    active = db.Column(db.String(length=30), nullable=False)
    items = db.Column(db.String(length=1024))
    load_in = db.Column(db.DateTime())
    load_out = db.Column(db.DateTime())
    contact = db.Column(db.String(length=1024), nullable=True)
    notes = db.Column(db.String(length=1024), nullable=True)
    items = relationship('Item', secondary = 'link')


    def __repr__(self):
        return f"{self.ID} | {self.event_name} | {self.event_client} | {self.items}"


class EventArchive(db.Model):
    __tablename__ = 'eventarchive'
    ID = db.Column(db.Integer(), primary_key=True)
    event_name = db.Column(db.String(length=30),nullable=False,unique=True)
    event_date_start = db.Column(db.DateTime())
    event_date_end = db.Column(db.DateTime())
    event_client = db.Column(db.String(length=30),nullable=False)
    active = db.Column(db.String(length=30), nullable=False)
    items = db.Column(db.String(length=1024))
    load_in = db.Column(db.DateTime())
    load_out = db.Column(db.DateTime())
    contact = db.Column(db.String(length=30))
    notes = db.Column(db.String(length=1024), nullable=True)


    def __repr__(self):
        return f"{self.ID} | {self.event_name} | {self.event_client} | {self.items}"


# class User(UserMixin,db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(100), unique=True)
#     password = db.Column(db.String(100))
#     name = db.Column(db.String(1000))

class Link(db.Model):
    __tablename__ = 'link'
    id = db.Column(db.Integer, primary_key=True)
    # task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    # project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.ID'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.ID'))


    # task = relationship(Task, backref=backref("tasks", cascade="all, delete-orphan"))
    # project = relationship(Project, backref=backref("products", cascade="all, delete-orphan"))
    # user = relationship(User, backref=backref("users", cascade="all, delete-orphan"))
    item = relationship(Item, backref=backref("items", cascade="all, delete-orphan"))
    event = relationship(Event, backref=backref("event", cascade="all, delete-orphan"))



# db.create_all()
