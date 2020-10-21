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

const getObj = (list, arr) => {
  arr.forEach((p) => {
    list = list.children.find((i) => i.path === p)
  })

  return list
}

const getSideNav = (pages) =>
  pages.reduce(
    (tree, page) => {
      const path = page.path.split('/').slice(1)

      let obj = tree

      path.forEach((p, i) => {
        obj = getObj(tree, path.slice(0, i))

        if (path.length - 1 === i) {
          obj.children.push({
            to: page.path,
            icon: page.icon,
            title: page.title,
            children:
              page.slug === 'home'
                ? []
                : getH2Children(page.body).map((child) => ({
                    to: page.path,
                    hash: child.props.id,
                    title: child.children[1].value,
                  })),
          })
        } else if (!obj.children.find((child) => child.path === p)) {
          obj.children.push({
            path: p,
            children: [],
            title: p
              .split('-')
              .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1))
              .join(' '),
          })
        }
      })

      return tree
    },
    { children: [] }
  ).children

export default () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ commit }, { $content, req }) {
        const pages = await $content('', { deep: true }).sortBy('order').fetch()

        if (req?.headers?.cookie) {
          const darkMode = getCookie(req.headers.cookie, 'dark_mode')
          commit(
            'setDarkMode',
            darkMode === undefined ? true : darkMode === 'true'
          )
        }

        commit('setSideNav', getSideNav(pages))
      },
    },
    modules: {
      root: Main,
    },
  })
