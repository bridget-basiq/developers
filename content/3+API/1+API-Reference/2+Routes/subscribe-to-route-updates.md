---
title: Subscribe to route updates
description: Subscribe to route calculation updates
order: 2
frequently: 
- route
---

# Subscribe to route updates

When you have obtained a `route ID` through the [route mutation](), you will need to wait for our route calculation to finish. You can check this status through a [GraphQL subscription]().

## Subscription

To be updated you have to send your `route ID` to our subscription service. After you have done that the status of the route (`RouteStatus`) will be updated from `pending`, to `processing`, and afterward to the final status `done`. 

**Be aware** that if the route is computed before you subscribe to it, you will **not** receive any updates. This could happen when you create a short route. To prevent that scenario, [query the route details]() once right after you have set up the subscription. If the route is already calculated, `unsubscribe`. 

<schema type="Subscription" name="routeUpdatedById" :frequent="frequently"></schema>

<playground url="http://googl.eocm">

<code-block query="route">					
mutation newRoute {
  newRoute(
    input: {
      ev: {
        id: "5d161be5c9eef46132d9d20a"
        battery: {
          stateOfCharge: { value: 72.5, type: kwh }
        }
        plugs: [{ standard: TESLA_S, chargingPower: 150 }]
        adapters: [{ standard:IEC_62196_T2_COMBO, chargingPower: 150 }, { standard:CHADEMO, chargingPower: 150 }]
        climate: true
        numberOfPassengers: 1
      }
      routeRequest: {
        origin: {
          type: Feature
          geometry: { type: Point, coordinates: [13.3888599, 52.5170365] }
          properties: { name: "Berlin, Germany" }
        }
        destination: {
          type: Feature
          geometry: { type: Point, coordinates: [9.1800132, 48.7784485] }
          properties: { name: "Stuttgart, Germany" }
        }
      }
    }
  )
}
</code-block>
<code-block>
{
  "data": {
    "newRoute": "5e300e71f7e26f726afd3d71"
  }
}
</code-block>
</playground>

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name=""></errors>
