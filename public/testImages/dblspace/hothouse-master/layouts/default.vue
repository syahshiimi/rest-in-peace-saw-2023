<template>
  <main
    :class="[
      'page-' + this.$router.history.current.name,
      isSidebarOpen ? 'sidebar-open' : ''
    ]"
    :style="`background-color: ${getBgColor}`"
  >
    <!-- <span class="checker" v-text="isLoaderAnimationDone" /> -->
    <common-loader v-if="showLoaderOnLive" v-show="!isLoaderAnimationDone" />
    <!-- <lazy-common-cookie-banner /> -->
    <dev-grid></dev-grid>
    <client-only>
      <lazy-common-grid v-if="$route.hash === '#grid'" />
    </client-only>
    <common-navbar :navtype="'actual'" class="actual-nav" />
    <common-navbar :navtype="'progress'" class="progress-bar" />
    <nuxt ref="nuxt" class="nuxt_class" />
    <div class="close-sidebar-wrap">
      <div class="inner" @click="close_sidebar">
        <span v-text="'Hide'" /><v-arrow />
      </div>
    </div>
    <div
      class="sidebar-clickarea-mobile"
      v-if="!isSidebarOpen"
      @click="open_sidebar"
    />
  </main>
</template>
<script>
import gsap from 'gsap'
// import Stats from 'stats-js'
import vLoader from '~/components/common/loader.vue'
import { mapState, mapActions } from 'vuex'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
import ResizeHelper from '~/assets/js/utils/ResizeHelper'
import Emitter from '~/assets/js/events/EventsEmitter'
import spacetime from 'spacetime'

if (process.browser) {
  var sniffer = require('sniffer')
}
export default {
  components: {
    vArrow: () => import('~/assets/svgs/arrow.svg?inline')
  },
  computed: {
    ...mapState([
      'isLoaderAnimationDone',
      'nextArticleClicked',
      'isDarkMode',
      'isSidebarOpen',
      'allPresentations',
      'allRepresentations',
      'livestream',
      'broadcast'
    ]),
    getCurrentPage() {
      if (this.$route.name === 'presentations-slug') {
        return this.allPresentations.find((presentation) => {
          return presentation.slug === this.$route.params.slug
        })
      } else if (this.$route.name === 'representations-slug') {
        return this.allRepresentations.find((representation) => {
          return representation.slug === this.$route.params.slug
        })
      }
    },
    getBgColor() {
      return this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug'
        ? this.getCurrentPage.pageBackground.hex
        : '#ffffff'
    },
    showLoaderOnLive() {
      // when live
      // dont show loader on index
      // only show loader when first loading in other pages
      if (this.livestream.broadcastState != 'Live') {
        return true
      } else {
        // if live
        if (this.$route.name == 'index') {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'setNextArticleClicked',
      'setDarkMode',
      'setSidebarOpen',
      'setHideLoader',
      'setScheduleOpen',
      'setBroadcastOpen'
    ]),
    open_sidebar() {
      this.setSidebarOpen(true)
    },
    close_sidebar() {
      this.setSidebarOpen(false)
    },
    tick() {
      // this.stats.begin()
      // this.stats.end()
      ScrollHelper.tick()
      let scrollTop = ScrollHelper.scrollTop
      if (this.$refs.nuxt.$children[0] && this.$refs.nuxt.$children[0].tick)
        this.$refs.nuxt.$children[0].tick(scrollTop)
      // this.$refs.navigation.tick(scrollTop)
    },
    resize() {
      const w = ResizeHelper.width()
      const h = ResizeHelper.height()
      if (this.$refs.nuxt.$children[0] && this.$refs.nuxt.$children[0].resize)
        this.$refs.nuxt.$children[0].resize(w, h)
    },
    getVerticalScrollPercentage(elm) {
      var p = elm.parentNode
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      )
    },
    setRouterHook() {
      this.$router.beforeEach((from, to, next) => {
        // console.log(
        //   'isfromnextarticle',
        //   this.nextArticleClicked,
        //   'from',
        //   from,
        //   'to',
        //   to,
        //   next
        // )
        this.setScheduleOpen(false)
        this.setBroadcastOpen(false)
        if (!this.isLoaderAnimationDone) {
          // close loader if
          // navigating via menu when upcoming event is on
          console.log('once')
          this.setHideLoader(true)
          gsap.to('.nav-blob span', {
            opacity: 1,
            duration: 0.2,
            delay: 0.2,
            ease: 'power1.inOut',
            onComplete: function() {
              console.log('eh1')
            }
          })
        }
        var is_adding_tags = to.name == 'results' && from.name == 'results'
        this.close_sidebar()
        // prevent opacity in adding tags in search
        if (!is_adding_tags) {
          gsap.to('.nav-blob span', {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.inOut'
          })
          gsap.to('.progress-bar nav', {
            clipPath: 'inset(0% 100% 0% 0%)',
            duration: 0.4,
            ease: 'power2.Out'
          })
        } else {
          gsap.to('.single-tag', {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power1.inOut'
          })
        }

        if (!is_adding_tags) {
          gsap
            .to(this.$refs.nuxt.$el, {
              translateY: '0%',
              opacity: 0,
              delay: 0,
              duration: 0.4,
              ease: 'power1.inOut'
            })
            .then(next)
        } else {
          gsap
            .to(this.$refs.nuxt.$el, {
              // translateY: '0%',
              opacity: 1,
              // delay: 0.3,
              duration: 0.1,
              ease: 'power1.inOut'
            })
            .then(next)
        }
        // }
      })
    },
    onMounted() {
      this.initScrollProgress()
      // only fade in if not first load
      if (!this.isLoaderAnimationDone) return
      // reset this state
      this.setNextArticleClicked(false)
      gsap.fromTo(
        '.nuxt_class',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0,
          clearProps: 'all',
          ease: 'power1.inOut',
          onStart: function() {
            // console.log('tofrom start')
          },
          onComplete: function() {
            // console.log('tofrom complete')
          }
        }
      )
      gsap.to('.nav-blob span', {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: 'power1.inOut',
        onComplete: function() {
          console.log('eh2')
        }
      })
    },
    initScrollProgress() {
      // document.onscroll = this.scrollAction
      document.addEventListener('scroll', this.scrollAction)
    },
    scrollAction() {
      // prettier-ignore
      if (!document.querySelector('.nuxt_class').classList.contains('progress-yes')  )return
      var pos = this.getVerticalScrollPercentage(document.body)
      document.querySelector('.progress-bar nav').style.clipPath =
        'inset(0% ' + (100 - pos) + '% 0% 0%)'
    },
    getVerticalScrollPercentage(elm) {
      var p = elm.parentNode
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      )
    }
  },
  mounted() {
    // this.stats = new Stats()
    // document.body.appendChild(this.stats.dom)
    // gsap.ticker.add(this.tick.bind(this))
    Emitter.on('GLOBAL:RESIZE', this.resize.bind(this))
    Emitter.on('PAGE:MOUNTED', this.onMounted.bind(this))
    sniffer.addClasses(document.body)
    this.setRouterHook()

    if (
      this.livestream.broadcastState == 'Upcoming' ||
      this.livestream.broadcastState == 'Live'
    ) {
      document.body.classList.add('scrollable')
    }
  }
}
</script>

