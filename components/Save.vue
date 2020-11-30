<template>
  <Modal class="save">
    <div class="max-w-screen-sm">
      <h2>Save edits</h2>
      <p class="text-font-alt2 text-14 mt-2 mb-6">
        Enter your name and describe your edits in a single line. This way
        everyone has a clear overview of what has happened and why changes have
        been applied.
      </p>
      <Input label="Name" class="mb-2" />
      <Input label="Description" />
      <div class="flex justify-between mt-8">
        <Button size="md" color="base" @click="$emit('cancel')">
          Cancel
        </Button>
        <Button size="md" color="accent" @click="$emit('save')"> Save </Button>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Modal, Input, Button } from '@chargetrip/internal-vue-components'

@Component({ components: { Modal, Input, Button } })
export default class CImage extends Vue {}
</script>
