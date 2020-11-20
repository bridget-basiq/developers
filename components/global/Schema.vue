<template>
  <div class="schema my-8 lg:pl-10">
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
          :section-i-d="section.id"
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
  @Prop() name
  schema: any = null
  @Prop({ default: [] }) frequent!: string[]
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
    ].map((section) => ({ ...section, id: toSnakeCase(section.title) }))
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

  get camelCaseName() {
    return this.name.slice(0, 1).toLowerCase() + this.name.slice(1)
  }

  get pascalCaseName() {
    return this.name.slice(0, 1).toUpperCase() + this.name.slice(1)
  }

  get ofTypeKinds() {
    return Object.keys(OfTypeKind)
  }

  appendOfType(fields) {
    return Promise.all(
      fields?.map(async (field) => {
        const typeStr =
          field.type.kind === 'SCALAR'
            ? field.type?.name
            : field.type?.kind === 'INPUT_OBJECT'
            ? null
            : field.type?.kind

        const required = typeStr === 'NON_NULL'

        if (
          !(
            field.type?.ofType?.name ||
            field.type.kind === OfTypeKind.ENUM ||
            field.type.kind === OfTypeKind.OBJECT ||
            field.type.kind === OfTypeKind.INPUT_OBJECT
          )
        ) {
          return {
            ...field,
            typeStr,
            required,
          }
        }

        const ofType: any = await this.getJson(
          field.type?.ofType?.name || field.type.name
        )

        if (ofType?.fields) {
          ofType.fields = await this.appendOfType(ofType.fields)
        }

        const typeName = (ofType?.name || field.type?.name || '').replace(
          'Query',
          ''
        )
        const showOfTypeKind = this.ofTypeKinds.includes(ofType?.kind)

        return {
          ...field,
          showOfTypeKind,
          typeStr,
          typeName,
          required,
          children: ofType.fields || ofType.enumValues || ofType.inputFields,
          type: {
            ...field.type,
            ofType,
          },
        }
      })
    )
  }

  async getJson(name) {
    const json = await import(`~/static/schema/${name}.json`)

    return json.default
  }

  async fetch() {
    const { fields }: any = await this.getJson('Query')

    this.schema = fields.find((field) => field.name === this.name)

    const name = this.schema.type?.name || this.schema.type?.ofType?.name

    const [requestParams, json] = await Promise.all([
      this.appendOfType(this.schema?.args),
      this.getJson(name),
    ])

    this.requestParameters = requestParams
    this.returnFields = await this.appendOfType(json.fields)
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
