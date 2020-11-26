<template>
  <div
    class="layout flex flex-col antialiased font-body min-h-screen text-font-primary text-16 bg-body"
    :class="{
      'show-search': showSearch,
      'theme-dark': darkMode,
      'theme-light': !darkMode,
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
        <div class="ml-1" href="https://chargetrip.com" target="_blank">
          Dashboard
        </div>
      </div>
    </Banner>
    <div
      class="view flex bg-body flex-col lg:flex-row relative z-10 flex-1 lg:overflow-hidden rounded-t-xl"
    >
      <SideNav
        v-if="sideNav"
        class="text-14 z-40 top-0"
        :class="{ 'show-search': showSearch }"
        :navs="normalizedSideNav"
        :dark-mode="darkMode"
        :show-toggle-menu="!isHome"
        :current-page="content.title"
        :spacing="6"
        @changeDarkMode="setDarkMode"
      >
        <span class="icon-search ml-4" @click="showSearch = !showSearch" />
        <span
          v-show="showSearch"
          class="icon-close text-20 mr-6 absolute z-20 top-1/2 transform -translate-y-1/2 right-0"
          @click="showSearch = false"
        />
        <Search
          class="mobile-search absolute hidden left-0 bg-body top-0 z-10 w-full h-14"
          :click-handler="onMenuItemClick"
        />
      </SideNav>
      <div
        ref="container"
        class="content flex-1 flex flex-col relative overflow-y-scroll mt-8 lg:mt-0"
      >
        <div class="sticky-header items-start lg:px-8 px-6 hidden lg:flex">
          <template v-if="!isEditing">
            <Search
              :click-handler="onMenuItemClick"
              icon="search"
              :hotkey="{
                icon: 'slash',
                key: '/',
                fn: (input) => input.focus(),
              }"
            />
            <Button
              v-if="isDev"
              class="ml-auto lg-max:hidden"
              size="sm"
              color="accent"
              @click="triggerEdit"
              >Edit page
            </Button>
          </template>
          <template v-else>
            <h2>Edit {{ content.title }}</h2>
            <div class="ml-auto flex">
              <Button size="sm" class="mr-2" color="alt" @click="cancel"
                >Cancel
              </Button>
              <Button size="sm" color="accent" @click="showSaveModal = true"
                >Save edits
              </Button>
            </div>
          </template>
        </div>
        <div class="lg:px-8 px-6 lg-max:overflow-x-hidden">
          <Nuxt class="page mb-8" />
        </div>
        <div class="mt-auto">
          <PrevNextNavigation v-if="sideNav" />
          <div class="p-6 lg:p-8 border-t flex items-center border-alt text-14">
            <span class="icon icon-survey mr-3" />
            <p>Was this section useful?</p>
            <nav class="flex h-6 items-center font-semibold ml-auto">
              <div class="underline">No</div>
              <div class="underline ml-6 text-accent">Yes</div>
            </nav>
          </div>
        </div>
      </div>
      <aside
        class="right-aside border-l border-alt p-8 overflow-y-scroll hidden xl:block"
      >
        <MarkdownFormatting v-if="isEditing" />
        <RelatedActions v-else />
      </aside>
    </div>
    <QuickNav class="lg:hidden z-50" :items="quickNavItems" />
    <Save v-if="showSaveModal" @save="onSave" @cancel="showSaveModal = false" />
    <img
      v-if="showKhaled"
      class="absolute max-w-screen-sm z-50 rounded shadow-down-xl transform -translate-x-1/2 -translate-y-full bottom-0 -mt-6"
      :style="{ top: `${khaledPosition.y}px`, left: `${khaledPosition.x}px` }"
      src="/khaled.gif"
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
  QuickNav,
} from '@chargetrip/internal-vue-components'

import { Getter, Mutation } from 'vuex-class'
import Table from '~/components/global/PropertyTable.vue'
import RelatedActions from '~/components/RelatedActions.vue'
import PrevNextNavigation from '~/components/PrevNextNavigation.vue'
import Base from '~/mixins/base'
import MarkdownFormatting from '~/components/MarkdownFormatting.vue'
import { Listen } from '~/utilities/decorators'
import Search from '~/components/Search.vue'
import Save from '~/components/Save.vue'

