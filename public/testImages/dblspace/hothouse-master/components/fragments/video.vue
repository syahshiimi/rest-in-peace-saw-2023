<template>
  <iframe
    v-if="data"
    allowfullscreen
    :src="data"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-video',
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
iframe {
  // position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: $roundRadius;
  border-top-right-radius: $roundRadius;
  width: 100%;
  height: 100%;
}
</style>
