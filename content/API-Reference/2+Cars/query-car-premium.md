---
title: query premium car details
description: Query data of a single car
order: 4
frequently:
- id
- make
- model
- standard
- power
- usable_kwh
- fast_charging_support
---

# Query car details premium
Car premium data allows you to get even more data about your car, the tire pressure, prices, data about your drivetrain, and more. Please contact us to get access to premium data. 

## Query
To get premium data of a car you need to provide a `carId`. This `id` can be obtained by using the `carList` query.

<schema name="carPremium" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="carPremium"></errors>

<playground>
<code-block lang="graphql" query="carPremium">	
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
    price {
      nl {
        value
        currency
      }
      de {
        value
        currency
      }
      uk {
        value
        currency
      }
    }
    drivetrain{
      type
      fuel
      propulsion
      power
      power_hp
      torque
    }
    routing {
      fast_charging_support
      drag_coefficient
      tire_pressure
    }
  }
}
}
</code-block>

<code-block lang="json">
{
  "errors": [
    {
      "message": "You are not allowed to query for premium car data. Please contact the support team to enable this feature!",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "carPremium"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "response": "You are not allowed to query for premium car data. Please contact the support team to enable this feature!",
          "status": 405,
          "message": "You are not allowed to query for premium car data. Please contact the support team to enable this feature!",
          "code": "CAR_PREMIUM_NOT_ALLOWED"
        }
      }
    }
  ],
  "data": {
    "carPremium": null
  }
}
</code-block>
</playground>