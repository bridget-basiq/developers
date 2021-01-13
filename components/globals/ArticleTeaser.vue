<template>
  <article
    class="article-teaser pl-8 py-8 block relative border-b border-alt pr-20 overflow-hidden relative"
  >
    <h3 v-if="title" class="title">
      {{ title }}
    </h3>
    <p v-if="description">
      {{ description }}
    </p>
    <slot />
    <strong class="text-accent mt-3 block"> Read more </strong>
    <img
      class="absolute h-full w-auto right-0 top-0"
      src="globe.svg"
      alt="Globe"
    />
    <a
      :href="href"
      class="text-accent absolute inset-0 mt-3 block"
      target="_blank"
      rel="noopener"
    />
  </article>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CImage extends Vue {
  @Prop() href
  @Prop() title
  @Prop() description
}
</script>
<style lang="scss">
.article-teaser {
  img {
    height: 150%;
    transform: translateY(-33.333%);
  }

  p {
    @apply my-3;
  }
}
</style>
