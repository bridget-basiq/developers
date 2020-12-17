---
title: Pagination
description: A quick explanation of how pagination works on queries that support it
order: 2

arguments:
- size
- page

types:
- int
- int

defaults:
- Default is set to 10
- Default is set to 0
---

# Pagination
Most of our list queries support pagination to make fetching large sets of data responsive and fast. Examples of such queries are [cars](/API-Reference/Cars/query-cars), [stations](/API-Reference/Stations/query-stations), [operators](/API-Reference/Stations/query-operators) and [station reviews](/API-Reference/Stations/query-station-reviews). 

Implementing pagination isn't hard because a common structure is in place. Each list query has a `size` and `page` argument. The `size` argument sets the number of items you will get per `page`. The `page` argument is a pointer that incrementally fetches new data. Both are of type `int`.

### Default values
<c-table :argument="arguments" :type="types" :default="defaults"></c-table>