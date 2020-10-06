<template>
  <div class="related-actions">
    <h2 class="mb-8">Related actions</h2>
    <nav>
      <MenuItem v-for="(item, key) in items" :key="key" v-bind="item" />
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { MenuItem } from '@chargetrip/internal-vue-components'

@Component({ components: { MenuItem } })
export default class RelatedActions extends Vue {
  items = [
    {
      title: 'Suggest an edit',
      icon: 'edit',
    },
    {
      title: 'View API reference',
      icon: 'terminal',
    },
    {
      title: 'Contact sales',
      icon: 'contact',
    },
  ]
}
</script>
