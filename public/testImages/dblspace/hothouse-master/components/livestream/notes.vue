<template>
  <div class="notes">
    <h4 v-text="`Notes`" />
    <div class="note-tags" :style="`background-color: ${color};`">
      <index-search-tag v-for="tag in data" :data="tag" :key="tag" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'notes',
  data() {
    return {}
  },
  props: ['data', 'odd', 'even', 'number'],
  computed: {
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.oddColor : this.evenColor
    }
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.notes {
  h4 {
    text-align: center;
    margin-bottom: 30px;
    @include below('mobile') {
      font-size: 20px;
    }
  }
  .note-tags {
    border-radius: $roundRadius;
    display: flex;
    padding: 30px;
    flex-wrap: wrap;
  }
  // margin-bottom: 62px;
  .search-tag {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
