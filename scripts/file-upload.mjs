import { writeFileSync, readFileSync } from 'fs'
import dotenv from 'dotenv'
import { SiteClient } from 'datocms-client'
import * as chokidar from 'chokidar'
import consola from 'consola'
import imagemin from 'imagemin'
import imageminPngquant from 'imagemin-pngquant'

dotenv.config()
const logger = consola.withScope(process.env.LOG_SCOPE)
const client = new SiteClient(process.env.DATO_API_KEY)
const actions = {
  CREATE: 'CREATE',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
}
const allowedFormats = process.env?.ALLOWED_FORMATS?.split(',') || []
const watcher = chokidar.watch('static', {
  ignored: /^\./,
  persistent: true,
})

logger.success('Watching the following formats', process.env.ALLOWED_FORMATS)

let map

try {
  map = JSON.parse(readFileSync('./file-map.json', 'utf8'))
} catch (e) {
  map = {}
}

const normalizePath = (path) => path.replace('static', '')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onChange = async (fullPath, stats, action) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const [_, ext] = fullPath.split('.')

  if (allowedFormats.includes(ext) && !fullPath.includes('/compressed/')) {
    const normalizedPath = normalizePath(fullPath)

    const id = map[normalizedPath]?.id

    if (action === actions.REMOVE) {
      if (id) {
        await client.uploads.destroy(id)
        logger.info('File', normalizedPath, 'has been removed')

        delete map[normalizedPath]
      }
    }

    if (action === actions.CREATE) {
      if (!id) {
        let destinationPath = fullPath

        if (ext === 'png') {
          const response = await imagemin([fullPath], {
            destination: 'static/compressed/',
            plugins: [
              imageminPngquant({
                quality: [0.9, 1],
              }),
            ],
          })

          if (!response) return

          destinationPath = response[0].destinationPath
        }

        const path = await client.createUploadPath(destinationPath, {
          filename: normalizedPath.split('/').join('-'),
        })
        map[normalizedPath] = await client.uploads.create({
          path,
        })
        logger.info('File', normalizedPath, 'has been created')
      }
    }

    if (action === actions.UPDATE) {
      if (id) {
        await onChange(fullPath, stats, actions.REMOVE)
        await onChange(fullPath, stats, actions.CREATE)

        logger.info('File', normalizedPath, 'has been updated')
      }
    }

    return writeFileSync('./file-map.json', JSON.stringify(map))
  }
}

watcher
  .on('add', (path, stats) => onChange(path, stats, actions.CREATE))
  .on('change', (path, stats) => onChange(path, stats, actions.UPDATE))
  .on('unlink', (path, stats) => onChange(path, stats, actions.REMOVE))
