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
