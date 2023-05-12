<template>
  <div class="credits-block broadcast-block">
    <div class="inner-block">
      <h2 class="block-content-title">Supported By</h2>
      <div class="credit-logos-wrap">
        <a
          class="single-credit-logo"
          :href="credit.url"
          v-for="credit in data.credit"
          :key="credit.title"
          :style="`width:${credit.logowidth}px`"
        >
          <fragments-image v-if="credit.image" :image="credit.image" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'credits-block',
  data() {
    return {}
  },
  props: ['data'],
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.credits-block {
  border-radius: $roundRadius;
  .inner-block {
    flex-direction: column;
  }
  .credit-logos-wrap {
    align-items: center;
    margin-top: 5px;
    // margin-bottom: 20px;
    flex-wrap: wrap;
    @include below('mobile') {
      margin-bottom: 10px;
    }
    .single-credit-logo {
      height: auto;
      margin-right: 30px;
      margin-bottom: 30px;
    }
    img,
    .image {
      border-radius: 0;

      width: 100%;
      height: auto;
    }
  }
  div {
    display: flex;
  }
}
</style>
