<template>
  <div
    v-if="prev || next"
    class="prev-next-navigation flex p-6 lg:p-8 border-t border-alt font-semibold"
  >
    <router-link
      v-if="prev && prev.to"
      class="w-1/2 flex items-center"
      :to="prev.to"
    >
      <span class="icon-chevron-left" />
      <div class="mx-4 truncate">
        <div class="text-14 text-font-alt3">Previous</div>
        {{ prev.title }}
      </div>
    </router-link>
    <router-link
      v-if="next && next.to"
      class="w-1/2 flex ml-auto justify-end items-center"
      :to="next.to"
    >
      <div class="mx-4 truncate">
        <div class="text-14 text-font-alt3">Next</div>
        {{ next.title }}
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

  get index() {
    return this.parent.children.indexOf(this.current)
  }

  get parent(): any {
    return this.findParent(this.sideNav, this.current.to)
  }

  get parentIndex() {
    return this.grandParent.children.indexOf(this.parent)
  }

  get grandParent(): any {
    return this.findParent(
      this.sideNav,
      this.current.to.split('/').slice(0, -1).join('/')
    )
  }

  findParent(arr, url) {
    let parent = null

    arr.forEach((child) => {
      const find = child?.children?.find(
        (_child) =>
          !_child?.hash?.length && (_child.to || _child.fullPath) === url
      )

      if (find) {
        return (parent = child)
      }

      if (child.children) {
        parent = this.findParent(child.children, url) || parent
      }
    })

    return parent
  }

  findRecursive(arr) {
    let item = null

    arr.forEach((child) => {
      if (!child?.hash?.length && child.to === this.$route.path) {
        item = child
      }

      if (child.children) {
        item = this.findRecursive(child.children) || item
      }
    })

    return item
  }

  get current(): any {
    return this.findRecursive(this.sideNav) || {}
  }

  get prev() {
    return (
      this.parent?.children?.[this.index - 1] ||
      this.grandParent?.children?.[this.parentIndex - 1]?.children?.[
        this.grandParent?.children?.[this.parentIndex - 1]?.children?.length - 1
      ]
    )
  }

  get next() {
    return (
      this.parent?.children?.[this.index + 1] ||
      this.grandParent?.children?.[this.parentIndex + 1]?.children?.[0]
    )
  }
}
</script>
