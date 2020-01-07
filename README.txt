# Flight Search, Benjamin Bailey

## Features
This full stack web application allows a user to search for flights and display the results in a tabular view.

## Datasource
CSV file of flights is available in ods-flight-server/assets/flights.csv. Each row in the CSV file represents a flight.

## Implementation
### ods-flight-server
ods-flight-server is the Python 3 backend, using Flask, Pandas and re. The default port number for the Python API is 5000. To run this project:
```
python ods-flight-server.py
```

You may need to use pip to install these python modules on your computer if you do not have them already:
```
pip install flask flask_restful pandas re
```

### ods-flight-table
ods-flight-table is the JavaScript frontend, using Angular. To run this project:
```
ng run
```
Open localhost:4200 in your web browser


## RESTful Endpoints
### POST /api/v1/flight
#### Description
Allows the user to enter a station (destination or origin) to search flights. Request with JSON containing origin and/or destination. These string values must be in the 3-letter airport form.
#### Example request
`{origin: "CLT", destination: "PIT"}`
#### Response
```
[
  {
    "created_at": "2019-09-19 20:36:44", 
    "destination": "PIT", 
    "destination_full_name": "Pittsburgh Intl", 
    "flight_identifier": "e84c6f59-84a2-4443-8ebb-7a88e0920ed7", 
    "flt_num": 4614, 
    "id": 293163, 
    "in_gmt": "2019-02-09 23:16:58", 
    "off_gmt": "2019-02-09 22:08:03", 
    "on_gmt": "2019-02-09 23:12:33", 
    "origin": "CLT", 
    "origin_full_name": "Charlotte/douglas Intl", 
    "out_gmt": "2019-02-09 21:43:01", 
    "scheduled_destination_gate": "B32", 
    "scheduled_origin_gate": "C7", 
    "updated_at": "2019-09-19 20:36:44"
  }, 
  {
    "created_at": "2019-09-19 20:36:44", 
    "destination": "PIT", 
    "destination_full_name": "Pittsburgh Intl", 
    "flight_identifier": "e86b89a2-2dd8-4c9c-8e9e-61f75e644439", 
    "flt_num": 1727, 
    "id": 294879, 
    "in_gmt": "2019-02-10 01:16:29", 
    "off_gmt": "2019-02-10 00:12:44", 
    "on_gmt": "2019-02-10 01:11:26", 
    "origin": "CLT", 
    "origin_full_name": "Charlotte/douglas Intl", 
    "out_gmt": "2019-02-09 23:29:39", 
    "scheduled_destination_gate": "B36", 
    "scheduled_origin_gate": "B3", 
    "updated_at": "2019-09-19 20:36:44"
  }, 
  {
    "created_at": "2019-09-19 20:36:44", 
    "destination": "PIT", 
    "destination_full_name": "Pittsburgh Intl", 
    "flight_identifier": "462bbb96-1fac-48d1-9cf5-fbede6edd50a", 
    "flt_num": 1749, 
    "id": 295896, 
    "in_gmt": "2019-02-10 02:58:36", 
    "off_gmt": "2019-02-10 01:51:54", 
    "on_gmt": "2019-02-10 02:53:06", 
    "origin": "CLT", 
    "origin_full_name": "Charlotte/douglas Intl", 
    "out_gmt": "2019-02-10 01:12:57", 
    "scheduled_destination_gate": "B40", 
    "scheduled_origin_gate": "D11", 
    "updated_at": "2019-09-19 20:36:44"
  }, 
  {
    "created_at": "2019-09-19 20:36:44", 
    "destination": "PIT", 
    "destination_full_name": "Pittsburgh Intl", 
    "flight_identifier": "e564d385-fe8f-4fdc-b46d-cafcc51c07da", 
    "flt_num": 1962, 
    "id": 297057, 
    "in_gmt": "2019-02-10 05:07:57", 
    "off_gmt": "2019-02-10 03:51:32", 
    "on_gmt": "2019-02-10 05:01:17", 
    "origin": "CLT", 
    "origin_full_name": "Charlotte/douglas Intl", 
    "out_gmt": "2019-02-10 03:37:57", 
    "scheduled_destination_gate": "B34", 
    "scheduled_origin_gate": "D4", 
    "updated_at": "2019-09-19 20:36:44"
  }, 
  {
    "created_at": "2019-09-19 20:36:44", 
    "destination": "PIT", 
    "destination_full_name": "Pittsburgh Intl", 
    "flight_identifier": "a5f91c84-379d-4a40-9d2d-ba15235cf1af", 
    "flt_num": 1926, 
    "id": 292002, 
    "in_gmt": "2019-02-09 22:06:38", 
    "off_gmt": "2019-02-09 20:58:22", 
    "on_gmt": "2019-02-09 22:01:34", 
    "origin": "CLT", 
    "origin_full_name": "Charlotte/douglas Intl", 
    "out_gmt": "2019-02-09 20:39:06", 
    "scheduled_destination_gate": "B36", 
    "scheduled_origin_gate": "B1", 
    "updated_at": "2019-09-19 20:36:44"
  }
]
```

### POST /api/v1/station
#### Description
Provides an auto-suggest feature for station. Request with JSON containing search string. The string value is case-insensitive. Optional property is 'isDestinationQuery', which if included and set to true will only search destination airports. Default is to search only origin airports.
#### Example request
`{search: "ATL"}`
#### Response
```
[
  {
    "station": "ATL", 
    "station_full_name": "Hartsfield - Jackson Atlanta I"
  }, 
  {
    "station": "DCA", 
    "station_full_name": "Ronald Reagan Washington Natl"
  }, 
  {
    "station": "SGF", 
    "station_full_name": "Springfield-branson Natl"
  }
]
```