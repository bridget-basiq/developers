<template>
  <div
    class="layout flex flex-col antialiased font-body min-h-screen text-font-primary text-16 bg-body overflow-hidden"
    :class="{
      'theme-dark': darkMode,
      'theme-light': !darkMode,
      'no-transition': noTransition,
    }"
  >
    <Banner type="switcher">
      <div class="flex w-full text-font-alt3 text-12 font-semibold">
        <a class="mr-1" href="https://chargetrip.com" target="_blank"
          >Website</a
        >
        /
        <a
          class="mx-1 text-font-primary"
          href="https://chargetrip.com"
          target="_blank"
          >Developers</a
        >
        /
        <div class="ml-1" href="https://chargetrip.com" target="_blank">
          Dashboard
        </div>
      </div>
    </Banner>
    <div class="flex bg-body relative z-10 flex-1 overflow-hidden rounded-t-xl">
      <SideNav
        class="text-14"
        :navs="normalizedSideNav"
        :dark-mode="darkMode"
        @changeDarkMode="setDarkMode"
      />
      <div
        ref="container"
        class="content flex-1 flex flex-col relative overflow-y-scroll"
        @scroll="onScroll"
      >
        <div class="px-8">
          <div class="sticky-header flex items-start">
            <Input
              type="search"
              icon="search"
              :hotkey="{
                icon: 'slash',
                key: '/',
                fn: (input) => input.focus(),
              }"
              placeholder="Search documentation"
            />
          </div>
          <Nuxt class="page mb-8" />
        </div>
        <PrevNextNavigation class="mt-auto" />
      </div>
      <aside class="border-l border-alt p-8">
        <RelatedActions />
      </aside>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Ref } from 'nuxt-property-decorator'
import { Mixins } from 'vue-property-decorator'
import { SideNav, Input, Banner } from '@chargetrip/internal-vue-components'
import { Getter, Mutation } from 'vuex-class'
import Table from '~/components/global/PropertyTable.vue'
import RelatedActions from '~/components/RelatedActions.vue'
import PrevNextNavigation from '~/components/PrevNextNavigation.vue'
import Base from '~/mixins/base'

@Component({
  components: {
    PrevNextNavigation,
    RelatedActions,
    SideNav,
    Input,
    Table,
    Banner,
  },
})
export default class Layout extends Mixins(Base) {
  @Getter darkMode
  @Getter sideNav
  @Ref('container') container
  @Mutation setDarkMode
  noTransition = false
  timeout = 0
  h2Elms: any[] = []
  hash = this.$route.hash.slice(1)
  stopReplacing = false

  mounted() {
    this.onRouteChange()
    if (this.hash.length) {
      this.onSubMenuItemClick({ hash: this.hash })
    }
    if (process.env.NODE_ENV === 'development') {
      this.$nuxt.$on('content:update', () => {
        setTimeout(this.onRouteChange.bind(this), 100)
      })
    }
  }

  get normalizedSideNav() {
    return [
      this.sideNav.map((item) => ({
        ...item,
        children: item.children.map((child) => ({
          ...child,
          callback: this.onSubMenuItemClick.bind(this),
        })),
      })),
    ]
  }

  onSubMenuItemClick(item) {
    this.stopReplacing = true

    if (!item.hash?.length) return

    let times = 0

    const interval = setInterval(() => {
      times++

      if (times > 10) clearInterval(interval)

      const el = this.container.querySelector(`#${item.hash}`)
      if (!el) return
      const rect = el.getBoundingClientRect()

      this.container.scrollTo({
        top: this.container.scrollTop + rect.top - 112,
        behavior: 'smooth',
      })

      setTimeout(() => {
        this.stopReplacing = false
      }, 1000)
    }, 50)
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

  @Watch('$route.path') onRouteChange() {
    if (!this.container) return

    this.stopReplacing = true
    this.container.scrollTo(0, 0)
    setTimeout(() => {
      this.h2Elms = [...(this.container.querySelectorAll('h2') || [])]
      this.stopReplacing = false
    }, 100)
  }

  onScroll() {
    if (this.stopReplacing) return

    const h2 = this.h2Elms.reduce((current, h2) => {
      const rect = h2.getBoundingClientRect()

      if (rect.top <= 112) {
        current = h2
      }

      return current
    }, null)

    if (h2?.id) {
      const hash = h2.id
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
</script>
<style lang="scss">
.page {
  .code-block {
    @apply my-4;
  }
  .table {
    @apply mt-6 mb-10;
  }
  h2 {
    @apply mt-14 mb-2;
  }

  p {
    & + p {
      @apply mt-4;
    }

    > code {
      @apply rounded-2xs bg-base border border-alt px-1;
    }
  }
  img {
    @apply rounded border border-alt overflow-hidden my-10;
  }
  h1 {
    @apply mb-3;

    & + p {
      @apply text-18;
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
  .c-side-nav {
    flex: 0 0 260px;
  }

  .content {
    max-height: calc(100vh - 34px);
  }
  aside {
    flex: 0 0 383px;
  }

  .nuxt-content-editor {
    @apply text-font-primary bg-body;
  }
}
</style>
