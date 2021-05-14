---
title: Subscriptions
description: A quick introduction on how to authorize with the Chargetrip websocket, so you can use GraphQL subscriptions
order: 4
quickNav: true
---
# Subscriptions

The Chargetrip API relies on GraphQL technology, so some requests use a [subscription](https://spec.graphql.org/draft/#sec-Subscription) mechanism. Unlike queries or mutations, subscriptions are long-lasting operations and can change their result over time. These operations are handled by a websocket. Authenticating and communicating with this websocket is different than a regular query or mutation. Let us go over it in detail.

<note display="block">

Websocket connections can't be used out of the box in your terminal. So if you would like to tag along with the steps below you can use a library called wscat. It's open source and can be downloaded [here](https://github.com/websockets/wscat).

</note>

## Library usage
The guide below is for those not opting in on a library like [Apollo GraphQL](https://www.apollographql.com/), and rather taking care of it manually. If you do opt in for such a library, please follow along with the tutorials on the libraries website. They already take care of certain configurations for you.

## Initialize the websocket
To get started with the websocket, you will first need to initialize a connection. The important bit here is to set the correct websocket protocols. We are using `graphql-ws` as the `Sec-WebSocket-Protocol`, so make sure you set this! You will end up with something like this;

<code-block lang="bash" prefix="Subscriptions" title="Initializing">
wscat -c wss://api.chargetrip.io/graphql -s graphql-ws
</code-block>

## Authorization on the websocket
Now that we have opened our connection, we need to authorize ourselves. We can do this by sending a message with the correct type and payload. The type will need to be `init` and your payload must contain your `x-client-id`. In combination, it will look like this;

<code-block lang="bash" prefix="Subscriptions" title="Authorizing">
{ "type":"connection_init", "payload": { "x-client-id": "Your client id here" }
</code-block>

If everything was correct, you will receive the following message from the websocket; `{ "type": "connection_ack" }`.

## Communicating on the websocket
With all configuration done you're finally ready to send subscriptions and receive useful data. This is almost identical to the authorization, but with one exception! You will need to add `id` set to any unique identifier in your message. The `id` will be returned so you are ensured you got the right message back. To give you an idea of how this looks, we will be using our [routeUpdatedById](/API-Reference/Routes/subscribe-to-route-updates) subscription as an example, and only requesting its processing `status`. 

<code-block lang="bash" prefix="Subscriptions" title="Communicating">
{ "id": "1", "type": "start", "payload": { "query": "subscription routeUpdatedById { routeUpdatedById(id: \"Your route id here\") { status } }", "variables": { "id": "Your route id here"} } }
</code-block>

If everything was correct and you set the `routeId` in variables and inside your `query`, the websocket will respond with an object that contains the `status`. For more information about the route subscription and responses have a look at the [route section](https://developers.chargetrip.com/API-Reference/Routes/introduction/). If you did not set your `routeId` in variables, there will be **no** response from the server.

## Disconnecting the websocket
Last but not least; if you got the result you were looking for, **don't forget to close the connection!** You can do this by pressing `ctrl + c` or `cmd + c` in your terminal.

<right-aside large="true">

<article-teaser src="globe.svg" href="https://medium.com/chargetrip/chargetrip-tile-service-with-react-native-and-mapbox-228dae36a574">

## Chargetrip Tile Service with React Native and Mapbox
An introduction to the Chargetrip Tile Service and the caveats of integrating it into a React Native mobile application.

</article-teaser>

<latest-updates></latest-updates>

</right-aside>