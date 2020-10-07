<template>
  <div
    class="code-block text-font-primary rounded bg-base border border-alt text-14"
  >
    <header
      class="flex h-10 px-6 font-semibold items-center border-b border-alt text-font-alt2"
    >
      <span class="text-font-alt3 mr-1">{{ prefix }} / </span>
      {{ title }}
      <span class="icon icon-clipboard ml-auto"></span>
    </header>
    <pre
      class="font-mono px-6 py-4 font-base"
    ><code v-for="(line, key) in codeLines" :key="key" class="flex items-center" v-html="line"></code></pre>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CodeBlock extends Vue {
  @Prop() title
  @Prop() prefix
  @Prop() code

  get codeLines() {
    return this.code
      .trim()
      .split('\n')
      .map((line) => line.trim())
  }
}
</script>
<style lang="scss">
.code-block {
  code {
    counter-increment: listing;

    &::before {
      @apply mr-4 text-font-alt3;

      content: counter(listing);
    }
  }
}
</style>
