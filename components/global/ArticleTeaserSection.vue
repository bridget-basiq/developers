<template>
  <section class="article-teaser-section my-14">
    <div class="flex mb-4">
      <h2 class="title">
        {{ title }}
      </h2>
      <img class="ml-auto" src="medium.svg" alt="Medium" />
    </div>
    <slot />
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ArticleTeaserSection extends Vue {
  @Prop() title
}
</script>
<style lang="scss">
.article-teaser-section {
  .article-teaser {
    @apply rounded border border-alt p-6 pt-14;

    img {
      transform: translateY(-50%);
      @apply top-1/2 w-1/3 h-auto;
    }

    .title {
      @apply max-w-md;
    }
  }
}
</style>
