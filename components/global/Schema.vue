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
import { OfTypeKind } from '~/utilities/constants'

@Component({
  components: { Property },
})
export default class Schema extends Vue {
  @Prop({ default: 'Query' }) type
  @Prop() name
  schema: any = null
  @Prop({ default: () => [] }) frequent!: string[]
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

  get ofTypeKinds() {
    return Object.keys(OfTypeKind)
  }

  appendOfType(fields, allowRequired = false) {
    return Promise.all(
      fields?.map(async (field) => {
        const returnField = {
          ...field,
          children: [],
        }

        if (!field.type) return returnField

        const typeStr =
          field.type.kind === 'SCALAR'
            ? field.type?.name
            : field.type?.kind === 'INPUT_OBJECT'
            ? null
            : field.type?.kind

        const required = allowRequired && typeStr === 'NON_NULL'

        if (
          !(
            field.type?.ofType?.name ||
            field.type.kind === OfTypeKind.ENUM ||
            field.type.kind === OfTypeKind.OBJECT ||
            field.type.kind === OfTypeKind.INPUT_OBJECT
          )
        ) {
          return {
            ...returnField,
            typeStr,
            required,
          }
        }

        const typeName = this.getOfTypeName(field)

        const json: any = typeName ? await this.getJson(typeName) : null

        const normalizedTypeName = (typeName || '').replace('Query', '')
        const showOfTypeKind = this.ofTypeKinds.includes(json?.kind)
        const children = await this.appendOfType(
          json?.fields || json?.enumValues || json.inputFields || [],
          allowRequired
        )

        return {
          ...returnField,
          showOfTypeKind,
          typeStr,
          typeName: normalizedTypeName,
          required,
          children,
        }
      })
    )
  }

  async getJson(name) {
    const json = await import(`~/static/schema/${name}.json`).catch(console.log)

    return json.default
  }

  getOfTypeName(item) {
    let type = item?.type
    let name = item?.type?.name

    while (type) {
      type = type.ofType

      if (type) {
        name = type.name
      }
    }

    return name
  }

  async fetch() {
    const { fields }: any = await this.getJson(this.type)
    this.schema = fields.find((field) => field.name === this.name)

    const name = this.getOfTypeName(this.schema)

    const [requestParams, json] = await Promise.all([
      this.appendOfType(this.schema?.args, true),
      name ? this.getJson(name) : null,
    ])

    this.requestParameters = requestParams

    if (json?.fields) {
      this.returnFields = await this.appendOfType(json.fields)
    }
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
