export const slugify = (str) =>
  str.trim().replace(new RegExp('\\s+', 'g'), '-').toLowerCase()
