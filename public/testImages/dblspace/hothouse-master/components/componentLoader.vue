<template>
  <component
    :is="getComponent"
    :data="data"
    ref="comp"
    class="single-block"
    :class="`width_${getBlockWidth}`"
    :data-ref="refidx"
    :id="'block-' + data.content.id"
    :style="`background-color: ${color};`"
    :position="position"
  />
</template>

<script>
import emitter from '../assets/js/events/EventsEmitter'
export default {
  name: 'component-loader',
  props: ['data', 'refidx', 'even', 'odd', 'number', 'position'],
  data() {
    return {
      links: {
        BlockYoutubeRecord: 'youtube',
        BlockImageTextRecord: 'text',
        BlockSliderRecord: 'slider'
      }
    }
  },
  computed: {
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.evenColor : this.oddColor
    },
    getComponent() {
      let link = this.links[this.data.content.__typename]
      if (!link) {
        console.warn(`Can't find ${this.data.content.__typename}`)
        return false
      }
      return () => import(`~/components/dato/blocks/${link}.vue`)
    },
    getBlockWidth() {
      let blockWidth =
        this.data.width == 'Full Width'
          ? 'full'
          : this.data.width == '1/2'
          ? '1-2'
          : this.data.width == '1/4'
          ? '1-4'
          : this.data.width == '1/3'
          ? '1-3'
          : this.data.width == '2/3'
          ? '2-3'
          : this.data.width == '3/4'
          ? '3-4'
          : ''
      return blockWidth
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
<style lang="scss"></style>
