---
title: Query station details
description: Query station details to show plug types, amenities and other information.
order: 3
frequently:
  - address
  - city
  - postal_code
  - state
  - country
  - evses
---

# Query station details

This query is used to get the details of a specific charge station. Depending on what station database you are using different fields can be requested.

## Query

Get all information about a single station using the station query. This request uses the id parameter to identify which details should be fetched. This parameter is required.

<schema name="station" :frequent="frequently"></schema>

<playground>

<code-block query="station">					
query station {
  station(id: "5e8583c2d3406cac673b90bb") {
    id
    external_id
    country_code
    party_id
    name
    address
    city
    postal_code
    state
    country
    coordinates {
      latitude
      longitude
    }
    related_locations {
      latitude
      longitude
    }
    parking_type
    evses {
      uid
      evse_id
      status
      status_schedule {
        period_begin
        period_end
        status
      }
      capabilities
      connectors {
        id
        standard
        format
        power_type
        max_voltage
        max_amperage
        max_electric_power
        power
        tariff_ids
        terms_and_conditions
        last_updated
        properties
      }
      floor_level
      coordinates {
        latitude
        longitude
      }
      physical_reference
      parking_restrictions
      images {
        url
        thumbnail
        category
        type
        width
        height
      }
      last_updated
      parking_cost
      properties
    }
    directions {
      language
      text
    }
    operator {
      id
      external_id
      name
      website
      logo {
        url
        thumbnail
        category
        type
        width
        height
      }
      country
      contact {
        phone
        email
        website
        facebook
        twitter
        properties
      }
    }
    suboperator {
      id
      name
    }
    owner {
      id
      name
    }
    facilities
    time_zone
    opening_times {
      twentyfourseven
      regular_hours {
        weekday
        period_begin
        period_end
      }
      exceptional_openings {
        period_begin
        period_end
      }
      exceptional_closings {
        period_begin
        period_end
      }
    }
    charging_when_closed
    images {
      url
      thumbnail
      category
      type
      width
      height
    }
    last_updated
    location {
      type
      coordinates
    }
    elevation
    chargers {
      standard
      power
      price
      speed
      status {
        free
        busy
        unknown
        error
      }
      total
    }
    physical_address {
      continent
      country
      county
      city
      street
      number
      postalCode
      what3Words
      formattedAddress
    }
    amenities
    properties
    realtime
    power
    speed
    status
    review {
      rating
      count
    }
  }
}
</code-block>
<code-block>
{
  "data": {
    "station": {
      "id": "5e8583c2d3406cac673b90bb",
      "external_id": "155228",
      "country_code": "GB",
      "party_id": null,
      "name": "50 KW Charger At Bruce House, Wellgate, Arbroath",
      "address": "Bruce House",
      "city": "Wellgate",
      "postal_code": "DD11 3TP",
      "state": "Arbroath",
      "country": "GBR",
      "coordinates": {
        "latitude": "56.56188",
        "longitude": "-2.58951"
      },
      "related_locations": [],
      "parking_type": null,
      "evses": [
        {
          "uid": "218514",
          "evse_id": "0",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "IEC_62196_T2_COMBO",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 50000,
              "power": 50,
              "tariff_ids": null,
              "terms_and_conditions": null,
              "last_updated": "2020-04-02T13:24:26.711Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "56.56188",
            "longitude": "-2.58951"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-04-02T13:24:26.711Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "218515",
          "evse_id": "0",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "CHADEMO",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 50000,
              "power": 50,
              "tariff_ids": null,
              "terms_and_conditions": null,
              "last_updated": "2020-04-02T13:24:26.711Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "56.56188",
            "longitude": "-2.58951"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-04-02T13:24:26.711Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "218516",
          "evse_id": "0",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "IEC_62196_T2",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 43000,
              "power": 43,
              "tariff_ids": null,
              "terms_and_conditions": null,
              "last_updated": "2020-04-02T13:24:26.711Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "56.56188",
            "longitude": "-2.58951"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-04-02T13:24:26.711Z",
          "parking_cost": null,
          "properties": null
        }
      ],
      "directions": null,
      "operator": {
        "id": "5e85839ad3406cd1333b8f52",
        "external_id": "3315",
        "name": "Chargeplace Scotland",
        "website": "http://chargeplacescotland.org/",
        "logo": null,
        "country": null,
        "contact": {
          "phone": "0141 648 0750",
          "email": "",
          "website": "http://chargeplacescotland.org/",
          "facebook": null,
          "twitter": null,
          "properties": null
        }
      },
      "suboperator": null,
      "owner": null,
      "facilities": [],
      "time_zone": null,
      "opening_times": {
        "twentyfourseven": false,
        "regular_hours": [],
        "exceptional_openings": [],
        "exceptional_closings": []
      },
      "charging_when_closed": true,
      "images": [],
      "last_updated": "2020-04-02T13:24:26.711Z",
      "location": {
        "type": "Point",
        "coordinates": [
          -2.58951,
          56.56188
        ]
      },
      "elevation": 0,
      "chargers": [
        {
          "standard": "IEC_62196_T2_COMBO",
          "power": 50,
          "price": "",
          "speed": "fast",
          "status": {
            "free": 0,
            "busy": 0,
            "unknown": 1,
            "error": 0
          },
          "total": 1
        },
        {
          "standard": "CHADEMO",
          "power": 50,
          "price": "",
          "speed": "fast",
          "status": {
            "free": 0,
            "busy": 0,
            "unknown": 1,
            "error": 0
          },
          "total": 1
        },
        {
          "standard": "IEC_62196_T2",
          "power": 43,
          "price": "",
          "speed": "fast",
          "status": {
            "free": 0,
            "busy": 0,
            "unknown": 1,
            "error": 0
          },
          "total": 1
        }
      ],
      "physical_address": {
        "continent": "EU",
        "country": "GB",
        "county": "Arbroath",
        "city": "Wellgate",
        "street": "Bruce House",
        "number": null,
        "postalCode": "DD11 3TP",
        "what3Words": "fats.pots.piano",
        "formattedAddress": [
          "Bruce House, DD11 3TP",
          "Wellgate, Arbroath",
          "United Kingdom"
        ]
      },
      "amenities": null,
      "properties": null,
      "realtime": false,
      "power": {
        "43": {
          "total": 1,
          "available": 0
        },
        "50": {
          "total": 2,
          "available": 0
        }
      },
      "speed": "fast",
      "status": "unknown",
      "review": {
        "rating": 0,
        "count": 0
      }
    }
  }
}
</code-block>
</playground>

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="station"></errors>
