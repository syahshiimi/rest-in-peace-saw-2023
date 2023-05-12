<template>
  <div class="single-video">
    <div class="inner">
      <fragments-video :data="data.videoUrl" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'single-video',
  data() {
    return {}
  },
  props: ['data'],
  components: {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.single-video {
  // position: relative;
  width: 100%;
  > .inner {
    // position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  iframe {
    border-top-left-radius: $roundRadius;
    border-top-right-radius: $roundRadius;
  }
}
</style>
