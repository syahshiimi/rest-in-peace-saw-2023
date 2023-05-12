<template>
  <div class="events-menu-wrap">
    <div class="schedule-datetabs">
      <livestream-date-tab
        v-for="(event, index) in livestream.broadcast.events"
        :key="event.id"
        :data="event"
        @click.native="toggleOpenDay(index)"
      />
    </div>
    <div class="events-menu">
      <div class="events-inner ">
        <v-close class="close-events-menu" @click="close_menu" />
        <div class="">
          <livestream-event
            v-for="(event, index) in livestream.broadcast.events"
            :key="event.id"
            :data="event"
            class="livestream-menu-content"
            v-if="activeDay == index"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.min.js'

export default {
  name: 'eventsmenu',
  data() {
    return {
      activeDay: 0
    }
  },
  props: ['data'],
  computed: {
    ...mapState([
      'broadcast',
      'isScheduleOpen',
      'livestream',
      'activeDayGlobal',
      'activeProgrammeGlobal'
    ])
  },
  watch: {
    isScheduleOpen(val) {
      if (val != false) {
        if (this.livestream.broadcastState == 'Live') {
          this.compareEventDates()
        }
      }
    }
  },
  components: {
    vClose: () => import('~/assets/svgs/close.svg?inline')
  },
  methods: {
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
    close_menu() {
      this.setScheduleOpen(false)
      this.setBroadcastOpen(false)
    },
    toggleOpenDay(dayindex) {
      this.activeDay = dayindex
      // reset scroller on tab change
      document.querySelector('.events-inner').scrollTop = 0
    },
    compareEventDates() {
      // console.log(
      //   'menu:',
      //   this.livestream.broadcast.events,
      //   'videoevents:',
      //   this.broadcast.events
      // )
      console.log('compare', this.activeDayGlobal[0])

      for (let i = 0; i < this.broadcast.events.length; i++) {
        var broadcast_day = this.broadcast.events[i]
        for (let y = 0; y < broadcast_day.schedule.length; y++) {
          var single_programme = broadcast_day.schedule[y]

          if (this.activeProgrammeGlobal) {
            // if there is live event
            if (this.activeProgrammeGlobal == single_programme) {
              ////find index of live programme in menu and  return i and y?
              // return { activeDay: i, activeProgramme: y }
              this.activeDay = i

              console.log('BOOM')

              gsap.to('.events-inner', {
                duration: 0.3,
                delay: 0.8,
                scrollTo: {
                  y:
                    '.single-event-info ' +
                    '.single-block-' +
                    this.stringify(single_programme.title),
                  offsetY: 10
                },
                onComplete: function() {
                  console.log('scrolling end')
                  // when scrolling ends,
                  // set flag to false to allow more scrolling
                }
              })
            }
          } else {
            // if no live event ,
            // return first i index of today/s programe that match in event menu
            if (this.activeDayGlobal[0] == single_programme) {
              ////find index of live programme in menu and  return i and y?
              // return { activeDay: i, activeProgramme: y }
              console.log('hit', i)
              this.activeDay = i
            }
          }
        }
      }
    },
    stringify(text) {
      return text
        .replace(/[\W_]/g, '')
        .replace(' ', '')
        .toLowerCase()
    }
  },
  mounted() {
    // console.log('schedule menu', this.broadcast.events)
  }
}
</script>
<style lang="scss">
.close-events-menu {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  path {
    fill: black;
  }
  @include below('tablet') {
    width: 20px;
    top: 35px;
  }
  @include below('tablet-small') {
    width: 20px;
    top: 20px;
  }
  @include below('mobile') {
    top: 15px;
  }
  @media only screen and (max-width: 345px) {
    top: 35px;
  }
}

.events-menu-wrap {
  position: fixed;
  top: 120px;
  right: 30px;
  z-index: 20;
  max-width: 705px;
  width: calc(50% - 20px - 20px - 20px);
  max-height: calc(100vh - 125px);
  overflow: hidden;
  border-top-left-radius: 0;
  border-radius: $roundRadius;
  @include below('tablet-small') {
    top: 65px;
    left: 15px;
    right: auto;
    width: calc(100% - 15px - 15px);
    max-width: calc(100vw - 15px - 15px);
    max-height: calc(100vh - 15px - 15px - 35px - 15px);
  }

  .events-inner {
    // overflow: hidden;
    max-height: calc(100vh - 125px - 52px);
    margin-top: 51px;
    overflow: auto;
    transform: translateX(0.1px);

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
    @include below('tablet-small') {
      max-height: calc(100vh - 15px - 15px - 35px - 15px);
      margin-top: 50px;
    }
    @include below('mobile') {
      margin-top: 37px;
    }
  }

  h2 {
    font-size: 24px;
    @include below('mobile') {
      font-size: 20px;
    }
    &.block-content-title {
      margin-bottom: 20px;
    }
  }
  .schedule-datetabs {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    width: 100%;
  }
}
</style>
