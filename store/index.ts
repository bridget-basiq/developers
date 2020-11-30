import Vuex from 'vuex'
import { toSnakeCase } from 'js-convert-case/lib'
import cookie from 'cookie'
import Main from './modules/root'
import { slugify } from '~/utilities/project.functions'

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
    } else if (
      child.tag === 'release-note' ||
      child.tag === 'guides' ||
      child.tag === 'examples' ||
      child.tag === 'accordion'
    ) {
      arr.push({
        ...(child.tag === 'release-note' && { inset: false }),
        title: child.props.title,
        props: {
          id: slugify(
            child.tag === 'release-note'
              ? `release.${child.props.title}`
              : child.props.title
          ),
        },
      })
    } else if (child.children) {
      arr.push(...getH2Children(child))
    }
  })
  return arr
}

const getObj = (list, arr) => {
  arr.forEach((p) => {
    list = list.children.find((i) => i.path === p.split('+').pop())
  })

  return list
}

const orderTree = (arr) => {
  arr?.sort((a, b) => a.order - b.order)

  arr?.forEach((child) => {
    if (child.children) {
      orderTree(child.children)
    }
  })

  return arr
}
const getSideNav = (pages) => {
  const sideNav = pages.reduce(
    (tree, page) => {
      const pathParts = page.path.split('/').slice(1)

      let fullPath = ''

      let obj = tree

      pathParts.forEach((p, i) => {
        obj = getObj(tree, pathParts.slice(0, i))

        let [order, path] = p.split('+')

        fullPath += `/${path}`
        path = path || p

        if (pathParts.length - 1 === i) {
          const to = page.path
            .split('/')
            .map((part) => part.split('+').pop())
            .join('/')

          obj.children.push({
            to,
            order: page.order,
            icon: page.icon,
            title: page.title,
            ...(page.slug === 'home' && { hideChildren: true }),
            children: getH2Children(page.body).map((child) => ({
              to,
              hash: child.props.id,
              inset: child.inset,
              title: child.title || child.children[1].value,
            })),
          })
        } else if (!obj.children.find((child) => child.path === path)) {
          obj.children.push({
            order: parseInt(order),
            path,
            fullPath,
            children: [],
            title: path.replace(new RegExp('-', 'g'), ' '),
          })
        }
      })

      return tree
    },
    { children: [] }
  ).children

  return orderTree(sideNav)
}

export default () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ commit }, args) {
        const { $content, ssrContext } = args

        const cookies = cookie.parse(ssrContext?.req?.headers?.cookie || '')
        const darkMode = cookies.dark_mode

        commit('setDarkMode', darkMode ? darkMode === 'true' : true)

        const pages = await $content('', { deep: true }).fetch()

        commit('setDirs', $content.database.dirs)

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
