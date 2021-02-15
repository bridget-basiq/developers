<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Cta extends Vue {
  @Prop() vars

  replaceVars(nodes, varName) {
    return nodes.map((node) => {
      if (node.children) {
        node.children = this.replaceVars(node.children, varName)
      }

      if (node.text) {
        node.text = node.text.replaceAll(
          `$${varName}`,
          this.$store.getters[varName]
        )
      }

      return node
    })
  }

  render(h) {
    this.vars.forEach((varName) => {
      this.$slots.default = this.replaceVars(this.$slots.default, varName)
    })

    return h('div', this.$slots.default)
  }
}
</script>
