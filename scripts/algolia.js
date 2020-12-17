/* eslint-disable no-console */

require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_SECRET_KEY
)
const index = client.initIndex('prod_DeveloperPortalContent')
const distPath = join(process.cwd(), 'dist')
const { JSDOM } = require('jsdom')
const {
  getAttributes,
  getFrequentlyUsedAttributes,
  getSections,
} = require('../utilities/schema-utils')

async function getEntries(path) {
  const dom = new JSDOM(await fs.readFileSync(path, 'utf-8'))
  const url = path.replace(distPath, '').replace('/index.html', '')
  const h1 = dom.window.document.body.querySelector('h1')?.textContent

  return [getPage({ url, dom, h1 }), ...(await getProperties({ url, dom }))]
}

async function getProperties({ dom, url }) {
  const arr = []

  const schemaEl = dom.window.document.querySelector('.schema')

  if (!schemaEl) return arr

  const schemaName = schemaEl.getAttribute('data-name')
  const schemaType = schemaEl.getAttribute('data-type')
  const frequent = schemaEl.getAttribute('data-frequent').split(',')

  const schema = JSON.parse(
    await fs.readFileSync(
      join(
        process.cwd(),
        'static',
        'schema',
        `${schemaType}-${schemaName}.json`
      ),
      'utf8'
    )
  )

  const requestParameters = schema.args
  const returnFields = schema?.fields || []

  const sections = getSections({
    requestParameters,
    frequentlyUsedAttributes: getFrequentlyUsedAttributes(
      returnFields,
      frequent
    ),
    attributes: getAttributes(returnFields, frequent),
  })

  const properties = sections
    .map((section) =>
      flatProperties(section.items).map((property) => {
        const fullUrl = `${url}#${property.propertyId}`
        return {
          type: 'property',
          title: property.name,
          objectID: fullUrl,
          description: property.description,
          url: fullUrl,
        }
      })
    )
    .flat()

  return properties
}

const flatProperties = (items) => {
  const arr = []

  items.forEach((item) => {
    arr.push(item)

    arr.push(...flatProperties(item.children))
  })

  return arr
}

function getPage({ url, dom, h1 }) {
  const h2 = []

  dom.window.document.body.querySelectorAll('h2').forEach((el) => {
    h2.push(el.textContent)
  })

  const title = dom.window.document
    .querySelector("meta[name='og:title']")
    ?.getAttribute('content')

  const description = dom.window.document
    .querySelector("meta[name='og:description']")
    ?.getAttribute('content')

  return {
    title,
    description,
    type: 'page',
    h1,
    h2: h2.join(', '),
    url,
    objectID: url,
  }
}

async function getIndices(path, ignore = true) {
  const arr = []
  const dir = await fs.readdirSync(path)

  await Promise.all(
    dir.map(async (fileOrDir) => {
      const url = join(path, fileOrDir)
      const isDir = fs.lstatSync(url).isDirectory()

      if (fileOrDir === 'index.html' && !ignore) {
        arr.push(...(await getEntries(url)))
      }

      if (isDir) {
        arr.push(...(await getIndices(url, false).catch(console.log)))
      }

      return null
    })
  )

  return arr
}

async function pagesToAlgolia() {
  const pages = (await getIndices(distPath).catch(console.log)) || []

  if (pages) {
    index
      .saveObjects(pages, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .then(({ objectIDs }) => {
        console.log(objectIDs)
      })
      .catch(console.log)
  }
}

pagesToAlgolia()
