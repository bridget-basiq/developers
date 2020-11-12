<template>
  <div>
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class Slug extends Vue {
  page: any = null
  @Mutation setIsEditing

  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.page.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.page.description,
        },
      ],
    }
  }

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
