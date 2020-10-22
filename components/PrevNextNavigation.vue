<template>
  <div
    v-if="prev || next"
    class="prev-next-navigation flex py-8 border-t border-alt font-semibold px-8"
  >
    <router-link v-if="prev && prev.to" class="flex items-center" :to="prev.to">
      <span class="icon-chevron-left" />
      <div class="mx-4">
        <div class="text-14 text-font-alt3">Previous</div>
        <div>{{ prev.title }}</div>
      </div>
    </router-link>
    <router-link
      v-if="next && next.to"
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
    return this.parent?.children?.[this.index - 1]
  }

  get index() {
    return this.parent.children.indexOf(this.current)
  }

  get parent(): any {
    return this.findParent(this.sideNav)
  }

  findParent(arr) {
    let item = null

    arr.forEach((x) => {
      const index = x?.children?.findIndex(
        (child) => !child?.hash?.length && child.to === this.current.to
      )

      item = index >= 0 ? x : null

      if (x.children) {
        item = this.findParent(x.children) || item
      }
    })

    return item
  }

  findRecursive(arr) {
    let item = null

    arr.forEach((x) => {
      if (!x?.hash?.length && x.to === this.$route.path) {
        item = x
      }

      if (x.children) {
        item = this.findRecursive(x.children) || item
      }
    })

    return item
  }

  get current(): any {
    return this.findRecursive(this.sideNav) || {}
  }

  get next() {
    return this.parent?.children?.[this.index + 1]
  }
}
</script>
