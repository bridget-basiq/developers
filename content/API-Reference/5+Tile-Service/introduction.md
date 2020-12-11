---
title: Tile service
description: Speed up your station rendering with our custom tile service
order: 1
---

# Chargetrip Tile Service
The Chargetrip Tile Service is a Vector Tile Server that offers a pre-rendered fully clustered charge station solution including filtering that supercharges your station map (pun intended). Traditionally you would load stations on the frontend within a visible bounding box and apply filters and clusters on the client side. This will result in long waiting times when you interact with the map. Our tile-service moves complex operations to the back-end. So filtering and clustering become nearly instant, and the map becomes much more responsive.

## Mapbox / Cluster Buster Section here.
Perhaps v1 / v2. And why we deprecated it.

## Configuration

### Using the tile service
The Tile Service can be used with your own station database, the premium Eco-movement database, or the free Open Charge Map database. Our Tile Service can be accessed at:

<code-block lang="html" prefix="Tile Service" title="Endpoint">https://api.chargetrip.io/station/{z}/{x}/{y}/tile.mvt</code-block>

### Authorization
You need to set your `x-client-id` as a `header` to authorize your request. In a similar fashion as described [here]().

<code-block lang="json" prefix="Tile Service" title="Authorization">"x-client-id": "5e8c22366f9c5f23ab0eff39"</code-block>