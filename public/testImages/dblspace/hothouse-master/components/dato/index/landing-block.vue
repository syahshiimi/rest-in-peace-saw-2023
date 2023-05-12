<template>
  <div class="landing-block">
    <div class="img-wrap to_squeeze">
      <fragments-image :image="image" />
    </div>

    <index-landing-details
      :data="data"
      class="to_squeeze details"
      :number="number + 1"
    />

    <div class="block-section block-section-text to_squeeze">
      <fragments-title :data="data.title" />
      <div class="landing-block-button">
        <fragments-button :data="buttonData" :image="image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landing-block',
  data() {
    return {}
  },
  props: ['data', 'image', 'number'],
  computed: {
    buttonData() {
      return {
        buttonLabel: `Read More`,
        reference: {
          slug: this.data.slug
        }
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.landing-block {
  display: flex;
  flex-direction: column;
  width: calc(100% / 3);
  background-color: #e3e3db;
  border-radius: $roundRadius;
  @include below('tablet') {
    width: calc(100% / 2);
  }
  @include below('mobile') {
    width: 100%;
  }
  > .inner {
    padding: calc(#{$pageMargin} - 5px) $pageMargin $pageMargin;
  }
  .left {
    display: flex;
    flex-wrap: wrap;
  }
  .single-button {
    // padding: 0 $pageMargin;
    margin-top: 50px;
    a {
      margin-bottom: 0;
    }
  }
  &:nth-child(even) {
    background-color: #d1d0cb;
  }
  .img-wrap {
    position: relative;
    height: 0;
    padding-bottom: 90%;
    .image,
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .block-section-text {
    flex-grow: 1;
    justify-content: space-between;
  }
}
</style>
