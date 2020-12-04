<template>
  <div class="schema my-12 lg:pl-10">
    <section
      v-for="(section, i) in sections"
      :key="i"
      class="mb-12 last:mb-0"
      :class="section.id"
    >
      <h3 :id="section.id">{{ section.title }}</h3>
      <div class="mt-3">
        <Property
          v-for="(item, c) in section.items"
          :key="`${i}-${c}`"
          :section-id="section.id"
          :show-required="!i"
          :initial-active="i < 2"
          v-bind="item"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { toSnakeCase } from 'js-convert-case/lib'
import Property from '~/components/Property.vue'

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
    return [
      {
        title: 'Arguments',
        items: this.requestParameters,
      },
      {
        title: 'Frequently used fields',
        items: this.frequentlyUsedAttributes,
      },
      {
        title: 'Other fields',
        items: this.attributes,
      },
    ]
      .filter((section) => section?.items?.length)
      .map((section) => ({ ...section, id: toSnakeCase(section.title) }))
  }

  get frequentlyUsedAttributes() {
    return this.returnFields?.filter((field) =>
      this.frequent.includes(field.name)
    )
  }

  get attributes() {
    return this.returnFields?.filter(
      (field) => !this.frequent.includes(field.name)
    )
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
