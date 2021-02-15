<template>
  <div class="car-list">
    <h3>Available cars</h3>
    <p>In the table below you can find all our available cars.</p>
    <CarList
      v-if="carList"
      class="car-list mt-4 border-alt border-t border-b"
      :car-list="carList"
      :value="value"
      :readonly="true"
      :label-fn="labelFn"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CarList } from '@chargetrip/internal-vue-components'

@Component({ components: { CarList } })
export default class extends Vue {
  carList: any = []
  value: any = []

  labelFn(option) {
    return `${option.children.length} Cars`
  }

  async fetch() {
    try {
      this.carList = (await import(`~/static/carList.json`)).default
      this.value = this.carList.map((car) => car.id)
    } catch (e) {
      this.carList = []
    }
  }
}
</script>
<style lang="scss">
.car-list {
  .checkbox-tree-list {
    li ul {
      @apply pl-7;

      .c-checkbox:not(.active) {
        @apply opacity-100;
      }

      li {
        @apply pl-0;
      }
    }
  }
}
</style>
