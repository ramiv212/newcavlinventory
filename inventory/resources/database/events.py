from inventory import db
from inventory.resources.database.models import Event,Event,EventArchive
from inventory.resources.general import generalfuncs
from datetime import datetime

e1 = {
				"event_name" : "SHLUMBEH",
				"event_date_start" : datetime.now(),
				"event_date_end" : datetime.now(),
				"event_client" : "hulk",
				"active" : "true",
				"load_in" : datetime.now(),
				"load_out" : datetime.now(),
				"contact" : "hulk",
				"notes" : "lel",
				}

def create_event(**kwargs):
	new_event = Event(
		event_name=kwargs['event_name'],
		event_date_start=kwargs['event_date_start'],
		event_date_end=kwargs['event_date_end'],
		event_client=kwargs['event_client'],
		active=kwargs['active'],
		load_in=kwargs['load_in'],
		load_out=kwargs['load_out'],
		contact=kwargs['contact'],
		notes=kwargs['notes'])

	db.session.add(new_event)
	db.session.commit()


def update_event(event_id,**kwargs):
	event_to_update = Event.query.get(event_id)

	for key in kwargs:
		setattr(event_to_update,key,kwargs[key])

	db.session.commit()

def delete_event(event_id):
	db.session.query(Event).filter(Event.ID==event_id).delete()
	db.session.commit()


def return_all_events_by_ID():
	events = Event.query.all()

	event_event_dict = {}

	for event in events:

		event_items = {}

		for item in event.items:
			event_items[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				}

		event_event_dict[event.ID] = {
				"event_ID" : event.ID,
				"event_name" : event.event_name,
				"event_date_start" : event.event_date_start.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_date_end" : event.event_date_end.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_client" : event.event_client,
				"items" : event.items,
				"load_in" : event.load_in.strftime("%m/%d/%Y, %H:%M:%S"),
				"load_out" : event.load_out.strftime("%m/%d/%Y, %H:%M:%S"),
				"contact" : event.contact,
				"notes" : event.notes,
				"items" : event_items,
				}

	return event_event_dict


def return_all_events_by_name():
	events = Event.query.all()

	name_event_dict = {}

	for event in events:

		event_items = {}

		for item in event.items:
			event_items[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				}

		name_event_dict[event.event_name] = {
				"event_ID" : event.ID,
				"event_name" : event.event_name,
				"event_date_start" : event.event_date_start.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_date_end" : event.event_date_end.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_client" : event.event_client,
				"items" : event.items,
				"load_in" : event.load_in.strftime("%m/%d/%Y, %H:%M:%S"),
				"load_out" : event.load_out.strftime("%m/%d/%Y, %H:%M:%S"),
				"contact" : event.contact,
				"notes" : event.notes,
				"items" : event_items,
				}


	return name_event_dict


def return_all_events_by_active():
	events = Event.query.all()

	eventdict = {}

	for event in events:

		event_items = {}

		for item in event.items:
			event_items[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				}

		if event.active:
			eventdict[event.ID] = {
					"event_name" : event.event_name,
					"event_date_start" : event.event_date_start.strftime("%m/%d/%Y, %H:%M:%S"),
					"event_date_end" : event.event_date_end.strftime("%m/%d/%Y, %H:%M:%S"),
					"event_client" : event.event_client,
					"items" : event.items,
					"load_in" : event.load_in.strftime("%m/%d/%Y, %H:%M:%S"),
					"load_out" : event.load_out.strftime("%m/%d/%Y, %H:%M:%S"),
					"contact" : event.contact,
					"notes" : event.notes,
					"items" : event_items,
					}

	return eventdict


def return_single_event_by(event_ID,filter_by):
	event_to_return = {}

	param = None

	if filter_by == "ID":
		param = Event.ID
	elif filter_by == "event_name":
		param = Event.event_name
	elif filter_by == "event_date_start":
		param = Event.event_date_start
	elif filter_by == "event_date_end":
		param = Event.event_date_end
	elif filter_by == "event_client":
		param = Event.event_client
	elif filter_by == "active":
		param = Event.active
	elif filter_by == "load_in":
		param = Event.load_in
	elif filter_by == "load_out":
		param = Event.load_out
	elif filter_by == "contact":
		param = Event.contact

	event = db.session.query(Event).filter(param==str(event_ID)).first()

	print(event)


	event_items = {}

	for item in event.items:
		event_items[item.ID] = {
			"barcode" : item.barcode,
			"serial" : item.serial,
			"manufacturer" : item.manufacturer,
			"name" : item.name,
			"category" : item.category,
			"storage" : item.storage,
			"status" : item.status,
			"notes" : item.notes
			}


	event_to_return[event.ID] = {
				"event_ID" : event.ID,
				"event_name" : event.event_name,
				"event_date_start" : event.event_date_start.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_date_end" : event.event_date_end.strftime("%m/%d/%Y, %H:%M:%S"),
				"event_client" : event.event_client,
				"items" : event.items,
				"load_in" : event.load_in.strftime("%m/%d/%Y, %H:%M:%S"),
				"load_out" : event.load_out.strftime("%m/%d/%Y, %H:%M:%S"),
				"contact" : event.contact,
				"notes" : event.notes,
				"items" : event_items,
				}

	return event_to_return


def event_filter_query(query,filter_by):
	event_dict = {}

	param = None

	if filter_by == "ID":
		param = Event.ID
	elif filter_by == "event_name":
		param = Event.event_name
	elif filter_by == "event_date_start":
		param = Event.event_date_start
	elif filter_by == "event_date_end":
		param = Event.event_date_end
	elif filter_by == "event_client":
		param = Event.event_client
	elif filter_by == "active":
		param = Event.active
	elif filter_by == "load_in":
		param = Event.load_in
	elif filter_by == "load_out":
		param = Event.load_out
	elif filter_by == "contact":
		param = Event.contact

	events = db.session.query(Event).filter(param==query).all()

	for event in events:

		event_items = {}

		for item in event.items:
			event_items[item.ID] = {
				"barcode" : item.barcode,
				"serial" : item.serial,
				"manufacturer" : item.manufacturer,
				"name" : item.name,
				"category" : item.category,
				"storage" : item.storage,
				"status" : item.status,
				"notes" : item.notes
				}

	event_dict[event.ID] = {
			"event_ID" : event.ID,
			"event_name" : event.event_name,
			"event_date_start" : event.event_date_start.strftime("%m/%d/%Y, %H:%M:%S"),
			"event_date_end" : event.event_date_end.strftime("%m/%d/%Y, %H:%M:%S"),
			"event_client" : event.event_client,
			"items" : event.items,
			"load_in" : event.load_in.strftime("%m/%d/%Y, %H:%M:%S"),
			"load_out" : event.load_out.strftime("%m/%d/%Y, %H:%M:%S"),
			"contact" : event.contact,
			"notes" : event.notes,
			"items" : event_items,
			}

	return event_dict


def verify_if_event_exists(event_ID):
	event = db.session.query(Event).filter(Event.ID==str(event_ID)).first()

	if event:
		return True
	else:
		return False

# create_event(**e1)
