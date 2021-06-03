---
title: Deprecations
description: Deprecations
---

# Deprecations

The EV landscape is changing rapidly and our ever-evolving API is reflecting that. This means we need to deprecate fields when we find better solutions or structures. To migrate between different versions we provide a clear overview of our deprecated properties, replacement properties, deprecation dates, planned removal dates and deprecation reasons.

<note display="block">

If you do not migrate before the removal date unexpected behaviour, errors or missing data may occur. If you have any questions, please <cta action='smallchat'>contact us</cta>.

</note>

## Fields & arguments

Below you will find a list of everything that is deprecated and will be removed. They are categorized based on type.

### Routes

<deprecated-item 
    from-title="user" 
    description="May, 2021: User property is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

### Cars

<deprecated-item 
    from-title="carList.size (optional)" 
    to-title="carList.size (required)"
    description="January, 2021: Carlist query no longer supports fetching the full list in one go and requires pagination." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="externalId" 
    description="January, 2021: ExternalId is no longer being used internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="make" 
    to-title="naming.make"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="model" 
    to-title="naming.model"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="edition" 
    to-title="naming.version"
    description="January, 2021: New clustering applied to improve property scalability and alignment with EV Database values." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="version" 
    to-title="naming.edition"
    description="January, 2021: New clustering applied to improve property scalability and alignment with EV Database values." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="chargetripEdition" 
    to-title="naming.chargetrip_version"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="chargetripRange" 
    to-title="naming.chargetrip_range"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="fastChargingSupport" 
    to-title="routing.fast_charging_support"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="mode" 
    to-title="availability.status"
    description="January, 2021: New clustering applied to improve property scalability and alignment with EV Database values." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="seats" 
    to-title="body.seats"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="weight" 
    to-title="body.weight"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="height" 
    to-title="body.height"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="width" 
    to-title="body.width"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="batteryUsableKwh" 
    to-title="battery.usable_kwh"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="batteryFullKwh" 
    to-title="battery.full_kwh"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="acceleration" 
    to-title="performance.acceleration"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="topSpeed" 
    to-title="performance.top_speed"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="topSpeed" 
    to-title="performance.top_speed"
    description="January, 2021: New clustering applied to improve property scalability." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="batteryEfficiency" 
    to-title="battery.efficiency"
    description="January, 2021: Moved towards our new carPremium package and carPremium query." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="power" 
    to-title="drivetrain.power"
    description="January, 2021: Moved towards our new carPremium package and carPremium query." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="torque" 
    to-title="drivetrain.torque"
    description="January, 2021: Moved towards our new carPremium package and carPremium query." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="consumption" 
    to-title="routing.consumption"
    description="January, 2021: Moved towards our new carPremium package and carPremium query." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="petrolConsumption" 
    to-title="routing.petrol_consumption"
    description="January, 2021: Moved towards our new carPremium package and carPremium query." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="chargingOffset" 
    description="January, 2021: Field removed. Charging offset is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="auxConsumption" 
    description="January, 2021: Field removed. Aux consumption is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="bmsConsumption" 
    description="January, 2021: Field removed. Battery management system consumption is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="dragCoefficient" 
    description="January, 2021: Field removed. Drag coefficient is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="tirePressure" 
    description="January, 2021: Field removed. Tire pressure is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="motorEfficiency" 
    description="January, 2021: Field removed. Motor efficiency is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="drivelineEfficiency" 
    description="January, 2021: Field removed. Driveline efficiency is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="regenEfficiency" 
    description="January, 2021: Field removed. Regen efficiency is handled internally." 
    supported-until="Nov, 2021">
</deprecated-item>


### Reviews

<deprecated-item 
    from-title="user.id" 
    description="May, 2021: User object is no longer available." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="user.firstName" 
    description="May, 2021: User object is no longer available." 
    supported-until="Nov, 2021">
</deprecated-item>

<deprecated-item 
    from-title="user.lastName" 
    description="May, 2021: User object is no longer available." 
    supported-until="Nov, 2021">
</deprecated-item>

<right-aside>

<latest-updates></latest-updates>

</right-aside>
