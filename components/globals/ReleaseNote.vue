<template>
  <div
    class="release-note py-16 border-b border-alt last:border-0 relative last:pb-0"
  >
    <div class="title-wrapper">
      <h2 :id="id" class="mb-1">
        {{ title }}
      </h2>
      <time :datetime="date" class="text-14 text-font-alt3">{{
        normalizedDate
      }}</time>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import { slugify } from '~/utilities/project.functions'

@Component
export default class ReleaseNote extends Vue {
  @Prop() title
  @Prop() date

  get normalizedDate() {
    const [day, month, year]: [number, number, number] = this.date
      .split('-')
      .map((value) => parseInt(value))

    const date = new Date(year, month - 1, day)

    return `${format(date, 'do')} of ${format(date, 'MMM yyyy')}`
  }

  get id() {
    return `release-${slugify(this.title)}`
  }
}
</script>
<style lang="scss">
.release-note {
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
