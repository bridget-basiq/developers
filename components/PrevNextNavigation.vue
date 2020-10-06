<template>
  <div
    class="prev-next-navigation grid grid-cols-2 py-8 border-t border-alt font-semibold px-8"
  >
    <div class="flex items-center">
      <span class="icon-chevron-left" />
      <div class="mx-4">
        <div class="text-14 text-font-alt3">Previous</div>
        <div>Getting Started</div>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <div class="mx-4">
        <div class="text-14 text-font-alt3">Next</div>
        <div>Getting Started</div>
      </div>
      <span class="icon-chevron-right" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'

@Component
export default class CodeBlock extends Vue {
  @Getter sideNav
}
</script>
