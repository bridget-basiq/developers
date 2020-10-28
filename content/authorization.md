---
title: Authorization
order: 3
---
# Authorization

Before you can start with our API you need to be able to authorize yourself. You can do this by [signing up](https://google.com) and [configuring](https://google.com) your own free key. After you’ve done that we will guide you through the process of configuring your key and authorizing yourself.

![Authorization image](authorization.jpg)

## The API
Now that you have all credentials that are required you can start using our API. The first thing you will need is the following base url;

<code-block prefix="Authorization" title="Base Url">
http://api.chargetrip.io/graphql
</code-block>

## Authorization process
To communicate with the chargetrip API, we require authorization on our endpoints as well as our websocket. Authentication can be done on one or two levels. If you only provide us only with your `x-client-id` we will use this project configuration and the default `x-app-id` associated with it.

  If you would like to split up your analytics per platform you can provide an additional `x-app-id`. This way your requests will be categorised on this level.

<property-table keys="x-client-id|x-app-id" types="string|string" descriptions="Your project id with the corresponding configuration|Your app id for splitting up analytics" required="Yes|No"></property-table>

If we want to reflect this as a curl it would look like this;

<code-block prefix="Authorization" title="Curl">
curl -X POST \
-H "Content-Type: application/json" \
-H "x-client-id: 5e8c22366f9c5f23ab0eff39" \
-H "x-app-id: 5e8c22366f9c5f23ab0eff39" \
-d 'query { }' \
http://api.chargetrip.io/graphql
</code-block>


