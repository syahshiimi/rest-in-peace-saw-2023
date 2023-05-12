<template>
  <div class="youtube-wrap">
    <div class="empty-element">.</div>
    <div class="inner">
      <div class="empty-element">.</div>
      <youtube
        v-if="canMount"
        ref="youtube"
        :video-id="videoid"
        :player-vars="playerVars"
        @playing="youtubePlaying"
        class="youtubeplayer"
        @ready="youtubeReady"
        @ended="youtubeEnded"
        width="100%"
        height="100%"
      ></youtube>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import { Youtube } from 'vue-youtube'

if (process.client) {
  // var Youtube = require('vue-youtube').Youtube
  // require('vue-youtube')
}

export default {
  name: 'youtubecomp',
  props: ['videoid', 'programme'],
  data() {
    return {
      canMount: false,
      playerVars: {
        playsinline: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        disablekb: 1,
        autoplay: 1,
        loop: 1
      }
    }
  },
  components: {
    // Youtube
  },
  computed: {
    ...mapState([
      'livestream',
      'broadcast',
      'isMuted',
      'youtubePlayCheck',
      'youtubeHasPlayedOnce',
      'youtubeHasMountedOnce'
    ])
  },
  watch: {
    isMuted(val) {
      if (!this.$refs.youtube.player) return
      if (val == true) {
        this.$refs.youtube.player.mute()
      } else {
        this.$refs.youtube.player.unMute()
        console.log('unmuted')
      }
    },
    youtubePlayCheck(val) {
      if (!this.$refs.youtube.player) return
      console.log('watch checker youtube')
      if (!this.$refs.youtube.player) return
      this.$refs.youtube.player.playVideo()
    }
  },
  methods: {
    ...mapActions(['setYoutubeHasPlayedOnce', 'setYoutubeHasMountedOnce']),
    youtubePlaying() {
      // console.log('PLAYING')
    },
    youtubeReady() {
      console.log('READY')
      if (!this.$refs.youtube.player) return
      this.$refs.youtube.player.playVideo()
      if (this.isMuted) {
        this.$refs.youtube.player.mute()
      }
    },
    youtubeEnded() {
      if (!this.$refs.youtube.player) return
      console.log('ended')
      this.$refs.youtube.player.playVideo()
    }
  },
  mounted() {
    if (this.youtubeHasPlayedOnce == 0 && this.youtubeHasMountedOnce == 0) {
      this.setYoutubeHasPlayedOnce(1)
      this.setYoutubeHasMountedOnce(1)
    } else {
      console.log('reload page!')
      location.reload()
    }

    console.log('HERE', this.programme)

    setTimeout(() => {
      this.canMount = true
    }, 1000)
  }
}
</script>
<style lang="scss">
.youtube-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .youtubeplayer {
    // transform: scale(1.15);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    @include below('tablet-small') {
      object-fit: contain;
      object-position: top;
      transform: scale(1);
    }
  }
  .empty-element {
    position: absolute;
    opacity: 0.01;
  }
  .youtubecover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 30;
  }
}
</style>
