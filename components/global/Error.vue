<template>
  <li class="error flex flex-col items-start py-4 border-t border-alt text-14">
    <div class="flex items-center mb-1">
      <Tag color="error" type="secondary">Error</Tag>
      <p class="ml-1 font-mono uppercase leading-none">{{ code }}</p>
    </div>
    <p class="text-font-alt3">Message: {{ message }}</p>
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
