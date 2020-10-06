<template>
  <div class="step mb-24">
    <div class="pl-24">
      <img :src="img" :alt="title" />
    </div>
    <div class="flex">
      <div class="w-24 text-center font-semibold text-font-alt3 flex-shrink-0">
        {{ normalizedNumber }}
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
  @Prop() number

  get normalizedNumber() {
    return `${this.number.padStart(2, '0')}.`
  }
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
