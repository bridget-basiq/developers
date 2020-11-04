<template>
  <div class="examples my-14">
    <div class="flex mb-4 items-center flex-wrap justify-between">
      <h2>{{ title }}</h2>
      <nav class="text-font-alt3 mt-2 lg:mt-0 flex font-semibold">
        <div
          v-for="(category, key) in categories"
          :key="key"
          class="cursor-pointer mr-4 last:mr-0"
          :class="{ 'text-accent': key === index }"
          @click="index = key"
        >
          {{ category }}
        </div>
      </nav>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:gap-4 gap-8">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Watch } from 'vue-property-decorator'

@Component
export default class Examples extends Vue {
  @Prop() title
  @Prop() examples
  categories: string[] = []
  index: number | null = null

  created() {
    this.categories =
      this.$slots?.default
        ?.map(
          (child: any) =>
            child?.asyncMeta?.data?.attrs?.category ||
            child?.componentOptions?.propsData?.category
        )
        ?.filter((category) => category) || []
  }

  @Watch('index') onIndexChange() {
    this.$slots?.default?.map((child) => {
      if (child?.componentInstance?.$data) {
        if (this.index === null) {
          // @ts-ignore
          child?.componentInstance?.$data?.active = true
        } else {
          // @ts-ignore
          child?.componentInstance?.$data?.active =
            child?.componentInstance?.$props.category ===
            this.categories[this.index]
        }
      }
    })
  }
}
</script>
<style lang="scss">
.examples {
  h2 {
    @apply m-0;
  }
}
</style>
