---
title: Query station tariff details
description: Get the tariff and cost details of a specific station
order: 11
frequently:
- currency
- min_price
- max_price
- elements
---

# Query station tariff details <premium />
The `tariff` query will provide you with the costs to use a specific charging station. It will include the charging costs and optional setup fee.

**Note**: the tariff data is not available when using OCM data. Therefor it also unavailable in our [playground](). <cta action='smallchat'>Contact us</cta> for premium ecomovement data which holds tariff details.

## Query
The `tariff` query requires a tariff `id` to work. This tariff `id` can be found inside the attributes of a [station]().

<schema name="tariff" :frequent="frequently"></schema>

## Response
On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name="tariff"></errors>

<playground>
<code-block lang="graphql" query="tariff">	
query tarrif($id: ID!) {
  tariff (
	id: $id
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
        "tariff": {
            "id": "#",
            "country_code": null,
            "party_id": null,
            "currency": "EUR",
            "type": null,
            "tariff_alt_url": "",
            "tariff_alt_text": [],
            "min_price": null,
            "max_price": null,
            "elements": [
                {
                    "price_components": [
                        {
                            "price": 0.21,
                            "vat": 0
                        },
                        {
                            "price": 0.57,
                            "vat": 0
                        }
                    ],
                    "restrictions": []
                }
            ],
            "start_date_time": null,
            "end_date_time": null,
            "energy_mix": null,
            "last_updated": "2020-05-22T00:00:00.000Z"
        }
    }
}
</code-block>
</playground>