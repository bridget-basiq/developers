<template>
  <div
    class="layout flex flex-col antialiased font-body min-h-screen text-font-primary text-16 bg-body"
    :class="{
      'theme-dark': darkMode,
      'theme-light': !darkMode,
      'menu-open': showMenu,
      'is-editing': isEditing,
      'no-transition': noTransition,
      'has-aside': aside || isEditing,
      'is-large-aside': isLargeAside && !isEditing,
    }"
    @click="closeKhaled"
  >
    <TopNav class="z-50" :show-items="!canEdit">
      <div
        class="lg:relative flex-1 h-16 flex items-center"
        :class="{ 'lg-max:hidden': !showSearch }"
      >
        <Search
          ref="search"
          :click-handler="onMenuItemClick"
          icon="search"
          class="flex-1"
          @setShowSearch="showSearch = $event"
        />
      </div>
      <div class="flex ml-auto lg:hidden">
        <Button
          v-if="!showMenu"
          size="sm"
          color="base"
          icon="search"
          @click.native="showSearch = !showSearch"
        />
        <Button
          class="ml-4"
          size="sm"
          color="base"
          :icon="showMenu ? 'close' : 'menu'"
          @click.native="showMenu = !showMenu"
        />
      </div>
      <template v-if="canEdit" v-slot:cta>
        <Button
          v-if="!isEditing"
          class="ml-auto lg-max:hidden"
          size="sm"
          color="accent"
          icon="edit"
          @click.native="triggerEdit"
        />
        <div v-else class="flex">
          <Button size="sm" color="alt" icon="close" @click.native="cancel" />
          <Button
            size="sm"
            class="ml-4"
            color="accent"
            icon="checkmark"
            @click.native="save"
          />
        </div>
      </template>
    </TopNav>
    <div
      class="view flex lg:bg-body flex-col lg:flex-row relative z-10 flex-1 lg:overflow-hidden rounded-t-xl"
    >
      <SideNav
        v-if="sideNav"
        class="text-14 z-40 top-0"
        :navs="sideNav"
        :dark-mode="darkMode"
        :spacing="6"
        :show-menu="showMenu"
        @setShowMenu="showMenu = false"
        @setDarkMode="setDarkMode"
      />
      <div
        ref="container"
        class="content flex-1 flex flex-col relative overflow-y-scroll"
      >
        <Nuxt
          class="max-w-container pb-8 flex flex-col pt-8 lg:px-12 px-6 lg-max:overflow-x-hidden page"
        />
        <PrevNextNavigation v-if="sideNav && !isEditing" class="mt-auto" />
      </div>
    </div>
    <MarkdownFormatting v-if="isEditing" />
    <img
      v-if="showKhaled"
      class="absolute max-w-screen-sm z-50 rounded shadow-down-xl transform -translate-x-1/2 -translate-y-full bottom-0 -mt-6"
      :style="{ top: `${khaledPosition.y}px`, left: `${khaledPosition.x}px` }"
      src="khaled.gif"
    />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Ref } from 'nuxt-property-decorator'
import { Mixins } from 'vue-property-decorator'
import {
  Banner,
  Button,
  SideNav,
  TopNav,
  Input,
  Select,
} from '@chargetrip/internal-vue-components'

import { Getter, Mutation } from 'vuex-class'
import Table from '~/components/globals/PropertyTable.vue'
import RelatedActions from '~/components/RelatedActions.vue'
import PrevNextNavigation from '~/components/PrevNextNavigation.vue'
import Base from '~/mixins/base'
import MarkdownFormatting from '~/components/MarkdownFormatting.vue'
import { Listen } from '~/utilities/decorators'
import Search from '~/components/Search.vue'

@Component({
  components: {
    Search,
    Select,
    Input,
    MarkdownFormatting,
    PrevNextNavigation,
    RelatedActions,
    SideNav,
    TopNav,
    Table,
    Banner,
    Button,
  },
})
export default class Layout extends Mixins(Base) {
  @Getter darkMode
  @Getter sideNav
  @Getter content
  @Getter isEditing
  showMenu = false
  showSearch = false
  showKhaled = false
  khaledPosition = { x: 0, y: 0 }
  @Ref('container') container
  @Ref('search') search
  canEdit = false // process.env.NODE_ENV !== 'production'
  @Mutation setDarkMode
  @Mutation setIsEditing
  noTransition = false
  timeout = 0
  pageTransitionDuration = 100
  hElms: any[] = []
  hash = this.$route.hash.slice(1)
  stopReplacing = false
  options: { label: string; value: string }[] = []
  value: string = ''

