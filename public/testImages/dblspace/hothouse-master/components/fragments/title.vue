<template>
  <h2 v-if="data" class="block-content-title" v-html="data" />
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-title',
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
.block-content-title {
  word-break: break-word;
  font-size: 24px;
  margin-bottom: 20px;
  p {
    line-height: 1.25;
    @include below('mobile') {
      font-size: 20px;
    }
  }
  @include below('mobile') {
    font-size: 16px;
  }
}
.first-block .block-content-title {
  font-size: 30px;
}
.block-content-title + .textcontent-wrap {
  // margin-top: 19px;
}
</style>
