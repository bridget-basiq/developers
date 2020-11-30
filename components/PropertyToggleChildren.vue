<template>
  <div
    class="w-10 lg:w-20 flex absolute z-10 h-full left-0 top-0 transform -translate-x-1/2"
  >
    <div class="flex-1 relative">
      <div
        v-if="last"
        class="absolute w-full h-1/2 bottom-0 left-0 bg-base lg:bg-body"
      />
    </div>
    <div
      class="flex-1 relative cursor-pointer"
      @click.stop="$emit('input', !value)"
    >
      <template v-if="children.length">
        <span
          class="z-20 text-accent center"
          :class="{
            'lg-max:hidden': !depth,
            'icon-circle-plus': !value,
            'icon-circle-minus': value,
            ...bg,
          }"
        />
        <div class="absolute w-full h-1/2 top-0 left-0" :class="bg" />
      </template>

      <div
        v-if="depth"
        class="h-px w-full transform -translate-x-1/2 bg-alt2 absolute top-1/2 -translate-y-1/2"
      >
        <div
          class="w-1 h-1 rounded-full right-0 top-1/2 transform -translate-y-1/2 absolute bg-alt2 translate-x-full"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PropertyToggleChildren extends Vue {
  @Prop() depth
  @Prop() children
  @Prop() value
  @Prop() last

  get bg() {
    return { 'bg-body': !this.depth, 'bg-base': this.depth }
  }
}
</script>
