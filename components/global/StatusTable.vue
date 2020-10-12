<template>
  <CTable class="no-hover" :columns="['Status', 'Descriptions']" :rows="rows" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Table as CTable } from '@chargetrip/internal-vue-components'

@Component({
  components: { CTable },
})
export default class PropertyTable extends Vue {
  @Prop() statuses
  @Prop() descriptions

  get rows() {
    if (!this.statuses) {
      return []
    }

    const keys = this.statuses.split(',')
    const descriptions = this.descriptions.split(',')

    return keys.map((_, i) => [
      `<strong>${keys[i].trim()}</strong>`,
      descriptions[i].trim(),
    ])
  }
}
</script>
