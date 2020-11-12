<template>
  <div class="search relative">
    <Input
      v-model="search"
      type="search"
      icon="search"
      :hotkey="{
        icon: 'slash',
        key: '/',
        fn: (input) => input.focus(),
      }"
      placeholder="Search documentation"
      @blur="showSuggestions = false"
      @focus="showSuggestions = true"
    />
    <nav
      v-show="showSuggestions && suggestions.length"
      class="rounded-sm border border-alt shadow-down-xl absolute left-0 top-full bg-body min-w-full mt-2 text-14"
    >
      <div class="p-2 flex flex-col suggestions overflow-y-scroll">
        <router-link
          v-for="(suggestion, key) in suggestions"
          :key="key"
          ref="suggestionEl"
          class="py-2 px-3 cursor-pointer rounded-sm"
          :class="{ 'bg-base': index === key }"
          :to="suggestion.url"
          @mouseenter.native="index = key"
          @mousedown.prevent.native="onClick(suggestion)"
        >
          <p class="whitespace-no-wrap">
            <strong>
              <span v-if="suggestion.parent" class="text-font-alt3">
                {{ suggestion.parent }} /
              </span>
              {{ suggestion.title }}
            </strong>
          </p>
          <p
            v-html="
              suggestion._highlightResult
                ? suggestion._highlightResult.description.value
                : suggestion.description
            "
          />
        </router-link>
      </div>
      <footer class="border-t border-alt py-1 px-3 flex whitespace-no-wrap">
        <div
          v-for="(hotKey, i) in hotKeys"
          :key="i"
          class="hotkey flex mr-6 items-center"
        >
          <div class="flex">
            <span
              v-for="(key, c) in hotKey.keys"
              :key="`${i}-${c}`"
              class="w-5 h-5 border border-alt2 first:rounded-l-xs last:rounded-r-xs text-alt2 flex items-center justify-center"
              :class="`icon-${key}`"
            />
          </div>
          <p class="ml-2">
            {{ hotKey.title }}
          </p>
        </div>
        <img
          class="pl-8 ml-auto w-24 h-auto object-contain flex-shrink-0 max-w-xs"
          src="/algolia.png"
          alt="algolia"
        />
      </footer>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Prop } from 'nuxt-property-decorator'
import { Input } from '@chargetrip/internal-vue-components'
import algoliasearch from 'algoliasearch/lite'
import { Mixins } from 'vue-property-decorator'
import Base from '~/mixins/base'
import { Listen } from '~/utilities/decorators'

@Component({ components: { Input } })
export default class Search extends Mixins(Base) {
  @Prop() clickHandler
  suggestions: any[] = []
  showSuggestions = false
  index = 0
  search = ''
  hotKeys = [
    {
      keys: ['arrow-down', 'arrow-up'],
      title: 'To navigate',
    },
    {
      keys: ['enter'],
      title: 'To select',
    },
  ]

  length = 50

  client = algoliasearch(
    this.$config.ALGOLIA_APP_ID as string,
    this.$config.ALGOLIA_API_PUBLIC_KEY as string
  )

  database = this.client.initIndex('items')

  @Watch('search') async onSearchChange() {
    const { hits } = await this.database.search(this.search, {
      attributesToSnippet: ['*:5'],
      attributesToHighlight: ['description'],
      // ranking: ['title', 'h1', 'h2', 'parent', 'description'],
      length: this.length,
      offset: 0,
    })

    this.suggestions = hits
  }

  @Listen('keyup') onKeyUp(e) {
    if (!this.showSuggestions) return

    if (e.key === 'ArrowDown') {
      this.index < this.length - 1 ? this.index++ : (this.index = 0)
    }
    if (e.key === 'ArrowUp') {
      this.index > 0 ? this.index-- : (this.index = this.length - 1)
    }

    if (e.key === 'Enter') {
      this.$router.push(this.suggestions[this.index]?.url)
    }
  }

  @Watch('$route') onRouteChange() {
    this.showSuggestions = false
    this.index = 0
  }

  onClick({ url }) {
    this.clickHandler({ hash: url.split('#')?.[1] })
  }
}
</script>
<style lang="scss">
.search {
  .suggestions {
    max-height: 400px;
  }
  em {
    @apply not-italic text-warning;
  }
}
</style>
