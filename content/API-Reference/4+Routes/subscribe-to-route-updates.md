---
title: Subscribe to route updates
description: Receive route updates through a GraphQL subscription
order: 3

frequently:
- status
- route

statuses:
- Pending
- Processing
- Done
- Not_Found
- Error

statusDescriptions:
- Route is waiting to be processed
- Route is being calculated
- Route has successfully been processed and data is available
- Route could not be found
- Route could not be calculated due to an error
---

# Subscribe to route updates
When you have obtained a `route ID` through the [route mutation](/API-Reference/Routes/mutate-route), you can start a route calculation to obtain your polyline and other route details. Because longer routes take some time to finish you can use a [GraphQL subscription](https://graphql.org/blog/subscriptions-in-graphql-and-relay/) as described in the [introduction](/API-Reference/Routes/introduction). 

## Subscription
The subscription service needs to be initiated with a `route ID`. From there on it will start calculating and based on your interval provide you with a route status. For all possible statuses, see the [response section](/API-Reference/Routes/subscribe-to-route-updates#response) of this chapter. 

**Be aware** that if the route is computed before you subscribe to it, you will **not** receive any updates. This could happen when you create a short route. To prevent that scenario, [query the route details](/API-Reference/Routes/query-route-details) once right after you have set up the subscription. If the route is already calculated, `unsubscribe`.

Last but not least, if your route supported any additional options you can now request them on the subscription response, as described here;

### Support alternative stations along a route
If your [route mutation](/API-Reference/Routes/mutate-route) included the `stationsAlongRouteRadius` with a valid distance, you can now request the station details. To do so, you will need to add the `stationsAlongRoute` field with it's appropriate children.

### Support stations as waypoint
If your [route mutation](/API-Reference/Routes/mutate-route) included stations in the `via` parameter, you will receive a route with additional stations as waypoints. These station as waypoints can be found inside the `route.leg`. 

<schema type="Subscription" name="routeUpdatedById" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested. The most important value here is the status field. This one will tell you what data is available. It can contain any of the following statuses;

<status-table :statuses="statuses" :descriptions="statusDescriptions"></status-table>

<playground>
<code-block lang="graphql" type="subscription" edit-url="https://playground.chargetrip.com/?page=routeUpdatedById">					
subscription routeUpdatedById {
  routeUpdatedById(id: "5e300e71f7e26f726afd3d71") {
    status
    # add more fields here
  }
}
</code-block>
<code-block lang="json" type="response">
{
  "data": {
    "route": {
      "status": "pending"
    }
  }
}
</code-block>
</playground>
