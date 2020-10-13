<template>
  <a v-show="active" class="example" :href="href" target="_blank">
    <img :src="img" :alt="title" />
    <pre class="text-14 text-font-alt3">{{ tagLine }}</pre>
    <h6 class="my-1">
      {{ title }}
    </h6>
    <p>
      {{ description }}
    </p>
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
  active = true
}
</script>
<style lang="scss">
.example {
  img {
    @apply mt-0 mb-4;
  }
}
</style>
