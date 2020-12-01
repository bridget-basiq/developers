---
title: Query station reviews
description: Query the station reviews of a specific station
order: 5
---

# Query station reviews
Since station quality can vary, it's always nice to have a second opinion. That's why every station in your station database can be accompanied by a user review. Reviews are stored per station database and can't be used across different projects.

## Query
To get the reviews of a specific station you will need to provide a `stationId`. Optionally you can add [pagination]() to lazy load the reviews.

<schema name="reviewList"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

<playground url="https://playground.chargetrip.com/?page=reviewListLazyLoading">
<code-block lang="graphql" query="reviewList">					
query reviewList($stationId: ID!) {
  reviewList(stationId: $stationId, size: 2, page: 0) {
    id
    rating
    message
    locale
    ev {
      id
      make
      carModel
      edition
      version
    }
    plugType
    tags {
      working
      recommended
    }
    properties
  }
}
</code-block>
<code-block lang="json">
{
  "data": {
    "reviewList": [
      {
        "id": "5eb91eedd40bda5e3df3c6a3",
        "rating": 5,
        "message": "My review message",
        "locale": "en-US",
        "ev": {
          "id": "5d161be5c9eef46132d9d20a",
          "make": "Tesla",
          "carModel": "Model S",
          "edition": "75D",
          "version": null
        },
        "plugType": "CHADEMO",
        "tags": {
          "working": true,
          "recommended": true
        },
        "properties": null
      },
      {
        "id": "5eb2a8bd629b005f65bb297f",
        "rating": 5,
        "message": "My review message",
        "locale": "en-US",
        "ev": {
          "id": "5d161be5c9eef46132d9d20a",
          "make": "Tesla",
          "carModel": "Model S",
          "edition": "75D",
          "version": null
        },
        "plugType": "CHADEMO",
        "tags": {
          "working": true,
          "recommended": true
        },
        "properties": null
      }
    ]
  }
}
</code-block>
</playground>