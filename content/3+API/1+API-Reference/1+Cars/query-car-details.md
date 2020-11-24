---
title: Query car details
order: 2
description: Query car details placeholder description...
frequently:
 - id
 - chargetripEdition
 - make
 - images
 - carModel
---

# Query car details

This query is used to get a list of all the details of an electric car in our database. Some attributes are coming from our partner [EVDatabase](https://ev-database.org/).

## Request

This request uses the id parameter to identify which details should be fetched. This parameter is required.

<schema name="car" :frequent="frequently"></schema>

<playground>

<code-block query="carList" lang="graphql">					
query carListAll {
  carList(size: 2, page: 0) {
    id
    chargetripEdition
    images {
        url
    }
    make
    model
  }
}
</code-block>
<code-block>
{
  "data": {
    "carList": [
      {
        "id": "5d161bdbc9eef45824d9d1ec",
        "chargetripEdition": "30 kWh",
        "make": "Nissan",
        "carModel": "Leaf",
        "images": [
          {
            "url": "https://cars.chargetrip.io/5f1aafc0657beb58f163895a-7aa1f9430fff4286013ce208addaade25555ab64.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aafc0657beb58f163895a.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aa821657bebb5ba6388b2-27c1ba75d5ef672805dd09e1538f63fbcbc0b209.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aa821657bebb5ba6388b2.png"
          },
          {
            "url": "https://cars.chargetrip.io/5ddfa131eec2ccfa26b95ae5-1574936884.png"
          },
          {
            "url": "https://cars.chargetrip.io/5ddfa130eec2ccd9e0b95ae4-1574936883.png"
          },
          {
            "url": "https://cars.chargetrip.io/5ddfa131eec2ccfa26b95ae5.png"
          },
          {
            "url": "https://cars.chargetrip.io/5ddfa130eec2ccd9e0b95ae4.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d9b39fd96801c2ee002c3ee-1570454014.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d9b39fd96801c505f02c3ed-1570454013.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d9b39fd96801c505f02c3ed.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d9b39fd96801c2ee002c3ee.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d161bdbc9eef45824d9d1ec.jpg"
          }
        ]
      },
      {
        "id": "5d161be5c9eef46132d9d20a",
        "chargetripEdition": "75D (2016-2019)",
        "make": "Tesla",
        "carModel": "Model S",
        "images": [
          {
            "url": "https://cars.chargetrip.io/5f1aafc4657beb0286638961.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aafc4657beb0286638961-a42ccac22cb8f60071d514c319a9c6f7e9b87188.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aa823657beb3cd96388b9.png"
          },
          {
            "url": "https://cars.chargetrip.io/5f1aa823657beb3cd96388b9-4fecd7e41e100e205ebf3193f33e3e84e14a0992.png"
          },
          {
            "url": "https://cars.chargetrip.io/5dcd60afeec2cc22f0b95a8f-1573740763.png"
          },
          {
            "url": "https://cars.chargetrip.io/5dcd60afeec2cce077b95a8e-1573740762.png"
          },
          {
            "url": "https://cars.chargetrip.io/5dcd60afeec2cce077b95a8e.png"
          },
          {
            "url": "https://cars.chargetrip.io/5dcd60afeec2cc22f0b95a8f.png"
          },
          {
            "url": "https://cars.chargetrip.io/5d161be5c9eef46132d9d20a.jpg"
          }
        ]
      }
    ]
  }
}
</code-block>
</playground>

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="car"></errors>
