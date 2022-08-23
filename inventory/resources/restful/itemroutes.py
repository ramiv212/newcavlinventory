from flask_restful import Resource,request
from inventory.resources.database import items,events
from sqlalchemy import exc
import json

class single_item_resource(Resource):
    # return single item by
    def get(self,item_ID):
        by = request.args['by']
        print(f'\n\n{by}\n\n')

        print(json.dumps(items.return_single_item_by(item_ID,by)))
        return json.dumps(items.return_single_item_by(item_ID,by))

    def post(self):
        # create item
        content = request.json
        items.create_item(**content)

        return json.dumps(items.return_all_items_by_ID())

    def put(self,item_ID):
        # update item
        content = request.json
        try:
            items.update_item(item_ID,**content)
            return json.dumps(items.return_all_items_by_ID())
        except exc.IntegrityError:
            return json.dumps('ID or barcode already exists!'),409

    def delete(self,item_ID):
        if items.verify_if_item_exists(item_ID):
            items.delete_item(item_ID)
            return items.return_all_items_by_ID()
        else:
            return json.dumps('Item does not exist!'),404


class all_items_resource(Resource):
    # return all items by
    def get(self):
        by = request.args['by']
        
        if by == "ID":
            return json.dumps(items.return_all_items_by_ID())
        elif by == "name":
            return json.dumps(items.return_all_items_by_name())
        elif by == "barcode":
            return json.dumps(items.return_all_items_by_barcode())


class item_filter_resource(Resource):
    # get items by filter
    def get(self):
        query = request.args.get('query')
        filter_by = request.args.get('filter_by')

        return json.dumps(items.item_filter_query(query,filter_by))
