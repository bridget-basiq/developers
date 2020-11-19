---
title: Integrator FAQ
order: 1
description: Quickly find answers to questions that other people asked while integrating the Chargetrip API.
frequently:
 - id
 - chargetripEdition
 - make
 - images
 - carModel
---

# Integrator FAQ

We always try to explain our features and functionalities as detailed as possible, but sometimes we still get questions from developers. That's why we decided to answer the most frequently asked questions in this section and hopefully help you out!

## Stations

**Can I see alternative stations along a planned route?**

Yes, this is possible. When we calculate a route for you will receive a  route with the most optimal charging station. To show the stations along the way you have to add the stationsAlongRouteRadius flag to your `newRoute` mutation. Set it to the radius in meters in which you want to search (the max is 5km). Also, be sure to add StationsAlongRoute to your `route` query. For more information, please visit our documentation and examples.

## Routes 

## Tile Server



