from flask import Flask, jsonify, request
from flask_restful import Resource, Api 
import pandas, re

app = Flask(__name__)
api = Api(app) 
flights = pandas.read_csv('assets/flights.csv', keep_default_na=False)
class Station(Resource):
    def post(self):
        query = request.get_json()
        text = query.get('search')
        isDestinationQuery = query.get('isDestinationQuery')
        if(isDestinationQuery):
            isDestination = flights.destination.str.contains(text, flags=re.IGNORECASE)
            isDestinationFullName = flights.destination_full_name.str.contains(text, flags=re.IGNORECASE)
            res = flights[isDestination | isDestinationFullName]
            res = res[['destination', 'destination_full_name']].drop_duplicates(subset=['destination', 'destination_full_name'])
            res = res.rename(columns={'destination': 'station', 'destination_full_name': 'station_full_name'})
        else:    
            isOrigin = flights.origin.str.contains(text, flags=re.IGNORECASE)
            isOriginFullName = flights.origin_full_name.str.contains(text, flags=re.IGNORECASE)
            res = flights[isOrigin | isOriginFullName]
            res = res[['origin', 'origin_full_name']].drop_duplicates(subset=['origin', 'origin_full_name'])
            res = res.rename(columns={'origin': 'station', 'origin_full_name': 'station_full_name'})

        
        res = jsonify(res.to_dict('records'))
        res.status_code = 200
        return res
  
class Flight(Resource):   
    def post(self):
        query = request.get_json()
        origin = query.get('origin')
        destination = query.get('destination')
        if(not origin):
            origin = None
        else:
            origin = origin.upper()
        if(not destination):
            destination = None
        else:
            destination = destination.upper()
        isOrigin = flights.origin == origin
        isDestination = flights.destination == destination
        
        if(origin is None and destination is None):
            res = jsonify({'error': 'Bad request. Must include origin and/or destination.'})
            res.status_code = 400
            return res
        elif(origin is not None and destination is not None):
            res = flights[isOrigin & isDestination]
        elif(origin is not None):
            res = flights[isOrigin]
        elif(destination is not None):
            res = flights[isDestination]

        res = jsonify(res.to_dict('records'))
        res.status_code = 200
        return res

api.add_resource(Station, '/api/v1/station') 
api.add_resource(Flight, '/api/v1/flight') 

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
  
if __name__ == '__main__': 
    app.run(debug = True) 
