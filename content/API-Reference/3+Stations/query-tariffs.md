---
title: Query station tariffs
description: Get a global overview of the tariffs and costs of all your stations
order: 10
frequently:
- currency
- min_price
- max_price
- elements
---

# Query station tariff list <premium />
To get an overview of the charging costs and optional setup fee you can run the query station tariff list. Within this list you will find all costs per station.

**Note**: the tariff data is not available when using OCM data. Therefore it also unavailable in our [playground](). <cta action='smallchat'>Contact us</cta> for premium ecomovement data which holds tariff details.

## Query
The `tariffList` query works out of the box and no additional information is required. However, you have the option to enable [pagination]() on the query to improve the performance as you can see below.

<schema name="tariffList" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

<errors name="tariffList"></errors>

<playground>
<code-block lang="graphql" query="tariffList">
query tariffList {
  tariffList (
    size: 5, 
    page: 1
  ) {
    id
    country_code
    party_id
    id
    currency
    type
    tariff_alt_url
    tariff_alt_text {
      text
    }
    min_price {
      incl_vat
    }
    max_price {
      incl_vat
    }
    elements {
      price_components {
        price
        vat
      }
      restrictions {
        day_of_week
      }
    }
    start_date_time
    end_date_time
    energy_mix {
      is_green_energy
    }
    last_updated
  }
}			
</code-block>
<code-block lang="json">
{
    "data": {
        "tariffList": [
            {
                "id": "#",
                "country_code": null,
                "party_id": null,
                "currency": "EUR",
                "type": null,
                "tariff_alt_url": "",
                "tariff_alt_text": [
                    {
                        "text": "PNB"
                    }
                ],
                "min_price": null,
                "max_price": null,
                "elements": [
                    {
                        "price_components": [
                            {
                                "price": 0.5,
                                "vat": 0
                            }
                        ],
                        "restrictions": []
                    },
                    {
                        "price_components": [
                            {
                                "price": 0.29,
                                "vat": 0
                            }
                        ],
                        "restrictions": [
                            {
                                "day_of_week": null
                            }
                        ]
                    }
                ],
                "start_date_time": null,
                "end_date_time": null,
                "energy_mix": null,
                "last_updated": "2018-09-25T23:10:04.000Z"
            }
        ]
    }
}
</code-block>
</playground>
