<template>
  <div
    class="top-nav"
    :class="[
      isNavOpen ? 'show-menu' : '',
      isSearchOpen ? 'show-search' : '',
      isShareOpen ? 'show-share' : '',
      hideLoader ? '' : 'loader-active',
      livestream.broadcastState == 'Upcoming' && $route.name == 'index'
        ? 'upcoming-menu broadcasttype-menu'
        : '',
      livestream.broadcastState == 'Live' && $route.name == 'index'
        ? 'live-menu broadcasttype-menu'
        : ''
    ]"
    @click="hideLoaderFromMenu"
  >
    <nav>
      <div class="inner">
        <!-- <nuxt-link
          v-if="!showBroadcastMenu"
          :to="{ name: 'index' }"
          class="logo-a"
        > -->
        <!-- <v-logo class="nav-logo" /> -->
        <!-- <img class="nav-logo" src="/hh-logo-compact.svg"/>-->
        <!-- </nuxt-link> -->

        <div class="nav-blob nav-blob-0 blob-type hhblob navblob-logo">
          <nuxt-link
            class="new-logo"
            :to="{ name: 'index' }"
            @click.native="toggleLoaderViaLogo"
          >
            <v-logo class="nav-logo-white" />
            <div
              class="red-dot"
              v-if="
                this.livestream.broadcastState == 'Live' ||
                  this.livestream.broadcastState == 'Upcoming'
              "
            />
          </nuxt-link>
        </div>
        <div class="spacer-blob spacer-blob-0 spacer-after-logo">
          <v-spacer class="spacer-svg" />
        </div>

        <!-- LIVESTREAM BLOBS -->
        <div
          @click="toggle_broadcast"
          @mouseover="hover_broadcastblob"
          @mouseleave="hoverout_broadcastblobs"
          class="nav-blob nav-blob-0 blob-type hhblob cursor navblob-broadcastmenu"
          v-if="showBroadcastMenu"
          :style="{ width: broadcastTitle.length * 23 + 'px' }"
        >
          <span v-text="broadcastTitle" />
        </div>
        <div
          v-if="showBroadcastMenu"
          class="spacer-blob spacer-blob-0 spacer-before-type"
        >
          <v-spacer class="spacer-svg" />
        </div>
        <div
          @click="toggle_schedule"
          @mouseover="hover_scheduleblob"
          @mouseleave="hoverout_broadcastblobs"
          class="nav-blob nav-blob-0 blob-type hhblob cursor navblob-schedulemenu"
          v-if="showBroadcastMenu"
          :style="{ width: broadcastTitle.length * 26 + 'px' }"
        >
          <span v-html="eventDate" />
          <!-- <span v-text="`Schedule`" /> -->
        </div>
        <!-- /LIVESTREAM BLOBS -->

        <div
          class="ticker ticker-desktop"
          v-if="
            this.$route.name == 'index' &&
              this.livestream.broadcastState == 'No Event'
          "
        >
          <div class="inner">
            <div v-for="(i, key) in 4" :key="`i-${key}`">
              <div
                v-html="
                  `Hothouse is located at the work space shared between design studio Currency and art collective INTER—MISSION with the interest of opening and sharing our resources, whether that be space, equipment or knowledge. We are interested in providing a space for processes and experimentation.`
                "
              />
            </div>
          </div>
        </div>

        <div
          v-if="
            livestream.broadcastState == 'No Event'
              ? route
              : $route.name != 'index' && $route.name != 'results'
          "
          class="nav-blob nav-blob-0 blob-type hhblob navblob-typetitle"
          :style="{ width: type.length * 26 + 'px' }"
        >
          <span v-text="type" />
        </div>
        <div
          v-if="$route.name != 'index' && $route.name != 'results'"
          class="spacer-blob spacer-blob-0"
        >
          <v-spacer class="spacer-svg" />
        </div>
        <div
          v-if="
            livestream.broadcastState == 'No Event'
              ? route
              : $route.name != 'index' && $route.name != 'results'
          "
          class="nav-blob nav-blob-1 blob-category hhblob navblob-category"
          :style="{ width: categoryText.length * 26 + 'px' }"
        >
          <span v-text="categoryText" />
        </div>
        <!-- <div class="spacer-blob">
          <v-spacer class="spacer-svg" />
        </div> -->
        <!-- <div class="circle-blob"></div> -->
        <div
          v-if="$route.name != 'index' && $route.name != 'results'"
          class="spacer-blob spacer-blob-1 "
        >
          <v-spacer class="spacer-svg" />
        </div>
        <div
          class="nav-blob nav-blob-2 blob-name hhblob navblob-search"
          :style="{ width: title.length * 20 + 'px' }"
          v-if="!showBroadcastMenu"
        >
          <span class="whatisthis" v-text="title" />
          <div
            class="activetags-container"
            v-if="$route.name === 'results' && activeFilters.length > 0"
          >
            <div class="activetags-inner">
              <div
                class="single-tag-nav"
                v-for="(filter, key) in activeFilters"
                :key="`filter-${key}`"
                @click="closeSingleTag(filter)"
              >
                <span class="text-label" v-text="filter" />
                <v-close />
              </div>
            </div>
            <div class="fader" />
            <v-close
              class="close-svg close-search-svg"
              @click.prevent="resetFilters"
            />
          </div>
        </div>
        <!-- <div class="spacer-blob">
          <v-spacer class="spacer-svg" />z
        </div> -->
        <!-- <div class="circle-blob"></div> -->
        <div class="spacer-blob spacer-before-sound">
          <v-spacer class="spacer-svg" />
        </div>

        <div
          class="circle-blob nav-sound"
          v-if="showBroadcastMenu"
          @click="toggle_muted"
        >
          <v-mute v-if="!isMuted" class="mute-svg" />
          <v-unmute v-if="isMuted" class="unmute-svg" />
        </div>
        <div class="spacer-blob" v-if="showBroadcastMenu">
          <v-spacer class="spacer-svg" />
        </div>

        <div
          v-if="isSearchOpen"
          class="circle-blob nav-shuffle"
          @click="shuffle_data"
        >
          <v-shuffle class="shuffle-svg" />
        </div>
        <div v-else class="circle-blob nav-share" @click="toggle_share">
          <v-share class="share-svg" />
        </div>
        <div class="spacer-blob">
          <v-spacer class="spacer-svg" />
        </div>

        <div
          class="circle-blob nav-search"
          @click="toggle_search"
          v-if="!showBroadcastMenu"
        >
          <v-search class="search-svg" />
          <v-close class="close-svg" />
        </div>
        <div class="spacer-blob" v-if="!showBroadcastMenu">
          <v-spacer class="spacer-svg" />
        </div>
        <div class="circle-blob nav-menutrigger" @click="toggle_nav">
          <img class="icon-menu" src="/icon-menu.svg" />
          <img class="icon-close" src="/icon-close.svg" />
        </div>
      </div>
    </nav>
    <common-menu-overlay v-if="navtype == 'actual'" />
    <common-search-overlay v-if="navtype == 'actual'" />
    <common-share-overlay v-if="navtype == 'actual'" />
    <div
      class="frost-overlay"
      @click="close_menus"
      v-if="navtype == 'actual'"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import gsap from 'gsap'
