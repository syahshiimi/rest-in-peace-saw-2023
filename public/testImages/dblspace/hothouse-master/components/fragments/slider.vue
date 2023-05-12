<template>
  <div class="slider">
    <client-only>
      <swiper
        class="single-swiper"
        ref="mySwiper"
        :options="swiperOptions"
        @reachEnd="slideEnd"
        @observerUpdate="slideUpdate"
        @slideChangeTransitionStart="slideTransitionEnd"
        @slideChangeTransitionEnd="slideTransitionEnd"
        :auto-update="true"
        v-if="sliderdata"
      >
        <swiper-slide
          v-if="slidertype != 'static' && sliderdata.images"
          v-for="(sliderimage, key) in sliderdata.images"
          :key="`sliderImage-${key}`"
        >
          <div
            class="image-container"
            v-if="sliderimage.slideImage"
            :class="[
              sliderimage.imageFit == 'Contain within frame'
                ? 'image-contain'
                : 'image-crop'
            ]"
          >
            <fragments-image
              v-if="sliderimage.slideImage"
              :image="sliderimage.slideImage"
            />
          </div>
          <div v-if="sliderimage.slideVideoUrl" class="video-container">
            <fragments-video :data="sliderimage.slideVideoUrl" />
          </div>
          <fragments-caption
            v-if="sliderimage.slideImage && sliderimage.slideImage.alt"
            :data="sliderimage.slideImage.alt"
          />

          <!-- <div
            class="block-section block-section-text"
            v-if="sliderimage.title || sliderimage.textContent"
          >
            <fragments-title
              :data="sliderimage.title"
              :link="sliderimage.link"
            />
            <fragments-text-content :data="sliderimage.textContent" />
          </div> -->
        </swiper-slide>
      </swiper>
      <div
        class="slider-prev slider-nav"
        :class="[activeSlide == 0 ? 'hide' : '']"
        @click="prevSlide"
      >
        <v-arrow />
      </div>
      <div
        class="slider-next slider-nav"
        :class="[activeSlide == sliderdata.images.length - 1 ? 'hide' : '']"
        @click="nextSlide"
      >
        <v-arrow />
      </div>
      <div class="slider-pagination">
        <div
          class="single-pagination"
          v-for="(sliderimage, key) in sliderdata.images"
          :key="`sliderImage-${key}`"
          @click="goToSlide(key)"
          :class="activeSlide == key ? 'active' : ''"
        >
          <div class="inner" />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'slider',
  data() {
    return {
      activeSlide: 0,
      swiperOptions: {
        // loop: true,
        // pagination: {
        //   el: '.swiper-pagination'
        // },

        speed: 600,
        grabCursor: true,
        slidesPerView: 1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        // resistance:false,
        // freeMode: true,
        // threshold: 2,

        // preventInteractionOnTransition: true,
        breakpoints: {
          // when window width is >= 320px
          1920: {
            // slidesPerView: 5
          }
          // 768: {
          //   slidesPerView: 1.4
          // },
          // 1280: {
          //   slidesPerView: 1.65
          // },
          // 1450: {
          //   slidesPerView: 1.65
          // }
        }
        // centeredSlides: true,
        // spaceBetween: 10

        // Some Swiper option/callback...
      }
    }
  },
  props: ['sliderdata', 'slidertype'],
  components: {
    Swiper,
    SwiperSlide,
    vArrow: () => import('~/assets/svgs/arrow-down.svg?inline')
  },
  computed: {
    ...mapState([]),
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    getVisibleSlides() {
      let visible_slides = this.sliderdata.visibleSlides
        ? this.sliderdata.visibleSlides
        : 1

      // console.log('fire', visible_slides)

      return visible_slides
    }
  },
  watch: {},
  methods: {
    ...mapActions([]),
    goToSlide(slideNum) {
      this.swiper.slideTo(slideNum, 800)
    },
    slideEnd(e) {
      //   this.$refs.sliderprogress.style.transform = 'scaleX(1)'
    },
    slideUpdate(e) {
      // console.log('slide update', e)
    },
    // slideChange(e) {
    //   console.log('slide change', e)
    // },
    slideTransitionEnd() {
      this.activeSlide = this.swiper.activeIndex
      //   // this.swiper.update()
      //   this.$refs.sliderprogress.style.transform =
      //     'scaleX(' +
      //     (this.swiper.progress < 0.1 ? 0.1 : this.swiper.progress + 0.01) +
      //     ')'
      //   if (this.swiper.progress < 0.05) {
      //     this.setOpenSlide(null)
      //     setTimeout(
      //       function() {
      //         this.swiper.slideTo(0, 800)
      //       }.bind(this),
      //       100
      //     )
      //   }
    },
    prevSlide() {
      this.swiper.slidePrev()
    },
    nextSlide() {
      this.swiper.slideNext()
    }
  },
  mounted() {
    // console.log('slider mounted', this.sliderdata)

    // update visible slides on mount
    this.swiperOptions.slidesPerView = this.getVisibleSlides
  }
}
</script>

<style lang="scss">
.swiper-container {
  background-color: $darkgrey;
  border-top-left-radius: $roundRadius;
  border-top-right-radius: $roundRadius;
}
.slider {
  position: relative;
  // height: 600px;
  .swiper-slide {
    // height: 600px;
    background-color: $darkgrey;
    .video-container,
    .image-container {
      overflow: hidden;
      padding-bottom: 60%;
      width: 100%;
      height: 0;
      // height: vw(450);
      position: relative;
      iframe {
        object-fit: cover;
        height: 100%;
      }
      .image {
        position: static;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.image-contain {
        img {
          object-fit: contain;
        }
      }

      .iframe-dragger {
        position: absolute;
        background-color: red;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0.5;
      }
    }
    .caption {
      color: $white;
      padding-bottom: 50px;
      @include below('mobile') {
        padding-bottom: 35px;
      }
    }
    // padding: $navHeight 0;
    //   width: 250px;
    //   height: calc(100vh - (7 * #{$navHeight}));
    //   max-height: 1100px;
    //   transition: 0.8s width $ease-in-out-cubic;

    iframe {
      position: absolute;
    }
  }

  .active-slide.swiper-slide {
  }

  .slider-pagination {
    position: absolute;
    bottom: $pageMargin / 2;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 2;
    @include below('mobile') {
      bottom: 10px;
    }
    .single-pagination {
      position: relative;
      width: 7px;
      height: 7px;
      padding: 7px;

      margin: 0 1px;

      opacity: 0.6;
      cursor: pointer;
      &.active {
        opacity: 1;
        pointer-events: none;
      }
      > .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 7px;
        height: 7px;
        background-color: $white;
        border-radius: 50%;
      }
    }
  }

  .slider-nav {
    position: absolute;
    top: 50%;
    z-index: 3;
    width: 25px;
    cursor: pointer;

    transition: 0.3s opacity ease-in-out;
    opacity: 0;
    @include below('tablet') {
      opacity: 1 !important;
      width: 20px;
    }
    @include below('mobile') {
      width: 15px;
    }
    &.slider-prev {
      transform: rotate(90deg) translateX(-50%);
      left: 15px;
    }
    &.slider-next {
      transform: rotate(-90deg) translateX(50%);
      right: 15px;
    }
    &.hide {
      opacity: 0;
      pointer-events: none;
      @include below('tablet') {
        opacity: 0 !important;
      }
    }
    svg path {
      fill: white;
    }
  }
}

.slider:hover .slider-nav {
  opacity: 1;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
