<template>
  <CTable
    class="no-hover"
    :columns="['Key', 'Type', 'Description', 'Required']"
    :rows="rows"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Table as CTable } from '@chargetrip/internal-vue-components'

@Component({
  components: { CTable },
})
export default class CodeBlock extends Vue {
  @Prop() keys
  @Prop() types
  @Prop() descriptions
  @Prop() required

  get rows() {
    if (!this.keys) {
      return []
    }

    const keys = this.keys.split(',')
    const types = this.types.split(',')
    const descriptions = this.descriptions.split(',')
    const required = this.required.split(',')

    return keys.map((_, i) => [
      `<pre>${keys[i].trim()}</pre>`,
      `<pre class="text-warning">${types[i].trim()}</pre>`,
      descriptions[i].trim(),
      required[i].trim(),
    ])
  }
}
</script>
<style lang="scss">
.table {
  .col {
    &.first-col {
      @apply pl-0;
    }
    &.last-col {
      @apply pr-0;
    }
  }
}
</style>
