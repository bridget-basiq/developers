---
title: Query car details
description: Query the data of a single car
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
Car data can be usefull when you want to display more information about the car. You can access data using the `car` query or get even more data with`carPremium`. Please <cta action='smallchat'>contact us</cta> for more information on how to get access to our premium data set. You can see a live example with all available output parameters [here](https://playground.chargetrip.com/?page=car).

<api-reference-actions url="https://playground.chargetrip.com/?page=car"></api-reference-actions>

## Query
To get specific details of a car you need to provide a `carId`. This `id` can be obtained by using the `carList` query.

<schema name="car" :frequent="frequently"></schema>

<response error="car"></response>

<playground>
<code-block lang="graphql" type="query">	
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

<code-block lang="json" type="response">
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
