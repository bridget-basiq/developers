<template>
  <nuxt-content :document="page" @dblclick.native="setIsEditing(true)" />
</template>

<script lang="ts">
import { Vue, Component, Mutation } from 'nuxt-property-decorator'

@Component
export default class Slug extends Vue {
  page = null
  @Mutation setIsEditing

  async asyncData({ $content, params, store: { commit } }) {
    const page = await $content(params.slug).fetch()

    commit('setContent', page)
    return {
      page,
    }
  }
}
</script>
