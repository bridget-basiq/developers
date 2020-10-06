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
        <a class="mx-1" href="https://chargetrip.com" target="_blank"
          >Developers</a
        >
        /
        <div
          class="ml-1 text-font-primary"
          href="https://chargetrip.com"
          target="_blank"
        >
          Dashboard
        </div>
      </div>
    </Banner>
    <div class="flex bg-body relative z-10 flex-1 overflow-hidden rounded-t-xl">
      <SideNav
        class="text-14"
        :navs="[sideNav]"
        :dark-mode="darkMode"
        @changeDarkMode="setDarkMode"
      />
      <div class="content flex-1 flex flex-col relative overflow-y-scroll">
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
          <Nuxt class="mdx mb-8" />
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { SideNav, Input, Banner } from '@chargetrip/internal-vue-components'
import { Getter, Mutation } from 'vuex-class'
import Table from '~/components/Table.vue'
import RelatedActions from '~/components/RelatedActions.vue'
import PrevNextNavigation from '~/components/PrevNextNavigation.vue'

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
export default class Layout extends Vue {
  @Getter darkMode
  @Getter sideNav
  @Mutation setDarkMode
  noTransition = false
  timeout = 0

  @Watch('darkMode') onDarkModeChange() {
    this.noTransition = true
    clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
      this.noTransition = false
    }, 50)
  }
}
</script>
<style lang="scss">
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

  .mdx {
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
  .c-side-nav {
    flex: 0 0 260px;
  }

  .content {
    max-height: calc(100vh - 34px);
  }
  aside {
    flex: 0 0 383px;
  }
}
</style>
