<template>
  <CTable class="no-hover" :columns="columns" :rows="rows" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Table as CTable } from '@chargetrip/internal-vue-components'

@Component({
  components: { CTable },
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

    const keys = this.keys.split(',')
    const types = this.types.split(',')
    const descriptions = this.descriptions.split(',')
    const required = this.required?.split(',')

    return keys.map((_, i) => {
      const arr = [
        `<pre>${keys[i].trim()}</pre>`,
        `<pre class="text-warning">${types[i].trim()}</pre>`,
        descriptions[i].trim(),
      ]

      if (this.required) {
        arr.push(required[i].trim())
      }

      return arr
    })
  }
}
</script>
