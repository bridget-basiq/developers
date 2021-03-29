<template>
  <img
    :class="{
      'max-w-sm': maxWidth === 'sm',
      'max-w-md': maxWidth === 'md',
      'max-w-lg': maxWidth === 'lg',
      'max-w-full': maxWidth === 'full',
    }"
    :src="normalizedSrc"
    :alt="alt"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component({ name: 'c-image' })
export default class CImage extends Vue {
  @Prop() src
  @Prop() alt
  @Prop() maxWidth
  @Getter darkMode

  get normalizedSrc() {
    return `${this.darkMode ? 'dark' : 'light'}-${this.src}`
  }
}
</script>
