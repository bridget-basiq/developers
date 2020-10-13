<template>
  <div class="guides my-14">
    <div class="flex mb-4 items-center">
      <h2 class="!m-0">Guides</h2>
      <nav class="ml-auto">&lt;- -></nav>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Examples extends Vue {}
</script>
