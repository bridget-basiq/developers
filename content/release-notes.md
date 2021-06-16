---
title: Release notes
description: An overview of updates and improvements on the Chargetrip API.
releasePage: true
---

# Release notes

With every update we write release notes. This way you know what has been fixed or what has been added.


<release-note title="3.3.4 - Routing in Low Density Charge Station Regions" date="02-06-2021">

### ⚡️ New features

- Our tile server now supports URL parameter authentication on top of header authentication to provide a more seamless Mapbox integration. See our updated documentation [here]().

### ✨ Improvements

- Improved our calculations in regions where the density of stations is still low by widening our search for possible stations if the first route fails.

</release-note>

<release-note title="3.0.0 - GraphEngine 3.0" date="31-05-2021">

### ⚡️ New features

- Chargetrip's Graph Engine has been rebuild from the ground-up to maintain performance and withstand higher loads. The new version of the engine calculates routes faster, uses more variables and gives back better results

### ✨ Improvements

- Improved the client environment's stability by moving the import and processing of station data outside the client environment
- Improved route calculation speeds when searching for stations along a route
- Improved route calculation speeds when using preferred operators
- Improved car data processing

</release-note>

<release-note title="2.58.6 - Introducing pagination to the car database" date="11-05-2021">

Today we are rolling out an overhauled carlist query which allows for better frontend performance and search results. For an example on how to use all these new features, you can go [here](https://chargetrip.github.io/examples/car-list/).

### ⚡️ New features

- Carlist query now supports pagination
- Carlist query now supports search over `naming.make`, `naming.model`, `naming.chargetrip_version`
- Carlist query now supports filtering using the `availability` field

</release-note>

<release-note title="2.38.3 - Car Database Structure" date="27-01-2021">

### ✨ Improvements

- Improved car data clustering. Fields are now categorized by using nesting

</release-note>


<release-note title="2.38.3 - Car Database Structure" date="27-01-2021">

This release improves the structuring of our car data. This improvement however includes breaking changes and requires migration. The fields that require migration can be found on the [deprecation page](/deprecations).

### ✨ Improvements

- Improved car data structuring which allows for better clustering and query scalability

### 🐞️ Bug fixes

- Fixed a bug that prevented using stations as `via` point

</release-note>


<release-note title="2.33.1 - Predictive Availability Module" date="17-11-2020">

This week we extended our station data by including historical station availability. Not every station includes this information at the moment but this will increase over time. 

The predictive availability module contains this week's predictions. For every hour, there is an availability scale ranging from 1 to 5.

<c-table>
    <c-row>
        <c-cell font-weight="bold" tag="th">Value</c-cell>
        <c-cell font-weight="bold" tag="th">Prediction</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">1</c-cell>
        <c-cell>very busy - high probability that the charging station is occupied</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">2</c-cell>
        <c-cell>busy</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">3</c-cell>
        <c-cell>average</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">4</c-cell>
        <c-cell>quiet</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">5</c-cell>
        <c-cell>very quiet - high probability that the charging station will be free</c-cell>
    </c-row>
</c-table>

The days of the week start at 1 which results in the following `weekdays` values:

<c-table>
    <c-row>
        <c-cell font-weight="bold" tag="th">Value</c-cell>
        <c-cell font-weight="bold" tag="th">Day of the week</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">1</c-cell>
        <c-cell>Monday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">2</c-cell>
        <c-cell>Tuesday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">3</c-cell>
        <c-cell>Wednesday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">4</c-cell>
        <c-cell>Thursday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">5</c-cell>
        <c-cell>Friday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">6</c-cell>
        <c-cell>Saturday</c-cell>
    </c-row>
    <c-row>
        <c-cell font-weight="semibold">7</c-cell>
        <c-cell>Sunday</c-cell>
    </c-row>
</c-table>

### ⚡️ New features

- Station data has been extended and now includes historical station availability

### 🐞️ Bug fixes

- Fixed a bug where our error codes where not consistent

</release-note>

<release-note title="2.30.3 - Bug fixes & improvements" date="06-11-2020">

### 🐞️ Bug fixes

- Fixed a bug that hid 24 / 7 information for some stations
- Fixed a bug where alternative routes with a single charge were not displayed correctly

</release-note>

<release-note title="2.30.2 - Chargetrip Range" date="27-10-2020">

This release introduces the chargetripRange field. The Chargetrip Real Range helps displaying a realistic range for all EV models. The range is based on Chargetrip's research and driving data. You can find more details on the [car section](/API-Reference/Cars/introduction).

### ⚡️ New features

- Added the `chargetripRange` field

### ✨ Improvements

- Migrated fields from the `carList` query to the `car` query to allow caching of the `carList` query

### 🐞️ Bug fixes

- Fixed a bug where the number of amenities were not equal when comparing between the `stationList` and `amenityList`

</release-note>

<release-note title="2.27.5 - New Outside Temperature Model" date="15-10-2020">

### ✨ Improvements

- Improved outside temperature model which enhances the route computation speed and improves the charge stop accuracy
- Various other improvements to improve our route calculation speed

### 🐞️ Bug fixes

- Fixed a bug where the ordering of alternative routes was wrong

</release-note>

<release-note title="2.24.0 - Custom Error Codes" date="14-09-2020">

This release is all about errors. We know, you hate getting them but we tried to make debugging a little bit easier. Apart from that we also included all custom error codes in our documentation. Please be aware that in addition to our custom error codes, GraphQL throws an `INTERNAL_SERVER_ERROR` as a generic HTTP-error. Please ignore this error and use only our custom error codes.

### ⚡️ New features

- Added custom error codes and detailed error descriptions. No more guess-work

### 🐞️ Bug fixes

- Various small bug fixes

</release-note>

<release-note title="2.22.2 - Bug Fixes & improvements" date="27-08-2020">

### ✨ Improvements

- Improved the description of our recently released `chargetripEdition` field
- Improved various `chargetripEdition` field names to be more descriptive

### 🐞️ Bug fixes

- Fixed a bug where `via` points were not correctly added to the route

</release-note>

<release-note title="2.22.0 - Chargetrip Edition" date="26-08-2020">

This week the `chargetripEdition` field has been released. Often car manufacturers don't make a distinction between different versions of the same modal. By using the chargetrip edition we make sure you always have a unique car name.

### ⚡️ New features

- Added the `chargetripEdition` field

</release-note>

<release-note title="2.21.8 - Bug Fixes" date="07-08-2020">

### 🐞️ Bug fixes

- Fixed a spelling mistake by renaming `recommandedSpeed` to `recommendedSpeed`
- Fixed the destination type from `stationVia` to `stationFinal` when adding a station as final destination

</release-note>

<release-note title="2.21.0 - Alternative Stations" date="20-07-2020">

### ⚡️ New features

- Added the ability to request alternative stations along an existing route
- Added the ability to set charge stations as waypoints to an existing route

### 🐞️ Bug fixes

- Renamed the `stationAlong` field to `stationsAlongRoute`

</release-note>

<release-note title="2.19.0 - Tile Service Filter" date="16-07-2020">

### ⚡️ New features

- Added support for selecting different power filters
- Added support to select all available connectors

### 🐞️ Bug fixes

- Fixed various spelling mistakes and inconsistencies in our documentation

</release-note>

<release-note title="2.15.0 - OCPI 2.2 Support" date="10-06-2020">

### ⚡️ New features

- Added support for OCPI 2.2. OCPI specifications can be found [here](https://github.com/ocpi/ocpi). The full specifications can be found [here](https://github.com/ocpi/ocpi/releases/download/2.2/OCPI-2.2.pdf)

</release-note>

<release-note title="2.0.0 - OCPI 2.1.1 Support" date="01-04-2020">

Today's release contains an exclusive Eco-Movement Integration. Next to our free Open Charge Map stations, your account can be pre-loaded with over 100.000 highly curated premium charge stations across Europe. Our premium station data includes real-time availability, pricing, and charging history. You no longer need to connect several costly charge station database providers to get European coverage. See [Eco-Movement](https://www.eco-movement.com/) for more details about regional limitations. <cta action='smallchat'>Contact us</cta> for pricing.


### ⚡️ New features

- Included an exclusive Eco-Movement integration
- Added support for OCPI 2.1.1

### 🐞️ Bug fixes

- Fixed various spelling mistakes and inconsistencies in our documentation
- Fixed missing descriptions for all types that return values with a unit

</release-note>

<release-note title="1.0.0 - Generation 3 of the Chargetrip API" date="18-01-2020">

### ⚡️ New features

- Added support for Peugeot e-208 and Seat Mii Electric
- Added support for the OCPI Tarrif Module. More information about the OCPI 2.1.1 specifications can be found [here](https://github.com/ocpi/ocpi). The full specifications can be found [here](https://github.com/ocpi/ocpi/releases/download/2.1.1/OCPI_2.1.1.pdf).

### 🐞️ Bug fixes

- Fixed various spelling mistakes and inconsistencies in our documentation

</release-note>
