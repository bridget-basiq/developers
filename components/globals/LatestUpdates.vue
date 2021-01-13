<template>
  <div v-if="items.length" class="latest-updates p-8 border-b border-alt">
    <div class="flex items-center">
      <h2>Latest updates</h2>
      <router-link
        class="font-semibold text-accent ml-auto"
        to="/release-notes"
      >
        View all
      </router-link>
    </div>
    <ul class="mt-8">
      <li v-for="(item, key) in items" :key="key" class="mb-6 last:mb-0">
        <div>
          {{ item.props.title }}
        </div>
        <span class="text-font-alt3">
          {{ item.props.date }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LatestUpdates extends Vue {
  items = []

  async fetch() {
    const releasePage = (
      await this.$content('', { deep: true })
        .where({ releasePage: true })
        .fetch()
    )?.[0]

    if (releasePage) {
      this.items = releasePage.body.children
        .filter((child) => child.tag === 'release-note')
        .slice(0, 2)
    }
  }
}
</script>
