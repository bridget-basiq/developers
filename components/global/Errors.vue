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
    this.errors = await this.$axios.get(`/errors/${this.name}.json`)
  }
}
</script>
