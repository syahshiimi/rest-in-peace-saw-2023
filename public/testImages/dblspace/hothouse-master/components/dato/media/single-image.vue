<template>
  <div class="single-image">
    <fragments-image :image="data.image" />
    <fragments-caption
      v-if="data.image && data.image.alt"
      :data="data.image.alt"
    />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'single-image',
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
.single-image {
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    border-top-left-radius: $roundRadius;
    border-top-right-radius: $roundRadius;
    height: 100%;
    object-fit: cover;
  }
}
</style>
