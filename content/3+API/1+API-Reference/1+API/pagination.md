---
title: Pagination
description: A quick explanation of how pagination works on queries that support it
order: 1

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
Most of our list queries support pagination to make fetching large sets of data responsive and fast. Examples of such queries are [cars](), [stations](), [operators]() and [station reviews](). 

Implementing pagination isn't hard because a common structure is in place. Each list query has a `size` and `page` argument. The `size` argument sets the number of items you will get per `page`. The `page` argument is a pointer that incrementally fetches new data. Both are of type `int`.

### Default values

<c-table :argument="arguments" :type="types" :default="defaults"></c-table>
<!-- - The `size` argument is set to 10 by default.
- The `page` argument is set to 0 by default. -->