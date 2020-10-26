<template>
  <li
    class="property list-none border-alt first:border-t text-14 relative"
    :class="{ 'is-child': depth, 'show-children': showChildren }"
  >
    <div
      class="content py-4 relative"
      :class="{
        'pl-10': depth,
        'border-b': !(active && showChildren),
        'cursor-pointer': !forceActive,
      }"
      @click="active = !active || forceActive"
    >
      <div
        v-if="depth"
        class="line-h absolute w-10 left-0 top-1/2 -ml-5 transform -translate-y-1/2 h-px bg-alt2"
      />
      <div
        v-if="showChildren || depth"
        class="line-v absolute w-px h-full top-0 left-0 -ml-5 bg-alt"
      />

      <div class="relative">
        <div
          class="absolute h-full w-10 flex items-center justify-center left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
        >
          <span
            v-if="children"
            class="z-10 toggle-children bg-body w-4 h-4 flex items-center justify-center text-10 rounded-full border border-accent text-accent"
            :class="{ 'icon-minus': showChildren, 'icon-add': !showChildren }"
            @click.stop="showChildren = !showChildren"
          />
          <span v-else-if="depth" class="w-1 h-1 rounded-full bg-alt2" />
          <div
            v-if="showChildren && depth"
            class="icon-line-v absolute w-px h-full top-1/2 left-1/2 bg-alt -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <p class="text-font-primary flex">
          <span class="font-mono">
            {{ name }}
          </span>
          <template v-if="type">
            <span class="mx-1">•</span>
            <span
              class="type font-mono"
              v-html="$options.filters.colorType(normalizedType)"
            />
            <template
              v-if="
                type.kind === 'LIST' ||
                type.kind === 'OBJECT' ||
                type.kind === 'ENUM'
              "
            >
              <span class="mx-1">•</span>
              <span class="font-mono text-font-alt3">
                <span v-if="type.kind === 'LIST'">[</span
                >{{ type.ofType.name || type.name
                }}<span v-if="type.kind === 'LIST'">]</span>
              </span>
            </template>
          </template>
          <span
            v-if="!depth && description"
            class="ml-auto cursor-pointer"
            :class="{
              'icon-chevron-right': !active,
              'icon-chevron-down': active,
            }"
          />
        </p>
        <p v-if="description && active" class="text-font-alt3">
          {{ description }}
        </p>
      </div>
    </div>
    <ul v-if="children && showChildren">
      <property
        v-for="(child, i) in children"
        :key="i"
        :class="{ 'ml-10': depth }"
        :force-active="true"
        :initial-active="true"
        :depth="depth + 1"
        v-bind="child"
      />
    </ul>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component({ name: 'property' })
export default class Property extends Vue {
  @Prop() name
  @Prop() description
  @Prop({ default: 0 }) depth
  @Prop() type
  @Prop() initialActive
  @Prop() forceActive
  showChildren = false
  active = false

  @Watch('initialActive', { immediate: true }) onActiveChange() {
    this.active = this.initialActive || this.forceActive
  }

  get normalizedType() {
    return this?.type?.kind === 'SCALAR' ? this?.type?.name : this?.type.kind
  }

  get children() {
    return this?.type?.ofType?.fields || this?.type?.ofType?.enumValues
  }
}
</script>
<style lang="scss">
.property {
  &.is-child {
    .content {
      @apply bg-base;
    }

    .toggle-children {
      @apply bg-base;
    }
    .type {
      @apply text-font-primary;
    }
  }
  &:last-child {
    > .content {
      > .line-v {
        @apply h-1/2;
      }
    }
  }
  &:not(.is-child) {
    &:last-child {
      &.show-children {
        > .content {
          > .line-v {
            @apply top-1/2;
          }
        }
      }
    }
  }
}
</style>
