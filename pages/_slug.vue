<template>
  <div>
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'
import { getFileByPath } from '~/utilities/project.functions'

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

  async asyncData({ $content, route: { path }, store }) {
    const actualPath = getFileByPath(path, store.getters.dirs)
    const page = await $content(actualPath, {
      deep: true,
    }).fetch()

    store.commit('setContent', page)

    return {
      page,
    }
  }
}
</script>
