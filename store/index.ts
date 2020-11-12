import Vuex from 'vuex'
import { toSentenceCase } from 'js-convert-case/lib'
import Main from './modules/root'
import { slugify } from '~/utilities/project.functions'

const getCookie = (str, key) =>
  Object.fromEntries(str.split(/; */).map((cookie) => cookie.split('=', 2)))[
    key
  ]

const getH2Children = (page) => {
  const arr: any = []

  page.children.forEach((child) => {
    if (child.tag === 'h2') {
      arr.push(child)
    } else if (child.tag === 'schema') {
      arr.push(
        ...[
          'Request parameters',
          'Frequently used attributes',
          'Other attributes',
        ].map((title) => ({ title, props: { id: slugify(title) } }))
      )
    } else if (child.tag === 'guides' || child.tag === 'examples') {
      arr.push({
        title: child.props.title,
        props: { id: slugify(child.props.title) },
      })
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

const getSideNav = (pages) => {
  return pages.reduce(
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
            hideChildren: page.slug === 'home',
            children: getH2Children(page.body).map((child) => ({
              to: page.path,
              hash: child.props.id,
              title: child.title || child.children[1].value,
            })),
          })
        } else if (!obj.children.find((child) => child.path === p)) {
          obj.children.push({
            path: p,
            children: [],
            title: toSentenceCase(p),
          })
        }
      })

      return tree
    },
    { children: [] }
  ).children
}

export default () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ commit }, { $content, $axios, req }) {
        const [pages, querySchema] = await Promise.all([
          $content('', { deep: true }).sortBy('order').fetch(),
          $axios.get('/schema/Query.json'),
        ]).catch(() => [])

        if (req?.headers?.cookie) {
          const darkMode = getCookie(req.headers.cookie, 'dark_mode')
          commit(
            'setDarkMode',
            darkMode === undefined ? true : darkMode === 'true'
          )
        }

        if (pages) {
          const sideNav = await getSideNav(pages)
          commit('setSideNav', sideNav)
        }

        if (querySchema) {
          commit('setQuerySchema', querySchema)
        }
      },
    },
    modules: {
      root: Main,
    },
  })
