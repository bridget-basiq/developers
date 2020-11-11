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
const index = client.initIndex('pages')
const distPath = join(process.cwd(), 'dist')
const { JSDOM } = require('jsdom')

async function getIndices(path, ignore = true) {
  const dir = await fs.readdirSync(path)

  const arr = await Promise.all(
    dir.map(async (fileOrDir) => {
      const url = join(path, fileOrDir)
      const isDir = fs.lstatSync(url).isDirectory()

      if (fileOrDir === 'index.html' && !ignore) {
        const dom = new JSDOM(await fs.readFileSync(url, 'utf-8'))
        const entryUrl = url.replace(distPath, '').replace('/index.html', '')
        const h2 = []
        const response = await index
          .findObject((hit) => hit.url === entryUrl, {})
          .catch(() => {
            console.log(
              `ObjectID for ${entryUrl} not found. Will create new entry`
            )
          })

        dom.window.document.body.querySelectorAll('h2').forEach((el) => {
          h2.push(el.textContent)
        })

        const path = entryUrl.split('/')

        const obj = {
          title: toSentenceCase(path[path.length - 1]),
          heading1: dom.window.document.body.querySelector('h1').textContent,
          heading2: h2.join(', '),
          html: dom.window.document.body.querySelector('.page').textContent,
          url: entryUrl,
        }

        if (path[path.length - 3]) {
          obj.parent = toSentenceCase(path[path.length - 3])
        }

        if (response && response.object && response.object.objectID) {
          obj.objectID = response.object.objectID
        }

        return obj
      }
      if (isDir) {
        return getIndices(url, false).catch(console.log)
      }

      return null
    })
  )

  return arr.flat(99).filter((x) => x)
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
