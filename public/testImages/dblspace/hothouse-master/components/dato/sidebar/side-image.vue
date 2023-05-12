<template>
  <div class="side-image">
    <fragments-image :image="data.image" />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'side-image',
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

<style lang="scss"></style>
