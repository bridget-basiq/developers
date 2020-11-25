<template>
  <div class="related-actions text-14">
    <h2 class="mb-8">Related actions</h2>
    <nav>
      <MenuItem v-for="(item, key) in items" :key="key" v-bind="item" />
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import { MenuItem } from '@chargetrip/internal-vue-components'

@Component({ components: { MenuItem } })
export default class RelatedActions extends Vue {
  @Getter content

  get items() {
    return [
      {
        title: 'Suggest an edit',
        icon: 'edit',
        href: this.githubUrl,
      },
      {
        title: 'View API reference',
        icon: 'terminal',
        to: '/API/API-Reference/Stations/introduction',
      },
      {
        title: 'Contact sales',
        icon: 'contact',
      },
    ]
  }

  get githubUrl() {
    return `https://github.com/chargetrip/chargetrip-developers/tree/main/content${this.content?.dir}/${this.content?.slug}${this.content?.extension}`
  }
}
</script>
<style lang="scss">
.related-actions {
  .c-menu-item.has-icon {
    @apply h-10;
  }
}
</style>
