<template>
  <section
    class="section-slug section-template section-slug-representation progress-yes"
    :class="{
      viewfull: view_full == true
    }"
    :style="`color: ${textColor};`"
  >
    <div class="inner">
      <div class="panel-content">
        <component-loader
          :data="representation.content[0]"
          :even="evenColor"
          :odd="oddColor"
        />
        <fragments-view-settings :number="representation.content.length" />
        <div class="main-blocks">
          <component-loader
            :number="key"
            :even="evenColor"
            :odd="oddColor"
            :data="content"
            :key="`component-${key}`"
            ref="components"
            v-for="(content, key) in representation.content.slice(1)"
            :refidx="[content.hasReference ? content.reference : null]"
            :class="[
              content.hasReference
                ? 'has-reference reference-' + content.reference + ''
                : 'no-reference'
            ]"
          />
        </div>
      </div>
      <presentation-sidebar
        :color="sidebarColor"
        :even="evenColor"
        :odd="oddColor"
        :sidebar="representation.sidebar"
        :contenttype="`representation`"
        class="sidebar-presentation"
      />
      <fragments-next-article
        :color="bottomColor"
        :slug="nextRepresentation.slug"
        :next="nextRepresentation.next"
      />
      <fragments-mobilebar
        :slug="nextRepresentation.slug"
        :next="nextRepresentation.next"
      />
    </div>
  </section>
</template>
<script>
import representationQuery from '~/assets/graphql/representation.js'
import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import head from '~/assets/js/head'
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState, mapActions } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.min.js'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.min.js'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
}

export default {
  async asyncData(context) {
    return getAsyncData(
      context,
      representationQuery,
      context.route.params.slug,
      {
        slug: context.route.params.slug
      }
    )
  },
  head() {
    return head(this.representation.seo, this.$route.path)
  },
  data() {
    return {
      view_full: false,
      is_scrolling: false
    }
  },
  computed: {
    textColor() {
      return this.representation.textColor.hex
        ? this.representation.textColor.hex
        : '#000000'
    },
    sidebarColor() {
      return this.representation.sidebarBackground.hex
        ? this.representation.sidebarBackground.hex
        : '#aaa7a2'
    },
    evenColor() {
      return this.representation.evenContentCardBackground.hex
        ? this.representation.evenContentCardBackground.hex
        : '#cacaca'
    },
    oddColor() {
      return this.representation.oddContentCardBackground.hex
        ? this.representation.oddContentCardBackground.hex
        : '#eeeeee'
    },
    bottomColor() {
      return this.representation.bottomBarColour &&
        this.representation.bottomBarColour.hex
        ? this.representation.bottomBarColour.hex
        : '#eeeeee'
    },
    ...mapState(['allPresentations', 'allRepresentations', 'isScrolling']),
    currentRepresentationIndex() {
      return this.allRepresentations
        .map((el) => el.slug)
        .indexOf(this.representation.slug)
    },
    nextRepresentation() {
      let nextRepresentation = this.currentRepresentationIndex + 1
      if (nextRepresentation === this.allRepresentations.length) {
        return {
          slug: 'presentations-slug',
          next: this.allPresentations[0]
        }
      } else {
        return {
          slug: 'representations-slug',
          next: this.allRepresentations[nextRepresentation]
        }
      }
    }
  },
  components: {
    vComponentLoader: () => import('~/components/componentLoader.vue')
  },
  methods: {
    ...mapActions([
      'setNavOpen',
      'setSearchOpen',
      'setShareOpen',
      'setDarkMode'
    ]),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setShareOpen(false)
    },
    viewFull() {
      this.view_full = true
    },
    viewDefault() {
      this.view_full = false
    },
    initScrollTrigger() {
      var _checkScroll = this.checkScroll
      var _scrollStart = this.scrollStart
      var _scrollEnd = this.scrollEnd

      gsap.utils
        .toArray('.main-blocks .has-reference')
        .forEach(function(section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 200px',
            // end: 'bottom 200px',
            // markers: true,
            onToggle: function(ev) {
              // when element scrolls into view [200px from top]

              // if still scrolling flag is true, return
              if (_checkScroll()) return
              // if not, trigger scrolling flag

              _scrollStart()

              // get index of reference id to use for sidebar
              var sidebar_index = ev.trigger.getAttribute('data-ref')

              // highlight active reference
              for (
                let i = 0;
                i <
                document.querySelectorAll('.wrap-notes .has-reference').length;
                i++
              ) {
                const ref = document.querySelectorAll(
                  '.wrap-notes .has-reference'
                )[i]
                ref.classList.remove('active')
              }
              document
                .querySelector('.wrap-notes .reference-' + sidebar_index)
                .classList.add('active')

              // scroll sidebar wrapper to correct sidebar
              gsap.to('.sidebar', {
                duration: 0.3,
                scrollTo: {
                  y: '.wrap-notes .reference-' + sidebar_index,
                  offsetY: 200
                },
                onComplete: function() {
                  // when scrolling ends,
                  // set flag to false to allow more scrolling
                  _scrollEnd()
                }
              })
            }
          })
        })

      // this.is_scrolling = true
    },
    checkScroll() {
      return this.is_scrolling
    },

    scrollStart() {
      this.is_scrolling = true
    },
    scrollEnd() {
      this.is_scrolling = false
    }
  },
  mounted() {
    // receive click emits from child component
    emitter.on('VIEW:FULL', this.viewFull.bind(this))
    emitter.on('VIEW:DEFAULT', this.viewDefault.bind(this))

    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
      this.close_menus()
      this.setDarkMode(true)
      // document.body.classList.add('dark-mode')
    })

    setTimeout(
      function() {
        this.initScrollTrigger()
      }.bind(this),
      1000
    )
  }
}
</script>

<style lang="scss">
.section-slug-representation .panel-content {
  margin-left: 25%;
  @include below('mobile') {
    margin-left: 0;
  }
}
.main-blocks {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
