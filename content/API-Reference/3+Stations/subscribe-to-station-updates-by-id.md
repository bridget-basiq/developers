---
title: Subscribe to station updates
description: Get updates whenever something on a station changes
order: 7
frequently:
- id
- name
- address
- coordinates
- evses
- operator
- amenities
---

# Subscribe to station updates
If a route is calculated and it includes several stations, you might want to receive status updates from these stations. To prevent you from making too much requests, you can make use of the `station updates` subscription. This service will let you know whenever a station's availability changed or when a review was added.

## Subscription
To use the subscription service you will need a station `id` that can be get from queries like [stations] or [route details](). 

<schema type="Subscription" name="stationUpdatedById" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

<errors name="stationUpdatedById"></errors>

<playground url="https://playground.chargetrip.com/?page=station">
<code-block lang="graphql" query="stationUpdatedById" query-type="subscription">					
subscription stationUpdatedById($stationId: ID!) {
  stationUpdatedById(id: $stationId) {
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
<code-block lang="json">
{
  "data": {
    "station": {
      "id": "5ed60329e5b87c5f9d4e2ab9",
      "external_id": "157371",
      "country_code": "US",
      "party_id": null,
      "name": "Fargo, ND Supercharger",
      "address": "5680 23RD Avenue South",
      "city": "Fargo",
      "postal_code": "58104",
      "state": "ND",
      "country": "USA",
      "coordinates": {
        "latitude": "46.843599",
        "longitude": "-96.881833"
      },
      "related_locations": [],
      "parking_type": null,
      "evses": [
        {
          "uid": "226672",
          "evse_id": "0",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "1",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "2",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "3",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "4",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "5",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "6",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        },
        {
          "uid": "226672",
          "evse_id": "7",
          "status": "UNKNOWN",
          "status_schedule": [],
          "capabilities": [],
          "connectors": [
            {
              "id": null,
              "standard": "TESLA_S",
              "format": null,
              "power_type": null,
              "max_voltage": 0,
              "max_amperage": 0,
              "max_electric_power": 120000,
              "power": 120,
              "tariff_ids": [],
              "terms_and_conditions": null,
              "last_updated": "2020-08-29T06:18:33.778Z",
              "properties": null
            }
          ],
          "floor_level": null,
          "coordinates": {
            "latitude": "46.843599",
            "longitude": "-96.881833"
          },
          "physical_reference": null,
          "parking_restrictions": [],
          "images": [],
          "last_updated": "2020-08-29T06:18:33.778Z",
          "parking_cost": null,
          "properties": null
        }
      ],
      "directions": null,
      "operator": {
        "id": "5e947c91e33701a381770657",
        "external_id": "23",
        "name": "Tesla Motors (Worldwide)",
        "website": "http://www.teslamotors.com",
        "logo": null,
        "country": null,
        "contact": {
          "phone": "",
          "email": "",
          "website": "http://www.teslamotors.com",
          "facebook": null,
          "twitter": null,
          "properties": null
        }
      },
      "suboperator": null,
      "owner": null,
      "facilities": [
        "NATURE",
        "RESTAURANT",
        "CAFE",
        "HOTEL",
        "RECREATION_AREA"
      ],
      "time_zone": null,
      "opening_times": {
        "twentyfourseven": false,
        "regular_hours": [],
        "exceptional_openings": [],
        "exceptional_closings": []
      },
      "charging_when_closed": true,
      "images": [],
      "last_updated": "2020-08-29T06:18:33.778Z",
      "location": {
        "type": "Point",
        "coordinates": [
          -96.881833,
          46.843599
        ]
      },
      "elevation": 442,
      "chargers": [
        {
          "standard": "TESLA_S",
          "power": 120,
          "price": "",
          "speed": "fast",
          "status": {
            "free": 0,
            "busy": 0,
            "unknown": 8,
            "error": 0
          },
          "total": 8
        }
      ],
      "physical_address": {
        "continent": "NA",
        "country": "US",
        "county": "ND",
        "city": "Fargo",
        "street": "5680 23RD Avenue South",
        "number": null,
        "postalCode": "58104",
        "what3Words": "clarifies.agreement.flattening",
        "formattedAddress": [
          "5680 23RD Avenue South, 58104",
          "Fargo, ND",
          "United States"
        ]
      },
      "amenities": {
        "park": 1,
        "restaurant": 5,
        "museum": 0,
        "coffee": 4,
        "hotel": 5,
        "shopping": 0,
        "bathroom": 0,
        "supermarket": 0,
        "playground": 1,
        "pharmacy": 2
      },
      "properties": null,
      "realtime": false,
      "power": {
        "120": {
          "total": 1,
          "available": 0
        }
      },
      "speed": "fast",
      "status": "unknown",
      "review": {
        "rating": 5,
        "count": 1
      }
    }
  }
}
</code-block>
</playground>