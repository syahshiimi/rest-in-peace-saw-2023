<template>
  <component
    :is="getComponent"
    :data="data"
    ref="comp"
    class="single-media"
    :class="`width_${blockWidth}`"
  />
</template>

<script>
import emitter from '../assets/js/events/EventsEmitter'
export default {
  name: 'side-loader',
  props: ['data', 'length'],
  data() {
    return {
      links: {
        SingleVideoRecord: 'single-video',
        SingleImageRecord: 'single-image'
      }
    }
  },
  computed: {
    getComponent() {
      let link = this.links[this.data.__typename]
      if (!link) {
        console.warn(`Can't find ${this.data.__typename}`)
        return false
      }
      return () => import(`~/components/dato/media/${link}.vue`)
    },
    blockWidth() {
      return this.length === 1
        ? 'full'
        : this.length === 2
        ? '1-2'
        : this.length === 3
        ? '1-3'
        : this.length === 4
        ? '1-4'
        : this.length === 5
        ? '1-5'
        : ''
    }
  },
  methods: {
    tick(scrollTop) {
      this.$refs.comp && this.$refs.comp.tick && this.$refs.comp.tick(scrollTop)
    },
    resize(w, h) {
      if (w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.comp && this.$refs.comp.resize && this.$refs.comp.resize(w, h)
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.single-media {
  &.width_full {
    width: 100%;
  }
  &.width_1-2 {
    width: 50%;
  }
  &.width_1-3 {
    width: calc(100% / 3);
    @include below('tablet') {
      width: 100%;
    }
  }
  &.width_1-4 {
    width: 25%;
  }
  &.width_1-5 {
    width: 20%;
  }
}
</style>
