/* eslint-disable */
const fs = require('fs')
const path = require('path')
const flags = require('flags');
flags.defineString('dotenv')
flags.parse();

const dotenv = require('dotenv')
dotenv.config()
dotenv.config({path: '.env.local'});
if (flags.get('dotenv')) {
  dotenv.config({path: flags.get('dotenv') || ".env"})
}
const axios = require('axios')

let accessToken = '';

const login = async () => {
  const {
    data: { access_token },
  } = await axios.post(
    process.env.CHARGETRIP_MGT_LOGIN_URL,
    {
      email: process.env.CHARGETRIP_MGT_EMAIL,
      password: process.env.CHARGETRIP_MGT_PASSWORD
    }
  );

  return access_token
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
      query: 'query { carList(query: {status: public}, size: 1000) { id naming {model make version chargetrip_version edition } }}',
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
    throw new Error("Can't fetch errors", JSON.stringify(e));
  }
}

main()
