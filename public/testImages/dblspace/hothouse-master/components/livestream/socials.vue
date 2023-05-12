<template>
  <div class="socials">
    <span class="social-title" v-text="`Follow us on:`" />
    <div class="logo-wrap">
      <a href="https://www.facebook.com/h0t.house/"><v-fb /></a>
      <a href="https://instagram.com/h0t.house"><v-ig /></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'socials',
  data() {
    return {}
  },
  props: ['data'],
  components: {
    vFb: () => import('~/assets/svgs/facebook.svg?inline'),
    vIg: () => import('~/assets/svgs/instagram.svg?inline')
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.socials {
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 40px;
  span {
    font-size: 24px;
    font-weight: bold;
    @include below('tablet-small') {
      font-size: 22px;
    }
    @include below('mobile') {
      font-size: 18px;
    }
  }
  .logo-wrap {
    display: flex;
    margin-left: 15px;
    @include below('mobile') {
      margin-left: 10px;
    }
    a {
      margin-left: 15px;
    }
    svg {
      width: 30px;
      fill: $black;
      margin-right: 10px;
      @include below('tablet-small') {
        width: 18px;
        margin-right: 6px;
      }
    }
  }
}
</style>
