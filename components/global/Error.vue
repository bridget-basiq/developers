<template>
  <div
    class="error flex flex-col items-start py-4 border-t border-alt border-b last:border-b-0 mt-6 text-14"
  >
    <div class="flex items-center">
      <Tag color="error" type="secondary">Error</Tag>
      <p class="ml-1 font-mono uppercase">{{ title }}</p>
    </div>
    <p class="text-font-alt3">Message: {{ message }}</p>
  </div>
</template>
<script lang="ts">
import { Tag } from '@chargetrip/internal-vue-components'

import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({ components: { Tag } })
export default class Steps extends Vue {
  @Prop() title
  @Prop() message
}
</script>
