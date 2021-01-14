---
title: Query route path
description: 
order: 5
frequently: 
- route
- status
---

# Query route path
Whenever you need more information about your route or a certain section of it, you can use the `routePath` query. It knows all about `temperatures`, `speeds`, `elevation` and more. 

## Query
To use the `routePath` query you will need to configure two things. The route `id` needs to be present and the `location` as a GeoJSON point of the route path segment. The route `id` is the one you collect when executing a new route mutation as described [here](/API-Reference/Routes/mutate-route).

<schema name="routePath" :frequent="frequently"></schema>

<response error="routePath"></response>

<playground>
<code-block lang="graphql" type="query" edit-url="https://playground.chargetrip.com/page=getRoute">
query routePath {
  routePath(
    id: "5fd25d01cb36454e2666f988", 
    location: {
      type: Point
      coordinates: [11.61653, 50.04779]
    }
  ) {
  	elevation
    averageSpeed
    recommendedSpeed
    consumption
    consumptionPerKm
    distance
    duration
  }
}
</code-block>
<code-block lang="json" type="response">
{
  "data": {
    "routePath": {
      "elevation": 357,
      "averageSpeed": 110,
      "recommendedSpeed": 110,
      "consumption": -0.001,
      "consumptionPerKm": -0.012,
      "distance": 46,
      "duration": 2
    }
  }
}
</code-block>
</playground>
