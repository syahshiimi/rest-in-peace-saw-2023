<template>
  <div
    class="page-link to_squeeze"
    v-if="data.reference && data.reference.slug"
  >
    <n-link
      v-if="
        ($route.name === 'representations-slug' &&
          data.reference &&
          data.reference.categoryName !== `Event`) ||
          $route.name === 'results'
      "
      :to="{
        name: 'presentations-slug',
        params: { slug: data.reference.slug }
      }"
      v-text="data.reference.title"
    />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'page-link',
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
.is-desktop .page-results .single-block:hover,
.is-desktop .page-results .search-block:hover {
  .page-link {
    display: flex;
    opacity: 1;
  }
}

.is-phone .page-results .page-link {
  display: flex;
  opacity: 1;
}
.page-link {
  display: none;
  align-items: center;
  background-color: $offwhite;
  position: absolute;
  top: 15px;
  left: 15px;
  height: $blobHeight;
  border-radius: $roundRadius;
  z-index: 3;
  transition: 0.3s opacity ease-in-out;
  opacity: 0;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  @include below('mobile') {
    height: 20px;
    top: 10px;
    left: 10px;
    padding: 20px 10px;
    a {
      padding: 0 13px !important;
      font-size: 12px;
    }
  }
  &:hover {
    opacity: 0.7;
  }
  a {
    padding: 0 $blobHeight;
    position: relative;
    top: 1px;
  }
}
</style>
