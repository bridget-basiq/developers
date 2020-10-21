<template>
  <nuxt-content
    class="max-w-screen-md"
    :document="page"
    @dblclick.native="setIsEditing(true)"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class Slug extends Vue {
  page = null
  @Mutation setIsEditing

  async asyncData({ $content, route: { path }, store: { commit } }) {
    const page = await $content(path, { deep: true }).fetch()

    commit('setContent', page)
    return {
      page,
    }
  }
}
</script>
