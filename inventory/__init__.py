from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS
# from flask_wtf.csrf import CSRFProtect
# from flask_login import LoginManager
import os

app = Flask(__name__)
cors = CORS(app)

# UPLOAD_FOLDER = f"{os.getcwd()}/inventory/uploads"
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.getcwd()}/inventory/resources/database/inventory.db'
app.config['SECRET_KEY'] = '1c3c7811fb09da0e1cadcb7e'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['TEMPLATES_AUTO_RELOAD'] = True


# csrf = CSRFProtect(app)
db = SQLAlchemy(app)
api = Api(app)


from inventory.resources.restful.itemroutes import single_item_resource,all_items_resource,item_filter_resource
api.add_resource(single_item_resource, '/api/item', '/api/item/<string:item_ID>')
api.add_resource(all_items_resource, '/api/items', '/api/items/<string:item_name>')
api.add_resource(item_filter_resource, '/api/item_filter')


from inventory.resources.restful.eventroutes import single_event_resource,all_events_resource,event_filter_resource
api.add_resource(single_event_resource, '/api/event', '/api/event/<string:event_ID>')
api.add_resource(all_events_resource, '/api/events')
api.add_resource(event_filter_resource, '/api/event_filter')


# login_manager = LoginManager()
# login_manager.login_view = 'authorize.login'
# login_manager.init_app(app)

# from .models import User

# @login_manager.user_loader
# def load_user(user_id):
#     # since the user_id is just the primary key of our user table, use it in the query for the user
#     return User.query.get(int(user_id))



print("Started!!")
