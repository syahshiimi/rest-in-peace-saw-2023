<template>
  <section
    class="section-slug section-template section-slug-presentation progress-yes"
    :class="{
      viewfull: view_full == true
    }"
  >
    <div
      class="inner grid-layout"
      :class="{ shift: presentation.content.length < 2 }"
    >
      <div class="panel-content">
        <component-loader
          :data="presentation.content[0]"
          :even="evenColor"
          :odd="oddColor"
        />
        <fragments-view-settings :number="presentation.content.length" />
        <component-loader
          :data="content"
          :key="`component-${key}`"
          :number="key"
          ref="components"
          v-for="(content, key) in presentation.content.slice(1)"
          :even="evenColor"
          :odd="oddColor"
        />
      </div>
      <presentation-sidebar
        :color="sidebarColor"
        :sidebar="presentation.sidebar"
        :top="presentation"
        :contenttype="`presentation`"
        class="sidebar-presentation"
        :even="evenColor"
        :odd="oddColor"
        :tags="getUniqueTags"
      />
      <fragments-next-article
        :color="bottomColor"
        :slug="nextPresentation.slug"
        :next="nextPresentation.next"
      />
      <fragments-mobilebar
        :title="presentation.title"
        :next="nextPresentation.next"
        :nextslug="nextPresentation.slug"
        :prev="prevPresentation.prev"
        :prevslug="prevPresentation.slug"
        :number="prevPresentation.number"
      />
    </div>
  </section>
