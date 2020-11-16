<template>
  <div
    class="playground fixed border-l border-alt right-0 bg-body h-full z-40 overflow-y-scroll hidden xl:block"
  >
    <div class="sticky-header px-8 flex items-center">
      <h2>Playground</h2>
      <Button class="ml-auto mr-2" size="sm" color="base" icon="arrow-up-right">
        View in Playground
      </Button>
      <Button size="sm" color="accent">Run query</Button>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Button } from '@chargetrip/internal-vue-components'

@Component({ components: { Button } })
export default class Playground extends Vue {}
</script>
<style lang="scss">
.playground {
  top: 34px;
  width: 512px;

  .code-block {
    @apply m-0 rounded-none;

    header {
      @apply bg-body;
    }

    header,
    pre {
      @apply px-8;
    }

    pre {
      @apply py-6;
    }
  }
}
</style>
