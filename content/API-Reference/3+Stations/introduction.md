---
title: Introduction
description: An introduction on the chargetrip charging station databases and station queries
order: 1
---

# Charging stations
The Chargetrip station database is [OCPI 2.2](https://github.com/ocpi/ocpi/releases/download/2.2/OCPI-2.2.pdf) compliant and must be populated with station data before any routes can be planned. This will be either your own station data or station data from one of many database providers like Hubject, Gireve, EcoMovement, NZTA or Nobil. Our Playground and any of your own applications are populated with freely available European station data from OCM so you can try planning routes across Europe.

## Database options
If you do not have a commercial agreement in place with a charge station provider we can pre-load your account with either free station data from OCM or premium station data from Eco-Movement. Our premium station data exposed over 100.000 highly curated charge stations across Europe including real-time availability, pricing<sup>1</sup>, and predicted availability<sup>1</sup>. You no longer need to connect several costly charge station database providers to get European coverage. See eco-movement.com/ for more details about regional limitations. <cta action='smallchat'>Contact us</cta> for pricing.

<sup>1</sup> Subject to availability

## Importing your own database
Importing your own station data, both static and dynamic, into Chargetrip is a breeze. <cta action='smallchat'>Contact us</cta> to discuss the possibilities. 

<right-aside>

<examples title="Clone an example">
    <!-- Stations -->
    <example 
        href="https://chargetrip.github.io/examples/stations/" 
        img="stations-example.png" 
        title="Query stations" 
        description="Query the 20 closest stations and show them on a map." 
        category="Stations">
    </example>
    <example 
        href="https://chargetrip.github.io/examples/station-info/" 
        img="stations-info-example.png" 
        title="Query specific station" 
        description="Query and parse a complete set of station data" 
        category="Stations">
    </example>
    <example 
        href="https://chargetrip.github.io/examples/stations-along-route/" 
        img="alternative-stations-example.png" 
        title="Stations along the route" 
        description="Query and display alternative stations along a route" 
        category="Stations">
    </example>
</examples>

</right-aside>