</template>
<script>
import presentationQuery from '~/assets/graphql/presentation.js'
import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import head from '~/assets/js/head'
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState, mapActions } from 'vuex'
export default {
  async asyncData(context) {
    return getAsyncData(context, presentationQuery, context.route.params.slug, {
      slug: context.route.params.slug
    })
  },
  head() {
    return head(this.presentation.seo, this.$route.path)
  },
  data() {
    return {
      view_full: false
    }
  },
  components: {
    vComponentLoader: () => import('~/components/componentLoader.vue')
  },
  computed: {
    ...mapState(['allPresentations', 'allRepresentations']),
    getAllTags() {
      return this.presentation.content.map((block) => block.content.tag).flat(1)
    },
    getUniqueTags() {
      let uniq = [...new Set(this.getAllTags)]
      return uniq.filter((el) => {
        return el != null
      })
    },
    textColor() {
      return this.presentation.textColor && this.presentation.textColor.hex
        ? this.presentation.textColor.hex
        : '#000000'
    },
    sidebarColor() {
      return this.presentation.sidebarBackground &&
        this.presentation.sidebarBackground.hex
        ? this.presentation.sidebarBackground.hex
        : '#aaa7a2'
    },
    evenColor() {
      return this.presentation.evenContentCardBackground &&
        this.presentation.evenContentCardBackground.hex
        ? this.presentation.evenContentCardBackground.hex
        : '#cacaca'
    },
    oddColor() {
      return this.presentation.oddContentCardBackground &&
        this.presentation.oddContentCardBackground.hex
        ? this.presentation.oddContentCardBackground.hex
        : '#eeeeee'
    },
    bottomColor() {
      return this.presentation.bottomBarColour &&
        this.presentation.bottomBarColour.hex
        ? this.presentation.bottomBarColour.hex
        : '#eeeeee'
    },
    currentPresentationIndex() {
      return this.allPresentations
        .map((el) => el.slug)
        .indexOf(this.presentation.slug)
    },
    nextPresentation() {
      let nextPresentation = this.currentPresentationIndex + 1
      if (nextPresentation === this.allPresentations.length) {
        return {
          slug: 'representations-slug',
          next: this.allRepresentations[0]
        }
      } else {
        return {
          slug: 'presentations-slug',
          next: this.allPresentations[nextPresentation]
        }
      }
    },
    prevPresentation() {
      let prevPresentation = this.currentPresentationIndex - 1
      let nextPresentation = this.currentPresentationIndex + 1

      if (prevPresentation === -1) {
        return {
          slug: 'representations-slug',
          prev: this.allRepresentations[0],
          number: prevPresentation
        }
      } else if (this.$route.name === 'representations-slug') {
        return {
          slug: 'presentations-slug',
          next: this.allPresentations[0],
          number: prevPresentation
        }
      } else {
        return {
          slug: 'presentations-slug',
          prev: this.allPresentations[prevPresentation],
          number: prevPresentation
        }
      }
    }
  },
  methods: {
    ...mapActions(['setNavOpen', 'setSearchOpen', 'setUpdateViewBy']),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
    },
    viewFull() {
      // console.log('received full')
      this.view_full = true
      this.setUpdateViewBy(Math.random())
    },
    viewDefault() {
      // console.log('received default')
      this.view_full = false
      this.setUpdateViewBy(Math.random())
    }
  },
  mounted() {
    console.log(this.presentation)
    // receive click emits from child component
    emitter.on('VIEW:FULL', this.viewFull.bind(this))
    emitter.on('VIEW:DEFAULT', this.viewDefault.bind(this))

    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
      // close menus on page mount
      this.close_menus()
    })

    ///// hardcode for chonglii embed

    if (this.$route.params.slug == 'chong-lii') {
      // console.log('is chong li')

      setTimeout(
        function() {
          document
            .querySelectorAll('.single-block')[0]
            .querySelector('.single-button a').onclick = function(e) {
            // console.log('click')
            e.preventDefault()

            var bgWindow = window.open(
              '',
              'ChongLiiBG',
              'top=0,left=0,width=3840,height=2160'
            )
            bgWindow.document.write(
              '<title>(((o))) Make Sure You&rsquo;re Alone While Playing This Game (((o))) [close this window to exit screening]</title>'
            )
            bgWindow.document.write(
              '<div style="position: absolute; top: 0; left: 0; width:100%; height: 100%; background: #fff url(https://i.pinimg.com/originals/52/e6/76/52e676f7a539f3da110e512234bc4303.gif) no-repeat center fixed; background-size: cover; opacity: 0.5; display: flex; justify-content: center; align-items: center;"><p style="color: #000; font-family: sans-serif; font-size: 1rem; line-height: 1.4; text-align: center;">If you accidentally clicked the bg, minimise it or drag it <br>out of the way and continue enjoying the rest of the films.<br>(Closing this window will end the screening.)</p></div>'
            )

            setTimeout(cornersOpen, 1000)
            function cornersOpen() {
              var lsoundWindow = window.open(
                '',
                'ChongLiiLSOUND',
                'top=75,left=0,width=360,height=705'
              )
              lsoundWindow.document.write('<title>_</title>')
              lsoundWindow.document.write(
                '<img src="https://freight.cargo.site/t/original/i/2a76b9a5a8da106b52bc2a8f0532280cc53695f046a489f7ed816f5fe1234c47/BANNER_SOUND.png" style="width:360px;height:705px;position:absolute;top:0;left:0;">'
              )

              var rsoundWindow = window.open(
                '',
                'ChongLiiRSOUND',
                'top=75,left=1300,width=360,height=705'
              )
              rsoundWindow.document.write('<title>_</title>')
              rsoundWindow.document.write(
                '<img src="https://freight.cargo.site/t/original/i/2a76b9a5a8da106b52bc2a8f0532280cc53695f046a489f7ed816f5fe1234c47/BANNER_SOUND.png" style="width:360px;height:705px;position:absolute;top:0;left:0;">'
              )

              var ctlWindow = window.open(
                '',
                'ChongLiiCTL',
                'top=75,left=0,width=360,height=270'
              )
              ctlWindow.document.write('<title>_</title>')
              ctlWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="360" height="270" src="https://www.youtube.com/embed/pe3aLYgvpQU?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var ctrWindow = window.open(
                '',
                'ChongLiiCTR',
                'top=75,left=1300,width=360,height=270'
              )
              ctrWindow.document.write('<title>_</title>')
              ctrWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="360" height="270" src="https://www.youtube.com/embed/aphkjDstl6Q?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              bgWindow.addEventListener('unload', closeCorners)
              function closeCorners() {
                lsoundWindow.close()
                rsoundWindow.close()
                ctlWindow.close()
                ctrWindow.close()
              }
            }

            setTimeout(bottomOpen, 1250)
            function bottomOpen() {
              var bblWindow = window.open(
                '',
                'ChongLiiBBL',
                'top=3000,left=0,width=480,height=224'
              )
              bblWindow.document.write('<title>_</title>')
              bblWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="480" height="224" src="https://www.youtube.com/embed/hM7UppIzlmM?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var bbrWindow = window.open(
                '',
                'ChongLiiBBR',
                'top=3000,left=1180,width=480,height=224'
              )
              bbrWindow.document.write('<title>_</title>')
              bbrWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="480" height="224" src="https://www.youtube.com/embed/yI_z6l_kW_g?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              bgWindow.addEventListener('unload', closeBottom)
              function closeBottom() {
                bblWindow.close()
                bbrWindow.close()
              }
            }

            setTimeout(jigsawOpen, 1500)
            function jigsawOpen() {
              var bllWindow = window.open(
                '',
                'ChongLiiBLL',
                'top=520,left=380,width=180,height=180'
              )
              bllWindow.document.write('<title>_</title>')
              bllWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="180" src="https://www.youtube.com/embed/2vbWtXWtoJk?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var tllWindow = window.open(
                '',
                'ChongLiiTLL',
                'top=160,left=340,width=180,height=288'
              )
              tllWindow.document.write('<title>_</title>')
              tllWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="288" src="https://www.youtube.com/embed/p0ynPErMi4Q?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var blWindow = window.open(
                '',
                'ChongLiiBL',
                'top=412,left=560,width=180,height=288'
              )
              blWindow.document.write('<title>_</title>')
              blWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="288" src="https://www.youtube.com/embed/9FtBghBzpl0?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var tlWindow = window.open(
                '',
                'ChongLiiTL',
                'top=200,left=560,width=180,height=180'
              )
              tlWindow.document.write('<title>_</title>')
              tlWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="180" src="https://www.youtube.com/embed/I_o-CmcA2ic?&autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var brWindow = window.open(
                '',
                'ChongLiiBR',
                'top=520,left=740,width=360,height=180'
              )
              brWindow.document.write('<title>_</title>')
              brWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="360" height="180" src="https://www.youtube.com/embed/Ts6dbQejZEE?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var trWindow = window.open(
                '',
                'ChongLiiTR',
                'top=200,left=740,width=180,height=320'
              )
              trWindow.document.write('<title>_</title>')
              trWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="320" src="https://www.youtube.com/embed/8do4WSB5tjg?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var trrWindow = window.open(
                '',
                'ChongLiiTRR',
                'top=200,left=920,width=360,height=360'
              )
              trrWindow.document.write('<title>_</title>')
              trrWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="360" height="360" src="https://www.youtube.com/embed/FCFOdTMymwE?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var brrWindow = window.open(
                '',
                'ChongLiiBRR',
                'top=580,left=1140,width=180,height=180'
              )
              brrWindow.document.write('<title>_</title>')
              brrWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="180" height="180" src="https://www.youtube.com/embed/b85z5HTwAdg?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              var extraWindow = window.open(
                '',
                'ChongLiiEXTRA',
                'top=780,left=740,width=180,height=150'
              )
              extraWindow.document.write('<title>_</title>')
              extraWindow.document.write(
                '<iframe id="ytplayer" type="text/html" width="216" height="180" src="https://www.youtube.com/embed/JFtnnMOCezo?autoplay=1&mute=1&fs=0&modestbranding=1&start=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
              )

              bgWindow.addEventListener('unload', closeJigsaw)
              function closeJigsaw() {
                tllWindow.close()
                bllWindow.close()
                tlWindow.close()
                blWindow.close()
                trWindow.close()
                brWindow.close()
                brrWindow.close()
                trrWindow.close()
                extraWindow.close()
              }
            }
          }
        }.bind(this),
        100
      )
    }
  }
}
</script>

<style lang="scss">
.section-template {
  padding: calc(#{$pageMargin} + #{$blobHeight} + #{$pageMargin}) $pageMargin 0;
  @include below('tablet-small') {
    padding: calc(#{$pageMarginMob} + #{$blobHeightMob} + #{$pageMarginMob})
      $pageMarginMob 0;
    &.section-slug-presentation {
      padding-bottom: 80px;
    }
    &.section-slug-representation {
      padding-bottom: 80px;
    }
  }
  > .inner {
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    &.shift {
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
    }
  }

  .panel-content {
    transform-origin: left;
    // width: grid(9, false);
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    @include below('tablet-small') {
      width: calc(100% - #{$pageMarginMob});
      margin-left: 0 !important;
    }
  }

  @include above(large) {
    .panel-content {
      // width: gridL(9, false);
    }
  }
}

@include below('tablet-small') {
  .sidebar-open .panel-content {
    pointer-events: none;
  }
}
</style>
