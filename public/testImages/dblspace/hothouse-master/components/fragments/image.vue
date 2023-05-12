<template>
  <div class="image">
    <div
      class="image-placeholder"
      :style="placeholderStyle"
      :class="{ active: image.alt === 'intermission' }"
    />
    <img
      :class="{ appear: showImage }"
      v-image="query"
      :data-src="image.url"
      :alt="`${image.alt ? image.alt : 'Hot House'}`"
      :width="image.width"
      :height="image.height"
      decoding="async"
      @load="loaded = true"
    />
  </div>
</template>
<script>
const isSsr = typeof window === 'undefined'
const isIntersectionObserverAvailable = isSsr
  ? false
  : !!window.IntersectionObserver
export default {
  name: 'vImage',
  props: {
    image: {
      type: Object,
      default: () => {
        return {}
      }
    },
    query: {
      type: Object,
      default: () => {
        return { auto: 'format' }
      }
    },
    bgColor: {
      type: String,
      default: 'grey'
    },
    fadeInDuration: {
      type: Number,
      default: 500
    },
    intersectionTreshold: {
      type: Number,
      default: 0
    },
    intersectionMargin: {
      type: String,
      default: '1000px 1000px 1000px 1000px'
    },
    lazyLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inView: false,
      loaded: false
    }
  },
  computed: {
    placeholderSrc() {
      return this.image.responsiveImage
        ? `data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20xmlns:xlink=%22http://www.w3.org/2000/xlink%22%20width=%22${this.image.width}'%20height=%22${this.image.height}%22%20viewBox='0%200%20${this.image.width}%20${this.image.height}%22%3E%3Cimage%20xlink:href=%22${this.image.responsiveImage.base64}%22%20height=%22${this.image.height}'%20width=%22${this.image.width}%22/%3E%3C/svg%3E%0A`
        : `data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20${this.image.width}%20${this.image.height}%22%3E%3Crect%20width=%22${this.image.width}%22%20height=%22${this.image.height}%22%20style=%22fill:${this.bgColor}%22%3E%3C/rect%3E%3C/svg%3E`
    },
    addImage() {
      if (!this.lazyLoad) {
        return true
      }
      if (isSsr) {
        return false
      }
      if (isIntersectionObserverAvailable) {
        return this.inView || this.loaded
      }
      return true
    },
    showImage() {
      if (!this.lazyLoad) {
        return true
      }
      if (isSsr) {
        return false
      }
      if (isIntersectionObserverAvailable) {
        return this.loaded
      }
      return true
    },
    pictureStyle() {
      return `
      opacity: ${this.showImage ? 1 : 0};
      transition: ${
        this.fadeInDuration > 0 ? `opacity ${this.fadeInDuration || 500}ms` : ''
      }`
    },
    placeholderStyle() {
      return this.image.responsiveImage
        ? `
          padding-top: ${100.0 / this.image.responsiveImage.aspectRatio}%;
          background-image: url(${
            this.image.responsiveImage.base64
              ? this.image.responsiveImage.base64
              : null
          });
          background-color: ${this.image.responsiveImage.bgColor};
          background-size: cover;
      `
        : ''
    }
  },
  methods: {
    setObserver() {
      const options = {
        rootMargin: this.intersectionMargin,
        threshold: this.intersectionTreshold,
        triggerOnce: true
      }
      const observer = new IntersectionObserver((entries) => {
        const image = entries[0]
        if (image.isIntersecting) {
          this.inView = true
          observer.disconnect()
        }
      }, options)
      observer.observe(this.$el)
    }
  },
  mounted() {
    this.setObserver()
  }
}
</script>

<style lang="scss">
.image {
  position: relative;
  display: block;
  overflow: hidden;
  border-top-right-radius: $roundRadius;
  border-top-left-radius: $roundRadius;
  width: 100%;
  height: 100%;
  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // z-index: 0;
    &.active {
      display: none;
    }
  }
  img {
    position: relative;
    // z-index: 1;
    opacity: 0;
    transition: opacity 0.4s $ease-in-cubic;
    &.appear {
      opacity: 1;
    }
  }
}
.icon-wrap .image {
  border-radius: 0;
  display: flex;
  justify-content: center;
}
</style>