@Component({
  components: {
    Save,
    Search,
    MarkdownFormatting,
    PrevNextNavigation,
    RelatedActions,
    SideNav,
    Table,
    Banner,
    Button,
    QuickNav,
  },
})
export default class Layout extends Mixins(Base) {
  @Getter darkMode
  @Getter sideNav
  @Getter content
  @Getter isEditing
  showSaveModal = false
  showKhaled = false
  khaledPosition = { x: 0, y: 0 }
  @Ref('container') container
  isDev = process.env.NODE_ENV === 'development'
  @Mutation setDarkMode
  @Mutation setIsEditing
  quickNavIcons = ['documentation', 'projects', 'squared-terminal']
  noTransition = false
  timeout = 0
  hElms: any[] = []
  hash = this.$route.hash.slice(1)
  stopReplacing = false
  showSearch = false

  beforeMount() {
    this.openKhaled = this.openKhaled.bind(this)
    this.closeKhaled = this.closeKhaled.bind(this)

    this.$root.$on('openKhaled', this.openKhaled)
    this.$root.$on('closeKhaled', this.closeKhaled)
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

  onSave() {
    this.showSaveModal = false
    this.submit()
  }

  get quickNavItems() {
    return this.sideNav.map((item, i) => {
      return {
        ...item,
        to: item.to || this.findFirstChild(item.children)?.to,
        icon: this.quickNavIcons[i],
      }
    })
  }

  submit() {
    this.$root.$emit('submitEditor')
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
    const sideNav = [
      ...this.sideNav,
      {
        title: 'Tools',
        children: [
          {
            title: 'Playground',
            href: 'https://playground.chargetrip.com/',
            arrow: true,
          },
          {
            title: 'Voyager',
            href: 'https://voyager.chargetrip.com/',
            arrow: true,
          },
          {
            title: 'Dashboard',
            href: 'https://account.chargetrip.com',
            arrow: true,
          },
          {
            title: 'Examples',
            href: 'https://chargetrip.com/examples/',
            arrow: true,
          },
        ],
      },
    ]

    return [sideNav.map(this.attachHandler.bind(this))]
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
    window.fathom?.trackPageview()

    if (!this.container) return

    if (!this.$route.hash?.length) {
      this.scrollTo({ top: 0 })
    }

    this.stopReplacing = true
    setTimeout(() => {
      this.hElms = [
        ...(this.container.querySelectorAll('h2, h3') || []),
      ].filter((el) => el.id)
      this.stopReplacing = false
    }, 300)
  }

  @Listen('scroll') onScroll() {
    if (this.stopReplacing) return

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

  > h3 {
    @apply mt-8 mb-1;
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
    @apply rounded overflow-hidden my-10;
  }

  h1 {
    @apply mb-3;

    + p,
    + p + p {
      @apply text-18 text-font-alt3;

      @screen md {
        @apply pr-24;
      }

      img {
        width: calc(100% + 96px);
        max-width: unset;
      }
    }
  }
}

.layout {
  @screen lg-max {
    &:not(.show-search) {
      .c-side-nav {
      }
    }
    .c-side-nav {
      @apply rounded-t-xl;

      &:not(.show-menu) {
        &:not(.show-search) {
          @apply overflow-hidden;
        }
      }
    }
    .view {
      overflow: unset;
    }
    &.show-search {
      .mobile-search {
        @apply block;
      }
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

  .mobile-search {
    .c-form-control.has-focus,
    .c-form-control.has-hover,
    .c-form-control {
      .box {
        @apply h-14 bg-body rounded-none border-0;

        input {
          @apply px-6;
        }
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

  @screen xl2 {
    .c-side-nav {
      margin-right: 260px;
    }
  }

  .nuxt-content-editor {
    @apply text-font-primary bg-body;
  }
}
</style>
