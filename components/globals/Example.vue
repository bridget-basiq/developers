<template>
  <a class="example flex items-center" :href="href" target="_blank">
    <c-image class="w-1/3 mr-4" :src="img" :alt="title" />
    <div class="w-2/3 text-14">
      <strong>
        <span class="text-font-alt3">
          {{ category }}
        </span>
        • {{ title }}
      </strong>
      <p class="text-14">
        {{ description }}
      </p>
    </div>
  </a>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Example extends Vue {
  @Prop() title
  @Prop() description
  @Prop() img
  @Prop() category
  @Prop() tagLine
  @Prop() href
}
</script>
