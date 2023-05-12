<template>
  <a
    :href="data.url"
    class="single-link-url broadcast-menu-link"
    target="_blank"
  >
    <span v-text="data.buttonLabel" />
  </a>
</template>
<script>
export default {
  name: 'single-link',
  data() {
    return {}
  },
  props: ['data'],
  methods: {},
  mounted() {
    // console.log('single-link', this.data)
  }
}
</script>
<style lang="scss">
.single-link-url {
  background-color: $black;
  border-radius: $roundRadius;
  color: $white;
  padding: 20px;
  width: 100%;
}
</style>
