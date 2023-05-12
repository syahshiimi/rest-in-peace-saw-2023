<template>
  <div class="furniture">
    <div v-html="data" />
  </div>
</template>
<script>
export default {
  name: 'furniture',
  data() {
    return {}
  },
  props: ['data'],
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.furniture {
  border-top: 1px solid #adada8;
  border-bottom: 1px solid #adada8;
  display: flex;
  justify-content: space-between;
  font-family: $moderat;
  padding: 19px $pageMargin 18px;
  font-size: 15px;
}
</style>
