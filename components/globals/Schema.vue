<template>
  <div
    class="schema my-14"
    :data-type="type"
    :data-name="name"
    :data-hidden="hidden"
    :data-frequent="frequent"
  >
    <section
      v-for="(section, i) in sections"
      :key="i"
      class="mb-12 last:mb-0"
      :class="section.id"
    >
      <h2 :id="section.id">{{ section.title }}</h2>
      <div class="mt-3">
        <Property
          v-for="(item, c) in section.items"
          :key="`${i}-${c}`"
          :show-required="!i"
          v-bind="item"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Property from '~/components/Property.vue'
import {
  getAttributes,
  getFrequentlyUsedAttributes,
  getSections,
} from '~/utilities/schema-utils'

@Component({
  components: { Property },
})
export default class Schema extends Vue {
  @Prop({ default: 'Query' }) type
  @Prop() name
  schema: any = null
  @Prop({ default: () => [] }) frequent!: string[]
  @Prop({ default: () => [] }) hidden!: number[]
  requestParameters: any[] = []
  returnFields: any = []

  get sections() {
    return getSections({
      requestParameters: this.requestParameters,
      frequentlyUsedAttributes: getFrequentlyUsedAttributes(
        this.returnFields,
        this.frequent
      ),
      attributes: getAttributes(this.returnFields, this.frequent),
    })
  }

  async getJson() {
    const json = await import(
      `~/static/schema/${this.type}-${this.name}.json`
    ).catch(console.log)

    return json.default
  }

  async fetch() {
    const schema: any = await this.getJson()

    this.requestParameters = schema.args
    this.returnFields = schema?.fields || []
  }
}
</script>
<style lang="scss">
.schema {
  h2 {
    @apply text-16;
  }
}
</style>
