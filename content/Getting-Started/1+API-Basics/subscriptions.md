---
title: Subscriptions
description: A quick introduction on how to authorize with the chargetrip websocket so you can use GraphQL subscriptions
order: 3
quickNav: true
---
# Subscriptions

The Chargetrip API is relying on the GraphQL techonology so some requests use a [subscription](https://spec.graphql.org/draft/#sec-Subscription) mechanism. Unlike queries or mutations, subscriptions are long-lasting operations and can change their result over time. These operations are being handled by a websocket. Authenticating and communicating with this websocket is a bit different than a regular query or mutation. So let's go over it in detail.

<note display="block">
Websocket connections can't be used out of the box in your terminal. So if you would like to tag along with the steps below you can use a library called wscat. It's open source and can be downloaded [here](https://github.com/websockets/wscat).
</note>

## Initialize the websocket
To get started with the websocket you will first need to initialize a connection. The important bit here is to set the correct websocket protocols. We are using `graphql-ws` as the `Sec-WebSocket-Protocol` so make sure you set it! You will end up with something like this;

<code-block lang="bash" prefix="Subscriptions" title="Initialization">
</code-block>

## Authorization on the websocket
Now that we opened up our connection, we need to authorize ourself. We can do this by sending a message with the correct type and payload. The type will need to be `init` and your payload needs to contain your `x-client-id`. Combining this all together, it will look like this;

<code-block lang="bash" prefix="Subscriptions" title="Authorization">
</code-block>

If everything went correct you will receive the following message from the websocket; `{ "type": "connection_ack" }`.

## Communicating on the websocket
With all configuration done you are finally ready to send subscriptions and receive some real useful data. This is almost identical to the authorization but with one exception! You will need to add an `id` set to `1` to your message. Every next message will be an increment of 1 so nobody can jump the queue. To give you an idea of how this looks like we will be using our [routeUpdatedById](/API-Reference/Routes/subscribe-to-route-updates) subscription as an example and only request it's processing `status`. 

<code-block lang="bash" prefix="Subscriptions" title="Communicating">
</code-block>

If everything went correct the websocket will respond with a an object that contains the `status`. 

Last but not least. If you got the result you were looking for, **don't forget to close the connection!** 

<right-aside large="true">

<article-teaser src="globe.svg" href="https://medium.com/chargetrip/chargetrip-tile-service-with-react-native-and-mapbox-228dae36a574">

## Chargetrip Tile Service with React Native and Mapbox
An introduction to the Chargetrip Tile Service and the caveats of integrating it into a React Native mobile application.

</article-teaser>

<latest-updates></latest-updates>

</right-aside>
		
