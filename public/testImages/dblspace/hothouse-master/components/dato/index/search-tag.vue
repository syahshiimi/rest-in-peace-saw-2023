<template>
  <button class="search-tag" @click="goToResults">
    <span v-text="data" />
  </button>
</template>
<script>
export default {
  name: 'search-tag',
  data() {
    return {}
  },
  props: ['data'],
  methods: {
    goToResults() {
      this.$router.push({ path: `/results?filters=${this.data}` })
      this.$store.commit('SET_FILTER', {
        filter: {
          filter: this.data,
          val: true
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.search-tag {
  padding: 10px;
  margin: 5px 2.5px;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: $black;
  color: $white;
  border-radius: $roundRadius;
  &:hover {
    background-color: $white;
    color: $black;
  }
}
</style>
