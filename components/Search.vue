<template>
  <div
    v-show="active"
    class="search fixed inset-0 flex z-50"
    :class="{ 'show-suggestions': showSuggestions }"
    @click="$emit('close')"
  >
    <div class="bg bg-body opacity-75 absolute inset-0" />
    <div
      class="relative m-auto w-screen max-w-screen-sm shadow-down-md rounded-sm overflow-hidden bg-body border border-alt"
      @click.stop
    >
      <div class="flex h-16 items-center">
        <label class="icon-search px-6" for="search" />
        <input
          id="search"
          ref="input"
          v-model="search"
          type="search"
          class="w-full h-full bg-transparent outline-none pr-6 font-semibold"
        />
      </div>
      <nav
        v-show="search.length && suggestions.length"
        class="text-font-alt3 text-14 border-t border-alt"
      >
        <main
          ref="container"
          class="flex flex-col suggestions overflow-y-scroll"
        >
          <div
            v-for="(suggestionGroup, key, i) in suggestionGroups"
            :key="key"
            class="group"
          >
            <template v-if="key.length">
              <div class="h-px w-full bg-alt" />
              <header
                class="h-10 flex items-center top-0 sticky bg-body border-b border-alt px-5 text-12 uppercase text-font-alt3"
              >
                <strong>
                  {{ key }}
                </strong>
              </header>
            </template>
            <ul class="p-3 lg:p-2">
              <li v-for="(suggestion, s) in suggestionGroup" :key="`${i}-${s}`">
                <router-link
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
              </li>
            </ul>
          </div>
        </main>
        <footer
          class="border-t lg-max:hidden border-alt py-1 px-3 flex whitespace-no-wrap"
        >
          <div
            v-for="(hotKey, i) in hotKeys"
            :key="i"
            class="hotkey flex mr-6 items-center"
          >
            <div class="flex">
              <span
                v-for="(key, c) in hotKey.keys"
                :key="`${i}-${c}`"
                class="w-5 h-5 first:border-l border-r border-t border-b border-alt2 first:rounded-l-xs last:rounded-r-xs text-alt2 flex items-center justify-center"
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
              class="w-24 pl-8 h-auto object-contain flex-shrink-0 max-w-xs"
              src="algolia.png"
              alt="algolia"
            />
          </div>
        </footer>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Prop, Ref } from 'nuxt-property-decorator'
import algoliasearch from 'algoliasearch/lite'
import { Mixins } from 'vue-property-decorator'
import { toSentenceCase } from 'js-convert-case/lib'
import Base from '~/mixins/base'
import { Listen } from '~/utilities/decorators'

@Component
export default class Search extends Mixins(Base) {
  @Ref('suggestionEl') suggestionEls
  @Ref('container') container
  @Ref('input') input
  @Prop() clickHandler
  @Prop() active
  suggestions: any[] = []
  showSuggestions = false
  itemIndex = 0
  groupIndex = 0
  prevent = false
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

  keys = {
    ArrowDown: this.onArrowDown.bind(this),
    ArrowUp: this.onArrowUp.bind(this),
    Enter: this.onEnter.bind(this),
  }

  database = this.client.initIndex('items')

  onArrowDown() {
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

  onEnter() {
    this.$router.push(this.currentGroup[this.itemIndex]?.url)
  }

  onArrowUp() {
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

  scrollToView() {
    this.prevent = true

    const el = this.suggestionEls?.[this.totalIndex]?.$el
    const offsetTop = el?.offsetTop

    if (offsetTop - el?.offsetHeight < this.container.scrollTop) {
      this.container.scrollTo(
        0,
        offsetTop - (this.suggestionGroupKeys[this.groupIndex].length ? 40 : 0)
      )
    } else if (
      offsetTop + el?.offsetHeight >
      this.container.scrollTop + this.container.offsetHeight
    ) {
      this.container.scrollTo(
        0,
        offsetTop - this.container.offsetHeight + el.offsetHeight + 4
      )
    }

    setTimeout(() => {
      this.prevent = false
    }, 500)
  }

  @Watch('active') onActiveChange() {
    setTimeout(() => {
      this.input.focus()
    }, 50)
  }

  @Listen('keyup') onKeyUp(e) {
    if (e.key === 'Escape' && !this.search.length) this.$emit('close')

    if (!this.showSuggestions) return

    this.keys[e.key]?.()

    this.scrollToView()
  }

  @Watch('search') async onSearchChange() {
    const { hits } = await this.database.search(this.search, {
      attributesToHighlight: ['description'],
      attributesToSnippet: ['description:10'],
      snippetEllipsisText: '...',
      length: this.length,
      offset: 0,
    })

    this.itemIndex = 0
    this.suggestions = hits
  }

  onMouseEnter(groupIndex, itemIndex) {
    if (this.prevent) return

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

  @Watch('$route.path') onRouteChange() {
    this.showSuggestions = false
    this.itemIndex = 0
  }

  onClick({ url }) {
    this.clickHandler({ hash: url.split('#')?.[1] })
  }
}
</script>
<style lang="scss">
.search {
  @screen lg-max {
    &.show-suggestions {
      &::after {
        content: '';
        z-index: -1;
        @apply block w-screen h-screen absolute top-0 left-0 bg-body opacity-50 pointer-events-none;
      }
    }
  }
  .suggestions {
    max-height: 400px;
  }
  em {
    @apply not-italic text-warning;
  }
}
</style>
