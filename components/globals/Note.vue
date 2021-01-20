<template>
  <div
    class="note-comp border border-warning rounded p-6 flex flex-col items-start mt-8"
  >
    <Tag color="warning" class="mb-3" type="secondary" size="xs">Note</Tag>
    <div class="text-font-alt">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tag } from '@chargetrip/internal-vue-components'

@Component({ components: { Tag } })
export default class extends Vue {}
</script>
<style lang="scss">
.note-comp {
  background: rgba(252, 215, 186, 0.2);
  padding-bottom: 1.5rem !important;
}
</style>
