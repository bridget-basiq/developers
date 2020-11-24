---
title: Query station operators
description: Query all the operators of your station database
order: 6
frequently:
- id
---

# Query station operators
Charge stations are often exploited by various operators. To get an overview of your operators you can use the `operatorList` query. All operator details are available, but keep it as small as possible to improve performance.

## Query
The entire operatorList can be accessed by using the `operatorList` query with the attributes you would like to use. Optionally you can use [pagination]() and `filters` to improve your results.

### Pagination & Filters
To filter your operator list you can use the `query` argument. You can then use `name`, `id`, `external_id` or `country` to specify how you want to filter the list.

<schema name="operatorList" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="operator"></errors>

<playground>
<code-block query="operatorList">					
query operatorList {
  operatorList(
    query: { name: "AeroVironment" }
    size: 2
    page: 0
  ) {
    id
    external_id
    name
    website
    logo {
      url
      thumbnail
      type
    }
    country
    contact {
      phone
      email
      website
      facebook
      twitter
      properties
    }
  }
}
</code-block>
<code-block>
{
  "data": {
    "operatorList": [
      {
        "id": "5dc3dff8c81f55a86f7197ac",
        "external_id": "3377",
        "name": " Etecnic",
        "website": "http://www.etecnic.es",
        "logo": null,
        "country": "ES",
        "contact": {
          "phone": " (+34) 977 276 952",
          "email": "etecnic@etecnic.es",
          "website": "http://www.etecnic.es",
          "facebook": null,
          "twitter": null,
          "properties": null
        }
      },
      {
        "id": "5dc3dff8c81f557fb27197ad",
        "external_id": "45",
        "name": "(Business Owner at Location)",
        "website": "",
        "logo": null,
        "country": null,
        "contact": {
          "phone": "",
          "email": "",
          "website": "",
          "facebook": null,
          "twitter": null,
          "properties": null
        }
      }
    ]
  }
}
</code-block>
</playground>