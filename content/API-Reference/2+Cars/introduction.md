---
title: Introduction
description: An introduction on the chargetrip car database and car queries
order: 1
---

# Cars

Chargetrip operates an extensive database of EV makes, editions, and versions, each with their specific consumption models. These advanced consumption models take into account properties like the drag coefficient and rolling resistance in relation to your speed, elevation, charging speed, charging temperature, battery temperature etc. Additionally, each car model includes car specifications and images to be used in the front end. When requesting a route, the ID of a car must be included, and the associated consumption model will be applied to the routing engine.

## Database options
The car database can only be modified by Chargetrip. New vehicles are added as soon as the OEM specifications are released, which tends to happen months before a release. We currently have 188 EV Car Models in our Database. A list of all supported vehicles can be found by using the `carList` query. Data for a specific model can be retrieved using the car query. You can also use the `carPremium` query to get access to even more data! Please <cta action="smallchat">contact us<cta> for more information about premium data.

<note display="block">

The Playground only includes four test car models. You need a premium `x-client-id` to access the full car database or to get access to premium data. Some car parameters are courtesy of our partner EV Database

</note>

<examples title="Clone an example">
    <!-- Cars -->
    <example 
        href="https://chargetrip.github.io/examples/car/" 
        img="cars-example.png" 
        title="Query cars" 
        description="Quickly fetch a list of cars with additional data." 
        category="Cars">
    </example>
    <example 
        href="https://chargetrip.github.io/examples/state-of-charge/" 
        img="state-of-charge-example.png" 
        title="State of Charge" 
        description="Mutate the state of charge and reroute the journey" 
        category="Cars">
    </example>
</examples>
