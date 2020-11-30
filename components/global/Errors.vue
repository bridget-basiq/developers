<template>
  <ul class="errors mt-6">
    <Error v-for="(error, key) in errors" :key="key" v-bind="error" />
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Error from '~/components/global/Error.vue'
@Component({
  components: { Error },
})
export default class Errors extends Vue {
  @Prop() name
  errors = []

  async fetch() {
    try {
      this.errors = (await import(`~/static/errors/${this.name}.json`)).default
    } catch (e) {
      this.errors = []
    }
  }
}
</script>
