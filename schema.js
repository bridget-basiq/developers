/* eslint-disable */
const fetch = require('cross-fetch').fetch
const fs = require('fs')
const { getIntrospectionQuery } = require('graphql')
const API = 'https://api.chargetrip.io/graphql'

fetch(API, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: true }),
  }),
}
  .then((result) => result.json())
  .then((res) => {
    const { data } = res
    for (const type of data.__schema.types) {
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
)
