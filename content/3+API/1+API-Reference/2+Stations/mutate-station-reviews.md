---
title: Mutate station reviews
description: Write reviews for specific stations by using the station review mutation
order: 6
---

# Mutate station reviews
To improve the user experience of routes you can include reviews as described in [query station reviews](). To able to collect reviews you will need to use the following mutation. 

## Mutation
To be able to write a review you will need a stationId and carId. After that you can use various review arguments like `rating`, `message` and `tags` to collect the appropriate data.

<schema name="addReview" type="Mutation"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

<playground url="https://playground.chargetrip.com/?page=reviewListLazyLoading">
<code-block query="addReview">					
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
<code-block>
# Currently Missing 
</code-block>
</playground>