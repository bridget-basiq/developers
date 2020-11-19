<template>
  <div
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

@Component({ components: { Snackbar, Tag } })
export default class CodeBlock extends Vue {
  @Prop() title
  @Prop() query
  @Prop() prefix
  showSnackbar = false

  get codeLines() {
    return highlightjs
      .highlightAuto(this.$slots?.default?.[0]?.text?.trim() || '')
      ?.value.split('\n')
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
.theme-light .code-block {
  /* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

  /* Tomorrow Comment */
  .hljs-comment,
  .hljs-quote {
    color: #8e908c;
  }

  /* Tomorrow Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #c82829;
  }

  /* Tomorrow Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #f5871f;
  }

  /* Tomorrow Yellow */
  .hljs-attribute {
    color: #eab700;
  }

  /* Tomorrow Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #718c00;
  }

  /* Tomorrow Blue */
  .hljs-title,
  .hljs-section {
    color: #4271ae;
  }

  /* Tomorrow Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #8959a8;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: white;
    color: #4d4d4c;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
}

.theme-dark .code-block {
  /* Tomorrow Comment */
  .hljs-comment,
  .hljs-quote {
    color: #969896;
  }

  /* Tomorrow Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #cc6;
  }

  /* Tomorrow Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #de935f;
  }

  /* Tomorrow Yellow */
  .hljs-attribute {
    color: #f0c674;
  }

  /* Tomorrow Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #b5bd68;
  }

  /* Tomorrow Blue */
  .hljs-title,
  .hljs-section {
    color: #81a2be;
  }

  /* Tomorrow Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #b294bb;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: #1d1f21;
    color: #c5c8c6;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
}
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
