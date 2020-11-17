<template>
  <li
    :id="normalizedSectionID"
    class="property list-none text-14 relative flex"
    :class="{ 'is-child': depth, 'show-children': showChildren }"
  >
    <div
      class="child-1-a flex-shrink-0 flex relative z-10 -ml-5 lg:-ml-10"
      :class="{ 'w-10': !depth, 'w-10 lg:w-20': depth }"
    >
      <div v-if="depth" class="child-2-a flex-1 h-full flex justify-center">
        <div class="line-v w-px bg-alt2 h-full" />
      </div>
      <div
        class="child-2-b flex-1 h-full ml-auto flex pt-5 justify-center relative"
      >
        <div v-if="children && children.length" class="toggle-children-wrapper">
          <span
            class="icon toggle-children text-accent relative z-10 bg-body"
            :class="{
              'icon-circle-plus': !showChildren,
              'icon-circle-minus': showChildren,
            }"
            @click="showChildren = !showChildren"
          />
          <div
            v-if="showChildren"
            class="line-v line-main absolute w-px h-full mt-7 top-0 bg-alt2 transform left-1/2 -translate-x-1/2"
          />
        </div>
        <div
          v-else-if="depth"
          class="w-1 h-1 rounded-full bg-alt2 transform mt-2 -translate-y-1/2"
        />
        <div
          v-if="depth"
          class="line-h absolute top-0 mt-7 w-5 w-full h-px bg-alt2 transform -translate-x-1/2"
        />
      </div>
    </div>
    <div class="child-1-b flex-1">
      <div
        class="content pl-10 -ml-10 py-4 relative"
        :class="{
          'cursor-pointer': !forceActive,
        }"
        @click="active = !active || forceActive"
      >
        <div class="text-font-primary flex items-center">
          <Tag v-if="showQuery" class="mr-1" color="note" type="secondary"
            >Query
          </Tag>
          <span v-else class="font-mono title">
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
            >Required
          </Tag>
          <Tag v-if="optional" class="ml-2" color="font-alt3" type="secondary"
            >Optional
          </Tag>
          <span
            v-if="!depth && description && !forceActive"
            class="ml-auto cursor-pointer lg-max:mr-6"
            :class="{
              'icon-chevron-right': !active,
              'icon-chevron-down': active,
            }"
          />
        </div>
        <p
          v-if="description"
          v-show="active"
          class="description text-font-alt3"
        >
          {{ description }}
        </p>
      </div>
      <p
        v-if="children && !depth"
        class="py-3 mobile-toggle flex lg:hidden border-t border-alt cursor-pointer text-accent items-center"
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
      <ul v-if="children" v-show="showChildren" class="children">
        <property
          v-for="(child, i) in children"
          :key="i"
          :section-i-d="normalizedSectionID"
          :force-active="true"
          :initial-active="true"
          :depth="depth + 1"
          v-bind="child"
        />
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Tag } from '@chargetrip/internal-vue-components'
import { OfTypeKind } from '~/utilities/constants'

@Component({ name: 'property', components: { Tag } })
export default class Property extends Vue {
  @Prop() sectionID
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
.property:not(.is-child) > .child-1-b > .children,
.mobile-toggle {
  @screen lg-max {
    width: calc(100% + 48px);
    @apply -ml-6;
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

    &:last-child {
      ul {
        @apply relative;

        &::before {
          //content: '';
          //@apply block absolute bg-body w-10 transform -translate-x-full -ml-10 h-full z-10;
        }
      }
    }
  }

  &:last-child {
    > .child-1-a > .child-2-a > .line-v {
      @apply h-7;
    }
  }

  .line-main {
    @apply mt-7 h-12;
  }

  &:not(.is-child) {
    @apply border-t border-alt;

    @screen lg-max {
      > .child-1-b > .children {
        @apply pl-10 bg-base;
      }
      > .child-1-a > .child-2-b > .toggle-children-wrapper {
        @apply hidden;
      }
    }

    &.show-children {
      .mobile-toggle {
        @apply border-b;
      }
    }
  }
}
</style>
