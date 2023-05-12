<template>
  <component
    :is="getComponent"
    :data="data"
    ref="comp"
    class="single-broadcast-item"
    :style="`background-color: ${color};`"
  />
</template>

<script>
import emitter from '../assets/js/events/EventsEmitter'
export default {
  name: 'side-loader',
  props: ['data', 'length', 'odd', 'even', 'number'],
  data() {
    return {
      links: {
        CreditsBlockRecord: 'credits-block',
        SocialsBlockRecord: 'socials-block',
        BroadcastBlockRecord: 'block'
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
    },
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.evenColor : this.oddColor
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
  mounted() {
    // console.log(this.number)
  }
}
</script>
<style lang="scss">
.single-broadcast-item {
}
</style>
