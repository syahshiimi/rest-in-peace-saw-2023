<template>
  <div class="schedule" :style="`background-color: ${color};`">
    <fragments-image v-if="data.image" :image="data.image" />
    <fragments-furniture v-if="data.furniture" :data="data.furniture" />
    <div class="inner-block">
      <div class="inner-time">
        <div class="time">
          <div class="time-line">
            <span v-text="date(data.from)" />
            <span v-html="`-&nbsp;`" />
          </div>
          <span v-text="date(data.to)" />
        </div>
        <div class="live-marker" v-if="isEventLive">
          <span class="live-text" v-text="`LIVE`" />
          <div class="red-dot" />
        </div>
      </div>
      <fragments-title v-if="data.title" :data="data.title" />
      <fragments-text v-if="data.description" :data="data.description" />
      <fragments-text
        v-show-slide="data.showMoreContent && showMore"
        :data="data.showMoreContent"
      />
      <fragments-more-button
        v-if="data.showMoreContent"
        :class="{ active: showMore === true }"
        @click.native="toggle"
        :data="text"
      />
      <div class="all-links">
        <link-loader
          class="single-link"
          :data="button"
          :key="`component-${key}`"
          ref="components"
          v-for="(button, key) in data.buttons"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'schedule',
  data() {
    return {
      showMore: false
    }
  },
  props: ['data', 'odd', 'even', 'number'],
  computed: {
    ...mapState(['isLive', 'livestream', 'activeProgrammeGlobal']),
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.oddColor : this.evenColor
    },
    isEventLive() {
      return this.activeProgrammeGlobal
        ? this.data.title == this.activeProgrammeGlobal.title
          ? true
          : false
        : false
    },
    text() {
      return this.showMore ? 'less' : 'more'
    }
  },
  watch: {
    activeProgrammeGlobal(val) {
      console.log('watching in panel, active programe changed')
    }
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleString('en-SG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    },
    toggle() {
      this.showMore = !this.showMore
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
<style lang="scss">
.schedule {
  border-radius: $roundRadius;
  .inner-block {
    padding: $pageMargin;
    @include below('mobile') {
      padding: 25px 25px 30px;
    }
  }
  .all-links {
    margin-top: 33px;
  }
  .inner-time {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    @include below('mobile') {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .time {
      display: flex;
    }

    .live-marker {
      display: flex;
      // margin-top: 7px;
      .live-text {
        color: white;
      }
      .red-dot {
        width: 7px;
        height: 7px;
        border-radius: 10px;
        background-color: $red;
        margin-left: 4px;
        animation: blink 1s infinite;
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
  }
}
</style>
