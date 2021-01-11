import { toSnakeCase } from 'js-convert-case/lib'

export const getHeadings = (children, page) => {
  const arr: any = []

  children.forEach((child) => {
    if (child.tag === 'h2') {
      arr.push(child)
    } else if (child.tag === 'schema') {
      arr.push(
        ...[
          { title: 'Arguments', id: 'arguments' },
          { title: 'Frequently used fields', id: 'frequent' },
          { title: 'Other fields', id: 'other' },
        ]
          .filter((item) => !page[child.props[':hidden']]?.includes(item.id))
          .map(({ title }) => ({
            title,
            props: { id: toSnakeCase(title) },
          }))
      )
    } else if (
      child.tag === 'release-note' ||
      child.tag === 'article-teaser-section' ||
      child.tag === 'guides' ||
      child.tag === 'accordion'
    ) {
      arr.push({
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
      arr.push(...getHeadings(child.children, page))
    }
  })
  return arr
}

export const slugify = (str) =>
  str
    .trim()
    .replace(new RegExp('-', 'g'), '')
    .replace(/\./g, '-')
    .replace(new RegExp('\\s+', 'g'), '-')
    .toLowerCase()

export const copy = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const getFileByPath = (path, dirs) => {
  const splitPath = path.split('/')
  const slug = splitPath.slice(-1)[0]
  const dir =
    dirs[
      dirs
        .map((dir) =>
          dir
            .split('/')
            .map((part) => part.split('+').pop())
            .join('/')
        )
        .indexOf(splitPath.slice(0, -1).join('/'))
    ]

  return `${dir || ''}/${slug}`
}
