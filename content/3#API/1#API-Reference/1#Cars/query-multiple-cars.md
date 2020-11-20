---
title: Query cars
description: Query cars by make, model and various other parameters.
order: 1
frequently:
 - id
 - chargetripEdition
 - make
 - images
 - carModel
---

# Query cars

This query is used to get a list of all the details of an electric car in our database. Some attributes are coming from our partner [EVDatabase](http://google.com).

## Query

You can access a list of all available cars using the carList query. A live example can be found by clicking on the view in playground button.

Using GraphQL you can query only the data you need. For example, on the right is a query to return a list of all cars with a select number of output parameters.

Below you can find a complete overview of [filter, pagination and sorting](howtographql.com) options as well as all available output parameters. 

<schema name="carList" :frequent="frequently"></schema>

<playground>

<code-block query="carList">					
query carListAll {
  carList {
    id
    make
    carModel
    edition
    seats
  }
}
</code-block>

<code-block>
{
  "data": {
    "carList": [
      {
        "id": "5d161beec9eef4c250d9d225",
        "make": "BMW",
        "carModel": "i3s",
        "edition": "94 Ah",
        "seats": 4
      },
      {
        "id": "5d161befc9eef48216d9d228",
        "make": "Kia",
        "carModel": "Soul EV",
        "edition": "30 kWh",
        "seats": 5
      },
      {
        "id": "5d161bdbc9eef45824d9d1ec",
        "make": "Nissan",
        "carModel": "Leaf",
        "edition": "30 kWh",
        "seats": 5
      },
      {
        "id": "5d161be5c9eef46132d9d20a",
        "make": "Tesla",
        "carModel": "Model S",
        "edition": "75D",
        "seats": 5
      }
    ]
  }
}
</code-block>

</playground>

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="carPremium"></errors>
