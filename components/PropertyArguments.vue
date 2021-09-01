<template>
  <div
    class="property-arguments rounded border overflow-hidden border-alt2 mr-4"
    :class="{ active }"
  >
    <div v-show="active">
      <Property v-for="(property, key) in args" :key="key" v-bind="property" />
    </div>
    <div
      class="
        toggle
        cursor-pointer
        text-font-alt3
        bg-subdued
        py-2
        px-4
        flex
        items-center
      "
      @click="active = !active"
    >
      <span
        class="mr-3"
        :class="{ 'icon-add': !active, 'icon-close': active }"
      />
      <p>
        <strong> {{ active ? 'Hide' : 'Show' }} arguments </strong>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class PropertyArguments extends Vue {
  @Prop() args
  active = false
}
</script>
<style lang="scss">
.property-arguments {
  &.active {
    .toggle {
      @apply rounded-t-none;
    }
  }
  .property {
    @apply rounded-none border-alt2 border-0 border-b;
  }
}
</style>
