<template>
  <div class="schema my-8 pl-10">
    <section v-for="(section, i) in sections" :key="i" class="mb-12 last:mb-0">
      <h2>{{ section.title }}</h2>
      <div class="mt-3">
        <Property
          v-for="(item, c) in section.items"
          :key="`${i}-${c}`"
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
@Component({
  components: { Property },
})
export default class Schema extends Vue {
  @Getter querySchema
  @Prop() name
  schema: any = null
  @Prop({ default: [] }) frequent!: string[]

  @Watch('attributes') onAttributesChange() {
    console.log(this.attributes)
  }

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
    ]
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

  get requestParameters() {
    return this.querySchema.fields.find(
      (field) => field.name === this.camelCaseName
    )?.args
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
            field.type.kind === 'ENUM' ||
            field.type.kind === 'OBJECT'
          )
        ) {
          return field
        }

        const ofType: any = await this.$axios
          .get(`/schema/${field.type?.ofType?.name || field.type.name}.json`)
          .catch(console.log)

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
    const schema: any = await this.$axios
      .get(`/schema/${this.pascalCaseName}.json`)
      .catch(console.log)

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