<style lang="scss">
html,
body {
  overscroll-behavior: none;
}
body {
  // background-color: $white;
  overflow: hidden;
  transition: 0.2s background-color ease-in-out;
  max-width: 100vw;
}
body.dark-mode {
  background-color: $black;
}
body.scrollable {
  overflow: auto;
}

main {
  max-width: 100vw;
  transition: 0.3s background-color ease-in-out;
}

.progress-bar nav {
  opacity: 1;
  pointer-events: none;
  clip-path: inset(0 100% 0 0);
}
.progress-bar.show-menu nav,
.progress-bar.show-search nav {
  opacity: 0;
}

.progress-bar .hhblob,
.progress-bar .circle-blob {
  background-color: $lightgrey;
}
.progress-bar .spacer-blob svg path {
  fill: $lightgrey;
}
.progress-bar img,
.progress-bar .new-logo,
.progress-bar .nav-share svg,
.progress-bar .nav-search svg {
  filter: invert(1);
}
.progress-bar span {
  color: $black;
}

.dark-mode .progress-bar .hhblob,
.dark-mode .progress-bar .circle-blob {
  background-color: $darkgrey;
}
.dark-mode .progress-bar .spacer-blob svg path {
  fill: $darkgrey;
}
.dark-mode .progress-bar img {
  filter: invert(0) !important;
}
.dark-mode .progress-bar span {
  color: $white;
}

.dark-mode .progress-bar nav {
  // filter: invert(1) drop-shadow(0px 0px 1px rgba(255, 255, 255, 0.1));
}
.progress-bar nav .nav-logo {
  // filter: invert(1);
}

/***** COMPONENT LOADER STYLES - MOVED OUT BECAUSE OF REFRESH ISSUE */

.single-block {
  position: relative;
  transition: 0.3s width ease-in-out;
  &:nth-child(even) {
    // background-color: $offgrey;
  }
  // background-color: $offwhite;
  border-radius: $roundRadius;
  overflow: hidden;
  @include below('tablet-small') {
    &:first-child {
      background-color: $offgrey;
    }
  }
  &.width_full {
    width: 100%;
  }
  &.width_1-2 {
    width: 50%;
    @include below('tablet') {
      width: 100%;
    }
  }
  &.width_1-3 {
    width: calc(100% / 3);
    @include below('tablet') {
      width: 100%;
    }
  }
  &.width_2-3 {
    width: calc((100% / 3) * 2);
  }
  &.width_1-4 {
    width: 25%;
  }
  &.width_3-4 {
    width: 75%;
  }
}

.viewfull .single-block {
  width: 100% !important;
}

.single-block {
  ul,
  ol,
  li {
    list-style: initial;
    margin-left: $pageMargin / 2;
  }
  li {
    list-style: decimal;
  }
  ul,
  ol {
    margin-top: 10px;
  }
}

.block-section-text {
  padding: calc(#{$pageMargin} - 5px) $pageMargin $pageMargin;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  @include below('tablet-small') {
    padding: $contentPaddingMob $contentPaddingMob
      calc(#{$contentPaddingMob} + 5px);
  }
}
.block-section-text p a {
  text-decoration: underline;
}

.close-sidebar-wrap {
  position: fixed;
  right: 0;
  top: 50%;
  display: none;
  pointer-events: none;
  opacity: 0;
}

.checker {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 20px;
  color: red;
  z-index: 30;
}
</style>
