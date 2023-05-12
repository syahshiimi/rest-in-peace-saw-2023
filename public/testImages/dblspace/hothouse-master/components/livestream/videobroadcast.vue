<template>
  <div class="livestream-video-wrap" @mousemove="mouseMove">
    <img
      class="youtubecover"
      v-if="
        activeProgramme
          ? !activeProgramme.livestreamLink.includes('vimeo')
            ? true
            : false
          : false
      "
      :src="this.activeProgramme.preEventImageCover.url"
    />
    <div
      class="vimeo-stream"
      v-if="
        activeProgramme
          ? activeProgramme.livestreamLink.includes('vimeo')
            ? true
            : false
          : false
      "
    >
      <fragments-vimeo
        ref="vimeoplayer"
        :url="activeProgramme.livestreamLink"
        :hascontrols="false"
        :isloadervideo="true"
        :isautoplay="true"
      />
    </div>

    <div class="wrapz">
      <livestream-youtubecomp
        class="youtube-stream"
        v-if="
          activeProgramme
            ? !activeProgramme.livestreamLink.includes('vimeo')
              ? true
              : false
            : false
        "
        :videoid="this.activeProgramme.livestreamLink"
        :programme="this.activeProgramme"
      />
    </div>

    <div class="no-event-wrap" v-if="!activeProgramme">
      <img :src="noProgrammeImg" />
    </div>
    <div
      class="floater"
      ref="floater"
      v-show="livestream.broadcastState == 'Live'"
    >
      <img v-show="!isMuted" src="/unmute-floater.png" />
      <img v-show="isMuted" src="/mute-floater.png" />
    </div>

    <div
      class="video-clicker"
      @click="toggle_muted"
      v-if="livestream.broadcastState == 'Live'"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import spacetime from 'spacetime'

import gsap from 'gsap'

