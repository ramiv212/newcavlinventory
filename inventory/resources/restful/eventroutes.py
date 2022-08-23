from flask_restful import Resource,request
from inventory.resources.database import events,events

class single_event_resource(Resource):
    # return single event by
    def get(self,event_ID):
        by = request.args['by']
        return events.return_single_event_by(event_ID,by)

    def post(self):
        # create event
        content = request.json

        try:
            events.create_event(**content)
            return events.return_all_events_by_ID()

        except IntegrityError:
            return {"message": "Event already exists"}, 409

    def put(self,event_ID):
        # update event
        print("ran update event")
        content = request.json
        print(content)
        events.update_event(event_ID,**content)

        return events.return_all_events_by_ID()

    def delete(self,event_ID):
        if events.verify_if_event_exists(event_ID):
            events.delete_event(event_ID)
            return events.return_all_events_by_ID()
        else:
            return {},404


class all_events_resource(Resource):
    # return all events by
    def get(self,by):
        if by == "ID":
            return events.return_all_events_by_ID()
        elif by == "name":
            return events.return_all_events_by_name()
        elif by == "active":
            return events.return_all_events_by_active()


class event_filter_resource(Resource):
    # get events by filter
    def get(self):
        query = request.args.get('query')
        filter_by = request.args.get('filter_by')

        return events.event_filter_query(query,filter_by)

