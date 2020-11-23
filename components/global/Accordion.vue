<template>
  <div class="accordion my-14">
    <h2 :id="id">
      {{ title }}
    </h2>
    <p class="text-14 text-font-alt3">
      <strong>
        {{ description }}
      </strong>
    </p>
    <div class="mt-6">
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
