<template>
  <div class="whitespace-pre-line outline-none" contenteditable="true">
    {{ value }}
  </div>
</template>

<script>
import { Vue, Component, Prop, Watch, Emit } from 'nuxt-property-decorator'
@Component
export default class Editor extends Vue {
  @Prop() value
  @Prop() isEditing
  file = ''

  @Watch('value') onValueChange() {
    this.file = this.value
  }

  @Watch('isEditing') onIsEditingChange() {
    // this.onType()
    // this.$refs.textarea.focus()
  }

  @Emit('input') submit() {
    return this.file
  }
}
</script>
