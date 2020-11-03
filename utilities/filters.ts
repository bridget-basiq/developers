import Vue from 'vue'
import { format } from 'date-fns'
import marked from 'marked'

Vue.filter('date', (value: Date | string, formatStr: string) => {
  return format(value instanceof Date ? value : new Date(value), formatStr)
})
Vue.filter('number', (value: number, locale = 'nl-NL') => {
  return value.toLocaleString(locale)
})
Vue.filter('markdown', (value: string) => {
  try {
    return marked(value)
  } catch (e) {
    return value
  }
})

Vue.filter('colorType', (value: string = '') => {
  const lowerCase = value.toLowerCase()

  switch (lowerCase) {
    case 'enum':
      return `<span class="text-note">${value}</span>`
    case 'string':
      return `<span class="text-warning">${value}</span>`
    case 'float':
      return `<span class="text-success">${value}</span>`
    case 'int':
      return `<span class="text-success">${value}</span>`
    case 'id':
      return `<span class="text-error">${value}</span>`
    default:
      return value
  }
})
