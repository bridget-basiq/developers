<template>
  <div
    v-if="!hide"
    class="code-block text-font-primary rounded border border-alt text-14"
    :class="{ 'bg-base': query || title, 'has-type': codeType }"
  >
    <header
      v-if="title || codeType"
      class="flex h-10 px-6 font-semibold items-center border-b border-alt text-font-alt2"
    >
      <Tag v-if="codeType" class="mr-2" v-bind="codeType.tag" />
      <div v-else class="title">
        <span v-if="prefix" class="text-font-alt3 mr-1">{{ prefix }} / </span>
        {{ title }}
      </div>
      <div v-if="!codeType" class="ml-auto">
        <span
          v-if="!copied"
          class="icon icon-clipboard cursor-pointer"
          @click="copy"
        />
        <strong v-else class="text-accent flex items-center">
          Copied <span class="icon-circle-checkmark ml-2"
        /></strong>
      </div>
    </header>
    <div
      v-if="type === 'query' || type === 'mutation' || type === 'subscription'"
      class="flex px-6 h-10 pt-6 justify-end items-center sticky ctas -mt-12 top-0"
    >
      <Button
        :href="editUrl"
        title="Edit"
        size="xs"
        class="bg-body border border-alt2 text-font-primary mr-1"
      />
      <Button
        size="xs"
        class="bg-body border border-alt2 text-font-primary"
        :title="copied ? 'Copied' : 'Copy'"
        @click.native="copy"
      />
    </div>
    <div class="wrapper">
      <pre
        class="font-mono px-6 py-4 font-base overflow-x-scroll"
      ><code v-for="(line, key) in codeLines" :key="key" v-html="line"/></pre>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Tag, Button } from '@chargetrip/internal-vue-components'
import { copy } from '~/utilities/project.functions'
import highlightjs from '~/utilities/highlight'

@Component({ components: { Tag, Button } })
export default class CodeBlock extends Vue {
  @Prop() title
  @Prop({ default: 'Query' }) queryType
  @Prop() lang
  @Prop() type
  @Prop() query
  @Prop() editUrl
  @Prop() tag
  @Prop() prefix
  copied = false
  hide = false

  types = {
    mutation: {
      tag: {
        title: 'Mutation',
        type: 'secondary',
        color: 'alt4',
      },
    },
    subscription: {
      tag: {
        title: 'Subscription',
        type: 'secondary',
        color: 'alt4',
      },
    },
    query: {
      tag: {
        title: 'Query',
        type: 'secondary',
        color: 'alt4',
      },
    },
    response: {
      tag: {
        title: 'Response',
        type: 'secondary',
        class: 'border border-font-alt3 bg-body text-font-alt3',
      },
    },
  }

  get codeType() {
    return this.types[this.type]
  }

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
    this.copied = true

    setTimeout(() => {
      this.copied = false
    }, 5000)
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