  beforeMount() {
    this.openKhaled = this.openKhaled.bind(this)
    this.closeKhaled = this.closeKhaled.bind(this)

    this.$root.$on('openKhaled', this.openKhaled)
    this.$root.$on('closeKhaled', this.closeKhaled)
  }

  @Watch('content', { immediate: true }) onContentChange() {
    this.options = this.content.headings.map((heading) => ({
      label: heading.title,
      value: heading.hash,
    }))

    this.value = this.options[0]?.value || ''
  }

  mounted() {
    this.onRouteChange()
    if (this.hash.length) {
      this.onMenuItemClick({ hash: this.hash })
    }
    if (process.env.NODE_ENV === 'development') {
      this.$nuxt.$on('content:update', () => {
        setTimeout(this.onRouteChange.bind(this), 100)
      })
    }
  }

  @Watch('showSearch') onShowSearchChange() {
    setTimeout(() => {
      this.search.input.input.focus()
    }, 20)
  }

  openKhaled(position) {
    this.khaledPosition = position
    this.showKhaled = true
  }

  closeKhaled() {
    this.showKhaled = false
  }

  findFirstChild(arr) {
    if (arr?.[0]?.to) {
      return arr[0]
    }

    return this.findFirstChild(arr[0].children)
  }

  cancel() {
    this.$root.$emit('cancelEditor')
  }

  attachHandler(item) {
    return {
      ...item,
      callback: this.onMenuItemClick.bind(this),
      children: item?.children?.map(this.attachHandler.bind(this)) || [],
    }
  }

  get offset() {
    return window.innerWidth < 1024 ? 60 : 124
  }

  triggerEdit() {
    this.$root.$emit('toggleEdit')
    this.setIsEditing(true)
    document
      .querySelector('.nuxt-content')
      ?.dispatchEvent(new Event('dblclick'))
  }

  save() {
    this.$root.$emit('submitEditor')
  }

  scrollTo(args) {
    window.scrollTo(args)
    this.container.scrollTo(args)
  }

  onMenuItemClick(item) {
    this.stopReplacing = true

    setTimeout(() => {
      if (!item.hash?.length) {
        this.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        let times = 0

        const interval = setInterval(() => {
          times++

          if (times > 100) {
            // eslint-disable-next-line no-console
            console.log(`Didn't find ${item.hash}`)
            this.stopReplacing = false
            clearInterval(interval)
          }

          const el = this.container.querySelector(`#${item.hash}`)

          if (!el) return
          clearInterval(interval)
          const rect = el.getBoundingClientRect()

          this.scrollTo({
            top:
              (this.container.scrollTop || window.scrollY) +
              rect.top -
              this.offset,
            behavior: 'smooth',
          })

          setTimeout(() => {
            this.stopReplacing = false
          }, 1000)
        }, 10)
      }
    }, this.pageTransitionDuration)
  }

