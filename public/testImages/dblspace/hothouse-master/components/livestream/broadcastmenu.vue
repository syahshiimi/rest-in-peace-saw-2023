<template>
  <div class="broadcast-menu">
    <div
      class="inner livestream-menu-content"
      :style="`background-color: ${livestream.broadcast.color.hex};`"
    >
      <div class="broadcast-header">
        <!-- <h2
          class="broadcast-number"
          v-text="`Broadcast #${livestream.broadcast.number}`"
        /> -->
        <v-close class="close-events-menu" @click="close_menu" />
      </div>
      <broadcast-loader
        class="single-section"
        :data="sections"
        :key="`component-${key}`"
        ref="components"
        :number="key"
        v-for="(sections, key) in livestream.broadcast.content"
        :even="livestream.broadcast.evenBlockColor.hex"
        :odd="livestream.broadcast.oddBlockColor.hex"
        :class="key == 0 ? 'first-block' : ''"
      />
      <!-- <livestream-socials /> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'broadcastmenu',
  data() {
    return {}
  },
  props: ['data'],
  computed: {
    ...mapState(['broadcast', 'isBroadcastOpen', 'livestream'])
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

    parseDate(date) {
      let dateObj = new Date(date)
      let date_year = dateObj.getUTCFullYear()
      let date_month = dateObj.toLocaleString('en-US', { month: 'short' })
      let date_day = dateObj.getUTCDate()
      let myDate = date_day + ' ' + date_month + ' ' + date_year
      return myDate
    },
    close_menu() {
      this.setScheduleOpen(false)
      this.setBroadcastOpen(false)
    },
    toggle_schedule() {
      console.log('AAA')
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
    }
  },
  mounted() {
    // console.log('broadcastmenu', this.broadcast)
  }
}
</script>
<style lang="scss">
.livestream-menu-content {
  padding: 90px 30px 30px;
  // border-radius: $roundRadius;

  @include below('tablet-small') {
    padding: 60px 20px 20px;
  }
  @media only screen and (max-width: 345px) {
    padding-top: 70px;
  }
}

.broadcast-menu {
  position: fixed;
  top: 120px;
  z-index: 20;
  max-width: 705px;
  width: calc(50% - 20px - 20px - 20px);
  max-height: calc(100vh - 125px);
  overflow: auto;
  border-top-left-radius: $roundRadius;
  border-top-right-radius: $roundRadius;
  border-radius: $roundRadius;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  .close-events-menu {
    @include below('tablet') {
      top: 18px;
    }
    @include below('tablet-small') {
      top: 10px;
    }
    @include below('mobile') {
      top: 8px;
    }
  }

  @include below('tablet-small') {
    top: 65px;
    left: 15px;
    right: auto;
    width: calc(100% - 15px - 15px);
    max-width: calc(100vw - 15px - 15px);
    max-height: calc(100vh - 15px - 15px - 35px - 15px);
  }
  .livestream-menu-content {
    padding-top: 30px;
    @include below('tablet-small') {
      padding-top: 15px;
    }
  }
  .broadcast-header {
    margin-bottom: 55px;
    @include below('tablet') {
      margin-bottom: 30px;
    }
    @include below('mobile') {
      // margin-bottom: 30px;
    }
    .broadcast-number {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 35px;
      text-align: center;
      @include below('mobile') {
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 0px;
      }
    }
    .broadcast-title {
      font-size: 30px;
      padding: 27px 0 0;
      @include below('mobile') {
        font-size: 22px;
      }
    }
    .broadcast-date {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 30px;
      @include below('mobile') {
        font-size: 15px;
      }
    }
    .broadcast-description p {
      line-height: 1.5;
    }
  }
}

.broadcast-menu-link {
  display: inline-block;
  line-height: 1;
  margin-bottom: 10px;
  text-align: center;
  @include below('mobile') {
    height: auto;
    padding: 10px 40px;
  }
  &.last-button {
    margin-bottom: 0;
  }

  &.width-half {
    width: 50%;
    max-width: 50%;
  }
  &.width-full {
    width: 100%;
    max-width: 100%;
  }
}
</style>
