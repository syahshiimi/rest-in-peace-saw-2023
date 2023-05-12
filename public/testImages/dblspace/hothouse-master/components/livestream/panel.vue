<template>
  <div class="panel single-episode">
    <img class="furnishing top left" src="/svg/border-left-furnish.svg" />
    <img class="furnishing top right" src="/svg/border-left-furnish.svg" />
    <img class="furnishing bottom left" src="/svg/border-left-furnish.svg" />
    <img class="furnishing bottom right" src="/svg/border-left-furnish.svg" />
    <div class="side left-side">
      <div
        class="live-marker"
        v-if="
          activeProgrammeGlobal
            ? data.title == activeProgrammeGlobal.title
              ? true
              : false
            : false
        "
      >
        <span class="live-text" v-text="`LIVE`" />
        <div class="red-dot" />
      </div>
      <div class="time" v-else>
        <div class="time-line">
          <span v-text="date(data.from)" />
          <span v-text="`-  `" />
        </div>
        <span v-text="date(data.to)" />
      </div>
    </div>
    <div class="side right-side">
      <h4 class="event-title" v-text="data.title" />
      <div class="event-artist" v-html="data.artists" />
      <div class="event-image" v-if="data.image">
        <fragments-image v-if="data.image" :image="data.image" />
      </div>
      <span
        ><a
          class="test_a"
          target="_blank"
          :href="data.livestreamLink"
          v-text="`debug: ${data.livestreamLink}`"
        ></a
      ></span>
      <div v-html="data.description" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'panel',
  data() {
    return {}
  },
  props: ['data'],
  computed: { ...mapState(['isLive', 'livestream', 'activeProgrammeGlobal']) },
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
        hour12: true
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.single-episode {
  position: relative;
  border-top: 2px solid black;
  @include below('mobile') {
    border-width: 1px;
  }
  &:last-child {
    border-bottom: 2px solid black;
    .furnishing.bottom {
      display: block;
    }
  }

  .furnishing {
    position: absolute;

    &.top {
      top: -4px;
    }

    &.bottom {
      bottom: -5px;
      display: none;
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
      transform: scaleX(-1);
    }

    @include below('mobile') {
      display: none !important;
    }
  }
}
.panel {
  display: flex;
  padding: 15px 0 32px;
  @include below('mobile') {
    flex-direction: column;
  }

  .side {
    &.left-side {
      min-width: 19%;
      .time {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        line-height: 1.3333;
        // font-family: 'Helvetica';
        margin-top: 6px;
        @include below('mobile') {
          flex-direction: row;
          margin-bottom: 10px;
          font-size: 15px;
        }
      }
    }

    &.right-side {
      flex-grow: 1;
      .event-title {
        margin-bottom: 32px;
      }
      .event-artist {
        margin-bottom: 32px;
      }
      .event-image {
        margin-bottom: 32px;
        border-radius: $roundRadius;
        overflow: hidden;
      }
    }
  }

  .test_a {
    font-size: 10px;
    margin-bottom: 10px;
    display: block;
  }
}
</style>
