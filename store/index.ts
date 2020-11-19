import Vuex from 'vuex'
import { toSentenceCase, toSnakeCase } from 'js-convert-case/lib'
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
          'Arguments',
          'Frequently used fields',
          'Other fields',
        ].map((title) => ({ title, props: { id: toSnakeCase(title) } }))
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
      async nuxtServerInit({ commit }, { $content, req }) {
        const pages = await $content('', { deep: true }).sortBy('order').fetch()

        if (req?.headers?.cookie) {
          const cookie = getCookie(req.headers.cookie, 'dark_mode')

          commit(
            'setDarkMode',
            cookie
              ? cookie === 'true'
              : !!window?.matchMedia('(prefers-color-scheme: dark)')?.matches
          )
        }

        if (pages) {
          const sideNav = await getSideNav(pages)
          commit('setSideNav', sideNav)
        }
      },
    },
    modules: {
      root: Main,
    },
  })
