<template>
  <n-link
    class="internal-link broadcast-menu-link"
    :to="{ name: route, params: { slug: data.reference.slug } }"
  >
    <span v-text="data.buttonLabel" />
  </n-link>
</template>
<script>
export default {
  name: 'internal-link',
  data() {
    return {}
  },
  props: ['data'],
  computed: {
    route() {
      return this.data.reference.__typename === 'PresentationRecord'
        ? 'presentations-slug'
        : 'representations-slug'
    }
  },
  methods: {},
  mounted() {
    // console.log('internallink', this.data)
  }
}
</script>
<style lang="scss">
.internal-link {
  background-color: $black;
  border-radius: $roundRadius;
  color: $white;
  padding: 20px;
  width: 100%;
}
</style>
