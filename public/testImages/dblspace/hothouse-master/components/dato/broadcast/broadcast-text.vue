<template>
  <div class="broadcast-text">
    <h4 v-text="data.title" />
    <h5 v-text="data.subtitle" />
    <div class="p-wrap" v-html="data.description" />
  </div>
</template>
<script>
export default {
  name: 'broadcast-text',
  data() {
    return {}
  },
  props: ['data'],
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.broadcast-text {
  margin-top: 40px;
  h4 {
    font-size: 24px;
    font-weight: bold;
    @include below('mobile') {
      font-size: 20px;
    }
  }
  h5 {
    font-size: 20px;
    font-weight: bold;
    @include below('mobile') {
      font-size: 18px;
    }
  }
  .p-wrap {
    margin-top: 32px;
    p {
      line-height: 1.5;
    }
  }
  p {
    @include below('mobile') {
      font-size: 12px;
    }
  }
}
</style>
