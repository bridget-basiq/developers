---
title: Cars
description: An introduction on the chargetrip car database and car queries
order: 1
---

# Cars

Chargetrip operates an extensive database of EV makes, editions, and versions, each with their specific consumption models. These advanced consumption models take into account properties like the drag-coefficient and rolling resistance in relation to your speed, the elevation, the charging speed, the charging temperature, the battery temperature etc. Additionally, each car model includes car specifications and images to be used in the front-end. When requesting a route, the ID of a car must be included, and the associated consumption model will be applied to the routing engine.

## Database options
The Car database can only be modified by Chargetrip. New vehicles are added as soon as the OEM specifications are released which tends to happen months before a release. We currently have `188` EV Car Models in our Database. A list of all supported vehicles can be found by using the `carList` query. Data for a specific model can be retrieved using the `car` query. You can also use the `carPremium` query to get access to even more data! Please contact us for more information about premium data. 

**Please note the Playground only includes four test car models. You need a registered x-client-id to access the full car database or to get access to premium data. Some car parameters are courtesy of our partner [EV Database](https://ev-database.org/)** 