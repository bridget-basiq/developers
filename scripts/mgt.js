/* eslint-disable */
const dotenv = require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
const path = require('path')

let accessToken = '';

const login = async () => {
  const {
    data: { access_token },
  } = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    grant_type: 'password',
    username: process.env.AUTH0_USERNAME,
    password: process.env.AUTH0_PASSWORD,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
  })

  return access_token;
}

const getExceptionList = async () => {
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
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return exceptionList.reduce(
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
  );
}

const getCarList = async () => {
  const {
    data: {
      data: { carList },
    },
  } = await axios.post(
    process.env.CHARGETRIP_MGT_API_URL,
    {
      query: 'query { carList(query: {status: public}) { id naming {model make version chargetrip_version edition } }}',
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return carList;
}
const main = async () => {
  try {

    accessToken = await login();

    const [exceptionList, carList] = await Promise.all([
      getExceptionList(),
      getCarList(),
    ]);


    await Promise.all(
      Object.entries(exceptionList).map(([key, value]) => {
        fs.writeFileSync(
          path.join(process.cwd(), `static/errors/${key}.json`),
          JSON.stringify(value)
        )
      }),
      fs.writeFileSync(
        path.join(process.cwd(), `static/carList.json`),
        JSON.stringify(carList)
      )
    )
  } catch (e) {
    throw new Error("Can't fetch errors")
  }
}

main()
