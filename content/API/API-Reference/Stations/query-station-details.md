---
title: Query station details
description: Query station details placeholder description...
order: 7
frequently:
 - id
 - chargetripEdition
 - make
 - images
 - carModel
---

# Query Station details

This query is used to get a list of all the details of an electric car in our database. Some attributes are coming from our partner [EVDatabase](http://google.com).

## Request

This request uses the id parameter to identify which details should be fetched. This parameter is required.

<schema name="Station" :frequent="frequently"></schema>

## Response

On success, the HTTP status code in the response header is 200 and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<error title="STATION_NOT_FOUND" message="No EV was found with the provided ID or external ID."></error>
