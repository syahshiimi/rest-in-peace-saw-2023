<template>
  <div class="all-tags" :style="`background-color: ${bg};`">
    <index-search-tag v-for="tag in data" :data="tag" :key="tag" />
  </div>
</template>
<script>
export default {
  name: 'all-tags',
  data() {
    return {}
  },
  props: ['data', 'odd', 'even'],
  computed: {
    bg() {
      return this.odd ? this.odd : '#d1d0cb'
    }
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.all-tags {
  // background-color: #d1d0cb;
  border-radius: $roundRadius;
  display: flex;
  flex-wrap: wrap;
  padding: $pageMargin;
  @include below('mobile') {
    padding: $pageMarginMob;
  }
}
</style>
