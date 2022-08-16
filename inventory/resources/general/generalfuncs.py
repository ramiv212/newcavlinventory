from inventory import db
from inventory.resources.database.models import Item,Event,EventArchive 


def return_max_barcode():
	all_items = Item.query.all()

	max_barcode = [item.barcode for item in all_items]

	if max_barcode:
		return int(max(max_barcode))
	else:
		return 0