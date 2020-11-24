<template>
  <img :class="`max-w-${maxWidth}`" :src="normalizedSrc" :alt="alt" />
</template>
<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component
export default class CImage extends Vue {
  @Prop() src
  @Prop() alt
  @Prop() maxWidth
  @Getter darkMode

  get normalizedSrc() {
    return `${this.darkMode ? 'dark-' : 'light-'}${this.src}`
  }
}
</script>
