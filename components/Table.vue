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
.home .dev-portal-table {
  table {
    @apply mb-0;
  }
  @screen lg-max {
    tr,
    td {
      @apply block;
    }
    tr {
      width: calc(100% + 48px);
      @apply -ml-6 relative;

      &:first-child {
        @apply hidden;
      }

      &::after {
        content: '\e92f';
        font-family: icomoon;
        @apply absolute right-0 top-1/2 transform -translate-y-1/2 mr-6;
      }
    }
    td {
      @apply block h-auto pl-6 pr-12;

      &:first-child {
        @apply pt-4 pb-0;

        .bg {
          @apply border-0;
        }
      }

      &:last-child {
        @apply pb-4 pt-0;
      }
    }
  }
}
</style>
