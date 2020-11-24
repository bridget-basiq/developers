---
title: Query latest station reviews
description: Query the latest station reviews on a specific station
order: 4
frequently:
- id
---

# Query latest station reviews

To give users an impression of a station you can provide them with some of the most recent reviews.

## Query

Using our [playground example query](https://playground.chargetrip.com/?page=stationWithLatestReviews) you can fetch the last 2 reviews for a single station. Play with the arguments to get your desired results.

<schema name="reviewList" :frequent="frequently"></schema>

<playground>

<code-block query="stationAround">					
query stationWithLatestReviews {
  station(id: "5e8583c2d3406cac673b90bb") {
    id
    external_id
    name
    location {
      type
      coordinates
    }
    review {
      rating
      count
    }
  }
  reviewList(stationId: "5e8583c2d3406cac673b90bb", size: 2, page: 0) {
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
<code-block>
{
  "data": {
    "station": {
      "id": "5dc401b04ecd176cfb0d74ef",
      "external_id": "134282",
      "name": "Tesco Extra-Pontypridd",
      "location": {
        "type": "Point",
        "coordinates": [
          -3.296328,
          51.580388
        ]
      },
      "review": {
        "rating": 5,
        "count": 2
      }
    },
    "reviewList": [
      {
        "id": "5e2959c0f8b8042e920eb655",
        "rating": 5,
        "message": "My review message",
        "locale": "en-US",
        "ev": {
          "id": "5d161bdbc9eef45824d9d1ec",
          "make": "Nissan",
          "carModel": "Leaf",
          "edition": "30 kWh",
          "version": null
        },
        "plugType": "IEC_62196_T2_COMBO",
        "tags": {
          "working": true,
          "recommended": true
        },
        "properties": null
      },
      {
        "id": "5e295a12f8b804d1560eb658",
        "rating": 5,
        "message": "My review message",
        "locale": "en-US",
        "ev": {
          "id": "5d161bdbc9eef45824d9d1ec",
          "make": "Nissan",
          "carModel": "Leaf",
          "edition": "30 kWh",
          "version": null
        },
        "plugType": "IEC_62196_T2_COMBO",
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

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.