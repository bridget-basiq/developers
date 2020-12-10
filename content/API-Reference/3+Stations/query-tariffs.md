---
title: Query station tariffs
description: 
order: 9
frequently:
- currency
- min_price
- max_price
- elements
---

# Query station tariff list
To get an overview of the charging costs and optional setup fee you can run the query station tariff list. Within this list you will find all costs per station. The tariff list is part of our premium feature pack. Contact [sales]() to discuss the details.

## Query
The `tariffList` query works out of the box and no additional information is required. However, you have the option to enable [pagination]() on the query to improve the performance as you can see below.

<schema name="tariffList" :frequent="frequently"></schema>

## Response

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
# Currently missing
</code-block>
</playground>
