<template>
  <div>
    <fragments-image v-if="data.image" :image="data.image" />
    <div class="side-text">
      <h2 v-if="data.title" v-text="data.title" />
      <div class="side-description" v-html="data.description" />
      <!-- <fragments-more-button
        v-if="letterCounter(data.description) > 250"
        :class="{ active: showMore === true }"
        @click.native="toggle"
        :data="text"
      /> -->
      <div
        class="sidebar-button"
        v-for="(link, key) in data.links"
        :data="link"
        :key="`button-${key}`"
      >
        <fragments-social-button v-if="link.image !== null" :data="link" />
        <fragments-button v-else :data="link" :image="data.image" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'side-text',
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
.side-text {
  padding: $pageMargin $pageMargin $pageMargin;
  word-break: break-word;
  overflow: hidden;
  @include below('tablet') {
    padding: 25px 25px 30px;
  }
  .side-description {
    &.cut {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
    }
    &.active {
      overflow: none;
      text-overflow: auto;
      display: block;
      -webkit-line-clamp: none;
      -webkit-box-orient: none;
    }
  }
  .side-description + .sidebar-button {
    margin-top: 15px;
  }

  h2 {
    margin-bottom: 22px;
    line-height: 1;
  }
  a:not(.block-button) {
    text-decoration: underline;
  }
}
.page-index .side-text a {
  text-decoration: none;
  margin-bottom: 0;
  margin-top: 10px;
}
</style>
