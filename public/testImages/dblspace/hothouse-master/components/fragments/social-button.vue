<template>
  <button class="social-button">
    <div class="icon-wrap">
      <fragments-image :image="data.image" />
    </div>
    <a
      :href="data.url"
      v-text="data.buttonLabel"
      target="_blank"
      rel="noopener noreferrer"
    />
  </button>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'social-button',
  data() {
    return {}
  },
  props: ['data'],
  components: {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.social-button {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 4px 0;
  .icon-wrap {
    width: 23px;
    display: flex;
    justify-content: center;
  }
  a {
    padding-left: 8px;
    text-decoration: none;
  }
  img {
    width: 23px;
    height: 23px;
  }
}
</style>
