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
