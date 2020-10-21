<template>
  <div class="step-note flex pt-6 mt-6 border-t border-alt mr-14">
    <Tag class="mr-6" :color="color" type="secondary">{{ title }}</Tag>
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Tag } from '@chargetrip/internal-vue-components'

@Component({ components: { Tag } })
export default class Steps extends Vue {
  @Prop() title
  @Prop() color
}
</script>
