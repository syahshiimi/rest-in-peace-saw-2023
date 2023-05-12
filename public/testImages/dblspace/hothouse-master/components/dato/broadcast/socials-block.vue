<template>
  <div
    class="socials-block broadcast-block"
    v-if="data && data.socials && data.socials.length > 0"
  >
    <div class="inner-block">
      <h2 class="block-content-title">Follow us on:</h2>
      <div class="social-logos-wrap">
        <a
          class="single-social-logo"
          :href="social.url"
          v-for="social in data.socials"
          :key="social.title"
          :style="`width:${social.width}px`"
        >
          <fragments-image v-if="social.image" :image="social.image" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'socials-block',
  data() {
    return {}
  },
  props: ['data'],
  computed: {},
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.socials-block {
  border-radius: $roundRadius;
  .inner-block {
    flex-direction: column;
  }
  .social-logos-wrap {
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px;
    @include below('mobile') {
      margin-bottom: 10px;
    }
    .single-social-logo {
      width: 20px;
      height: auto;
      margin-right: 30px;
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
