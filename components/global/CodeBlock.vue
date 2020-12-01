<template>
  <div
    v-if="!hide"
    class="code-block text-font-primary rounded border border-alt text-14"
    :class="{ 'bg-base': query || title }"
  >
    <header
      v-if="query || title"
      class="flex h-10 px-6 font-semibold items-center border-b border-alt text-font-alt2"
    >
      <template v-if="query">
        <Tag class="mr-2" type="secondary" color="note"> Query </Tag>
        <span class="font-normal text-font-primary font-mono">
          {{ query }}
        </span>
      </template>
      <template v-else>
        <span class="text-font-alt3 mr-1">{{ prefix }} / </span>
        {{ title }}
      </template>
      <span class="icon icon-clipboard ml-auto cursor-pointer" @click="copy" />
    </header>
    <div class="wrapper">
      <pre
        class="font-mono px-6 py-4 font-base overflow-x-scroll"
      ><code v-for="(line, key) in codeLines" :key="key" v-html="line"/></pre>
    </div>
    <Snackbar
      class="z-40"
      :class="{ active: showSnackbar }"
      type="success"
      icon="circle-checkmark"
      title="Copied!"
    ></Snackbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Snackbar, Tag } from '@chargetrip/internal-vue-components'
import { copy } from '~/utilities/project.functions'
import highlightjs from '~/utilities/highlight'

@Component({ components: { Snackbar, Tag } })
export default class CodeBlock extends Vue {
  @Prop() title
  @Prop() lang
  @Prop() query
  @Prop() prefix
  showSnackbar = false
  hide = false

  get codeLines() {
    try {
      return highlightjs
        .highlight(this.lang, this.$slots?.default?.[0]?.text?.trim() || '')
        ?.value.split('\n')
    } catch (e) {
      this.hide = true

      return []
    }
  }

  copy() {
    copy(this.$slots?.default?.[0]?.text || '')
    this.showSnackbar = true

    setTimeout(() => {
      this.showSnackbar = false
    }, 3000)
  }
}
</script>
<style lang="scss">
.code-block {
  code {
    @apply block;

    counter-increment: listing;

    &::before {
      @apply mr-4 text-font-alt3;

      content: counter(listing);
    }

    &::after {
      content: '';
      @apply pr-8 inline-block;
    }
  }
}
</style>
