---
title: FAQ
description: An extension on our features and functionalities where we answer the most frequently asked questions
---

# Integrator FAQ
We always try to explain our features and functionalities as detailed as possible, but sometimes we still get questions from developers. That's why we decided to answer the most frequently asked questions in this section and hopefully help you out!

<accordion title="Car" description="4 Frequently Asked Questions">
<accordion-item title="Is it possible to reduce the image file size?">
We provide thumbnail and high-resolution files only. The client-side is responsible for scaling the high-resolution image if needed. 
</accordion-item>

<accordion-item title="Do you recommend using the chargetripRange field instead of WLTP?">
Both WLTP and chargetripRange are estimates. WLTP is a testing cycle that car manufacturers use and is usually quite high. ChargetripRange comes from our own research. I would recommend using this but ultimately it is up to you!
</accordion-item>

<accordion-item title="What is the difference between car and carPremium?">
</accordion-item>

<accordion-item title="How do I include customized-range in my frontend?">
</accordion-item>
</accordion>

<accordion title="Stations" description="7 Frequently Asked Questions">
<accordion-item title="Can I see alternative stations along a planned route?">
Yes, this is possible. When we calculate a route for you will receive a  route with the most optimal charging station. To show the stations along the way you have to add the stationsAlongRouteRadius flag to your `newRoute` mutation. Set it to the radius in meters in which you want to search (the max is 5km). Also, be sure to add StationsAlongRoute to your `route` query. For more information, please visit our documentation and examples.
</accordion-item>

<accordion-item title="Do you only show the Chargetrip ID, or also the station ID from the station database provider?">
No, we also show an external ID. You can find it under the external_id property, this ID we receive from an external data source.
</accordion-item>

<accordion-item title="What definitions do you use for slow, fast, and, turbochargers?">
Slow:  up to 43 kW
Fast:  43 kW - 150 kW
Turbo:  150 kW and above
</accordion-item>

<accordion-item title="Why is the availability UNKNOWN?">
Unknown means that we do not know the status of a charger. This charger could be free, busy, or broken. 
</accordion-item>

<accordion-item title="Why do you only take fast and, turbochargers into account when calculating routes?">
When calculating routes we only use chargers with a power of 43 kWh or more because this ensures shorter charging times and therefore faster routes. 
</accordion-item>

<accordion-item title="Why do I not see the name of my companies (CPO) charging stations?">
</accordion-item>

<accordion-item title="Do you have different levels of preferred operators?">
</accordion-item>
</accordion>

<accordion title="Routes" description="6 Frequently Asked Questions">
<accordion-item title="Can I show alternative routes?">
Yes, this is possible. To do this please add alternatives to your `route` query, with all the parameters you would like to receive about your alternative routes. If it is not possible to find alternative routes, you will receive less or no alternative routes. For more information, please visit our documentation and examples.
</accordion-item>

<accordion-item title="How do I share a route calculated with the Chargetrip API to a navigation application?">
A route calculated with the Chargetrip API can be exported to any navigation application. You export the charging stations as waypoints; Google or a similar navigation provider will show the charging stations as waypoints on the route.
</accordion-item>

<accordion-item title="Is it possible to avoid toll roads when requesting a route?">
No, this is not supported yet. However, we are looking into how we can make that possible. 
</accordion-item>

<accordion-item title="Can I add a waypoint to my route?">
Yes you can waypoints to your route. You can do this by adding the via property to your route request. For more information, please have a look at our documentation. 
</accordion-item>

<accordion-item title="Do you recommend using a subscription or a query for routes?">
We recommend that you subscribe to route updates and unsubscribe when a route has reached a final status. Please be aware that if a route is computed before you subscribe to it you will not receive any updates. To prevent that scenario, query the route once right after you have set up the subscription. If the route is already calculated, unsubscribe. For more information, please have a look at our documentation and examples. 
</accordion-item>

<accordion-item title="Do you account for traffic in your route calculations?">
We do not take traffic into account when calculating routes. The impact of traffic on your consumption is minimal. 
</accordion-item>
</accordion>

<accordion title="Tile Service" description="2 Frequently Asked Questions">
<accordion-item title="Can I build an MVP without using Chargetrip’s Tile Server because we do not want to use Mapbox?">
Yes, this is possible! However, we strongly advise you to use our Tile Server. We are legally not allowed to expose large datasets of our partner EcoMovement, because that would give users of our API the chance to scrape the station data. Premium data like address and plug types are therefore not exposed unless you query a station with the station ID.
</accordion-item>

<accordion-item title="How do I filter stations?">
You can add a set of filters to the tile request, these filters are sent as query parameters. To request a tile you must have a combination of connectors and powers. For more information please have a look at our examples and documentation. 
</accordion-item>
</accordion>


