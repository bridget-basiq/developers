---
title: Getting started
description: Get started by setting up your chargetrip API project
order: 1
quickNav: true
images:
- configuring-your-project-1.png
- configuring-your-project-2.png
---
# Getting started
The Chargetrip API can be used to render electric vehicles, plot stations and calculate routes. The API itself has different access levels and request limits depending on the plan you are on. Everyone can start with a limited dataset on the free plan, but you can <cta action='smallchat'>contact us</cta> at any time to upgrade your plan.

<steps>
<step img="getting-access.png">

## Getting access

To get started with the Chargetrip API you need to create an account and collect your own keys. Once you have done that you can start making requests.

<c-button href="https://dashboard.chargetrip.com/sign-up" size="md" color="accent" title="Sign up"></c-button>
<c-button href="https://dashboard.chargetrip.com/" size="md" color="body" title="Sign in"></c-button>

</step>
<step :images="images">

## Configuring your project

When logged in to the dashboard, go to projects and click on create new project. When saving your configuration you will be returned to the project overview with your new key.

<step-note color="accent" title="Chargetip">

Want to use the same configuration in a different app? Create additional app keys inside your project and add them to your header as explained [here](http://localhost:3000/setup-&-integration/API-Basics/setup/authorization#authorization-process).

</step-note>

</step>
<step img="collect-your-keys.png">

## Collect your keys
After you configured your project you need to click save. You will then be redirected to the project overview where you can copy your project key.

<step-note color="note" title="Key alert" :khaled="true">

These keys can’t be regenerated so keep them safe by using environment variables or a secure password manager.

</step-note>
</step>
</steps>

<right-aside large="true">

<article-teaser href="https://medium.com/chargetrip/chargetrip-tile-service-with-react-native-and-mapbox-228dae36a574">

## Chargetrip Tile Service with React Native and Mapbox
An introduction to the Chargetrip Tile Service and the caveats of integrating it into a React Native mobile application.

</article-teaser>

<latest-updates></latest-updates>

</right-aside>
