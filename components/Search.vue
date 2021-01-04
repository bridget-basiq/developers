<template>
  <div
    v-show="active"
    class="search fixed inset-0 items-start justify-start flex z-50 px-6"
    :class="{ 'show-suggestions': showSuggestions && suggestions.length }"
    @click="$emit('close')"
  >
    <div class="bg bg-body opacity-75 absolute inset-0" />
    <div
      class="relative mx-auto search-box w-screen max-w-screen-sm shadow-down-md"
      @click.stop
    >
      <div
        class="flex h-16 items-center bg-body border border-alt wrapper rounded-sm"
      >
        <label class="icon-search px-6" for="do-not-auto-fill" />
        <input
          id="do-not-auto-fill"
          ref="input"
          v-model="search"
          type="text"
          autocomplete="off"
          name="do-not-auto-fill"
          class="w-full h-full bg-transparent outline-none pr-6 font-semibold"
          @focus="showSuggestions = true"
        />
      </div>
      <nav
        v-show="showSuggestions && suggestions.length"
        class="text-font-alt3 text-14 shadow-down-md border rounded-b-sm border-alt absolute top-0 mt-16 left-0 w-full bg-body"
      >
        <main
          ref="container"
          class="flex flex-col suggestions overflow-y-scroll"
        >
          <ul class="p-3 lg:p-2">
            <li
              v-for="(suggestion, i) in normalizedSuggestions"
              :key="i"
              ref="suggestionEl"
              class="block py-2 px-3 cursor-pointer rounded-sm"
              :class="{ 'bg-base': index === i }"
              @mouseenter="index = i"
              @mousedown="onClick(suggestion)"
            >
              <p class="whitespace-no-wrap">
                <strong>
                  <span v-if="suggestion.propertyPath" class="lg-max:hidden">
                    {{ suggestion.propertyPath }} /
                  </span>
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
            </li>
          </ul>
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
  index = 0
  showSuggestions = false
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

  database = this.client.initIndex('prod_DeveloperPortalContent')

  onArrowDown() {
    if (this.index < this.normalizedSuggestions.length - 1) {
      this.index++
    } else {
      this.index = 0
    }
  }

  onEnter() {
    this.$router.push(this.normalizedSuggestions[this.index]?.url)
  }

  onArrowUp() {
    if (this.index > 0) {
      this.index--
    } else {
      this.index = this.normalizedSuggestions.length - 1
    }
  }

  scrollToView() {
    this.prevent = true

    const el = this.suggestionEls?.[this.index]
    const offsetTop = el?.offsetTop

    if (offsetTop - el?.offsetHeight < this.container.scrollTop) {
      this.container.scrollTo(0, offsetTop)
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
    if (!this.active) return

    if (e.key === 'Escape') this.$emit('close')

    if (!this.suggestions.length) return

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

    this.index = 0
    this.suggestions = hits
  }

  getParentByItem({ url, type }) {
    if (type === 'page') return { path: '' }

    const [path, hash] = url.split('#')
    const splitPath = path.split('/').slice(1)

    const propertyParent = hash.split('-').slice(1)
    splitPath.splice(1, 1)

    const withoutTitle = propertyParent.slice(0, -1)

    const propertyPath =
      withoutTitle.length > 4
        ? [...withoutTitle.slice(0, 2), '...', ...withoutTitle.slice(-1)]
        : withoutTitle

    return {
      path: splitPath.map((part) => toSentenceCase(part)).join(' / '),
      propertyPath: propertyPath.join(' / '),
    }
  }

  get normalizedSuggestions() {
    return this.suggestions.map((item) => ({
      ...item,
      ...this.getParentByItem(item),
    }))
  }

  @Watch('$route.hash')
  @Watch('$route.path')
  onRouteChange() {
    this.showSuggestions = false
  }

  async onClick({ url }) {
    await this.$router.push(url)
    this.$emit('close')
    this.clickHandler({ hash: url.split('#')?.[1] })
  }
}
</script>
<style lang="scss">
.search {
  &.show-suggestions {
    .wrapper {
      @apply border-b-0 rounded-b-none shadow-none;
    }
  }

  .search-box {
    margin-top: 33vh;
  }
  .suggestions {
    max-height: 33vh;
  }
  em {
    @apply not-italic text-warning;
  }
}
</style>
