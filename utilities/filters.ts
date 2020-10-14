import Vue from 'vue'
import { format } from 'date-fns'
import * as showdown from 'showdown'
const converter = new showdown.Converter()

Vue.filter('date', (value: Date | string, formatStr: string) => {
  return format(value instanceof Date ? value : new Date(value), formatStr)
})
Vue.filter('number', (value: number, locale = 'nl-NL') => {
  return value.toLocaleString(locale)
})
Vue.filter('markdown', (value: string) => {
  try {
    return converter.makeHtml(value)
  } catch (e) {
    return value
  }
})
