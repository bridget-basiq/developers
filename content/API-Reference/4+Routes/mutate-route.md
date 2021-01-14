---
title: Mutate to create a new route
description: Mutate a route between 2 or more waypoints and support alternative stations along a route
order: 2
---

# Create a new route
As described in the route introduction, the first thing you will need to do is fetch a `route ID`. This `route ID` can then be sent to subscribe to [route details](/API-Reference/Routes/query-route-details) and retrieve a polyline and other route data.

## Mutation
To get a `route ID`, you will need to provide us with EV details and at least a departure location and destination. Apart from that you can also support any of the options that are described below.

### Support alternative stations along a route
If you want to request alternative charging stations along a route, you can set the `stationsAlongRouteRadius` property of the route mutation. The radius can be set between `500` and `5000` meters. This will return all applicable stations within the set radius following the specified powers and standards. 

### Support stations as waypoint
You can add a station as a waypoint or as a destination. To do this, add `stationId` to `routeRequest.via.properties` or `routeRequest.destination.properties`. 

<schema name="newRoute" type="Mutation"></schema>

<response error="newRoute"></response>

<playground>
<code-block lang="graphql" type="mutation" edit-url="https://playground.chargetrip.com/?page=newRoute">					
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
        via: [
          {
            type: Feature
            geometry: { type: Point, coordinates: [12.20824,47.83697] }
            properties: { stationId: "5e844fa8160789b6c028fb14" }
          }
        ]
        stationsAlongRouteRadius: 5000
      }
    }
  )
}
</code-block>
<code-block lang="json" type="response">
{
  "data": {
    "newRoute": "5e300e71f7e26f726afd3d71"
  }
}
</code-block>
</playground>
