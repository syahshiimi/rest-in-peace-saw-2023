<template>
  <section class="section-slug section-template section-index">
    <div class="broadcast-menus">
      <livestream-broadcastmenu
        class="single-broadcasttype-menu"
        :class="{ 'open-panel': isBroadcastOpen }"
      />
      <livestream-eventsmenu
        class="single-broadcasttype-menu"
        :class="{ 'open-panel': isScheduleOpen }"
      />
    </div>
    <livestream-videobroadcast v-show="livestream.broadcastState == 'Live'" />
    <div class="inner grid-layout " v-if="livestream.broadcastState != 'Live'">
      <presentation-sidebar
        :sidebar="index.sidebar"
        :contenttype="`index`"
        class="sidebar-index"
      />
      <div class="panel-content">
        <component-loader
          class="single-block-first"
          :data="index.content[0]"
          :position="0"
        />
        <h3 v-text="index.subtitle" />
        <!-- <component-loader :data="index.content[1]" :position="1" /> -->
        <component-loader
          :data="content"
          :key="`component-${key}`"
          :position="key + 1"
          ref="components"
          v-for="(content, key) in index.content.slice(1, 3)"
        />
        <h3 v-text="`Presentations`" />
        <div class="latest-posts">
          <index-landing-block
            :data="content"
            :number="key"
            :image="content.sidebar[0].image"
            :key="`block-${key}`"
            v-for="(content, key) in allPresentations.slice(0, 6)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import indexQuery from '~/assets/graphql/index.js'
import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import head from '~/assets/js/head'
import { mapState, mapActions } from 'vuex'

import gsap from 'gsap'

export default {
  async asyncData(context) {
    return getAsyncData(context, indexQuery)
  },
  head() {
    return head(this.index.seo)
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    ...mapState([
      'isLoaderAnimationDone',
      'allPresentations',
      'allRepresentations',
      'isScheduleOpen',
      'isBroadcastOpen',
      'livestream',
      'isMuted'
    ])
  },
  watch: {
    // isBroadcastOpen(val) {
    //   // open close broadast
    // },
    // isScheduleOpen(val) {
    //   // open close schedule
    // },
  },
  methods: {
    ...mapActions([
      'setNavOpen',
      'setSearchOpen',
      'setShareOpen',
      'setDarkMode',
      'setFirstLoaderDone',
      'setHideLoader'
    ]),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setShareOpen(false)
    },
    onMouseMove(event) {
      if (this.$route.name != 'index') return

      // console.log('mousemove')

      this.clearHideMenuInterval()
      this.initHideMenuonIdle()
      gsap.to('.top-nav', {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.inOut'
      })
      gsap.to('.floater', {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.inOut'
      })
    },
    initHideMenuonIdle() {
      this.hideMenuInterval = setInterval(this.hideMenuIntervalFunc, 5000)
    },
    hideMenuIntervalFunc() {
      console.log('fade menu out')

      if (
        !this.isScheduleOpen &&
        !this.isBroadcastOpen &&
        !this.isNavOpen &&
        !this.isSearchOpen &&
        !this.isShareOpen &&
        !this.hideLoader
      ) {
        gsap.to('.top-nav', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut',
          onComplete: () => {
            this.clearHideMenuInterval()
          }
        })
        gsap.to('.floater', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
        gsap.to('.logo-play-wrap', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
      }
    },
    clearHideMenuInterval() {
      clearInterval(this.hideMenuInterval)
    }
  },
  mounted() {
    // console.log(this.allPresentations)
    this.close_menus()
    this.setDarkMode(true)

    // reset loader to show livestream on upcoming
    if (this.livestream.broadcastState == 'Upcoming') {
      console.log('kkk', this.isLoaderAnimationDone)
      this.setFirstLoaderDone(false)
      this.setHideLoader(false)
    } else if (this.livestream.broadcastState == 'Live') {
      this.setFirstLoaderDone(true)
      this.setHideLoader(true)

      this.initHideMenuonIdle()

      window.addEventListener('mousemove', (e) => {
        this.onMouseMove(e)
      })
    }
    // document.body.classList.add('dark-mode')
  },
  beforeDestroy() {
    this.clearHideMenuInterval()
    window.removeEventListener('mousemove', this.onMouseMove)
  }
}
</script>

<style lang="scss">
.section-index {
  // background-color: $darkgrey;
  min-height: 100vh;
  h3 {
    padding: 20px;
  }
  .panel-content {
    margin-left: 25%;
    // margin-bottom: $pageMargin;
  }

  .single-block-first {
    .details {
      display: none;
    }
  }
  .latest-posts {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
    .search-block {
      @include below('tablet') {
        width: 50%;
        &:last-child {
          display: none;
        }
      }
    }
  }
  .index-nav-links {
    width: 100%;
  }
  .with-blob-nav {
    background-color: transparent;
    > .inner {
      padding: 0;
    }
    .wrap-links {
      display: flex;
      flex-direction: column;
      padding: $pageMargin #{$pageMargin + $pageMargin / 2} $pageMargin;
      border-radius: $roundRadius;
      @include below(small) {
        padding: $pageMargin;
      }
      @include below('mobile') {
        padding: $contentPaddingMob;
      }
      &.wrap-links-presentations {
        background-color: #efefef;
        .menu-category-title {
          color: $black;
        }
      }
      &.wrap-links-representations {
        background-color: $black;
      }
      .menu-category-title {
        font-size: 26px;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 25px;
      }
    }
  }
}

.broadcast-menus {
  .single-broadcasttype-menu {
    transform: scale(0);
    pointer-events: none;
    opacity: 0;
    transition: 0.3s opacity ease-in-out, 0.3s transform ease-in-out;
    letter-spacing: -0.015em;
    &.broadcast-menu {
      transform-origin: top left;
    }
    &.events-menu-wrap {
      transform-origin: top right;
    }
    &.open-panel {
      transform: scale(1);
      opacity: 1;
      pointer-events: auto;
    }
  }

  .furniture {
    padding-top: 24px;
    padding-bottom: 25px;
    border-top: none;
    @include below('tablet-small') {
      padding-top: 19px;
      padding-bottom: 19px;
      @include below('mobile') {
        padding: 19px 25px 19px;
      }
    }
    p {
      line-height: 1.25;
      @include below('tablet-small') {
        font-size: 13px;
      }
    }
  }
  .image + .furniture {
    border-top: 1px solid #adada8;
  }
}
</style>
