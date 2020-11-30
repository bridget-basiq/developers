<template>
  <div
    class="playground fixed border-l border-alt right-0 bg-body h-full z-40 hidden xl:block"
  >
    <div class="py-8 flex px-8 flex items-center">
      <h2>Code Sample</h2>
      <a v-if="url" :href="url" target="_blank" rel="noopener" class="ml-auto">
        <Button size="sm" color="base" icon="arrow-up-right">
          View in Playground
        </Button>
      </a>
    </div>
    <div class="container flex flex-col">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Button } from '@chargetrip/internal-vue-components'

@Component({ components: { Button } })
export default class Playground extends Vue {
  @Prop() url
}
</script>
<style lang="scss">
.playground {
  top: 34px;
  width: 512px;

  .container {
    height: calc(100vh - 128px);

    > * {
      @apply flex-1 overflow-scroll;

      header {
        @apply sticky top-0;
      }
    }
  }
  .code-block {
    @apply m-0 rounded-none border-l-0 border-b-0;

    code {
      @apply pr-8;
    }

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
