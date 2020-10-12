<template>
  <div
    class="prev-next-navigation flex py-8 border-t border-alt font-semibold px-8"
  >
    <router-link v-if="prev" class="flex items-center" :to="prev.to">
      <span class="icon-chevron-left" />
      <div class="mx-4">
        <div class="text-14 text-font-alt3">Previous</div>
        <div>{{ prev.title }}</div>
      </div>
    </router-link>
    <router-link
      v-if="next"
      class="flex ml-auto justify-end items-center"
      :to="next.to"
    >
      <div class="mx-4">
        <div class="text-14 text-font-alt3">Next</div>
        <div>{{ next.title }}</div>
      </div>
      <span class="icon-chevron-right" />
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'

@Component
export default class CodeBlock extends Vue {
  @Getter sideNav

  get prev() {
    return this.index ? this.sideNav[this.index - 1] : null
  }

  get index() {
    return this.sideNav.indexOf(this.current)
  }

  get current() {
    return this.sideNav.find((item) => {
      return item.to === this.$route.path
    })
  }

  get next() {
    return this.index < this.sideNav.length
      ? this.sideNav[this.index + 1]
      : null
  }
}
</script>
