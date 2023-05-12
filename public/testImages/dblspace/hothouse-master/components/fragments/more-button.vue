<template>
  <button class="more-button">
    <v-arrow />

    <span v-text="`Show ${data}`" />
  </button>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'more-button',
  data() {
    return {}
  },
  props: ['data'],
  components: {
    vArrow: () => import('~/assets/svgs/arrow.svg?inline')
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.more-button {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 3px;
  span {
    font-family: $moderat;
    font-size: $pageMargin / 2;
    margin-left: 8px;
    @include below('mobile') {
      font-size: 13px;
    }
  }
  &.active {
    svg {
      transform: scale(-1);
      top: 1px;
    }
  }
  svg {
    position: relative;
    top: 2px;
    height: 7px;
    @include below('mobile') {
      top: 1px;
      height: 6px;
    }
  }
}
</style>
