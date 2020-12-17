---
title: Query station amenities
description: Query the amenities of a specific station
order: 12
frequently:
- address
- type
- rating
- foursquareUrl
---

# Query station amenities
A charge session often takes a bit longer than a regular fueling round. Therefore it might be interesting to list the amenities around a certain charging station. Most of them also support a link towards foursquare for more information.

Last but not least, the available amenities can also be used as [filters](/API-Reference/Tile-Service/filters) on our [tile service](/API-Reference/Tile-Service/introduction). To show the amenity count you can use the [station statistics](/API-Reference/Stations/query-station-stats) query. 

## Query
To use the `amenityList` query you will need a station `id`. This `id` can be fetched by using our `stationList` query. After passing in this `id` you have access to anything from `address` to `rating`.

<schema name="amenityList" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="amenityList"></errors>

<playground>
<code-block lang="graphql" query="operatorList">					
</code-block>
<code-block lang="json">
</code-block>
</playground>
