<template>
  <div class="release-note my-14">
    <div class="title-wrapper pb-4 border-b border-alt px-6 relative">
      <h2 class="mb-1">
        {{ title }}
      </h2>
      <p class="text-14 text-font-alt3">{{ date }}</p>
    </div>
    <div class="content text-14">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ReleaseNote extends Vue {
  @Prop() title
  @Prop() date
}
</script>
<style lang="scss">
.release-note {
  .title-wrapper {
    width: calc(100% + 48px);
    left: -24px;
  }
  .content {
    h3 {
      @apply mt-8;

      &:not(:first-child) {
        @apply mt-12;
      }
    }

    p {
      @apply my-4 text-font-alt3;

      strong {
        @apply block text-font-primary;
      }
    }
  }
}
</style>