  @Watch('darkMode') onDarkModeChange() {
    this.noTransition = true
    clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
      this.noTransition = false
    }, 50)
  }

  @Watch('$route.hash') onHashChange() {
    this.hash = this.$route.hash.slice(1)
    this.value = this.hash || this.options[0]?.value || ''
  }

  findInArray(arr, compareFn): any {
    let find = null

    arr.forEach((item) => {
      if (compareFn(item)) {
        find = item
      }

      if (item.children) {
        find = this.findInArray(item.children, compareFn) || find
      }
    })

    return find
  }

  get aside() {
    return this.findInArray(
      this.content?.body?.children || [],
      (item) =>
        item.tag === 'playground' ||
        item.tag === 'examples' ||
        item.tag === 'right-aside'
    )
  }

  get isLargeAside() {
    return this.aside?.tag === 'playground' || this.aside?.props?.large
  }

  @Listen('dblclick') onDblClick(e) {
    e.stopPropagation()
  }

  @Watch('showMenu') onShowMenuChange() {
    if (this.$root?.$el?.parentElement) {
      this.$root.$el.parentElement.style.overflow = this.showMenu
        ? 'hidden'
        : 'unset'
    }
  }

  @Watch('$route.path') onRouteChange() {
    this.showMenu = false

    if (process.env.NODE_ENV === 'production') {
      window.fathom.trackPageview()
    }
    if (!this.container) return

    if (!this.$route.hash?.length) {
      setTimeout(() => {
        this.scrollTo({ top: 0 })
      }, this.pageTransitionDuration)
    }

    this.stopReplacing = true
    setTimeout(() => {
      this.hElms = [
        ...(this.container.querySelectorAll('.page h2') || []),
      ].filter((el) => el.id)
      this.stopReplacing = false
    }, 1000)
  }

  @Listen('scroll') onScroll() {
    const smallchat: HTMLElement | null = document.querySelector('#Smallchat')

    if (smallchat && window.innerWidth < 1280 && window.innerWidth >= 1024) {
      if (
        this.container.scrollTop >=
        this.container.scrollHeight - window.innerHeight
      ) {
        smallchat.style.display = 'none'
      } else {
        smallchat.style.display = 'block'
      }
    } else if (smallchat && window.innerWidth < 1024) {
      if (window.scrollY >= document.body.offsetHeight - window.innerHeight) {
        smallchat.style.display = 'none'
      } else {
        smallchat.style.display = 'block'
      }
    }

    if (!this.stopReplacing) {
      const h = this.hElms.reduce((current, h) => {
        const rect = h.getBoundingClientRect()

        if (rect.top <= this.offset) {
          current = h
        }

        return current
      }, null)

      if (h?.id) {
        const hash = h.id
        if (hash !== this.hash) {
          this.hash = hash
          this.$router.replace(
            `${this.$route.fullPath.replace(this.$route.hash, '')}#${hash}`
          )
        }
      } else if (this.hash !== '') {
        this.hash = ''

        this.$router.replace(this.$route.fullPath.replace(this.$route.hash, ''))
      }
    }
  }

  beforeDestroy() {
    this.$root.$off('openKhaled', this.openKhaled)
    this.$root.$off('closeKhaled', this.closeKhaled)
  }
}
</script>
<style lang="scss">
.highlighted-code code,
.page p > code,
.page p > strong > code {
  @apply rounded-2xs bg-base border border-alt px-1 leading-none text-14 text-font-primary font-medium;
}

.nuxt-content {
  > .code-block {
    @apply mt-4;

    &:last-child {
      @apply mb-0;
    }
  }

  &.authorization,
  &.status-error-codes {
    h2 {
      @apply mt-20;
    }
  }

  .right-aside h2 {
    @apply mt-0;
  }

  .table,
  .property-table {
    @apply mt-6 mb-10;
  }

  > h2 {
    @apply mt-14 mb-2;
  }

  > h3 {
    margin-bottom: 0.125rem;
    @apply mt-12;
  }

  > ul:not(.errors),
  ol {
    @apply ml-6 my-4;

    li::before {
      @apply mr-3;
    }
  }

  > ul:not(.errors),
  .release-note ul {
    li {
      &::before {
        content: '- ';
      }
    }
  }

  > ol {
    li {
      counter-increment: listing;

      &::before {
        content: counter(listing) '.';
        @apply font-semibold text-accent;
      }
    }
  }

  > p {
    @apply my-3;

    & + p {
      @apply mt-10;
    }
  }

  > img {
    @apply rounded overflow-hidden my-10 w-full;
  }

  h1 {
    @apply mb-2;

    + p,
    + p + p {
      @apply text-font-alt3;
    }
  }
}

.layout {
  &.no-transition {
    .box,
    .animate,
    label,
    .transition,
    .transition-all {
      transition-duration: 0s !important;
    }
  }

  &.has-aside {
    @screen xl {
      &.is-large-aside {
        .view > .content {
          padding-right: 512px;
        }
        .search {
          max-width: min(640px, calc(100vw - 848px));
        }
      }
      .search {
        max-width: min(640px, calc(100vw - 816px));
      }
      .view > .content {
        padding-right: 480px;
      }
    }
  }

  .table {
    @apply text-14;

    .col {
      &.first-col {
        @apply pl-0;
      }

      &.last-col {
        @apply pr-0;
      }
    }
  }

  @screen lg {
    .view > .content,
    .playground,
    aside {
      max-height: calc(100vh - 64px);
    }

    .view {
      height: calc(100vh - 64px);
    }

    aside {
      width: 383px;
    }

    .c-side-nav {
      width: 240px;
    }
  }

  .max-w-container {
    max-width: 736px;
  }
  .nuxt-content-editor {
    @apply text-font-primary bg-body;
  }

  .navigate-select {
    max-width: 204px;
    @apply w-full;
  }
}
</style>
