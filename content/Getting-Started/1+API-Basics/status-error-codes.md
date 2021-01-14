---
title: Status & Error Codes
description: Get a clear overview of how to handle chargetrip's API status & error codes
order: 3
quickNav: true
statuses:
- 200
- 201
- 202
- 204
- 304
- 400
- 401
- 403
- 404
- 429
- 500
- 502
- 503

statusDescriptions:
- The request succeeded. The client can read the body.
- The request is created. A new resource will be created.
- The request is accepted. The client has to wait until it’s done processing.
- The request has succeeded but returns no message body.
- Not Modified.
- The request could not be understood by the server due to malformed syntax.
- The request requires authentication.
- The server understood the request, but is refusing to fulfill it.
- The requested resource could not be found.
- Too Many Requests.
- Internal Server Error. If you catch one, report your issue [here](https://github.com/chargetrip/chargetrip-developers/issues).
- Bad Gateway.
- Service Unavailable.
  
keys:
- response
- status
- message
- code

types:
- String
- Int
- String
- String

descriptions:
- Your project id with the corresponding configuration
- The status code of the response reflecting the API response codes
- The message describing the error
- A unique error code that can be used for localization
---

# Status & Error Codes

To ensure you can respond appropriate when our API outputs something you didn’t expect we maintain a consistent set of API response and error codes. The general design of the response and error codes will be discussed inside this chapter.

<c-image alt="Authorization image" src="status-and-error-codes.png" max-width="lg"></c-image>

## API Response Codes

Our API uses the following response status codes, as defined in the [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt) and [RFC 6568](https://www.ietf.org/rfc/rfc6585.txt);

<status-table :statuses="statuses" :descriptions="statusDescriptions"></status-table>

## API Error Objects

Apart from the response codes, unsuccessful responses return their generic GraphQL error described here alongside some additional fields . The additional fields can be found inside the  extensions object. The most important one here is the  exception  object. This one contains all the information about the error and looks like this;

<property-table :keys="keys" :types="types" :descriptions="descriptions"></property-table>

If we want to reflect this as a curl it would look like this;

<code-block lang="json" prefix="Error" title="Error objects">
{
  "errors": [
    {
      "message": "The car was not found in the database",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addReview"
      ],
      "extensions": {
        "exception": {
          "response": "ERROR_EV_NOT_FOUND",
          "status": 500,
          "message": "The car was not found in the database",
          "code": "ERROR_EV_NOT_FOUND"
        }
      }
    }
  ],
  "data": null
}
</code-block>

Navigate to our API reference to get a more detailed look at the possible errors per request.

<right-aside large="true">

<article-teaser href="https://medium.com/chargetrip/chargetrip-tile-service-with-react-native-and-mapbox-228dae36a574">

## Chargetrip Tile Service with React Native and Mapbox
An introduction to the Chargetrip Tile Service and the caveats of integrating it into a React Native mobile application.

</article-teaser>

<latest-updates></latest-updates>

</right-aside>
