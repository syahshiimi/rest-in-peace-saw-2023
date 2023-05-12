<template>
  <component
    :is="getComponent"
    :data="data"
    ref="comp"
    class="single-link-item"
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
        InternalLinkRecord: 'internal-link',
        SingleLinkRecord: 'single-link',
        ScheduleLinkRecord: 'schedule-link'
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
      return () => import(`~/components/dato/broadcast/${link}.vue`)
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
