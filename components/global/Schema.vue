<template>
  <div class="schema my-8 pl-10">
    <section v-for="(section, i) in sections" :key="i" class="mb-12 last:mb-0">
      <h2 :id="section.id">{{ section.title }}</h2>
      <div class="mt-3">
        <Property
          v-for="(item, c) in section.items"
          :key="`${i}-${c}`"
          :show-required="!i"
          :initial-active="i < 2"
          v-bind="item"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import Property from '~/components/Property.vue'
import { slugify } from '~/utilities/project.functions'
import { OfTypeKind } from '~/utilities/constants'
@Component({
  components: { Property },
})
export default class Schema extends Vue {
  @Getter querySchema
  @Getter sideNav
  @Prop() name
  schema: any = null
  @Prop({ default: [] }) frequent!: string[]
  requestParameters: any[] = []

  get sections() {
    return [
      {
        title: 'Request parameters',
        items: this.requestParameters,
      },
      {
        title: 'Frequently used attributes',
        items: this.frequentlyUsedAttributes,
      },
      {
        title: 'Other attributes',
        items: this.attributes,
      },
    ].map((section) => ({ ...section, id: slugify(section.title) }))
  }

  get frequentlyUsedAttributes() {
    return this.schema?.fields?.filter((field) =>
      this.frequent.includes(field.name)
    )
  }

  get attributes() {
    return this.schema?.fields?.filter(
      (field) => !this.frequent.includes(field.name)
    )
  }

  @Watch('name', { immediate: true }) async onNameChange() {
    if (!this.querySchema) return

    const args = this.querySchema?.fields?.find(
      (field) => field.name === this.camelCaseName
    )?.args

    this.requestParameters = await this.appendOfType(args)
  }

  get camelCaseName() {
    return this.name.slice(0, 1).toLowerCase() + this.name.slice(1)
  }

  get pascalCaseName() {
    return this.name.slice(0, 1).toUpperCase() + this.name.slice(1)
  }

  appendOfType(fields) {
    return Promise.all(
      fields?.map(async (field) => {
        if (
          !(
            field.type?.ofType?.name ||
            field.type.kind === OfTypeKind.ENUM ||
            field.type.kind === OfTypeKind.OBJECT ||
            field.type.kind === OfTypeKind.INPUT_OBJECT
          )
        ) {
          return field
        }

        const ofType: any = await this.$axios.get(
          `/schema/${field.type?.ofType?.name || field.type.name}.json`
        )

        if (ofType?.fields) {
          ofType.fields = await this.appendOfType(ofType.fields)
        }

        return {
          ...field,
          type: {
            ...field.type,
            ofType,
          },
        }
      })
    )
  }

  async fetch() {
    const schema: any = await this.$axios.get(
      `/schema/${this.pascalCaseName}.json`
    )

    if (schema?.fields) {
      schema.fields = await this.appendOfType(schema.fields)
    }

    this.schema = schema
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
