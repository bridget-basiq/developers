<template>
  <li
    class="property list-none text-14 relative"
    :class="{ 'is-child': depth, 'show-children': showChildren }"
  >
    <div
      class="content py-4 relative"
      :class="{
        'sm:pl-10': depth,
        'cursor-pointer': !forceActive,
      }"
      @click="active = !active || forceActive"
    >
      <div
        v-if="depth"
        class="line-h block sm:block hidden absolute w-10 left-0 top-1/2 -ml-5 transform -translate-y-1/2 h-px bg-alt2"
      />
      <div
        v-if="showChildren || depth"
        class="line-v sm:block hidden absolute w-px h-full top-0 left-0 -ml-5 bg-alt2"
      />

      <div class="relative">
        <div
          class="hidden sm:flex absolute h-full w-10 items-center justify-center left-0 top-1/2 transform -translate-y-1/2 -translate-x-full"
        >
          <span
            v-if="children"
            class="z-10 toggle-children bg-body text-accent"
            :class="{
              'icon-circle-cross': showChildren,
              'icon-circle-plus': !showChildren,
            }"
            @click.stop="showChildren = !showChildren"
          />
          <span v-else-if="depth" class="w-1 h-1 rounded-full bg-alt2" />
          <div
            v-if="showChildren && depth"
            class="icon-line-v absolute w-px h-full top-1/2 left-1/2 bg-alt -translate-y-1/2 -translate-x-1/2"
          />
        </div>
        <p class="text-font-primary flex items-center">
          <Tag v-if="showQuery" class="mr-1" color="alt3" type="secondary"
            >Query</Tag
          >
          <span v-else class="font-mono">
            {{ name }}
          </span>
          <template v-if="typeStr">
            <span class="mx-1">•</span>
            <span
              class="type font-mono"
              :class="{ lowercase: typeStr !== 'ID' }"
              v-html="$options.filters.colorType(typeStr)"
            />
          </template>
          <template v-if="showOfTypeKind">
            <span class="mx-1">•</span>
            <span class="font-mono text-font-alt3">
              <span v-if="typeStr === ofTypeKind.LIST">[</span>{{ typeName
              }}<span v-if="typeStr === ofTypeKind.LIST">]</span>
            </span>
          </template>
          <Tag v-if="required" class="ml-2" color="accent" type="secondary"
            >Required</Tag
          >
          <Tag v-if="optional" class="ml-2" color="alt3" type="secondary"
            >Optional</Tag
          >
          <span
            v-if="!depth && description && !forceActive"
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
    <p
      v-if="children"
      class="py-3 mobile-toggle border-t border-alt cursor-pointer text-accent flex items-center justify-between"
      @click="showChildren = !showChildren"
    >
      <strong>
        {{ showChildren ? 'Collapse' : 'Expand' }} {{ typeName }} attrributes
      </strong>
      <span
        class="icon"
        :class="{
          'icon-circle-cross': showChildren,
          'icon-circle-plus': !showChildren,
        }"
      />
    </p>
    <ul v-if="children && showChildren">
      <property
        v-for="(child, i) in children"
        :key="i"
        :class="{ 'sm:ml-10': depth }"
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
import { Tag } from '@chargetrip/internal-vue-components'
import { OfTypeKind } from '~/utilities/constants'

@Component({ name: 'property', components: { Tag } })
export default class Property extends Vue {
  @Prop() name
  @Prop() showRequired
  @Prop() required
  @Prop() optional
  @Prop() showQuery
  @Prop() description
  @Prop({ default: 0 }) depth
  @Prop() type
  @Prop() typeStr
  @Prop() typeName
  @Prop() showOfTypeKind
  @Prop() children
  @Prop() initialActive
  @Prop() forceActive
  showChildren = false
  active = false
  ofTypeKind = OfTypeKind

  @Watch('initialActive', { immediate: true }) onActiveChange() {
    this.active = this.initialActive || this.forceActive
  }
}
</script>
<style lang="scss">
.property,
.property .mobile-toggle,
.property .content {
  @screen sm-max {
    width: calc(100% + 48px);
    @apply -ml-6 px-6;
  }
}
.property {
  .line-v {
    height: calc(100% + 2px);
  }
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
    @apply border-t border-alt;

    @screen sm {
      &:last-child {
        > .content {
          @apply border-b border-alt;
        }
      }
    }
    &.show-children {
      > .content {
        > .line-v {
          @apply top-1/2;
        }
      }
    }
  }

  &.show-children {
    .property.show-children {
      &:not(:last-child) {
        > ul {
          @apply relative;

          &::before {
            content: '';
            @apply bg-alt2 w-px h-full absolute left-0 h-full block -ml-5;
          }
        }
      }
    }
  }
}
</style>
