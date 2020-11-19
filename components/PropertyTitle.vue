<template>
  <div class="text-font-primary flex items-center">
    <span class="font-mono title">
      {{ name }}
    </span>
    <template v-if="typeStr">
      <span class="mx-1 font-mono">•</span>
      <span
        class="type font-mono"
        :class="{ lowercase: typeStr !== 'ID' }"
        v-html="$options.filters.colorType(typeStr)"
      />
    </template>
    <template v-if="showOfTypeKind">
      <span class="mx-1 font-mono">•</span>
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Tag } from '@chargetrip/internal-vue-components'
import { OfTypeKind } from '~/utilities/constants'

@Component({ components: { Tag } })
export default class PropertyTitle extends Vue {
  @Prop() name
  @Prop() typeName
  @Prop() depth
  @Prop() active
  @Prop() description
  @Prop() forceActive
  @Prop() required
  @Prop() optional
  @Prop() showOfTypeKind
  @Prop() typeStr
  ofTypeKind = OfTypeKind
}
</script>
