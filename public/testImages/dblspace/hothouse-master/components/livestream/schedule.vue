<template>
  <div class="schedule" :style="`background-color: ${color};`">
    <h2 v-text="`Schedule`" />
    <div class="all-panels">
      <!-- <livestream-panel
        v-for="panel in data"
        :data="panel"
        :key="panel.title"
      /> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'schedule',
  data() {
    return {}
  },
  props: ['data', 'odd', 'even', 'number'],
  computed: {
    ...mapState(['activeProgrammeGlobal']),
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.evenColor : this.oddColor
    }
  },
  watch: {
    // activeProgrammeGlobal(val) {
    //   console.log('watching in panel', val)
    // }
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.schedule {
  // margin-bottom: 30px;
  .all-panels {
  }
}
</style>
