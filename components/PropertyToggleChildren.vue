<template>
  <div
    class="property-toggle-children w-10 lg:w-14 flex absolute z-10 h-full left-0 top-0 cursor-pointer"
    @click.stop="$emit('input', !value)"
  >
    <template v-if="children.length">
      <span
        class="icon bg-base z-20 text-accent center"
        :class="{
          'icon-circle-plus': !value,
          'icon-circle-minus': value,
        }"
      />
      <div
        class="absolute w-3 h-1/2 top-0 left-1/2 transform -translate-x-1/2 bg-base"
      />
    </template>

    <div
      v-if="depth"
      class="line-h z-10 h-px w-full transform -translate-x-1/2 bg-alt2 absolute top-1/2 -translate-y-1/2"
    >
      <div
        class="dot w-1 h-1 rounded-full right-0 top-1/2 transform -translate-y-1/2 absolute bg-alt2 translate-x-full"
      />
    </div>
    <div
      v-if="last"
      class="absolute w-full h-1/2 bottom-0 left-0 bg-base transform -translate-x-full"
    />
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
}
</script>
