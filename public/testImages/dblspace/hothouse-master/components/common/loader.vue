<template>
  <div
    class="loader"
    @click="hideOnClick"
    :class="
      $route.name == 'index' && livestream.broadcastState == 'Upcoming'
        ? 'upcoming-loader'
        : ''
    "
  >
    <div class="logo-play-wrap">
      <div class="inner">
        <canvas id="paper-canvas" resize="true"> </canvas>
        <img src="/hothouse-loader-logo.svg" class="logo" />
      </div>
    </div>

    <fragments-vimeo
      class="upcoming-video"
      v-if="livestream.broadcastState == 'Upcoming' && $route.name == 'index'"
      :url="livestream.vimeoUrl"
      :hascontrols="false"
      :isloadervideo="true"
    />
  </div>
</template>

<script>
import gsap from 'gsap'
import paper from 'paper'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'loader',
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'isLoaderAnimationDone',
      'hideLoader',
      'livestream',
      'isScheduleOpen',
      'isBroadcastOpen',
      'isNavOpen',
      'isSearchOpen',
      'isShareOpen'
    ])
  },
  watch: {
    hideLoader(val) {
      console.log('watch hideloader', val)
      if (val && !this.isLoaderAnimationDone) {
        this.hideOnClick()
      }
      if (val == false && this.livestream.broadcastState == 'Upcoming') {
        // fade loader back in
        gsap.to(this.$el, {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.inOut'
        })
        this.setFirstLoaderDone(false)
        document.querySelector('.upcoming-video video').play()
      }

      if (val == true && this.livestream.broadcastState == 'Upcoming') {
        gsap.to('.top-nav', {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.inOut'
        })
      }
    }
  },
  methods: {
    ...mapActions(['setFirstLoaderDone', 'setHideLoader']),
    hide() {
      gsap
        .to(this.$el, {
          opacity: 0,
          duration: 0.3,
          delay: 3,
          ease: 'power3.out'
        })
        .then(() => {
          this.setFirstLoaderDone(true)
          this.setHideLoader(true)
          document.body.classList.add('scrollable')
        })
    },
    hideOnClick() {
      // if (window.innerWidth < 580) return
      this.setHideLoader(true)
      gsap
        .to(this.$el, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
        .then(() => {
          this.setFirstLoaderDone(true)
          document.body.classList.add('scrollable')
        })
    },
    initPaper() {
      if (window.innerWidth < 580) return
      var paper_canvas = document.querySelector('#paper-canvas')

      paper.install(window)

      // Setup directly from canvas id:
      paper.setup(paper_canvas)
      //   var path = new Path();
      //   path.strokeColor = "black";
      //   var start = new Point(100, 100);
      //   path.moveTo(start);
      //   path.lineTo(start.add([200, -50]));

      project.currentStyle = {
        fillColor: '#CACACA'
      }

      this.draw()

      // ---------------------------------------------

      // view.draw()

      paper_canvas.addEventListener('mousemove', (e) => {
        this.onMouseMove(e)
      })
      window.addEventListener('resize', (e) => {
        if (window.innerWidth < 580) return
        // console.log('resizing', paper)
        paper.view.size.width = window.innerWidth
        paper.view.size.height = window.innerHeight
        // paper_canvas.width = window.innerWidth;
        // paper_canvas.height = window.innerHeight;

        project.activeLayer.removeChildren()
        this.draw()
      })
    },
    draw() {
      this._radius = this.calculateMouseRadius()
      this._stickiness = window.innerWidth / 15

      var ballPositions = this.calculateBalls()
      this.handle_len_rate = 2.5
      this.circlePaths = []

      for (var i = 0, l = ballPositions.length; i < l; i++) {
        var circlePath = new Path.Circle({
          center: ballPositions[i],
          radius: this._radius,
          ball_index: i,
          ball_type: 'logo'
        })
        this.circlePaths.push(circlePath)
      }

      this.largeCircle = new Path.Circle({
        center: [676, 433],
        radius: this._radius * 1,
        ball_index: 'mouseball',
        ball_type: 'mouse'
      })
      this.circlePaths.push(this.largeCircle)
      this.connections = new Group()

      this.generateConnections(this.circlePaths)
    },
    generateConnections(paths) {
      // Remove the last connection paths:
      this.connections.children = []

      for (var i = 0, l = paths.length; i < l; i++) {
        for (var j = i - 1; j >= 0; j--) {
          var path = this.metaball(
            paths[i],
            paths[j],
            0.4,
            this.handle_len_rate,
            this._stickiness
          )
          if (path) {
            this.connections.appendTop(path)
            //   path.removeOnMove();
          }
        }
      }
    },
    metaball(ball1, ball2, v, handle_len_rate, maxDistance) {
      var center1 = ball1.position
      var center2 = ball2.position
      var radius1 = ball1.bounds.width / 2
      var radius2 = ball2.bounds.width / 2
      var pi2 = Math.PI / 2
      var d = center1.getDistance(center2)
      var u1, u2

      if (radius1 == 0 || radius2 == 0) return

      if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
        return
      } else if (d < radius1 + radius2) {
        // case circles are overlapping
        // if (ball1.ball_type == "logo" && ball2.ball_type == "logo") return;
        // console.log(ball1.ball_type, ball2.ball_type);

        u1 = Math.acos(
          (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
        )
        u2 = Math.acos(
          (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
        )
      } else {
        u1 = 0
        u2 = 0
      }

      var angle1 = center2.subtract(center1).getAngleInRadians()
      var angle2 = Math.acos((radius1 - radius2) / d)
      var angle1a = angle1 + u1 + (angle2 - u1) * v
      var angle1b = angle1 - u1 - (angle2 - u1) * v
      var angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v
      var angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v
      var p1a = center1.add(this.getVector(angle1a, radius1))
      var p1b = center1.add(this.getVector(angle1b, radius1))
      var p2a = center2.add(this.getVector(angle2a, radius2))
      var p2b = center2.add(this.getVector(angle2b, radius2))

      // // define handle length by the distance between
      // // both ends of the curve to draw
      var totalRadius = radius1 + radius2

      // var d2 = Math.min(v * handle_len_rate, (p1a - p2a).length / totalRadius);
      var d2 = Math.min(
        v * handle_len_rate,
        p1a.subtract(p2a).length / totalRadius
      )

      // // case circles are overlapping:
      d2 *= Math.min(1, (d * 2) / (radius1 + radius2))

      radius1 *= d2
      radius2 *= d2

      if (ball1.ball_type == 'logo' && ball2.ball_type == 'logo') return
      // console.log(ball1.ball_type, ball2.ball_type);

      var path = new Path({
        segments: [p1a, p2a, p2b, p1b],
        style: ball1.style,
        closed: true
      })
      var segments = path.segments
      segments[0].handleOut = this.getVector(angle1a - pi2, radius1)
      segments[1].handleIn = this.getVector(angle2a + pi2, radius2)
      segments[2].handleOut = this.getVector(angle2b - pi2, radius2)
      segments[3].handleIn = this.getVector(angle1b + pi2, radius1)
      // console.log(getVector(angle1b + pi2, radius1));
      return path
    },
    calculateMouseRadius() {
      var mouseradius = 0.02 * window.innerWidth
      return mouseradius
    },
    calculateBalls() {
      var avail_w = window.innerWidth - 120
      var avail_h = window.innerHeight

      var pad_left = 0.0047 * avail_w
      var pad_bottom = 0.003 * avail_w
      var mouseradius = this.calculateMouseRadius()

      var offset_bottom = 50 + mouseradius
      var offset_left = 60 + mouseradius

      var spacer_y = 0.073 * avail_w
      var spacer_legs = 0.0735 * avail_w
      var spacer_letter = 0.06 * avail_w

      // prettier-ignore
      var ballPositions = [
        // H - leg 1
        [offset_left + pad_left, avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left, avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left, avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        [offset_left + pad_left, avail_h - offset_bottom - pad_bottom - (spacer_y*3)],
        // H - leg 2
        [offset_left + pad_left + (spacer_legs*1), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*1), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*1), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        [offset_left + pad_left + (spacer_legs*1), avail_h - offset_bottom - pad_bottom - (spacer_y*3)],
        // o - leg 1
        [offset_left + pad_left + (spacer_legs*1) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*1) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*1) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // o - leg 2
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*1), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // t -
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        [offset_left + pad_left + (spacer_legs*2) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*3)],
        // h - leg 1
        [offset_left + pad_left + (spacer_legs*3) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*3) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*3) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        [offset_left + pad_left + (spacer_legs*3) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*3)],
        // h - leg 2
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*2), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // o - leg 1
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*4) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // o - leg 2
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*3), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // u - leg 1
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*5) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // u - leg 2
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*4), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // s - leg 1
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*6) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // s - leg 2
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*5), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // e - leg 1
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*7) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],
        // e - leg 2
        [offset_left + pad_left + (spacer_legs*8) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*0)],
        [offset_left + pad_left + (spacer_legs*8) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*1)],
        [offset_left + pad_left + (spacer_legs*8) + (spacer_letter*6), avail_h - offset_bottom - pad_bottom - (spacer_y*2)],

      ]
      return ballPositions
    },
    getVector(radians, length) {
      return new Point({
        // Convert radians to degrees:
        angle: (radians * 180) / Math.PI,
        length: length
      })
    },
    onMouseMove(event) {
      if (this.isLoaderAnimationDone) return
      if (window.innerWidth > 580) {
        this.largeCircle.position.x = event.clientX
        this.largeCircle.position.y = event.clientY
        // console.log(this.largeCircle.position)
        this.generateConnections(this.circlePaths)
      }

      if (this.livestream.broadcastState == 'Upcoming') {
        this.clearHideMenuInterval()
        this.initHideMenuonIdle()
        gsap.to('.top-nav', {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.inOut'
        })
        gsap.to('.floater', {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.inOut'
        })
      }
    },
    initHideMenuonIdle() {
      this.hideMenuInterval = setInterval(this.hideMenuIntervalFunc, 5000)
    },
    hideMenuIntervalFunc() {
      console.log('fade menu out')

      if (
        !this.isScheduleOpen &&
        !this.isBroadcastOpen &&
        !this.isNavOpen &&
        !this.isSearchOpen &&
        !this.isShareOpen &&
        !this.hideLoader
      ) {
        gsap.to('.top-nav', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut',
          onComplete: () => {
            this.clearHideMenuInterval()
          }
        })
        gsap.to('.floater', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
        gsap.to('.logo-play-wrap', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
      }
    },
    clearHideMenuInterval() {
      clearInterval(this.hideMenuInterval)
    }
  },
  beforeDestroy() {
    this.clearHideMenuInterval()
  },
  mounted() {
    console.log('loader', this.livestream)
    this.initPaper()

    if (this.livestream.broadcastState == 'Upcoming') {
      this.initHideMenuonIdle()
    }

    // if (window.innerWidth < 580) {
    //   this.hide()
    // }
    // console.log('load state', this.isLoaderAnimationDone)
  }
}
</script>

<style lang="scss">
.loader {
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform-origin: 50% 0%;
  z-index: 7;
  // backdrop-filter: blur(50px);
  cursor: pointer;
  @include below('tablet-small') {
    // backdrop-filter: blur(20px);
  }
  &.upcoming-loader {
    // background-color: transparent;
  }
  canvas {
    width: 100%;
    height: 100%;
  }

  /* Scale canvas with resize attribute to full size */
  canvas[resize] {
    width: 100%;
    height: 100%;
  }
  .logo-play-wrap {
    position: fixed;
    top: 0;
    left: 0%;
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
    object-fit: contain;
    // pointer-events: none;
  }
  .logo-play-wrap .inner {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .logo {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: calc(100% - 120px);
    // max-width: 900px;

    pointer-events: none;
    opacity: 1;
    @include below('mobile') {
      width: calc(100% - 60px);
    }
  }
  .upcoming-video video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
}
</style>
