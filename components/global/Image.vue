<template>
  <img :src="normalizedSrc" :alt="alt" />
</template>
<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component
export default class Image extends Vue {
  @Prop() src
  @Prop() alt
  @Getter darkMode

  get normalizedSrc() {
    return `${this.darkMode ? 'dark-' : 'light-'}${this.src}`
  }
}
</script>
