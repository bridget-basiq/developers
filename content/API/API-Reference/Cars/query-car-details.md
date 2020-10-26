---
title: Query car details
order: 2
frequently:
 - id
 - chargetripEdition
 - make
 - images
 - carModel
---

# Query car details

This query is used to get a list of all the details of an electric car in our database. Some attributes are coming from our partner [EVDatabase](http://google.com).

## Request

This request uses the id parameter to identify which details should be fetched. This parameter is required.

<schema name="Car" :frequent="frequently"></schema>
