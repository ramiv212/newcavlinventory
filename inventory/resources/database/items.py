from inventory import db
from inventory.resources.database.models import Item,Event,EventArchive,Link
from inventory.resources.general import generalfuncs

def create_item(**kwargs):

	print(f'\n\n{kwargs}\n\n')

	new_item = Item(
		barcode=generalfuncs.return_max_barcode() + 1,
		serial=kwargs['serial'],
		manufacturer=kwargs['manufacturer'],
		name=kwargs['name'],
		category=kwargs['category'],
		storage=kwargs['storage'],
		status=kwargs['status'],
		notes=kwargs['notes'])

	db.session.add(new_item)
	db.session.commit()


def update_item(item_id,**kwargs):
	item_to_update = Item.query.get(item_id)

	for key in kwargs:
		setattr(item_to_update,key,kwargs[key])

	db.session.commit()

def delete_item(item_id):
	db.session.query(Item).filter(Item.ID==item_id).delete()
	db.session.commit()


def return_all_items_by_ID():
	items = Item.query.all()

	ID_item_dict = {}

	for item in items:
		ID_item_dict[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes}

	return ID_item_dict


def return_all_items_by_name():
	items = Item.query.all()

	name_item_dict = {}

	for item in items:
		name_item_dict[item.name] = {
				"ID" : item.ID,
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes,
				"qty" : 0}

	return name_item_dict


def return_all_items_by_barcode():
	items = Item.query.all()

	barcodedict = {}

	for item in items:
		barcodedict[item.barcode] = {
				"ID" : item.ID,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				}

	return barcodedict


def return_single_item_by(item_ID,filter_by):
	item_to_return = {}

	param = None

	if filter_by == "ID":
		param = Item.ID
	elif filter_by == "barcode":
		param = Item.barcode
	elif filter_by == "serial":
		param = Item.serial
	elif filter_by == "manufacturer":
		param = Item.manufacturer
	elif filter_by == "name":
		param = Item.name
	elif filter_by == "category":
		param = Item.category
	elif filter_by == "storage":
		param = Item.storage
	elif filter_by == "status":
		param = Item.status
	elif filter_by == "notes":
		param = Item.notes

	item = db.session.query(Item).filter(param==str(item_ID)).first()

	print(f'\n\n{item}\n\n')

	item_to_return[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				
				}

	return item_to_return


def item_filter_query(query,filter_by):
	item_dict = {}

	param = None

	if filter_by == "ID":
		param = Item.ID
	elif filter_by == "barcode":
		param = Item.barcode
	elif filter_by == "serial":
		param = Item.serial
	elif filter_by == "manufacturer":
		param = Item.manufacturer
	elif filter_by == "name":
		param = Item.name
	elif filter_by == "category":
		param = Item.category
	elif filter_by == "storage":
		param = Item.storage
	elif filter_by == "status":
		param = Item.status
	elif filter_by == "notes":
		param = Item.notes

	items = db.session.query(Item).filter(param==query).all()

	for item in items:
		item_dict[item.ID] = {
				'name' : item.name,
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes,
				"qty" : 0}


	return item_dict


def verify_if_item_exists(item_ID):
	item = db.session.query(Item).filter(Item.ID==str(item_ID)).first()

	if item:
		return True
	else:
		return False


def link_item_to_event(item_ID,event_ID):
	new_link = Link(item_id=item_ID,event_id=event_ID)
	db.session.add(new_link)
	db.session.commit()


def item_filter_query_db_object(query,filter_by):
	param = None

	if filter_by == "ID":
		param = Item.ID
	elif filter_by == "barcode":
		param = Item.barcode
	elif filter_by == "serial":
		param = Item.serial
	elif filter_by == "manufacturer":
		param = Item.manufacturer
	elif filter_by == "name":
		param = Item.name
	elif filter_by == "category":
		param = Item.category
	elif filter_by == "storage":
		param = Item.storage
	elif filter_by == "status":
		param = Item.status
	elif filter_by == "notes":
		param = Item.notes

	items = db.session.query(Item).filter(param==query).all()


	return items

def bulk_delete(query,filter_by):
	param = None

	if filter_by == "ID":
		param = Item.ID
	elif filter_by == "barcode":
		param = Item.barcode
	elif filter_by == "serial":
		param = Item.serial
	elif filter_by == "manufacturer":
		param = Item.manufacturer
	elif filter_by == "name":
		param = Item.name
	elif filter_by == "category":
		param = Item.category
	elif filter_by == "storage":
		param = Item.storage
	elif filter_by == "status":
		param = Item.status
	elif filter_by == "notes":
		param = Item.notes

	db.session.query(Item).filter(param==query).delete()
	db.session.commit()