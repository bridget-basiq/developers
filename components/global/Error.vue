<template>
  <li
    class="error flex items-start py-4 border rounded-md border-alt items-center text-14 bg-base p-4 mb-2 last:mb-0"
  >
    <Tag color="error" type="secondary">Error</Tag>
    <div class="ml-4">
      <p class="font-mono uppercase leading-none">{{ code }}</p>
      <p class="text-font-alt3">Message: {{ message }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Tag } from '@chargetrip/internal-vue-components'

import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({ components: { Tag } })
export default class Steps extends Vue {
  @Prop() code
  @Prop() message
}
</script>
