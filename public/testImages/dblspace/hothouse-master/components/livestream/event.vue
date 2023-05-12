<template>
  <div
    class="single-event-info"
    :style="`background-color: ${data.color.hex};`"
  >
    <broadcast-block
      v-for="(block, index) in data.header"
      :data="block"
      :key="block.title"
      :number="index"
      :even="data.evenBlockColor.hex"
      :odd="data.oddBlockColor.hex"
      class="first-event-block"
    />
    <!-- <livestream-schedule :data="data.schedule" /> -->
    <h2 class="schedule-header">Schedule</h2>
    <div class="schedule-wrap">
      <broadcast-schedule
        v-for="(block, key) in data.schedule"
        :data="block"
        :key="block.title"
        :number="key"
        :even="data.evenBlockColor.hex"
        :odd="data.oddBlockColor.hex"
        :class="`single-block-${stringify(block.title)}`"
      />
    </div>
    <livestream-notes
      :data="data.tags"
      :even="data.evenBlockColor.hex"
      :odd="data.oddBlockColor.hex"
      :number="data.schedule.length"
    />
    <broadcast-socials-block
      :data="socialsBlock[0]"
      :style="`background-color: ${color};`"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'event',
  data() {
    return {}
  },
  props: ['data'],
  methods: {
    stringify(text) {
      return text
        .replace(/[\W_]/g, '')
        .replace(' ', '')
        .toLowerCase()
    }
  },
  computed: {
    ...mapState(['livestream']),
    socialsBlock() {
      return this.livestream.broadcast.content.filter((content) => {
        return content._modelApiKey == 'socials_block'
      })
    },
    oddColor() {
      return this.data.oddBlockColor.hex
        ? this.data.oddBlockColor.hex
        : '#e3e2db'
    },
    evenColor() {
      return this.data.evenBlockColor.hex
        ? this.data.evenBlockColor.hex
        : '#d0cfc9'
    },
    color() {
      return (this.data.schedule.length + 1) % 2 == 0
        ? this.oddColor
        : this.evenColor
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.single-event-info {
  .event-buttons {
    margin: 30px 0;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 30px;
    padding: 27px 0;
  }
  h4 {
    font-size: 24px;
  }
  p {
    line-height: 1.25;
  }

  .day-image {
    margin-bottom: 32px;
  }
  .day-title {
    margin-bottom: 35px;
    font-size: 30px;
    @include below('mobile') {
      font-size: 22px;
      margin-bottom: 25px;
    }
  }
  .schedule-wrap {
    padding-bottom: 30px;
  }
  .schedule-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0 30px;
  }
}
</style>
