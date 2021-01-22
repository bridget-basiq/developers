import { Button, Cell, Row } from '@chargetrip/internal-vue-components'
import Vue from 'vue'
import Image from '~/components/Image.vue'
import Table from '~/components/Table.vue'
import Note from '~/components/globals/Note.vue'
import ApiReferenceActions from '~/components/globals/ApiReferenceActions.vue'
import Accordion from '~/components/globals/Accordion.vue'
import AccordionItem from '~/components/globals/AccordionItem.vue'
import ArticleTeaser from '~/components/globals/ArticleTeaser.vue'
import ArticleTeaserSection from '~/components/globals/ArticleTeaserSection.vue'
import CodeBlock from '~/components/globals/CodeBlock.vue'
import Cta from '~/components/globals/Cta.vue'
import Error from '~/components/globals/Error.vue'
import Errors from '~/components/globals/Errors.vue'
import Example from '~/components/globals/Example.vue'
import Examples from '~/components/globals/Examples.vue'
import Guide from '~/components/globals/Guide.vue'
import Guides from '~/components/globals/Guides.vue'
import LatestUpdates from '~/components/globals/LatestUpdates.vue'
import Playground from '~/components/globals/Playground.vue'
import Premium from '~/components/globals/Premium.vue'
import PropertyTable from '~/components/globals/PropertyTable.vue'
import ReleaseNote from '~/components/globals/ReleaseNote.vue'
import Response from '~/components/globals/Response.vue'
import RightAside from '~/components/globals/RightAside.vue'
import Schema from '~/components/globals/Schema.vue'
import StatusTable from '~/components/globals/StatusTable.vue'
import Step from '~/components/globals/Step.vue'
import StepNote from '~/components/globals/StepNote.vue'
import Steps from '~/components/globals/Steps.vue'

Vue.component('c-button', Button)
Vue.component('c-table', Table)
Vue.component('c-row', Row)
Vue.component('c-cell', Cell)
Vue.component('c-image', Image)
Vue.component('accordion', Accordion)
Vue.component('api-reference-actions', ApiReferenceActions)
Vue.component('accordion-item', AccordionItem)
Vue.component('article-teaser', ArticleTeaser)
Vue.component('article-teaser-section', ArticleTeaserSection)
Vue.component('code-block', CodeBlock)
Vue.component('cta', Cta)
Vue.component('error', Error)
Vue.component('errors', Errors)
Vue.component('example', Example)
Vue.component('note', Note)
Vue.component('examples', Examples)
Vue.component('guide', Guide)
Vue.component('guides', Guides)
Vue.component('latest-updates', LatestUpdates)
Vue.component('playground', Playground)
Vue.component('premium', Premium)
Vue.component('property-table', PropertyTable)
Vue.component('release-note', ReleaseNote)
Vue.component('response', Response)
Vue.component('right-aside', RightAside)
Vue.component('schema', Schema)
Vue.component('status-table', StatusTable)
Vue.component('step', Step)
Vue.component('step-note', StepNote)
Vue.component('steps', Steps)