if (process.client) {
  //
}
export default {
  name: 'videobroadcast',
  data() {
    return {
      activeProgramme: null,
      noProgrammeImg: null,
      target_x: 0,
      current_x: 0,
      target_y: 0,
      current_y: 0,
      ease: 0.075,
      youtubecheck: 0,
      intervalcheckCount: 0
    }
  },
  props: ['data'],

  computed: {
    ...mapState(['livestream', 'broadcast', 'isMuted', 'youtubePlayCheck'])
  },
  watch: {
    activeProgramme(val) {
      console.log('activeProgramme changed', val)

      this.setActiveProgrammeGlobal(val)

      if (val != null) {
        // a new event is detected
        //// if new event uses vimeo, play vimeo player
        if (val.livestreamLink.includes('vimeo')) {
          if (this.$refs.vimeoplayer) {
            setTimeout(() => {
              document.querySelector('.vimeo-video').play()
            }, 600)
          }
        }

        if (val) {
          if (!val.livestreamLink.includes('vimeo')) {
            //if video, show youtube cover image and set delay to hide
            gsap.set('.youtubecover', {
              opacity: 1,
              display: 'block'
            })

            gsap.to('.youtubecover', {
              opacity: 0,
              display: 'none',
              duration: 0.4,
              delay: 5
            })
          }
        }
      }
    },
    isMuted(val) {
      //
    }
  },
  methods: {
    ...mapActions([
      'toggleMuted',
      'setCheckYoutubePlay',
      'setActiveDayGlobal',
      'setActiveProgrammeGlobal'
    ]),
    getActiveDayProgramme() {
      // get all programmes for today

      // get today's date
      this.now = spacetime.now('Singapore')

      this.todaysProgrammes = []

      // pull all episodes with today's date
      for (let i = 0; i < this.broadcast.events.length; i++) {
        for (let y = 0; y < this.broadcast.events[i].schedule.length; y++) {
          var single_programme = this.broadcast.events[i].schedule[y]
          // if episode match today's date, push to new array
          if (
            spacetime(single_programme.from).date() ==
              spacetime(this.now).date() &&
            spacetime(single_programme.from).month() ==
              spacetime(this.now).month()
          ) {
            this.todaysProgrammes.push(single_programme)
          }
        }
      }

      console.log('todays programmes:', this.todaysProgrammes)

      this.setActiveDayGlobal(this.todaysProgrammes)

      // start checking if current time matches one of today's events
      this.initBroadcastIntervalCheck()
    },

    initBroadcastIntervalCheck() {
      this.checkInterval = setInterval(this.checkBroadcastTiming, 1000)
      // check once before interval start

      this.checkBroadcastTiming()
    },

    checkBroadcastTiming() {
      if (this.$route.name != 'index') return
      this.intervalcheckCount++

      // get user's time in sg time
      this.now = spacetime.now('Singapore')

      var ongoing_events_counter = 0

      for (let i = 0; i < this.todaysProgrammes.length; i++) {
        var is_overlapping = this.now.isBetween(
          spacetime(this.todaysProgrammes[i].from),
          spacetime(this.todaysProgrammes[i].to)
        )

        if (is_overlapping) {
          // used to check if ongoing events is 0 to handle no events
          ongoing_events_counter++

          // console.log('checking', this.activeProgramme, is_overlapping)
          // if event is within user's time, handle new video
          this.handleNewEvent(this.activeProgramme, this.todaysProgrammes[i])
        }
      }

      // if no events match, handlenoevents
      if (ongoing_events_counter == 0) {
        this.handleNoEvent()
      }
    },

    handleNewEvent(outgoingEvent, incomingEvent) {
      console.log(
        'handlenewevent',
        this.intervalcheckCount,
        outgoingEvent == incomingEvent,
        this.youtubePlayCheck
      )

      // if coming from another page
      //// do something

      this.activeProgramme = incomingEvent
      if (!this.activeProgramme.livestreamLink.includes('vimeo')) {
        // here
      }
      if (this.activeProgramme == null) {
        // handle no outgoing event
        // just init new video
      } else {
        // handle outgoing and incoming  event
        // check if outgoing and ingoing using same service
        // var outgoing_service = outgoingEvent.livestreamLink.includes('vimeo')
        //   ? 'vimeo'
        //   : 'youtube'
        // var incoming_service = incomingEvent.livestreamLink.includes('vimeo')
        //   ? 'vimeo'
        //   : 'youtube'
      }

      if (this.activeProgramme) {
        // handle
        // check new event url
        // use correct service
      }
    },
    handleNoEvent() {
      this.activeProgramme = null

      // get user's time in sg time
      this.now = spacetime.now('Singapore')

      var before_events_counter = 0

      if (this.todaysProgrammes.length > 0) {
        // check if there is event coming up
        ////by checking if current time is before any events
        for (let i = 0; i < this.todaysProgrammes.length; i++) {
          var is_before = this.now.isBefore(
            spacetime(this.todaysProgrammes[i].from)
          )

          if (is_before) {
            // use first of today's event that is closest to current time
            //// show preevent image
            // console.log('no event - before', this.todaysProgrammes[i])
            this.noProgrammeImg = this.todaysProgrammes[
              i
            ].preEventImageCover.url

            before_events_counter++
            break
          }

          if (before_events_counter == 0) {
            // console.log('no event - after last event', this.todaysProgrammes[i])
            if (
              !this.todaysProgrammes[i] ||
              !this.todaysProgrammes[i].postEventImageCover
            )
              return

            this.noProgrammeImg = this.todaysProgrammes[
              i
            ].postEventImageCover.url
          }
        }
      } else {
        this.noProgrammeImg = this.livestream.fallbackimg.url
        console.log('chex no image')
      }
    },
    toggle_muted() {
      console.log('click', this.isMuted)
      this.toggleMuted()

      // also force to play to help with autoplay not working
      // check which service first
      if (this.activeProgramme) {
        if (this.activeProgramme.livestreamLink.includes('vimeo')) {
          // play vimeo
          document.querySelector('.vimeo-video').play()
        } else {
          this.youtubecheck++

          this.setCheckYoutubePlay(this.youtubecheck)
        }
      }
    },
    mouseMove(e) {
      if (window.innerWidth < 1024) return
      this.target_x = e.clientX
      this.target_y = e.clientY
    },
    animateMouse() {
      this.current_x += (this.target_x - this.current_x) * this.ease // This is where the magic happens
      this.current_y += (this.target_y - this.current_y) * this.ease // This is where the magic happens

      if (this.$refs.floater) {
        this.$refs.floater.style.transform = `translate3d(${this.current_x}px, ${this.current_y}px, 0)`
      }

      requestAnimationFrame(this.animateMouse)
    }
  },
  mounted() {
    console.log('videobroadcast', this.broadcast, this.livestream)

    /// broadcast live
    if (this.livestream.broadcastState == 'Live') {
      this.getActiveDayProgramme()

      setTimeout(() => {
        if (this.activeProgramme) {
          if (!this.activeProgramme.livestreamLink.includes('vimeo')) {
            console.log('TRIGGER HIDE')
            gsap.to('.youtubecover', {
              opacity: 0,
              display: 'none',
              duration: 0.4,
              delay: 5
            })
          }
        }
      }, 600)
    }
    this.animateMouse()
  },
  beforeDestroy() {
    clearInterval(this.checkInterval)
  }
}
</script>
<style lang="scss">
.livestream-video-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;

  .vimeo-stream video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .no-event-wrap {
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .video-clicker {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: red;
    opacity: 0.1;
  }

  .floater {
    width: 95px;
    height: 95px;
    position: fixed;
    pointer-events: none;
    @include below('tablet') {
      display: none;
    }

    img {
      transform: translate(-50%, -100%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .youtubecover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 30;
    object-fit: cover;
  }
}
</style>
