import * as fs from 'fs'
import * as path from 'path'
import Vuex from 'vuex'
import Main from './modules/root'

const slugify = (str) =>
  str.trim().replace(new RegExp('\\s+', 'g'), '-').toLowerCase()

const getCookie = (str, key) =>
  Object.fromEntries(str.split(/; */).map((cookie) => cookie.split('=', 2)))[
    key
  ]

const getSideNav = async () => {
  const pagesPath = path.join(process.cwd(), 'pages')
  const pages = await fs.readdirSync(pagesPath)

  const sideNav = await Promise.all(
    pages
      .filter((page) => page.split('.')[1] === 'mdx')
      .map(async (mdx) => {
        const file = await fs.readFileSync(path.join(pagesPath, mdx), 'utf8')

        const h1 = file.match(new RegExp('^#(?!#)(.*)', 'g'))
        const to = mdx.slice(0, -4)
        const normalizedH1 = h1
          ? h1[0].replace('#', '')
          : to
              .split('-')
              .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
              .join(' ')

        const order = file.match(new RegExp('(?:order:)(.*)', 'gm'))

        return {
          title: normalizedH1.trim(),
          to,
          order: order?.length
            ? parseInt((order![0] || '').replace(/\D/g, ''))
            : 99,
          children: file
            .match(new RegExp('#{2}(?!#)(.*)', 'g'))
            ?.map((header) => ({
              title: header.replace('##', ''),
              hash: slugify(header.replace('##', '')),
              to,
            })),
        }
      })
  )

  return sideNav.sort((a, b) => a.order - b.order)
}
export default () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ commit }, { req }) {
        if (req?.headers?.cookie) {
          const darkMode = getCookie(req.headers.cookie, 'dark_mode')
          commit(
            'setDarkMode',
            darkMode === undefined ? true : darkMode === 'true'
          )
        }
        commit('setSideNav', await getSideNav())
      },
    },
    modules: {
      root: Main,
    },
  })
