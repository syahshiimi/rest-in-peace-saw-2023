<template>
  <div class="top-sidebar" v-if="data">
    <fragments-image v-if="data.topImage" :image="data.topImage" />
    <h3 v-if="data.topTitle" v-text="data.topTitle" />
    <div
      class="top-description"
      v-if="data.topDescription"
      v-html="data.topDescription"
      :class="{
        active: showMore === true,
        cut: letterCounter(data.topDescription) > 300
      }"
    />
    <fragments-more-button
      v-if="letterCounter(data.topDescription) > 300"
      :class="{ active: showMore === true }"
      @click.native="toggle"
      :data="text"
    />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'top-sidebar',
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
    }
  },
  methods: {
    ...mapActions(['setUpdateScrollTrigger']),
    letterCounter(str) {
      // let letters = 0
      // const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      // let ar = alphabet.split('')
      // for (let i = 0; i < str.length; i++) {
      //   if (ar.indexOf(str[i]) > -1) {
      //     letters = letters + 1
      //   }
      // }
      // return letters
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
.top-sidebar {
  .top-description {
    &.cut {
      p {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    &.active {
      p {
        overflow: none;
        text-overflow: auto;
        display: block;
        -webkit-line-clamp: none;
        -webkit-box-orient: none;
      }
    }
  }
}
</style>
