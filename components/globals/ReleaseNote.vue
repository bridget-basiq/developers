<template>
  <div
    class="release-note py-16 border-b border-alt last:border-0 relative px-12"
  >
    <div class="title-wrapper">
      <h2 :id="id" class="mb-1">
        {{ title }}
      </h2>
      <p class="text-14 text-font-alt3">{{ date }}</p>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { slugify } from '~/utilities/project.functions'

@Component
export default class ReleaseNote extends Vue {
  @Prop() title
  @Prop() date

  get id() {
    return `release-${slugify(this.title)}`
  }
}
</script>
<style lang="scss">
.release-note {
  width: calc(100% + 96px);
  left: -48px;

  .content {
    h3 {
      @apply mt-6 mb-2;
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
