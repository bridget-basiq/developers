---
title: Query station operators
description: Query all the operators of your station database
order: 5
frequently:
- id
---

# Query station operators

Charge stations are often operated by various different organisations. To provide users with an overview of your charge point operators you can use this query.

## Query

You can access the entire list of operators from your account using `operatorList` query.

<schema name="operatorList" :frequent="frequently"></schema>

<playground>

<code-block query="operatorList">					
query operatorList {
  operatorList {
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

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="operator"></errors>