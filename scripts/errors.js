/* eslint-disable */
const dotenv = require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
const path = require('path')

const main = async () => {
  try {
    const {
      // eslint-disable-next-line camelcase
      data: { access_token },
    } = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'password',
      username: process.env.AUTH0_USERNAME,
      password: process.env.AUTH0_PASSWORD,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
    })
    const {
      data: {
        data: { exceptionList },
      },
    } = await axios.post(
      process.env.CHARGETRIP_MGT_API_URL,
      {
        query: 'query { exceptionList { message code operation type }}',
      },
      {
        headers: {
          // eslint-disable-next-line camelcase
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    if (!exceptionList) return

    const groupedExceptionList = exceptionList.reduce(
      (groups, { operation, code, message }) => {
        if (!groups[operation]) {
          groups[operation] = []
        }

        groups[operation].push({
          code,
          message,
        })

        return groups
      },
      {}
    )

    await Promise.all(
      Object.entries(groupedExceptionList).map(([key, value]) => {
        fs.writeFileSync(
          path.join(process.cwd(), `static/errors/${key}.json`),
          JSON.stringify(value)
        )
      })
    )
  } catch (e) {
    throw new Error("Can't fetch errors")
  }
}

main()
