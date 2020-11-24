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
import highlightjs from 'highlight.js'
import { Snackbar, Tag } from '@chargetrip/internal-vue-components'
import { copy } from '~/utilities/project.functions'

highlightjs.registerLanguage('graphql', function (e: any): any {
  return {
    aliases: ['gql'],
    keywords: {
      keyword:
        'query mutation subscription|10 type input schema directive interface union scalar fragment|10 enum on ...',
      literal: 'true false null',
    },
    contains: [
      e.HASH_COMMENT_MODE,
      e.QUOTE_STRING_MODE,
      e.NUMBER_MODE,
      {
        className: 'type',
        begin: '[^\\w][A-Z][a-z]',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'literal',
        begin: '[^\\w][A-Z][A-Z]',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'variable',
        begin: '\\$',
        end: '\\W',
        excludeEnd: !0,
      },
      {
        className: 'keyword',
        begin: '[.]{2}',
        end: '\\.',
      },
      {
        className: 'meta',
        begin: '@',
        end: '\\W',
        excludeEnd: !0,
      },
    ],
    illegal: /([;<']|BEGIN)/,
  }
})

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
      if (this.lang) {
        return highlightjs
          .highlight(this.lang, this.$slots?.default?.[0]?.text?.trim() || '')
          ?.value.split('\n')
      } else {
        return highlightjs
          .highlightAuto(this.$slots?.default?.[0]?.text?.trim() || '')
          ?.value.split('\n')
      }
    } catch (e) {
      this.hide = true
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
