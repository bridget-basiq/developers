/* eslint-disable */
const fetch = require('cross-fetch').fetch
const fs = require('fs')
const { getIntrospectionQuery } = require('graphql')
require('dotenv').config()
const axios = require('axios')


axios.post(process.env.CHARGETRIP_API_URL, {
  variables: {},
    query: getIntrospectionQuery({ descriptions: true })
}).then(({ data: { data: { __schema: { types } } } }) => {
  for (const type of types) {
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
