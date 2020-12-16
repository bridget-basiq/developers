---
title: query car details
description: Query data of a single car
order: 3
frequently:
- id
- make
- model
- standard
- power
- usable_kwh
- fast_charging_support
---

# Query car details
Car data can be usefull when you want to display more  information about the car. You can access data using the `car` query or get even more data with`carPremium`. Please [contact us](#) for more information on how to get access to our premium data set. You can see a live example with all available output parameters [here](https://playground.chargetrip.com/?page=car).

## Query
To get specific details of a car you need to provide a `carId`. This `id` can be obtained by using the `carList` query.

<schema name="car" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="carList"></errors>

<playground url="https://playground.chargetrip.com/?page=car">
<code-block lang="graphql" query="car">	
query car{
  car(id: "5d161be5c9eef46132d9d20a") {
    id
    naming {
      make
      model
      version
      edition
      chargetrip_version
    }
    connectors {
      standard
      power
      time
      speed
    }
    battery {
      usable_kwh
      full_kwh
    }
    body {
      seats
      weight
      width
      height
    }
    routing {
      fast_charging_support
    }
  }
}
}
</code-block>

<code-block lang="json">
{
  "data": {
    "car": {
      "id": "5d161be5c9eef46132d9d20a",
      "naming": {
        "make": "Tesla",
        "model": "Model S",
        "version": "75D",
        "edition": null,
        "chargetrip_version": "75D (2016-2019)"
      },
      "connectors": [
        {
          "standard": "IEC_62196_T2",
          "power": 16.5,
          "time": 315,
          "speed": 72
        },
        {
          "standard": "TESLA_S",
          "power": 80,
          "time": 40,
          "speed": 390
        }
      ],
      "battery": {
        "usable_kwh": 72.5,
        "full_kwh": 75
      },
      "body": {
        "seats": 5,
        "weight": 2183,
        "width": 2037,
        "height": 1445
      },
      "routing": {
        "fast_charging_support": true
      }
    }
  },
}
</code-block>
</playground>
