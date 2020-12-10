---
title: Mutate to create a station review
description: Write a review for specific stations by using the station review mutation
order: 6
---

# Create a new station review
To improve the user experience of routes you can include reviews as described in [query station reviews](). To collect reviews and allow users to write one, you will need to use the following mutation. 

## Mutation
To be able to write a review you will need a `stationId` and `carId`. After that you can use various review arguments like `rating`, `message` and `tags` to collect the appropriate data. Keep in mind, the `stationId` and `rating` are both required when submitting a review.

<schema name="addReview" type="Mutation"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="addReview"></errors>

<playground url="https://playground.chargetrip.com/?page=reviewListLazyLoading">
<code-block lang="graphql" query="addReview">					
mutation addReview($stationId: String!, $carId: String) {
  addReview(
    review: {
      stationId: $stationId
      rating: 5
      message: "My review message"
      tags: { working: true, recommended: true }
      locale: "en-US"
      ev: $carId
      plugType: CHADEMO
    }
  ) {
    id
  }
}
</code-block>
<code-block lang="bash">
# Currently Missing 
</code-block>
</playground>
