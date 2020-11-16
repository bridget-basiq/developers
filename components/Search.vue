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
      class="rounded-sm text-font-alt3 border border-alt shadow-down-xl absolute left-0 top-full bg-body min-w-full mt-2 text-14"
    >
      <div ref="container" class="flex flex-col suggestions overflow-y-scroll">
        <div
          v-for="(suggestionGroup, key, i) in suggestionGroups"
          :key="key"
          class="group"
        >
          <header
            v-if="key.length"
            class="h-10 flex items-center top-0 sticky bg-body border-b border-t border-alt px-5 text-12 uppercase text-font-alt3"
          >
            <strong>
              {{ key }}
            </strong>
          </header>
          <div class="p-2">
            <router-link
              v-for="(suggestion, s) in suggestionGroup"
              :key="`${i}-${s}`"
              ref="suggestionEl"
              class="block py-2 px-3 cursor-pointer rounded-sm"
              :class="{ 'bg-base': itemIndex === s && groupIndex === i }"
              :to="suggestion.url"
              @mouseenter.native="onMouseEnter(i, s)"
              @mousedown.prevent.native="onClick(suggestion)"
            >
              <p class="whitespace-no-wrap">
                <strong>
                  <template v-if="suggestion.propertyPath">
                    {{ suggestion.propertyPath }} /
                  </template>
                  <span class="text-font-primary">
                    {{ suggestion.title }}
                  </span>
                </strong>
              </p>
              <p
                v-html="
                  suggestion._snippetResult
                    ? suggestion._snippetResult.description.value
                    : suggestion.description
                "
              />
            </router-link>
          </div>
        </div>
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
          <p class="ml-2 text-12">
            <strong>
              {{ hotKey.title }}
            </strong>
          </p>
        </div>
        <div class="pl-20 ml-auto flex items-center">
          <img
            class="w-20 pl-8 h-auto object-contain flex-shrink-0 max-w-xs"
            src="/algolia.png"
            alt="algolia"
          />
        </div>
      </footer>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Prop, Ref } from 'nuxt-property-decorator'
import { Input } from '@chargetrip/internal-vue-components'
import algoliasearch from 'algoliasearch/lite'
import { Mixins } from 'vue-property-decorator'
import { toSentenceCase } from 'js-convert-case/lib'
import Base from '~/mixins/base'
import { Listen } from '~/utilities/decorators'

@Component({ components: { Input } })
export default class Search extends Mixins(Base) {
  @Ref('suggestionEl') suggestionEls
  @Ref('container') container
  @Prop() clickHandler
  suggestions: any[] = []
  showSuggestions = false
  itemIndex = 0
  groupIndex = 0
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
      attributesToHighlight: ['description'],
      attributesToSnippet: ['description:10'],
      // ranking: ['title', 'h1', 'h2'', 'description'],
      snippetEllipsisText: '...',
      length: this.length,
      offset: 0,
    })

    this.suggestions = hits
  }

  onMouseEnter(groupIndex, itemIndex) {
    this.groupIndex = groupIndex
    this.itemIndex = itemIndex
  }

  getParentByItem({ url, type }) {
    if (type === 'page') return { path: '' }

    const [path, hash] = url.split('#')
    const splitPath = path.split('/').slice(1)

    const propertyParent = hash.split('-').slice(1)
    splitPath.splice(1, 1)

    return {
      path: splitPath.map((part) => toSentenceCase(part)).join(' / '),
      propertyPath: propertyParent.slice(0, -1).join(' / '),
    }
  }

  get totalIndex() {
    return this.suggestionGroupKeys
      .slice(0, this.groupIndex + 1)
      .reduce((num, key) => {
        if (key === this.suggestionGroupKeys[this.groupIndex]) {
          num += this.itemIndex
        } else {
          num += this.suggestionGroups[key].length
        }

        return num
      }, 0)
  }

  get suggestionGroups() {
    return this.suggestions
      .map((item) => ({
        ...item,
        ...this.getParentByItem(item),
      }))
      .reduce((obj: any, item) => {
        if (!obj[item.path]) obj[item.path] = []

        obj[item.path].push(item)

        return obj
      }, {})
  }

  get suggestionGroupKeys() {
    return Object.keys(this.suggestionGroups)
  }

  get currentGroup() {
    return this.suggestionGroups[this.suggestionGroupKeys[this.groupIndex]]
  }

  @Listen('keyup') onKeyUp(e) {
    if (!this.showSuggestions) return

    if (e.key === 'ArrowDown') {
      if (this.itemIndex < this.currentGroup.length - 1) {
        this.itemIndex++
      } else {
        this.itemIndex = 0

        if (this.groupIndex < this.suggestionGroupKeys.length - 1) {
          this.groupIndex++
        } else {
          this.groupIndex = 0
        }
      }
    }
    if (e.key === 'ArrowUp') {
      if (this.itemIndex > 0) {
        this.itemIndex--
      } else {
        if (this.groupIndex > 0) {
          this.groupIndex--
        } else {
          this.groupIndex = this.suggestionGroupKeys.length - 1
        }

        this.itemIndex = this.currentGroup.length - 1
      }
    }

    if (this.suggestionEls?.[this.totalIndex]?.$el?.offsetTop) {
      this.container.scrollTo(
        0,
        this.suggestionEls[this.totalIndex]?.$el.offsetTop -
          (this.suggestionGroupKeys[this.groupIndex].length ? 40 : 0)
      )
    }

    if (e.key === 'Enter') {
      this.$router.push(this.currentGroup[this.itemIndex]?.url)
    }
  }

  @Watch('$route.path') onRouteChange() {
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
