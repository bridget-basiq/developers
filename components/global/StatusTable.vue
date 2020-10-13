<template>
  <CTable>
    <Row>
      <Cell v-for="(col, c) in columns" :key="c" tag="th">
        {{ col }}
      </Cell>
    </Row>
    <Row v-for="(row, key) in rows" :key="key">
      <Cell
        v-for="(_, c) in columns"
        :key="`${key}-${c}`"
        :font-weight="!c ? 'semibold' : null"
      >
        {{ row[c] }}
      </Cell>
    </Row>
  </CTable>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Table as CTable, Row, Cell } from '@chargetrip/internal-vue-components'

@Component({
  components: { CTable, Row, Cell },
})
export default class PropertyTable extends Vue {
  @Prop() statuses
  @Prop() descriptions

  get columns() {
    return ['Status', 'Description']
  }

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

    return this.statuses.map((_, i) => [statuses?.[i], descriptions?.[i]])
  }
}
</script>
