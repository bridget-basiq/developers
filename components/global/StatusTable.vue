<template>
  <CTable class="no-hover" :columns="['Status', 'Description']" :rows="rows" />
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
    const statuses = Array.isArray(this.statuses)
      ? this.statuses
      : this.statuses?.split('|')

    const descriptions = Array.isArray(this.descriptions)
      ? this.descriptions
      : this.descriptions?.split('|')

    return this.statuses.map((_, i) => [
      `<strong>${statuses?.[i]}</strong>`,
      descriptions?.[i],
    ])
  }
}
</script>
