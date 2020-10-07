<template>
  <div class="step mb-24 relative">
    <div class="image-wrapper relative">
      <div class="pl-24 overflow-hidden">
        <img :src="img" :alt="title" />
      </div>
    </div>
    <div class="number-wrapper relative flex">
      <div class="w-24 flex-shrink-0 font-semibold text-font-alt3 relative">
        <div class="flex items-center">
          <div class="border rounded-full border-alt4">
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
