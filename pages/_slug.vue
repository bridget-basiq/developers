<template>
  <div>
    <nuxt-content
      class="max-w-screen-md"
      :document="page"
      @dblclick.native="setIsEditing(true)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class Slug extends Vue {
  page = null
  @Mutation setIsEditing

  async asyncData(args) {
    const {
      $content,
      route: { path },
      store: { commit },
    } = args

    const page = await $content(path, { deep: true }).fetch()

    commit('setContent', page)
    return {
      page,
    }
  }
}
</script>