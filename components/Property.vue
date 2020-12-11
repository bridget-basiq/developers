<template>
  <li
    :id="propertyId"
    class="property list-none text-14 relative"
    :class="{
      'is-child': depth,
      'has-children': children.length,
      'show-children': showChildren,
      'is-deprecated': isDeprecated,
    }"
  >
    <div
      v-if="showChildren && children.length"
      class="main-line w-10 lg:w-14 absolute left-0 top-0 h-full z-10"
    >
      <div
        class="line-v w-px h-full absolute transform left-1/2 -translate-x-1/2 bg-alt2"
      />
    </div>
    <div class="content p-4 relative">
      <div class="bg absolute inset-0" />
      <PropertyToggleChildren v-model="showChildren" v-bind="$props" />
      <PropertyTitle v-bind="$props" />
      <div
        v-if="description"
        class="description text-font-alt3"
        v-html="$options.filters.markdown(description)"
      />
    </div>
    <ul v-if="showChildren && children.length" class="children pl-10 lg:pl-14">
      <property
        v-for="(child, i) in children"
        :key="i"
        :last="i === children.length - 1"
        :depth="depth + 1"
        v-bind="child"
      />
    </ul>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Tag } from '@chargetrip/internal-vue-components'
import { OfTypeKind } from '~/utilities/constants'
import PropertyTitle from '~/components/PropertyTitle.vue'
import PropertyToggleChildren from '~/components/PropertyToggleChildren.vue'

@Component({
  name: 'property',
  components: { PropertyToggleChildren, PropertyTitle, Tag },
})
export default class Property extends Vue {
  @Prop() propertyId
  @Prop() isDeprecated
  @Prop() name
  @Prop() last
  @Prop() showRequired
  @Prop() required
  @Prop() optional
  @Prop() description
  @Prop({ default: 0 }) depth
  @Prop() type
  @Prop() typeStr
  @Prop() typeName
  @Prop() showOfTypeKind
  @Prop({ default: () => [] }) children
  showChildren = false
  ofTypeKind = OfTypeKind

  created() {
    this.showChildren = this.getShowChildren()
  }

  getShowChildren() {
    let currentHash = ''
    let showChildren = false

    this.$route.hash
      .replace('#', '')
      .split('-')
      .forEach((part) => {
        currentHash += part

        if (currentHash === this.propertyId) {
          showChildren = true
        }

        currentHash += '-'
      })

    return showChildren
  }
}
</script>
<style lang="scss">
.property {
  &.has-children {
    > .content {
      @apply pl-14;

      @screen lg-max {
        @apply pl-10;
      }
    }
  }
  &.is-deprecated {
    > .content .truncate > *:not(.deprecated-tag),
    > .children .truncate,
    > .children .description,
    > .children .content > .bg {
      @apply opacity-50;
    }
  }
  &.is-child {
    .content .bg,
    .bg,
    .toggle-children {
      @apply bg-base;
    }

    > .content {
      @apply pl-12;

      @screen lg-max {
        @apply pl-8;
      }
    }

    .type {
      @apply text-font-primary;
    }
    &:last-child {
      > .children {
        @apply relative;

        &::before {
          content: '';
          @apply w-10 transform z-10 -ml-10 bg-base h-full left-0 top-0 absolute bg-base;
        }
      }
    }
  }

  > .content > .bg {
    z-index: -1;
  }
  &:not(.is-child) {
    @apply border border-alt bg-base rounded-md mb-2;

    &:last-child {
      @apply mb-0;
    }
  }
}
</style>
