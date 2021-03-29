<template>
  <div v-if="carList" class="car-list">
    <h2>Available cars</h2>
    <p>
      The table below lists all our supported cars sorted by make. When using
      our API you can use the name of the car or it's id to query for specific
      details. Please reach out to us if you think we are missing out on a
      specific car.
    </p>
    <ul class="mt-5 bor">
      <li
        v-for="(category, categoryKey) in normalizedCarList"
        :key="categoryKey"
        class="divider-y divide-alt text-14 border-alt border-t"
      >
        <div
          class="cursor-pointer py-2.5 flex items-center"
          @click="index = categoryKey"
        >
          <div>
            <p>
              <strong>
                {{ categoryKey }}
              </strong>
            </p>
            <p class="text-font-alt3 mt-0 text-12">
              <strong> {{ category.length }} Cars </strong>
            </p>
          </div>
          <span
            class="icon-chevron-down ml-auto transform"
            :class="{ 'rotate-180': index === categoryKey }"
          />
        </div>
        <ul v-show="index === categoryKey" class="pl-8 border-t border-alt">
          <li
            v-for="(car, carKey) in category"
            :key="carKey"
            class="border-b border-alt last:border-b-0 py-4"
          >
            <p>
              <strong>
                {{ car.name }}
              </strong>
            </p>
            <p class="text-font-alt3 text-12">
              <strong>
                {{ car.id }}
              </strong>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { Getter } from 'nuxt-property-decorator'
import availableVars from '~/utilities/availableVars'

@Component
export default class extends Vue {
  @Mutation setCarCount
  @Getter carList
  index = null

  getCarName({ model, version, chargetrip_version }) {
    return `${model} ${chargetrip_version || version}`
  }

  get normalizedCarList() {
    return this.carList
      ?.slice(0)
      ?.sort((a, b) =>
        a.naming.make < b.naming.make
          ? -1
          : a.naming.make > b.naming.make
          ? 1
          : 0
      )
      .reduce((obj, item) => {
        if (!obj[item.naming.make]) obj[item.naming.make] = []
        obj[item.naming.make].push({
          ...item,
          name: this.getCarName(item.naming),
        })
        return obj
      }, {})
  }

  async fetch() {
    try {
      if (this.carList) return
      await availableVars.carList(this.$store)
    } catch (e) {}
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
