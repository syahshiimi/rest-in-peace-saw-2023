<template>
  <div class="landing-details">
    <div class="left">
      <span v-text="`Presentation #${data.categoryNumber}`"></span>
      <span class="bullet">•</span>
      <span
        class="underline"
        v-text="`${data.categoryName} `"
        @click="goToResults"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'landing-details',
  data() {
    return {}
  },
  props: ['data', 'number'],
  methods: {
    goToResults() {
      this.$router.push({ path: `/results?filters=${this.data.categoryName}` })
      this.$store.commit('SET_FILTER', {
        filter: {
          filter: this.data.categoryName,
          val: true
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.landing-details {
  border-bottom: 1px solid #adada8;
  display: flex;
  justify-content: space-between;
  font-family: $moderat;
  font-size: 15px;
  padding: 19px $pageMargin 18px;
  .underline {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
