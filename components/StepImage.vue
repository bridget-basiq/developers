<template>
  <div
    class="step-image md:rounded overflow-hidden"
    :class="{ 'bg-accent': !darkMode, 'bg-base': darkMode }"
  >
    <c-image class="shadow-down-md" :alt="title" :src="src" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component
export default class CStepImage extends Vue {
  @Prop() src
  @Prop() title
  @Getter darkMode
}
</script>
