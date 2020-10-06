import Vue from 'vue'
import { Button } from '@chargetrip/internal-vue-components'
import CodeBlock from '~/components/CodeBlock.vue'
import Table from '~/components/Table.vue'
import Step from '~/components/Step.vue'
import StepNote from '~/components/StepNote.vue'

Vue.component('code-block', CodeBlock)
Vue.component('property-table', Table)
Vue.component('step', Step)
Vue.component('step-note', StepNote)
Vue.component('c-button', Button)
