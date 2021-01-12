<template>
  <div class="examples px-8 flex flex-col overflow-y-scroll">
    <div class="sticky-header">
      <h2>Examples</h2>
    </div>
    <slot />
  </div>
</template>
<style lang="scss">
.examples {
  height: calc(100vh - 34px);

  .example {
    &:last-child {
      @apply mb-8;
    }
    &:not(:last-child) {
      @apply mb-4;
    }
  }
}
</style>
