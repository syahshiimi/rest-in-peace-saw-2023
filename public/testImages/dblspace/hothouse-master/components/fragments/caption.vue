<template>
  <div class="caption"><p v-if="data" v-text="data" /></div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-caption',
  data() {
    return {}
  },
  props: ['data'],
  components: {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.slider:hover .caption,
.block-section:hover .caption {
  opacity: 0.8;
}
.caption {
  display: block;
  opacity: 0.8;
  text-align: left;
  width: 100%;
  padding: $pageMargin / 2 $pageMargin 0;
  pointer-events: none;
  opacity: 0;
  transition: 0.3s opacity ease-in-out;
  @include below('tablet') {
    opacity: 0.8;
  }
}
.caption p {
  font-size: $pageMargin / 2;
  display: block;

  @include below('mobile') {
    font-size: 12px;
  }
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  color: $white;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 30%,
    rgba(0, 0, 0, 0.01) 100%
  );
  padding: calc(#{$pageMargin} + 20px) $pageMargin $pageMargin;
  @include below('mobile') {
    padding: calc(#{$pageMarginMob} + 20px) $pageMarginMob $pageMarginMob;
  }
}
</style>
