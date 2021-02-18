<template>
  <div class="car-list">
    <h2>Available cars</h2>
    <p>The table below lists all our supported cars sorted by make. When using our API you can use the name of the car or it's id to query for specific details. Please reach out to us if you think we are missing out on a specific car.</p>
    <CarList
      v-if="carList"
      class="car-list mt-4 border-alt border-t border-b"
      :car-list="carList"
      :value="normalizedCarList"
      :readonly="true"
      :label-fn="labelFn"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CarList } from '@chargetrip/internal-vue-components'
import { Mutation } from 'vuex-class'
import { Getter } from 'nuxt-property-decorator'
import availableVars from '~/utilities/availableVars'

@Component({ components: { CarList } })
export default class extends Vue {
  @Mutation setCarCount
  @Getter carList
  value: any = []

  labelFn(option) {
    return `${option.children.length} Cars`
  }

  get normalizedCarList() {
    return (this.carList || []).map((car) => car.id)
  }

  async fetch() {
    try {
      if (this.carList) return
      await availableVars.carList(this.$store)
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
