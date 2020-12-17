---
title: Routes
description: Start building routes with the chargetrip routing queries, mutations and subscriptions.
order: 1
---

# Route calculations
To create a route you need the `newRoute` mutation and `routeUpdateById` subscription. We strongly recommend to use subscriptions. Recursively querying a route ID until the route is processed increases costs and delays your application. A visual representation is added below. For a more detailed explanation keep reading.

<c-image alt="Authorization image" src="route-mutation.png" max-width="lg"></c-image>

## Mutation & Subscription
First, use your GraphQL client to execute the [mutation](). This mutation takes a `RequestInput` object which contains all the parameters needed to create a route. It returns the `ID` of that newly created route. Use that route ID to [subscribe to route updates](). The status of the route (`RouteStatus`) will be updated from `pending`, to `processing`, and afterward to the final status `done`. If a route is not found or something goes wrong during the calculation the final status resolves to either `not_found` or `error`. It is recommended to unsubscribe from further updates when the route has reached a final status. 

## Notes
Be aware that if the route is computed before you subscribe to it, you will not receive any updates. This could happen when you create a short route. To prevent that scenario, query the route once right after you have set up the subscription. If the route is already calculated, `unsubscribe`. To retrieve a route use the getRoute query using the `newRoute` ID.