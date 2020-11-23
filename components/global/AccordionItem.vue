<template>
  <div class="accordion-item py-4 border-b border-alt text-14">
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="active = !active"
    >
      <p>
        <strong>
          {{ title }}
        </strong>
      </p>
      <span
        class="text-accent"
        :class="{ 'icon-circle-plus': !active, 'icon-circle-minus': active }"
      />
    </div>
    <div v-show="active" class="text-font-alt3 mt-1">
      <p v-if="description">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class AccordionItem extends Vue {
  @Prop() title
  @Prop() description
  active = false
}
</script>
