<template>
  <div class="errors mt-6">
    <Error v-for="(error, key) in errors" :key="key" v-bind="error" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Error from '~/components/global/Error.vue'
@Component({
  components: { Error },
})
export default class Err0rs extends Vue {
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
