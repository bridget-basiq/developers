---
title: Deprecations
description: Deprecations
---

# Deprecations

The EV landscape is changing rapidly and our ever-evolving API is reflecting that. This means we need to deprecate fields when we find better solutions or structures. To migrate between different versions we provide a clear overview of our deprecated properties, replacement properties, deprecation dates, planned removal dates and explantions.

<note display="block">

If you do not migrate before the removal date, unexpected behaviour, errors or missing data may occur. If you have any questions, please contact us.

</note>

## Fields & arguments

Below you will find a list of everything that is deprecated and will be removed. They are categorized based on type.

### Cars

<deprecated-item from-title="make" to-title="naming.make" description="May, 2021: Improved field clustering and scalability" supported-until="Nov, 2021"></deprecated-item>

<deprecated-item from-title="fastChargingSupport" to-title="routing.fastChargingSupport" description="May, 2021: Improved field clustering and scalability" supported-until="Nov, 2021"></deprecated-item>

<deprecated-item from-title="power" to-title="drivetrain.power" supported-until="Nov, 2021">

May, 2021: Only available on [carPremium](http://chargetrip.com)

</deprecated-item>

<deprecated-item from-title="auxConsumption" description="May, 2021: Field removed. Aux consumption is handled internally." supported-until="Nov, 2021"></deprecated-item>

### Routes

<deprecated-item from-title="user" description="May, 2021: Field removed. User is handled internally." supported-until="Nov, 2021"></deprecated-item>

### Review

<deprecated-item from-title="user.firstName" description="May, 2021: Field removed. User property is no longer supported." supported-until="Nov, 2021"></deprecated-item>

<right-aside>

<latest-updates></latest-updates>

</right-aside>
