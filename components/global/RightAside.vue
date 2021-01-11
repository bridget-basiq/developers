<template>
  <div
    class="right-aside fixed border-l border-alt right-0 bg-body h-full z-40 hidden xl:block"
    :class="{ large: large }"
  >
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class RightAside extends Vue {
  @Prop() large
}
</script>
<style lang="scss">
.right-aside {
  top: 34px;
  width: 480px;

  &.large {
    width: 512px;
  }
}
</style>
