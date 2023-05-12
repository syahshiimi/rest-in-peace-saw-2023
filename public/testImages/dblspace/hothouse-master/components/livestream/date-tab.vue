<template>
  <button class="date-tab" :style="`background-color: ${data.color.hex};`">
    <span v-text="date" />
  </button>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'date-tab',
  data() {
    return {}
  },
  props: ['data'],
  computed: {
    date() {
      return new Date(this.data.date).toLocaleString('en-SG', {
        day: 'numeric',
        month: 'short',
        weekday: 'short'
      })
    }
  },
  methods: {},
  mounted() {
    // console.log(this.data)
  }
}
</script>
<style lang="scss">
.date-tab {
  border-top-left-radius: $roundRadius;
  border-top-right-radius: $roundRadius;
  padding: 15px;
  flex-grow: 1;
  overflow: hidden;
  @include below('mobile') {
    padding: 10px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.015em;
    line-height: 1;
    @include below('mobile') {
      font-size: 15px;
    }
  }
}
</style>
