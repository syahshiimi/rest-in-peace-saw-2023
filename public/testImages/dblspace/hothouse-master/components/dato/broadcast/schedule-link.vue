<template>
  <button class="schedule-link broadcast-menu-link" @click="toggle_schedule()">
    <span v-text="data.buttonLabel" />
  </button>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'schedule-link',

  data() {
    return {}
  },
  props: ['data'],
  computed: {
    ...mapState(['isScheduleOpen'])
  },
  methods: {
    ...mapActions([
      'toggleScheduleOpen',
      'setScheduleOpen',
      'setBroadcastOpen',
      'setNavOpen',
      'setShareOpen',
      'setSearchOpen'
    ]),
    toggle_schedule() {
      if (this.isScheduleOpen) {
        this.setScheduleOpen(false)
      } else {
        this.setScheduleOpen(true)
        this.setBroadcastOpen(false)
      }
      this.setNavOpen(false)
      this.setShareOpen(false)
      this.setSearchOpen(false)

      // reset broadcast / event menu scroll pos
      if (document.querySelector('.events-inner')) {
        document.querySelector('.events-inner').scrollTop = 0
        document.querySelector('.broadcast-menu').scrollTop = 0
      }
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.schedule-link {
  background-color: $black;
  border-radius: $roundRadius;
  color: $white;
  width: 100%;
  padding: 20px;
}
</style>
