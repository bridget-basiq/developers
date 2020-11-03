<template>
  <div class="step mb-24 relative">
    <div class="image-wrapper relative">
      <div class="sm:pl-24 overflow-hidden">
        <c-image :alt="title" :src="img" />
      </div>
    </div>

    <div class="number-wrapper relative flex">
      <div
        class="w-24 hidden sm:block flex-shrink-0 font-semibold text-font-alt3 relative"
      >
        <div class="flex items-center">
          <div class="border bg-body rounded-full border-alt4">
            <div class="w-2 h-2 rounded-full bg-alt4 m-px"></div>
          </div>
          <div class="flex mx-auto">
            0
            <div class="number" />
            .
          </div>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Steps extends Vue {
  @Prop() img
  @Prop() title
}
</script>
<style lang="scss">
.step {
  .image-wrapper {
    width: calc(100% + 48px);
    @apply -ml-6;
  }
  @screen sm {
    .image-wrapper {
      @apply w-full ml-0;
    }
  }
  img {
    @apply mb-6 mt-0;
  }
  h2 {
    margin-top: 0 !important;
  }

  .c-button {
    @apply mt-6 inline-block;

    &:nth-of-type(1) {
      @apply mr-4;
    }
  }
}
</style>
