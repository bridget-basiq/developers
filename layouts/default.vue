<template>
  <div
    class="layout flex flex-col antialiased font-body min-h-screen text-font-primary text-16 bg-body"
    :class="{
      'theme-dark': darkMode,
      'theme-light': !darkMode,
      'menu-open': menuOpen,
      'no-transition': noTransition,
      'is-playground': isPlayground,
    }"
    @click="closeKhaled"
  >
    <Banner type="switcher">
      <div class="flex w-full text-font-alt3 text-12 font-semibold">
        <a class="mr-1" href="https://chargetrip.com" target="_blank"
          >Website</a
        >
        /
        <router-link class="mx-1 text-font-primary" to="/"
          >Developers
        </router-link>
        /
        <a class="ml-1" href="https://chargetrip.com" target="_blank">
          Dashboard
        </a>
        <div class="ml-auto flex items-center">
          <a
            href="https://account.chargetrip.com/profile"
            target="_blank"
            class="pr-3 border-r border-alt2"
          >
            Account
          </a>
          <div class="pl-3 text-font-primary">Sign out</div>
        </div>
      </div>
    </Banner>
    <div
      class="view flex lg:bg-body flex-col lg:flex-row relative z-10 flex-1 lg:overflow-hidden rounded-t-xl"
    >
      <SideNav
        v-if="sideNav"
        class="text-14 z-40 top-0"
        :navs="normalizedSideNav"
        :dark-mode="darkMode"
        :show-toggle-menu="true"
        :current-page="content.title"
        :spacing="6"
        @changeDarkMode="setDarkMode"
      >
        <template v-slot:icons>
          <span
            class="icon-search lg:hidden ml-4"
            @click="showSearch = !showSearch"
          />
        </template>
        <Input
          class="px-3 lg-max:hidden"
          icon="search"
          :hotkey="{
            icon: 'slash',
            key: '/',
            fn: () => (showSearch = true),
          }"
          placeholder="Search.."
          @focus="showSearch = true"
        />
      </SideNav>
      <div
        ref="container"
        class="content flex-1 flex flex-col relative overflow-y-scroll mt-8 lg:mt-0"
      >
        <div class="max-w-xl flex flex-col">
          <div class="sticky-header lg:px-8 px-6 hidden lg:block">
            <div class="flex items-center">
              <template v-if="!isEditing">
                <Select
                  v-model="value"
                  class="navigate-select"
                  :options="options"
                  @input="onMenuItemClick({ hash: $event })"
                />
                <template v-if="canEdit">
                  <Button
                    class="ml-auto lg-max:hidden"
                    size="sm"
                    color="accent"
                    @click="triggerEdit"
                    >Edit page
                  </Button>
                </template>
              </template>
              <template v-else>
                <h2>Edit {{ content.title }}</h2>
                <div class="ml-auto flex">
                  <Button size="sm" color="alt" @click="cancel">Cancel</Button>
                  <Button size="sm" class="ml-2" color="accent" @click="save"
                    >Save edits
                  </Button>
                </div>
              </template>
            </div>
          </div>
          <div class="lg:px-8 px-6 lg-max:overflow-x-hidden">
            <Nuxt class="page mb-8" />
          </div>
        </div>
        <PrevNextNavigation v-if="sideNav" class="mt-auto" />
      </div>
      <aside
        class="right-aside border-l border-alt py-8 px-6 overflow-y-scroll hidden xl:block"
      >
        <MarkdownFormatting v-if="isEditing" />
        <RelatedActions v-else />
      </aside>
    </div>
    <img
      v-if="showKhaled"
      class="absolute max-w-screen-sm z-50 rounded shadow-down-xl transform -translate-x-1/2 -translate-y-full bottom-0 -mt-6"
      :style="{ top: `${khaledPosition.y}px`, left: `${khaledPosition.x}px` }"
      src="khaled.gif"
    />
    <Search
      :active="showSearch"
      :click-handler="onMenuItemClick"
      icon="search"
      @close="showSearch = false"
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
  Input,
  Select,
} from '@chargetrip/internal-vue-components'

import { Getter, Mutation } from 'vuex-class'
import Table from '~/components/global/PropertyTable.vue'
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
  menuOpen = false
  showKhaled = false
  khaledPosition = { x: 0, y: 0 }
  @Ref('container') container
  canEdit = process.env.NODE_ENV !== 'production'
  @Mutation setDarkMode
  @Mutation setIsEditing
  noTransition = false
  timeout = 0
  hElms: any[] = []
  hash = this.$route.hash.slice(1)
  stopReplacing = false
  showSearch = false
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

  get normalizedSideNav() {
    return [
      ...this.sideNav,
      [
        {
          title: 'Playground',
          icon: 'playground',
          href: 'https://playground.chargetrip.com/',
          arrow: true,
        },
        {
          title: 'Voyager',
          icon: 'voyager-alt',
          href: 'https://voyager.chargetrip.com/',
          arrow: true,
        },
        {
          title: 'Examples',
          icon: 'code',
          href: 'https://chargetrip.com/examples/',
          arrow: true,
        },
      ],
    ]
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

  findInArray(arr, name) {
    let find = false

    arr.forEach((item) => {
      if (item.tag === name) {
        find = true
      }

      if (item.children) {
        find = this.findInArray(item.children, name) || find
      }
    })

    return find
  }

  get isPlayground() {
    return this.findInArray(this.content?.body?.children || [], 'playground')
  }

  @Listen('dblclick') onDblClick(e) {
    e.stopPropagation()
  }

  get isHome() {
    return this.$route.path === '/home'
  }

  @Watch('$route.path') onRouteChange() {
    if (process.env.NODE_ENV === 'production') {
      window.fathom.trackPageview()
    }
    if (!this.container) return

    if (!this.$route.hash?.length) {
      this.scrollTo({ top: 0 })
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
.page p > code {
  @apply rounded-2xs bg-base border border-alt px-1 leading-none text-font-primary;
}

.nuxt-content {
  .code-block {
    @apply my-4;
  }

  .table,
  .property-table {
    @apply mt-6 mb-10;
  }

  > h2 {
    @apply mt-14 mb-2;
  }

  > h3,
  .schema .h2 {
    @apply mt-8 mb-3;
  }

  > ul:not(.errors),
  ol {
    @apply ml-6 my-4;

    li::before {
      @apply mr-3;
    }
  }

  > ul:not(.errors) {
    li {
      &::before {
        content: '•';
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
    & + p {
      @apply mt-4;
    }
  }

  img {
    @apply rounded overflow-hidden my-10 w-full;
  }

  h1 {
    @apply mb-3;

    + p,
    + p + p {
      @apply text-18 text-font-alt3;
    }
  }
}

.layout {
  @screen lg-max {
    &.show-menu {
      .c-banner {
        @apply hidden;
      }
    }

    .c-side-nav {
      &:not(.show-menu) {
        &:not(.show-search) {
          @apply overflow-hidden;
        }
      }
    }

    .view {
      overflow: unset;
    }
  }
  &.no-transition {
    .box,
    .animate,
    label,
    .transition,
    .transition-all {
      transition-duration: 0s !important;
    }
  }

  &.is-playground {
    .right-aside {
      width: 512px;
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
      max-height: calc(100vh - 34px);
    }

    .view {
      height: calc(100vh - 34px);
    }

    aside {
      width: 383px;
    }

    .c-side-nav {
      width: 260px;
    }
  }

  .nuxt-content-editor {
    @apply text-font-primary bg-body;
  }

  .navigate-select {
    max-width: 164px;
    @apply w-full;
  }
}
</style>
