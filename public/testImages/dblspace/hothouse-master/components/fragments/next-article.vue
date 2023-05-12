<template>
  <div class="next-article">
    <div class="next-article-bg" :style="`background-color: ${color};`" />
    <n-link
      :to="{ name: slug, params: { slug: next.slug } }"
      ref="nextArticle"
      @click.native="clicked"
    >
      <div class="inner">
        <div class="blob-type hhblob">
          <span v-text="`${type} #${next.categoryNumber}`" />
        </div>
        <div class="spacer-blob spacer-blob-0">
          <v-spacer class="spacer-svg" />
        </div>
        <div class="blob-category hhblob">
          <span v-text="`${next.categoryName}`" />
        </div>
        <div class="spacer-blob spacer-blob-1">
          <v-spacer class="spacer-svg" />
        </div>

        <div class="blob-name hhblob">
          <span v-text="next.title" />
        </div>
      </div>
    </n-link>
  </div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.min.js'
import { mapState, mapActions } from 'vuex'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export default {
  name: 'next-article',
  data() {
    return {}
  },
  props: ['next', 'slug', 'color'],
  components: {
    vSpacer: () => import('~/assets/svgs/menu-spacer.svg?inline')
  },
  computed: {
    ...mapState(['updateScrollTrigger']),
    type() {
      if (this.$route.name === 'presentations-slug') {
        return `Presentation`
      } else if (this.$route.name === 'representations-slug') {
        return `Re-presentation`
      } else {
        return ''
      }
    }
  },
  watch: {
    // watch sth here to refresh scrolltrigger when 'showmore' is used
    updateScrollTrigger() {
      if (window.innerWidth < 800) return
      // ScrollTrigger.refresh
      // console.log('sth changed')
      setTimeout(
        function() {
          ScrollTrigger.refresh()
          // console.log(ScrollTrigger)
        }.bind(this),
        300
      )
    }
  },
  methods: {
    ...mapActions(['setNextArticleClicked']),

    initScrollTrigger() {
      if (window.innerWidth < 800) return
      if (!document.querySelector('.next-article')) return
      let tl_nextarticle = gsap.timeline({
        scrollTrigger: {
          trigger: '.next-article',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
          // markers: true
        }
      })
      tl_nextarticle.addLabel('start')
      tl_nextarticle.to('.sidebar', {
        height: '-=' + document.querySelector('.next-article').offsetHeight,
        ease: 'none'
      })

      //
    },
    clicked() {
      // console.log('clicked')
      this.setNextArticleClicked(true)
    }
  },
  mounted() {
    console.log(this.color)
    setTimeout(
      function() {
        this.initScrollTrigger()
      }.bind(this),
      2000
    )
  }
}
</script>

<style lang="scss">
.next-article {
  position: relative;
  z-index: 3;
  margin-top: 1px;
  width: 100%;
  @include below('mobile') {
    display: none;
  }

  .next-article-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: $white;
    border-radius: $roundRadius;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 1;
    // opacity: 0;
  }
  .inner {
    padding: $pageMargin;
    display: flex;
    width: 100%;
    z-index: 2;
    position: relative;
  }
  span {
    position: relative;
    z-index: 2;
    top: auto;
    left: auto;
    transform: none;
    // font-family: 'AN';
    color: $white;
  }

  .blob-bar {
    position: relative;
    z-index: 2;
  }
  .blob-name {
    flex-grow: 1;
  }

  .hhblob,
  .circle-blob {
    background-color: $black;
  }
  .spacer-blob svg path {
    fill: $black;
  }
  @include below('tablet-small') {
    .circle-blob,
    .spacer-blob-1 {
      display: none;
    }
  }
}
</style>
