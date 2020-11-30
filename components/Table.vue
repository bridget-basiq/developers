<template>
  <div class="dev-portal-table">
    <CTable v-if="hasDefaultSlot">
      <slot />
    </CTable>
    <CTable v-if="normalizedColumns.length">
      <Row>
        <Cell v-for="(col, c) in normalizedColumns" :key="c" tag="th">
          {{ col }}
        </Cell>
      </Row>
      <Row v-for="(row, key) in normalizedRows" :key="key">
        <Cell v-for="(_, c) in normalizedColumns" :key="`${key}-${c}`">
          {{ row[c] }}
        </Cell>
      </Row>
    </CTable>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Table as CTable, Row, Cell } from '@chargetrip/internal-vue-components'
import { toSentenceCase } from 'js-convert-case/lib'
import Property from '~/components/Property.vue'

@Component({ components: { Property, CTable, Row, Cell } })
export default class Table extends Vue {
  @Prop() columns
  @Prop() rows

  get normalizedColumns() {
    return this.columns || Object.keys(this.$attrs).map(toSentenceCase)
  }

  get hasDefaultSlot() {
    return (
      (this.$slots.default && this.$slots.default.length > 1) ||
      this.$slots.default?.[0]?.text !== '\n'
    )
  }

  get normalizedRows() {
    const values: any = Object.values(this.$attrs)

    return (
      this.rows ||
      values?.[0]?.map((_, i) => {
        return values?.map((val) => val[i])
      })
    )
  }
}
</script>
<style lang="scss">
.dev-portal-table {
  @screen lg-max {
    tr,
    td {
      @apply block;
    }
    tr {
      width: calc(100% + 48px);
      @apply -ml-6;

      &:first-child {
        @apply hidden;
      }
    }
    td {
      @apply block h-auto px-6;

      &:first-child {
        @apply pt-4;
      }

      &:last-child {
        @apply pb-4;
      }
    }
  }
}
</style>
