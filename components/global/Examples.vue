<template>
  <div class="examples my-14">
    <div class="flex mb-4 items-center">
      <h2 class="!m-0">Clone an example</h2>
      <nav class="text-font-alt3 ml-auto flex font-semibold">
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
    <div class="grid grid-cols-2 gap-4">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Watch } from 'vue-property-decorator'

@Component
export default class Examples extends Vue {
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
