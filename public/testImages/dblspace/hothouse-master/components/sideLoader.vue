<template>
  <component
    :is="getComponent"
    :data="data"
    ref="comp"
    class="single-sidebar-block"
    :data-ref="refidx"
    @click.native="refidx ? scrollToContent(refidx) : null"
    :style="`background-color: ${color};`"
  />
</template>

<script>
import emitter from '../assets/js/events/EventsEmitter'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.min.js'
import { mapActions } from 'vuex'

if (process.client) {
  gsap.registerPlugin(ScrollToPlugin)
}

export default {
  name: 'side-loader',
  props: ['data', 'refidx', 'odd', 'even', 'number'],
  data() {
    return {
      links: {
        TextRecord: 'side-text',
        ImageRecord: 'side-image'
      }
    }
  },
  computed: {
    oddColor() {
      return this.odd ? this.odd : '#bfbfbf'
    },
    evenColor() {
      return this.even ? this.even : '#cacaca'
    },
    color() {
      return this.number % 2 == 0 ? this.evenColor : this.oddColor
    },
    getComponent() {
      let link = this.links[this.data.__typename]
      if (!link) {
        console.warn(`Can't find ${this.data.__typename}`)
        return false
      }
      return () => import(`~/components/dato/sidebar/${link}.vue`)
    }
  },
  methods: {
    ...mapActions(['setIsScrolling']),
    tick(scrollTop) {
      this.$refs.comp && this.$refs.comp.tick && this.$refs.comp.tick(scrollTop)
    },
    resize(w, h) {
      if (w && h) {
        this.w = w
        this.h = h
      }
      this.$refs.comp && this.$refs.comp.resize && this.$refs.comp.resize(w, h)
    },
    scrollToContent(ref_idx) {
      if (this.$route.name != 'representations-slug') return
      // scroll sidebar wrapper to correct sidebar

      gsap.to(window, {
        duration: 1,
        ease: 'power2.inOut',
        scrollTo: {
          y: '.main-blocks .reference-' + ref_idx,
          offsetY: 130
        },
        onComplete: function() {}
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.single-sidebar-block {
  &:nth-child(even) {
    // background-color: $grey-100;
  }
  // background-color: $grey;
  border-radius: $roundRadius;
  overflow: hidden;
  // font-size: 18px;
}
.wrap-notes .has-reference {
  cursor: pointer;
}

.section-slug-representation .wrap-notes p {
  // display: none;
  font-family: $moderat;
  font-size: 14px;
  letter-spacing: -0.02rem;
}
</style>
