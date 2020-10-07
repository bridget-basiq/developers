import { format } from 'date-fns';
import { VueConstructor } from 'vue/types/vue';
import * as showdown from 'showdown';
const converter = new showdown.Converter();

export default (Vue: VueConstructor) => {
  Vue.filter('date', (value: Date | string, formatStr: string) => {
    return format(value instanceof Date ? value : new Date(value), formatStr);
  });
  Vue.filter('number', (value: number, locale = 'nl-NL') => {
    return value.toLocaleString(locale);
  });
  Vue.filter('markdown', (value: string) => {
    return converter.makeHtml(value);
  });
};
