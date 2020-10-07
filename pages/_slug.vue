<template>
  <div class="container">
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Slug extends Vue {
  page = null

  async asyncData({ $content, params }) {
    const page = await $content(params.slug || 'getting-started').fetch()
    return {
      page,
    }
  }
}
</script>
