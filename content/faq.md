---
title: FAQ
description: An extension on our features and functionalities where we answer the most frequently asked questions
---

# Integrator FAQ
We always try to explain our features and functionalities as detailed as possible, but sometimes we still get questions from developers. That's why we decided to answer the most frequently asked questions in this section and hopefully help you out!

<accordion title="Car" description="3 Frequently Asked Questions">
<accordion-item title="Is it possible to reduce the image file size?">

We provide thumbnail and high-resolution files only. The client side is responsible for scaling the high-resolution image if needed.

</accordion-item>

<accordion-item title="Do you recommend using the chargetripRange field instead of WLTP?">

Both `wltp` and `chargetrip_range` are estimates. WLTP is a testing cycle that car manufacturers use and their estimation is usually high. ChargetripRange comes from our own research. We recommend it, of course, but ultimately it’s up to you!

</accordion-item>

<accordion-item title="What is the difference between car and carPremium?">

`carPremium` shows you all data we have on the cars in our database. It also allows you to cache this car data.

</accordion-item>

<accordion title="Stations" description="8 Frequently Asked Questions">

<accordion-item title="Can I see alternative stations along a planned route?">

Yes. While our route calculates the best charging stations for you and your car — you can also view alternative stations. Simply add the `stationsAlongRouteRadius` flag to your `newRoute` mutation, and set the search radius in meters (the max is 5 km). Make sure to also add `stationsAlongRoute` to your `route` query. For more information, please see our [documentation](/API-Reference/Routes/query-route-details) and [examples](https://chargetrip.github.io/examples/stations-along-route/).

</accordion-item>

<accordion-item title="Do you also show the station ID from the station database provider?">

Yes. We show an external ID next to the Chargetrip ID. You can find it under the `external_id` property. We receive this ID from an external data source.

</accordion-item>

<accordion-item title="What do you define as slow, fast, and turbochargers?">

- Slow:  < 43 kW
- Fast:  43 kW - 150 kW
- Turbo:  150 kW >

</accordion-item>

<accordion-item title="Why is the availability UNKNOWN?">

Unknown appears when we do not know the status of a charger. It could be free, busy or broken. 

</accordion-item>

<accordion-item title="Why do you only consider fast and turbochargers in your routing?">

When calculating routes we only include chargers of 43 kWh or more. This reduces charging time and thus creates faster routes.

</accordion-item>

<accordion-item title="Which connector types are available?">

You can find a list of all connectors in our schema, under `OCPIConnectorType`. The list updates when new connectors become available.

</accordion-item>

<accordion-item title="Do you have different levels of preferred operators?">

Currently, we have one level of preferred operators. All operators added here are equally preferred. Please <cta action='smallchat'>contact us</cta> to mark certain operators as preferred. 

</accordion-item>

<accordion-item title="Why do I not see the name of my company’s (CPO) charging stations?">

Charging station names flow from our station database. They receive these names either from the CPO itself or an intermediate party. Unfortunately, we’re not able to change the names of stations. 

</accordion-item>
</accordion>

<accordion title="Routes" description="6 Frequently Asked Questions">

<accordion-item title="Can I show alternative routes?">

Definitely. Just add alternatives to your `route` query, with all the parameters you want from your alternative routes. For more information, please visit our [examples](https://chargetrip.github.io/examples/alternative-routes/). 

</accordion-item>

<accordion-item title="How do I share a route calculated with the Chargetrip API to a navigation application?">

A route calculated with the Chargetrip API can be exported to any navigation application. You must export the charging stations as waypoints. Google or similar navigation software will then display the charging stations as waypoints along the route.

</accordion-item>

<accordion-item title="Is it possible to avoid toll roads when requesting a route?">

No, this isn’t supported yet. But we’re working on it!

</accordion-item>

<accordion-item title="Can I add a waypoint to my route?">

You can add waypoints to your route by adding the `via` property to your route request. For more information, please take a look at our [documentation](/API-Reference/Routes/mutate-route).

</accordion-item>

<accordion-item title="Do you recommend using a subscription or a query for routes?">

We recommend that you subscribe to route updates, and unsubscribe when a route has reached a final status. Be aware that if a route is computed before you subscribe to it, you will not receive any updates. To prevent this, query the route once immediately after the subscription. If the route is already calculated, unsubscribe. For more information, consult our [documentation](/API-Reference/Routes/subscribe-to-route-updates) and [examples](https://chargetrip.github.io/examples/route/).  

</accordion-item>

<accordion-item title="Do you account for traffic in your route calculations?">

We do not take traffic into account when calculating routes. The impact of traffic on your consumption is minimal. 

</accordion-item>
</accordion>

<accordion title="Tile Service" description="2 Frequently Asked Questions">

<accordion-item title="Can I build an MVP without using Chargetrip’s Tile Server? We don’t want to use Mapbox.">

Yes, this is possible! However, we strongly advise you use our Tile Server. We’re not legally allowed to expose large datasets from our partner EcoMovement, because it would let users of our API scrape the station data. So premium data like address and plug type isn’t exposed unless you query a single station with the station ID. 

</accordion-item>

<accordion-item title="How do I filter stations?">

You can add a set of filters to the tile request. These filters are sent as query parameters. To request a tile you must have a combination of connectors and powers. For more information, refer to our [examples](https://chargetrip.github.io/examples/tile-server/?provider=eco#eco) and [documentation](/API-Reference/Tile-Service/filters). 

</accordion-item>
</accordion>


