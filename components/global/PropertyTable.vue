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
        :font-family="c <= 1 ? 'mono' : null"
        :color="c === 1 ? 'warning' : null"
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
  @Prop() keys
  @Prop() types
  @Prop() descriptions
  @Prop() required

  get columns() {
    const columns = ['Key', 'Type', 'Description']

    if (this.required) {
      columns.push('Required')
    }

    return columns
  }

  get rows() {
    if (!this.keys) {
      return []
    }

    const keys = Array.isArray(this.keys) ? this.keys : this.keys?.split('|')

    const types = Array.isArray(this.types)
      ? this.types
      : this.types?.split('|')

    const descriptions = Array.isArray(this.descriptions)
      ? this.descriptions
      : this.descriptions?.split('|')

    const required = Array.isArray(this.required)
      ? this.required
      : this.required?.split('|')

    return keys.map((_, i) => [
      keys?.[i].trim(),
      types?.[i].trim(),
      descriptions?.[i].trim(),
      required?.[i]?.trim(),
    ])
  }
}
</script>
