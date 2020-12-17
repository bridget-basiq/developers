<template>
  <a class="cta" @click="onClick">
    <slot />
  </a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Cta extends Vue {
  @Prop() action
  actions = {
    smallchat: () => window.Smallchat('open'),
  }

  onClick() {
    this.actions[this.action]?.()
  }
}
</script>
