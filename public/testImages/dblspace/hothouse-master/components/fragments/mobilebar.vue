<template>
  <div class="mobile-bar">
    <div class="inner">
      <n-link
        :to="{ name: hack.name, params: { slug: hack.prev } }"
        ref="prevArticle"
      >
        <div class="circle-blob prev-blob">
          <v-bararrow class="bar-arrow" />
        </div>
      </n-link>
      <div class="spacer-blob spacer-blob-0">
        <v-spacer class="spacer-svg" />
      </div>
      <div class="blob-title hhblob">
        <span v-text="titleHack" />
      </div>
      <div class="spacer-blob spacer-blob-1">
        <v-spacer class="spacer-svg" />
      </div>
      <n-link
        :to="{ name: nextHack.name, params: { slug: nextHack.next } }"
        ref="nextArticle"
      >
        <div class="circle-blob next-blob">
          <v-bararrow class="bar-arrow arrow-next" />
        </div>
      </n-link>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'next-article',
  data() {
    return {}
  },
  props: ['next', 'nextslug', 'prev', 'prevslug', 'title', 'number'],
  components: {
    vSpacer: () => import('~/assets/svgs/menu-spacer.svg?inline'),
    vBararrow: () => import('~/assets/svgs/bararrow.svg?inline')
  },
  computed: {
    ...mapState(['allPresentations', 'allRepresentations']),
    type() {
      if (this.$route.name === 'presentations-slug') {
        return `Presentation`
      } else if (this.$route.name === 'representations-slug') {
        return `Re-presentation`
      } else {
        return ''
      }
    },
    hack() {
      return this.$route.name === 'representations-slug'
        ? {
            prev: this.allPresentations[4].slug,
            name: 'presentations-slug'
          }
        : {
            prev: this.prev.slug,
            name: this.prevslug
          }
    },
    titleHack() {
      return this.$route.name === 'representations-slug'
        ? this.allRepresentations[0].title
        : this.title
    },
    nextHack() {
      return this.$route.name === 'representations-slug'
        ? {
            next: this.next.slug,
            name: 'presentations-slug'
          }
        : {
            next: this.next.slug,
            name: this.nextslug
          }
    }
  },

  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.mobile-bar {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  @include below('mobile') {
    display: block;
  }
  width: calc(100% - #{$pageMarginMob} - #{$pageMarginMob});
  z-index: 5;
  > .inner {
    display: flex;
    position: relative;
    .blob-title {
      flex-grow: 1;
    }
    .circle-blob {
      position: relative;
    }
    span {
      position: relative;
      transform: none;
      top: auto;
      left: auto;
    }
    .bar-arrow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(calc(-50% - 1px), -50%);
      width: 15px;
      &.arrow-next {
        transform: translate(calc(-50% + 1px), -50%) rotate(-180deg);
      }
    }
  }
}

.dark-mode {
  .mobile-bar {
    .bar-arrow path {
      fill: black;
    }
  }
}
</style>
