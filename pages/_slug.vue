<template>
  <div v-if="page">
    <div v-if="alternate" class="animate" v-animate>
      <nuxt-content :class="page.slug" :document="page" />
    </div>
    <div v-else class="animate" v-animate>
      <nuxt-content :class="page.slug" :document="page" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { Mutation } from 'vuex-class'
import { getFileByPath, getHeadings } from '~/utilities/project.functions'

@Component
export default class Slug extends Vue {
  @Getter alternate
  page: any = null
  @Mutation setIsEditing

  head() {
    if (!this.page) return

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

    const normalizedPage = {
      ...page,
      headings: getHeadings(page.body.children, page).map((child) => ({
        to: path,
        hash: child.props.id,
        inset: child.inset,
        title: child.title || child.children[1].value,
      })),
    }

    store.commit('setContent', normalizedPage)
    store.commit('setAlternate', !store.getters.alternate)

    return {
      page: normalizedPage,
    }
  }
}
</script>
