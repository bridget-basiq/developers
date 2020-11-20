export const slugify = (str) =>
  str.trim().replace(new RegExp('\\s+', 'g'), '-').toLowerCase()

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
