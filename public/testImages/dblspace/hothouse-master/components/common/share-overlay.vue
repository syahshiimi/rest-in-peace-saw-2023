<template>
  <div class="share-overlay" :class="{ active: isShareOpen }">
    <a
      :href="facebook"
      target="_blank"
      rel="noopener noreferrer"
      class="social-share"
    >
      <v-fb />
    </a>
    <a
      :href="twitter"
      target="_blank"
      rel="noopener noreferrer"
      class="social-share"
    >
      <v-twitter />
    </a>
    <a
      class="social-share"
      :href="mail"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-mail />
    </a>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'share-overlay',
  data() {
    return {}
  },
  props: ['data'],
  components: {
    vFb: () => import('~/assets/svgs/fb.svg?inline'),
    vMail: () => import('~/assets/svgs/mail.svg?inline'),
    vTwitter: () => import('~/assets/svgs/tt.svg?inline')
  },
  computed: {
    ...mapState(['isShareOpen']),
    url() {
      return encodeURI(`https://h0t.house${this.$route.fullPath}`)
    },
    twitter() {
      return `https://twitter.com/intent/tweet?url=${this.url}`
    },
    facebook() {
      return `http://www.facebook.com/sharer.php?u=${this.url}`
    },
    mail() {
      return `mailto:?body=${this.url}`
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.share-overlay {
  position: fixed;
  right: $pageMargin;
  top: calc(#{$pageMargin} * 3.5);
  opacity: 0;
  transition: 0.3s opacity ease-in-out, 0.3s transform ease-in-out;
  transform: scale(0);
  z-index: 5;
  transform-origin: top left;
  display: flex;
  align-items: center;
  @include below('tablet-small') {
    top: $pageMarginMob + $blobHeightMob + 10px;
    right: $pageMarginMob;
  }
  &.active {
    opacity: 1;
    transform: scale(1);
  }
  .social-share {
    background-color: $black;
    border-radius: $roundRadius;
    width: $blobHeight;
    height: $blobHeight;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: $pageMargin / 2;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.2);
    @include below('tablet-small') {
      width: $blobHeightMob;
      height: $blobHeightMob;
      margin-left: 9px;
    }
    svg {
      height: 20px;
      fill: $white;
      @include below('tablet') {
        width: 17px;
      }
      @include below('mobile') {
        width: 14px;
        height: 15px;
      }
    }
  }
}
.dark-mode .social-share {
  background-color: $white;
  svg {
    fill: $black;
  }
}
</style>
