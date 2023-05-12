<template>
  <div class="inner">
    <div class="blob-index hhblob">
      <span v-text="`#` + data.categoryNumber" />
    </div>
    <div class="spacer-blob spacer-blob-0">
      <v-spacer class="spacer-svg" />
    </div>
    <div class="blob-category hhblob">
      <span v-text="`${data.categoryName}`" />
    </div>
    <!-- <div class="spacer-blob spacer-blob-0">
      <v-spacer class="spacer-svg" />
    </div> -->
    <!-- <div class="circle-blob circle-blob-0"></div> -->
    <div class="spacer-blob spacer-blob-1">
      <v-spacer class="spacer-svg" />
    </div>
    <div class="blob-name hhblob ">
      <span v-text="data.title" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'blob-bar',
  data() {
    return {}
  },
  props: ['data', 'number'],
  components: {
    vSpacer: () => import('~/assets/svgs/menu-spacer.svg?inline')
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.blob-bar {
}
.nav-link .spacer-svg path {
  fill: $grey !important;
}

@include below('tablet-small') {
  .with-blob-nav .circle-blob,
  .with-blob-nav .spacer-blob-1 {
    // display: none;
  }
}
@include below('mobile') {
  .with-blob-nav .blob-index {
    max-width: 20px;
    padding: 0 23px;
  }
  .with-blob-nav .blob-category {
    // max-width: 100px;
    min-width: 100px;
    padding: 0 23px;
  }
}
</style>
