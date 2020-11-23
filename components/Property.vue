<template>
  <li
    :id="normalizedSectionID"
    class="property list-none text-14 relative"
    :class="{ 'is-child': depth, 'show-children': showChildren }"
  >
    <div
      v-if="showChildren"
      class="main-line w-5 lg:w-10 absolute left-0 top-0 h-full z-10 transform -translate-x-full"
    >
      <div
        class="line-v w-px h-full absolute transform left-1/2 -translate-x-1/2 bg-alt2"
      />
    </div>
    <div
      class="content pl-6 lg:pl-10 -ml-5 lg:-ml-10 py-4 relative"
      :class="{
        'cursor-pointer': !forceActive,
      }"
      @click="active = !active || forceActive"
    >
      <PropertyToggleChildren v-model="showChildren" v-bind="$props" />
      <PropertyTitle v-bind="$props" :active="active" />
      <p v-if="description" v-show="active" class="description text-font-alt3">
        {{ description }}
      </p>
    </div>
    <p
      v-if="children.length && !depth"
      class="py-3 mobile-toggle bg-body z-20 relative flex lg:hidden border-t border-alt cursor-pointer text-accent items-center"
      @click="showChildren = !showChildren"
    >
      <span
        class="icon mr-3"
        :class="{
          'icon-circle-cross': showChildren,
          'icon-circle-plus': !showChildren,
        }"
      />
      <strong>
        {{ showChildren ? 'Collapse' : 'Expand' }} {{ typeName }} attrributes
      </strong>
    </p>
    <ul
      v-if="children.length"
      v-show="showChildren"
      class="children pl-5 lg:pl-10 border-t border-alt"
    >
      <property
        v-for="(child, i) in children"
        :key="i"
        :last="i === children.length - 1"
        :section-i-d="normalizedSectionID"
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
import PropertyTitle from '~/components/PropertyTitle.vue'
import PropertyToggleChildren from '~/components/PropertyToggleChildren.vue'

@Component({
  name: 'property',
  components: { PropertyToggleChildren, PropertyTitle, Tag },
})
export default class Property extends Vue {
  @Prop() sectionID
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
  @Prop() children
  @Prop() initialActive
  @Prop() forceActive
  showChildren = false
  active = false
  ofTypeKind = OfTypeKind

  created() {
    this.showChildren = this.getShowChildren()
  }

  @Watch('initialActive', { immediate: true }) onActiveChange() {
    this.active = this.initialActive || this.forceActive
  }

  get normalizedSectionID() {
    return `${this.sectionID}-${this.name}`
  }

  getShowChildren() {
    let currentHash = ''
    let showChildren = false

    this.$route.hash
      .replace('#', '')
      .split('-')
      .forEach((part) => {
        currentHash += part

        if (currentHash === this.normalizedSectionID) {
          showChildren = true
        }

        currentHash += '-'
      })

    return showChildren
  }
}
</script>
<style lang="scss">
.property:not(.is-child),
.property:not(.is-child) > .children,
.mobile-toggle {
  @screen lg-max {
    width: calc(100% + 48px);
    @apply -ml-6 px-6;
  }
}

.mobile-toggle {
  @screen lg-max {
    @apply px-6;
  }
}

.property {
  &.is-child {
    .content,
    .bg,
    .toggle-children {
      @apply bg-base;
    }

    .type {
      @apply text-font-primary;
    }
  }

  &:last-child {
    > .children {
      @apply relative;

      &::before {
        content: '';
        @apply w-10 transform z-10 -ml-10 bg-body h-full left-0 top-0 absolute -translate-x-full;

        @screen lg-max {
          @apply bg-base;
        }
      }
    }
  }
  &:not(.is-child) {
    @apply border-t border-alt;

    @screen lg-max {
      > .main-line .line-v {
        height: calc(100% - 80px);
        @apply ml-10 mt-20;
      }
      > .children {
        @apply bg-base;

        > .property {
          @apply ml-9;
        }
      }
    }
  }
}
</style>
