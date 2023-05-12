<template>
  <div class="vimeo">
    <div class="poster" v-if="!isPlaying" @click="playVideo">
      <div class="inner">
        <img v-if="poster" :src="poster" />
        <div class="play-icon"></div>
      </div>
    </div>
    <video
      ref="vimeo"
      class="vimeo-video"
      playsinline
      :muted="checkMuted"
      :controls="checkControls"
      crossorigin="anonymous"
      preload="metadata"
      :autoplay="isautoplay"
      :loop="isloadervideo"
      :src="isPhone ? vidMedium : vidHigh"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.min.js'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}
export default {
  name: 'vimeo',
  props: ['url', 'poster', 'hascontrols', 'isloadervideo', 'isautoplay'],
  data() {
    return {
      isPlaying: false
    }
  },
  computed: {
    ...mapState(['isPhone', 'isMuted']),
    vidMedium() {
      var href = new URL(this.url)
      href.searchParams.set('profile_id', '165')
      return href.toString()
    },
    vidHigh() {
      var href = new URL(this.url)
      href.searchParams.set('profile_id', '174' || '175')
      return href.toString()
    },
    posterImg() {
      if (this.poster) {
        return 'aa'
      } else {
        return 'bb'
      }
    },
    checkControls() {
      if (this.hascontrols != undefined) {
        return this.hascontrols
      } else {
        return true
      }
    },
    checkMuted() {
      if (this.isloadervideo) {
        return this.isMuted
      } else {
        true
      }
    }
  },
  methods: {
    playVideo() {
      this.isPlaying = true
      this.$refs.vimeo.play()
      // console.log('click poster', this.isPlaying)
    },
    pauseVideo() {
      if (this.$refs.vimeo) {
        this.isPlaying = false
        this.$refs.vimeo.pause()
      }
      // console.log('click poster', this.isPlaying)
    },
    toggleVideo() {
      if (this.$refs.vimeo) {
        if (this.isPlaying) {
          this.$refs.vimeo.pause()
        } else {
          this.$refs.vimeo.play()
        }
        this.isPlaying = !this.isPlaying
      }
    },
    initScrollTrigger() {
      var that = this
      ScrollTrigger.create({
        trigger: this.$refs.vimeo,
        start: 'top 80%',
        end: 'bottom 20%',
        onToggle: function(ev) {
          if (ev.isActive) {
            that.playVideo()
          } else {
            that.pauseVideo()
          }
        }
      })

      //
    }
  },
  mounted() {
    // console.log(this.checkMuted)
    var that = this
    this.$refs.vimeo.onplaying = function() {
      that.isPlaying = true
      // console.log('playing', that.isPlaying)
    }
    this.$refs.vimeo.onpause = function() {
      that.isPlaying = false
      // console.log('paused', that.isPlaying)
    }

    setTimeout(
      function() {
        this.initScrollTrigger()
        ScrollTrigger.refresh()
      }.bind(this),
      400
    )
  }
}
</script>
<style lang="scss">
.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: black;
  z-index: 2;
  > .inner {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: red;
    }
  }
}
</style>
