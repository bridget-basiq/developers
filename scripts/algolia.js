/* eslint-disable no-console */
require('dotenv').config()
const fs = require('fs')
const { join } = require('path')
const { toSentenceCase } = require('js-convert-case')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_SECRET_KEY
)
const index = client.initIndex('items')
const distPath = join(process.cwd(), 'dist')
const { JSDOM } = require('jsdom')
const propertySections = [
  'request_parameters',
  'frequently_used_attributes',
  'other_attributes',
]

async function getEntries(path) {
  const dom = new JSDOM(await fs.readFileSync(path, 'utf-8'))
  const url = path.replace(distPath, '').replace('/index.html', '')
  const h1 = dom.window.document.body.querySelector('h1')?.textContent

  const entries = await Promise.all([
    getPage({ url, dom, h1 }),
    ...getProperties({ url, dom, h1 }),
  ])

  return await Promise.all(
    entries.map(async (entry) => {
      const response = await index
        .findObject((hit) => hit.url === entry.url, {})
        .catch(() => {
          console.log(
            `ObjectID for ${entry.url} not found. Will create new entry`
          )
        })

      if (response?.object?.objectID) {
        return {
          ...entry,
          objectID: response.object.objectID,
        }
      }

      return entry
    })
  )
}

function getProperties({ dom, url }) {
  const arr = []

  propertySections.map((section) => {
    const sectionEl = dom.window.document.querySelector(`.${section}`)

    if (sectionEl) {
      sectionEl.querySelectorAll('.property').forEach((property) => {
        arr.push({
          type: 'property',
          url: `${url}#${property.getAttribute('id')}`,
          title: property.querySelector('.title')?.textContent?.trim(),
          description: property
            .querySelector('.description')
            ?.textContent?.trim(),
        })
      })
    }
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

  const splitPath = url.split('/')

  const obj = {
    title,
    description,
    type: 'page',
    h1,
    h2: h2.join(', '),
    url,
  }

  if (splitPath[splitPath.length - 3]) {
    obj.parent = toSentenceCase(splitPath[splitPath.length - 3])
  }

  return obj
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
