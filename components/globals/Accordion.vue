<template>
  <div class="accordion my-14 last:mb-0">
    <h2 :id="id">
      {{ title }}
    </h2>
    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { slugify } from '~/utilities/project.functions'

@Component
export default class Accordion extends Vue {
  @Prop() title
  @Prop() description

  get id() {
    return slugify(this.title)
  }
}
</script>
