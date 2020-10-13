import Vuex from 'vuex'
import Main from './modules/root'

const getCookie = (str, key) =>
  Object.fromEntries(str.split(/; */).map((cookie) => cookie.split('=', 2)))[
    key
  ]

const getH2Children = (page) => {
  const arr: any = []

  page.children.forEach((child) => {
    if (child.tag === 'h2') {
      arr.push(child)
    } else if (child.children) {
      arr.push(...getH2Children(child))
    }
  })
  return arr
}
export default () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ commit }, { $content, req }) {
        const pages = await $content('').sortBy('order').fetch()

        if (req?.headers?.cookie) {
          const darkMode = getCookie(req.headers.cookie, 'dark_mode')
          commit(
            'setDarkMode',
            darkMode === undefined ? true : darkMode === 'true'
          )
        }

        commit(
          'setSideNav',
          pages.map((page) => ({
            title: page.title,
            to: `/${page.slug}`,
            children: getH2Children(page.body).map((child) => ({
              to: `/${page.slug}`,
              hash: child.props.id,
              title: child.children[1].value,
            })),
          }))
        )
      },
    },
    modules: {
      root: Main,
    },
  })
