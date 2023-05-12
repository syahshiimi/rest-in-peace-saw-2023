<template>
  <div class="textcontent-wrap" v-if="data">
    <div v-if="data" class="block-content-textcontent">
      <div v-html="this.data" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'text-content',
  data() {
    return {
      showMore: false
    }
  },
  props: ['data'],
  components: {},
  computed: {
    ...mapState(['updateScrollTrigger']),
    text() {
      return this.showMore ? 'less' : 'more'
    },
    content_to_show() {
      this.data.substring(0, 300)
    }
  },
  methods: {
    ...mapActions(['setUpdateScrollTrigger']),
    letterCounter(str) {
      let cleanText = str.replace(/<\/?[^>]+(>|$)/g, '')
      return cleanText.length
    },
    toggle() {
      // change state to update scrolltrigger stuff in other components
      this.setUpdateScrollTrigger(Math.random())
      this.showMore = !this.showMore
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.block-content-textcontent {
  display: block;
  // padding: calc(#{$pageMargin} / 2);
  &.cut {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $lineShow;
    -webkit-box-orient: vertical;
    // height: calc(#{$fontsize}* 1.2 * #{$lineShow});
  }

  &.active {
    overflow: none;
    text-overflow: auto;
    display: block;
    -webkit-line-clamp: none;
    -webkit-box-orient: none;
  }
}
.block-slider .block-content-title,
.block-slider .block-content-textcontent {
  // padding: 0 $pageMargin;
}
.counter {
  // position: absolute;
  // top: 20px;
  // right: 20px;
  // z-index: 2;
  // color: red;
  // font-size: 8px;
  display: none;
}
</style>