import livestream from '~/assets/graphql/livestream'

export default {
  data() {
    return {
      progress: 1,
      speed: 0.4
    }
  },
  props: ['navtype'],
  watch: {
    $route(to, from) {
      if (
        from.name === 'results' &&
        to.name !== 'results' &&
        this.navtype == 'actual'
      ) {
        this.CLEAR_FILTER()
      }
    }
  },
  computed: {
    ...mapGetters(['getUniq']),
    ...mapState([
      'isLoaderAnimationDone',
      'allPresentations',
      'isNavOpen',
      'isSearchOpen',
      'isShareOpen',
      'allRepresentations',
      'activeFilters',
      'hideLoader',
      'livestream',
      'broadcast',
      'isScheduleOpen',
      'isBroadcastOpen',
      'isLive',
      'isMuted'
    ]),
    eventDate() {
      let fromDateObj = new Date(this.broadcast.from)
      let from_day = fromDateObj.getUTCDate()
      let from_month = fromDateObj.toLocaleString('en-US', { month: 'short' })
      let from_year = fromDateObj.getUTCFullYear()

      let toDateObj = new Date(this.broadcast.to)
      let to_day = toDateObj.getUTCDate()
      let to_month = toDateObj.toLocaleString('en-US', { month: 'short' })
      let to_year = toDateObj.getUTCFullYear()

      //prettier-ignore
      let fromDate = from_day  + (from_month == to_month ? ' – ' + to_day + ' ' + from_month  :  ' ' + from_month + ' – ' + to_day + ' ' + to_month ) + ' ' + to_year + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Schedule'
      return fromDate
    },
    from() {
      return new Date(this.broadcast.from).toLocaleString('en-SG', {
        day: 'numeric'
      })
    },
    to() {
      return new Date(this.broadcast.from).toLocaleString('en-SG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    },
    type() {
      if (this.$route.name === 'index') {
        return `Hothouse`
      } else if (this.$route.name === 'presentations-slug') {
        return `Presentation #${this.categoryNumber}`
      } else if (this.$route.name === 'representations-slug') {
        return `Re-presentation #${this.categoryNumber}`
      } else if (this.$route.name === 'about') {
        return 'About'
      } else {
        return ''
      }
    },
    route() {
      return (
        this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug' ||
        this.$route.name === 'about' ||
        this.$route.name === 'index'
      )
    },
    category() {
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
    categoryText() {
      return this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug'
        ? `${this.category.categoryName}`
        : ''
    },
    categoryNumber() {
      return this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug'
        ? `${this.category.categoryNumber}`
        : ''
    },
    title() {
      return this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug'
        ? this.category.title
        : ''
    },
    broadcastTitle() {
      return `Broadcast #${this.broadcast.number} - ${this.broadcast.title}`
    },
    showBroadcastMenu() {
      if (
        this.livestream.broadcastState == 'Live' ||
        this.livestream.broadcastState == 'Upcoming'
      ) {
        if (this.$route.name == 'index') {
          return true
        } else {
          return false
        }
      } else if (this.livestream.broadcastState == 'No Event') {
        return false
      }
    },
    showRouteMenu() {}
  },
  components: {
    vLogo: () => import('~/assets/svgs/logo-hh-black.svg?inline'),
    vSpacer: () => import('~/assets/svgs/menu-spacer.svg?inline'),
    vShare: () => import('~/assets/svgs/share.svg?inline'),
    vShuffle: () => import('~/assets/svgs/shuffle.svg?inline'),
    vSearch: () => import('~/assets/svgs/search.svg?inline'),
    vClose: () => import('~/assets/svgs/close.svg?inline'),
    vMute: () => import('~/assets/svgs/mute.svg?inline'),
    vUnmute: () => import('~/assets/svgs/unmute.svg?inline')
  },
  methods: {
    ...mapMutations(['CLEAR_FILTER']),
    ...mapActions([
      'toggleBroadcastOpen',
      'setBroadcastOpen',
      'setNavOpen',
      'toggleNavOpen',
      'setSearchOpen',
      'toggleSearchOpen',
      'setShareOpen',
      'toggleShareOpen',
      'shuffleData',
      'setHideLoader',
      'toggleScheduleOpen',
      'setScheduleOpen',
      'toggleMuted'
    ]),
    hideLoaderFromMenu() {
      if (
        this.livestream.broadcastState == 'Upcoming' &&
        this.$route.name == 'index'
      )
        return
      this.setHideLoader(true)
    },
    closeSingleTag(filter) {
      this.$store.commit('SET_FILTER', {
        filter: {
          filter: filter,
          val: false
        }
      })
      const filters = this.$route.query.filters
        ? this.$route.query.filters.split(',')
        : []
      const removed = filters.filter((item) => item !== filter)
      this.$router.push({ path: `/results?filters=${removed.join(`,`)}` })

      setTimeout(function() {
        gsap.to('.single-tag', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power1.inOut'
        })
      }, 100)
    },
    resetFilters() {
      this.CLEAR_FILTER()
      // this.$router.go(-1)
      this.$router.push({ name: 'index' })
    },
    toggle_nav() {
      this.toggleNavOpen()
      this.setSearchOpen(false)
      this.setShareOpen(false)
      this.setBroadcastOpen(false)
      this.setScheduleOpen(false)
    },
    toggle_search() {
      this.toggleSearchOpen()
      this.setNavOpen(false)
      this.setShareOpen(false)
      this.setBroadcastOpen(false)
      this.setScheduleOpen(false)

      if (this.isSearchOpen) {
        gsap.set('.search-overlay .single-tag', { opacity: 1, scale: 1 })
      }
    },
    toggle_share() {
      this.toggleShareOpen()
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setBroadcastOpen(false)
      this.setScheduleOpen(false)
    },
    toggle_muted() {
      this.toggleMuted()
    },
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setShareOpen(false)
      this.setBroadcastOpen(false)
      this.setScheduleOpen(false)
    },
    toggle_schedule() {
      if (this.isScheduleOpen) {
        this.setScheduleOpen(false)
      } else {
        this.setScheduleOpen(true)
        this.setBroadcastOpen(false)
      }
      this.setNavOpen(false)
      this.setShareOpen(false)
      this.setSearchOpen(false)

      // reset broadcast / event menu scroll pos
      if (document.querySelector('.events-inner')) {
        document.querySelector('.events-inner').scrollTop = 0
        document.querySelector('.broadcast-menu').scrollTop = 0
      }
    },
    toggle_broadcast() {
      if (this.isBroadcastOpen) {
        this.setBroadcastOpen(false)
      } else {
        this.setBroadcastOpen(true)
        this.setScheduleOpen(false)
      }
      this.setNavOpen(false)
      this.setShareOpen(false)
      this.setSearchOpen(false)

      // reset broadcast / event menu scroll pos
      if (document.querySelector('.events-inner')) {
        document.querySelector('.events-inner').scrollTop = 0
        document.querySelector('.broadcast-menu').scrollTop = 0
      }
    },
    toggleLoaderViaLogo() {
      console.log('click ;ogo')
      if (
        this.$route.name == 'index' &&
        this.livestream.broadcastState == 'Upcoming'
      ) {
        if (!this.isLoaderAnimationDone) {
          this.setHideLoader(true)
        } else {
          this.setHideLoader(false)
        }
      }
    },
    shuffle_data() {
      // prevent interaction when shuffle animation is happening
      var shuffle_this = this.shuffleData
      document.querySelector('.actual-nav').classList.add('no-interact')

      gsap.fromTo(
        '.actual-nav .nav-shuffle',
        { rotation: 0 },
        {
          rotation: 720,
          duration: 1.5,
          ease: 'power2.inOut',
          clearProps: 'all'
        }
      )

      gsap.to('.actual-nav .search-overlay .single-tag', {
        opacity: 0,
        scale: 0,
        ease: 'power2.in',
        duration: 0.2,
        stagger: {
          each: 0.025,
          from: 'random'
        },
        onComplete() {
          shuffle_this()
          setTimeout(function() {
            gsap.to('.actual-nav .search-overlay .single-tag', {
              opacity: 1,
              scale: 1,
              delay: 0.1,
              ease: 'power2.Out',
              duration: 0.2,
              stagger: {
                each: 0.025,
                from: 'random'
              },
              onComplete() {
                //allow click
                document
                  .querySelector('.actual-nav')
                  .classList.remove('no-interact')
              }
            })
          }, 200)
        }
      })
    },
    handleMarquee() {
      console.log('handle marquee')
      var that = this
      const marquee = document.querySelectorAll('.ticker')
      marquee.forEach(function(el) {
        const container = el.querySelector('.inner')
        const content = el.querySelector('.inner > *')
        const elWidth = content.offsetWidth
        let clone = content.cloneNode(true)
        container.appendChild(clone)
        function loop() {
          if (that.$route.name != 'index') return
          that.progress = that.progress - that.speed
          if (that.progress <= elWidth * -1) {
            that.progress = 0
          }
          container.style.transform = 'translateX(' + that.progress + 'px)'
          container.style.transform += 'skewX(' + that.speed * 0.4 + 'deg)'
          window.requestAnimationFrame(loop)
        }
        loop()
      })
    },
    hover_broadcastblob() {
      gsap.to('.navblob-broadcastmenu', {
        color: this.livestream.broadcast.color.hex,
        duration: 0.3,
        ease: 'power1.inOut'
      })
    },
    hover_scheduleblob() {
      gsap.to('.navblob-schedulemenu', {
        color: this.livestream.broadcast.events[0].color.hex,
        duration: 0.3,
        ease: 'power1.inOut'
      })
    },
    hoverout_broadcastblobs() {
      gsap.to('.navblob-broadcastmenu', {
        color: '#ffffff',
        duration: 0.3,
        ease: 'power1.inOut'
      })
      gsap.to('.navblob-schedulemenu', {
        color: '#ffffff',
        duration: 0.3,
        ease: 'power1.inOut'
      })
    }
  },
  mounted() {
    if (this.livestream.broadcastState == 'No Event') {
      this.handleMarquee()
    }
  }
}
</script>

<style lang="scss">
.top-nav {
  position: fixed;
  z-index: 7;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  transition: 0.3s filter ease-in-out;
  &.loader-active:not(.upcoming-menu) {
    filter: invert(1);
    .red-dot {
      filter: invert(1);
    }
  }
}

.progress-bar {
  .navblob-logo {
    .red-dot {
      top: 0;
      right: -12px;
      filter: invert(1);
      @include below('tablet-small') {
        right: -9px;
      }
    }
  }
}

nav {
  .cursor {
    cursor: pointer;
  }
  .navblob-logo {
    display: flex !important;
    align-items: center;
    flex-grow: 0 !important;
    @include below('tablet-small') {
      max-width: 35px !important;
      padding: 0 25px !important;
    }

    .logo-a {
      display: flex;
    }
    .new-logo {
      display: flex;
      align-items: center;
      @include below('tablet-small') {
        margin: 0 15px;
      }
    }

    .red-dot {
      width: 8px;
      height: 8px;
      background-color: #ed1c24;
      border-radius: 30px;
      position: absolute;
      right: 19px;
      top: 11px;
      animation: blink 1s infinite;
      transition: 0.3s ease-in-out filter;
      @include below('tablet-small') {
        width: 5px;
        height: 5px;
        top: 7px;
        right: 7px;
      }
    }
    @keyframes blink {
      0% {
        opacity: 0;
      }
      49% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }
  }

  .navblob-broadcastmenu {
    span {
      @include below('mobile') {
        font-size: 10px;
      }
    }
  }
  .navblob-schedulemenu {
    @include below('tablet') {
      display: none !important;
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  padding: $pageMargin;
  z-index: 5;
  @include below('tablet-small') {
    padding: $pageMarginMob;
  }
  svg,
  img {
    user-select: none;
  }
  .inner {
    display: flex;
    align-items: center;
    height: $blobHeight;
    @include below('tablet-small') {
      height: $blobHeightMob;
    }
  }

  .single-tag-nav {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 15px;
    cursor: pointer;
    &:last-child {
      margin-right: 40px;
    }
    @include below('mobile') {
      &:first-child {
        margin-left: 0px;
      }
      &:last-child {
        margin-right: 20px;
      }
    }
    span {
      opacity: 1 !important;
    }
    @include below('tablet-small') {
      // position: absolute;
      // top: 50%;
      // left: 0;
      // transform: translateY(-50%);
    }
    svg {
      position: absolute;
      right: 0;
      top: 0;
      width: 13px;
      @include below('mobile') {
        position: absolute;
        top: 50%;
        width: 10px;
        transform: translateY(-50%);
      }
    }
    .text-label {
      margin-right: 20px;
      @include below('mobile') {
        margin-right: 15px;
      }
    }
  }
  .nav-logo {
    width: 51.5px;
    margin-right: 24px;
    @include below('tablet-small') {
      width: 29px;
      margin-right: 15px;
    }
    path {
      transition: 0.2s fill ease-in-out;
    }
  }
  .nav-logo-white {
    width: 37.96px;
    fill: $white;
    @include below('tablet-small') {
      width: 20px;
    }
  }
  .blob-name,
  .navblob-broadcastmenu {
    flex-grow: 1;
  }
  .nav-search {
    position: relative;
    cursor: pointer;
    svg {
      width: 29px;
      position: relative;
      top: -1px;
      left: -1px;
      transition: 0.2s opacity ease-in-out, 0.2s transform ease-in-out;
      @include below('tablet') {
        width: 23px;
      }
      @include below('tablet-small') {
        left: 0;
        width: 18px;
      }
    }
    .close-svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      opacity: 0;
    }
  }

  .nav-share {
    position: relative;
    transition: 0.3s transform ease-in-out, 0.2s background-color ease-in-out;
    cursor: pointer;
    svg {
      position: relative;
      z-index: 2;
      width: 20px;
      left: -3px;
      @include below('tablet') {
        width: 14px;
      }
      @include below('tablet-small') {
        left: -2px;
        width: 11px;
      }
    }
  }
  .nav-sound {
    position: relative;
    transition: 0.3s transform ease-in-out, 0.2s background-color ease-in-out;
    cursor: pointer;
    svg {
      position: relative;
      z-index: 2;
      &.unmute-svg {
        top: 1px;
        @include below('tablet') {
        }
      }
      @include below('tablet') {
        width: 25px;
      }
      @include below('tablet-small') {
        width: 17px;
      }
    }
  }
  .nav-shuffle {
    position: relative;
    cursor: pointer;
    svg {
      position: relative;
      z-index: 2;
      width: $pageMargin;
      transform-origin: 50% 50%;
      @include below('tablet') {
        width: 22px;
      }
      @include below('mobile') {
        width: 18px;
      }
    }
  }
  .nav-menutrigger {
    position: relative;
    cursor: pointer;
    img {
      transition: 0.2s filter ease-in-out, 0.2s opacity ease-in-out,
        0.2s transform ease-in-out;
    }
    .icon-menu {
      width: 35px;
      @include below('tablet') {
        width: $pageMargin;
      }
      @include below('tablet-small') {
        width: 20px;
      }
    }
  }
}

.dark-mode .nav-menutrigger img,
.dark-mode .nav-search img {
  filter: invert(1);
}
.dark-mode .nav-share svg path,
.dark-mode .nav-search svg path,
.dark-mode .nav-shuffle svg path {
  fill: black;
}

.dark-mode .nav-logo path {
  fill: $white;
}

.top-nav.show-menu .menu-overlay {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.top-nav.show-search .search-overlay {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.page-index .top-nav.show-search .nav-search .close-svg {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 1;
}
.page-index .top-nav.show-search .nav-search .search-svg {
  opacity: 0;
}

.top-nav.show-share .nav-share {
  transform: rotate(-90deg);
}

.icon-close {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: $pageMargin;
  opacity: 0;
  @include below('tablet') {
    width: 23px;
  }
  @include below('tablet-small') {
    width: 17px;
  }
}
.show-menu .icon-close {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(0deg);
}
.show-menu .icon-menu {
  opacity: 0;
}
.frost-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(150px);
  transition: 0.3s opacity ease-in-out;
  z-index: 4;
  opacity: 0;
  pointer-events: none;

  @include below('tablet-small') {
    backdrop-filter: blur(20px);
  }
}
.broadcasttype-menu .frost-overlay {
  display: none;
}

.top-nav.show-search .frost-overlay,
.top-nav.show-menu .frost-overlay {
  opacity: 1;
  pointer-events: auto;
}

.page-results .top-nav.show-search .frost-overlay {
  opacity: 0;
  pointer-events: none;
}

.hhblob {
  position: relative;
  background-color: $black;
  color: $white;
  font-size: 26px;
  border-radius: $roundRadius;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 $pageMargin;
  height: $blobHeight;
  transition: 0.2s background-color ease-in-out, 0.2s width ease-in-out,
    0.2s border-radius ease-in-out, 0.2s transform ease-in-out;
  // min-width: 285px;
  @include below('small') {
    font-size: 24px;
  }
  @include below('tablet') {
    font-size: 20px;
  }
  @include below('tablet-small') {
    height: $blobHeightMob;
    // padding: 10px;
  }
  @include below('mobile') {
    font-size: 15px;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
  }
}
.search-overlay .hhblob span {
  position: relative;
  top: auto;
  left: auto;
  transform: none;
}
.page-results .nav-blob span {
  position: relative;
  transform: none;
  top: auto;
  left: auto;
  // margin-right: 20px;
}
.page-results .nav-blob-2 {
  justify-content: flex-start;
  padding-left: $pageMargin / 2;
  align-items: center;
  @include below('tablet-small') {
    display: flex;
  }
  .activetags-container {
    display: flex;
    padding: 5px 0;
    @include below('tablet-small') {
      // height: 100%;
    }
    .fader {
      position: absolute;
      right: 0;
      top: 0;
      width: 70px;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0.1) 100%
      );
      border-radius: $roundRadius;
      @include below('mobile') {
        width: 50px;
      }
    }
    // height: 100%;
    > .activetags-inner {
      display: flex;
      // width: 100%;
      line-height: 1;
    }
    // flex-wrap: wrap;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.page-index .nav-blob-0,
.page-about .nav-blob-0 {
  // width: calc((0.25 * 100vw) - (#{$pageMargin / 2} + 75.5px)) !important;
  // width: auto !important;
  span {
    opacity: 1 !important;
    left: 30px;
    transform: translate(0%, -50%);
  }
}
@include above('tablet-small') {
  .page-index .nav-blob-1,
  .page-about .nav-blob-1 {
    border-radius: 0;
    transform: scaleX(3);
    z-index: -1;
  }
}

.broadcasttype-menu nav .spacer-before-sound {
  @include below('tablet') {
    display: none;
  }
  @include below('tablet-small') {
    display: flex;
  }
}

@include below('tablet-small') {
  nav .nav-blob-0,
  nav .nav-blob-2,
  nav .spacer-blob-0:not(.spacer-after-logo),
  nav .spacer-blob-1 {
    display: none;
  }
  .page-index .nav-blob-0,
  .page-about .nav-blob-0 {
    display: block;
    flex-grow: 1;
    width: auto !important;
    // max-width: 60vw;
    max-width: calc(
      100% - #{$blobHeightMob} - #{$blobHeightMob} - #{$blobHeightMob}
    );
    span {
      left: 20px;
    }
  }
  .page-index .nav-blob-1,
  .page-about .nav-blob-1 {
    display: none;
  }
  .nav-blob-1 {
    flex-grow: 0;
    width: calc(100% - 170px) !important;
  }
}
@include below('mobile') {
  .page-index .nav-blob-0,
  .page-about .nav-blob-0 {
    padding: 0;
    span {
      left: 0;
      width: 100%;
      padding: 0 3px;
    }
  }
  .nav-blob-1 {
    width: calc(100vw - 205px) !important;
  }
}

.circle-blob {
  width: $blobHeight;
  height: $blobHeight;
  border-radius: 50%;
  background-color: $black;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  transition: 0.2s background-color ease-in-out, 0.2s color ease-in-out;

  @include below('tablet-small') {
    width: $blobHeightMob;
    height: $blobHeightMob;
  }
}
.dark-mode .hhblob,
.dark-mode .circle-blob {
  background-color: $white;
  color: $black;
}
.blob-name {
  text-transform: capitalize;
}

.spacer-blob {
  display: flex;
  margin-left: #{$blobHeight / 2 * -1};
  margin-right: #{$blobHeight / 2 * -1};
  @include below('tablet-small') {
    margin-left: #{$blobHeightMob / 2 * -1};
    margin-right: #{$blobHeightMob / 2 * -1};
  }
  svg {
    height: $blobHeight;
    width: auto;
    @include below('tablet-small') {
      height: $blobHeightMob;
    }
    path {
      transition: 0.2s fill ease-in-out;
    }
  }
}
.dark-mode .spacer-blob svg path {
  fill: $white;
}

.progress-bar .menu-overlay,
.progress-bar .search-overlay,
.progress-bar .frost-overlay,
.progress-bar .share-overlay {
  display: none;
}

.close-svg {
  width: $pageMargin;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  @include below('tablet') {
    width: 23px;
  }

  @include below('tablet-small') {
    // display: none;
    width: 18px;
    right: 10px;
  }
}
.actual-nav.no-interact {
  pointer-events: none;
}

/////
.ticker {
  position: fixed;
  left: 173px;
  width: calc(100vw - 470px);
  top: 31px;
  z-index: 4;
  background-color: red;

  height: 58px;
  overflow: hidden;
  transform-origin: top left;
  background-color: $black;
  border-left: none;
  user-select: none;
  @include below('tablet-small') {
    left: 92px;
    width: calc(100vw - 257px);
    top: 15px;
    z-index: 4;
    height: 34px;
  }
  .inner {
    display: flex;
    color: white;
    font-size: 20px;
    @include below('tablet') {
      font-size: 15px;
    }
  }
}
.ticker .inner > * {
  white-space: nowrap;
  font-weight: 500;
  line-height: 1;
  @include below('tablet') {
    line-height: 1;
  }
  // padding-right: 20px;
  // font-size: 1.74vw;
  // line-height: 127.5%;
  // margin-top: 0.32vw;
}
</style>
