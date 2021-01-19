<template>
  <li
    class="error flex sm-max:flex-col items-start py-4 border rounded-md border-alt sm:items-center text-14 p-4 mb-2 last:mb-0"
  >
    <Tag color="error" type="secondary">Error</Tag>
    <div class="sm:ml-4 sm-max:mt-2">
      <code class="font-mono uppercase font-medium break-all">{{ code }}</code>
      <p class="text-font-alt3">{{ message }}</p>
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
