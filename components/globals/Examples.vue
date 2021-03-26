<template>
  <right-aside class="examples px-8 flex flex-col overflow-y-scroll">
    <div class="sticky-header">
      <h2>Examples</h2>
    </div>
    <div class="container">
      <slot />
    </div>
  </right-aside>
</template>
<style lang="scss">
.examples {
  height: calc(100vh - 64px);

  .example {
    &:last-child {
      @apply pb-8;
    }
    &:not(:last-child) {
      @apply mb-4;
    }
  }
}
</style>
