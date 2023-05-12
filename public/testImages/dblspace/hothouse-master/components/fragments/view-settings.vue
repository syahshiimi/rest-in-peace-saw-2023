<template>
  <div class="view-settings">
    <h2 v-text="`${number - 1} post${plural}`" />
    <div class="right">
      <h2 class="view-by-label" v-text="`View by`" />
      <v-full
        class="view-by-full"
        :class="[view_full ? 'active' : '']"
        @click="viewFull"
      />
      <v-block
        class="view-by-default"
        :class="[!view_full ? 'active' : '']"
        @click="viewDefault"
      />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'
import Emitter from '~/assets/js/events/EventsEmitter'

export default {
  name: 'view-settings',
  data() {
    return {
      view_full: false
    }
  },
  props: ['number'],
  components: {
    vBlock: () => import('~/assets/svgs/block.svg?inline'),
    vFull: () => import('~/assets/svgs/full.svg?inline')
  },
  computed: {
    plural() {
      return this.number - 1 > 1 ? 's' : ''
    }
  },
  methods: {
    ...mapActions(['setUpdateScrollTrigger']),
    viewFull() {
      Emitter.emit('VIEW:FULL')
      this.view_full = true
      this.setUpdateScrollTrigger(Math.random())
    },
    viewDefault() {
      Emitter.emit('VIEW:DEFAULT')
      this.view_full = false
      this.setUpdateScrollTrigger(Math.random())
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.view-settings {
  width: 100%;
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include below('tablet-small') {
    display: none;
  }
  &.white {
    color: $white;
  }
  .right {
    display: flex;
    align-items: center;
    svg {
      cursor: pointer;
      height: $pageMargin / 2;
      fill: currentColor;
      stroke: currentColor;
      opacity: 0.5;
      transition: 0.3s opacity ease-in-out;
      &.active {
        opacity: 1;
        pointer-events: none;
      }
    }
  }
  .view-by-label {
    margin-right: 42px;
  }
  .view-by-full {
    margin-right: 28px;
  }
}
</style>
