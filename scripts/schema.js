/* eslint-disable */
const fetch = require('cross-fetch').fetch
const fs = require('fs')
const { getIntrospectionQuery } = require('graphql')
require('dotenv').config()
const axios = require('axios')
const tileFilter = {
  "name": "tileFilter",
  "description": "A set of filters that is available for the tile service.",
  "args": [
    {
      "name": "power",
      "description": "Deprecated in favor of `powers`.",
      "type": {
        "kind": "SCALAR",
        "name": "Int",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": true
    },
    {
      "name": "powers",
      "description": "Determines the powers of the stations that will be included in the tiles. This can be `all` (`powers=all`) for all powers or a list of kWh values for individual powers. For kWh values, you can send a numeric array with the specific powers you would like to return, `powers[]=22&powers[]=43&powers[]=50`.",
      "type": {
        "kind": "SCALAR",
        "name": "All || [Number]",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    },
    {
      "name": "powerGroups",
      "description": "Determines the speed groups of powers that will be included in the tiles. We have grouped all available powers into three speed groups (`slow`, `fast` or `turbo`), you can send an array (`powerGroups[]=slow &powerGroups[]=fast &powerGroups[]=turbo`). Note: You can't mix powerGroups with `powers=all`. You can mix powerGroups with individual powers `powerGroups[]=fast&powers[]=22` (for this specific example we will consider both, stations which are `fast` and stations that are 22 kWh).",
      "type": {
        "kind": "OBJECT",
        "name": "StationSpeedType",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    },
    {
      "name": "connectors",
      "description": "Determine the connector standards that will be included in the tiles. You can send an array with the `connectors[]=CHADEMO&connectors[]=IEC_62196_T2_COMBO`, etc.",
      "type": {
        "kind": "OBJECT",
        "name": "OCPIConnectorType",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    },
    {
      "name": "amenities",
      "description": "An optional list of amenities that should be present near the stations. Possible values: `hotel`, `shopping`, `bathroom`, `supermarket`, `playground`, `pharmacy`, `museum`, `coffee`, `park`, `restaurant`.",
      "type": {
        "kind": "SCALAR",
        "name": "[String]",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    },
    {
      "name": "availableOnly",
      "description": "An optional flag that will return only available (`status: free`) stations.",
      "type": {
        "kind": "SCALAR",
        "name": "Boolean",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    },
    {
      "name": "preferredOperator",
      "description": "An optional flag that will filter stations by a pre-defined preferred operator.",
      "type": {
        "kind": "SCALAR",
        "name": "Boolean",
        "ofType": null
      },
      "defaultValue": null,
      "isDeprecated": false
    }
  ],
  "isDeprecated": false,
  "deprecationReason": null
}

axios.post(process.env.CHARGETRIP_API_URL, {
  variables: {},
    query: getIntrospectionQuery({ descriptions: true })
}).then(({ data: { data: { __schema: { types } } } }) => {
  for (let type of types) {
    if(type.name === 'Query') {
      type = {
        ...type,
        fields: [
          ...type.fields,
          tileFilter
        ]
      }
    }

    fs.writeFile(
      `static/schema/${type.name}.json`,
      JSON.stringify(type, null, 2),
      (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log('Type file written!')
      }
    )
  }
})
