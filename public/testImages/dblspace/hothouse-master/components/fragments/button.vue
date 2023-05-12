<template>
  <div class="single-button">
    <a
      :href="data.url"
      v-if="data.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button class="block-button" v-text="data.buttonLabel" />
    </a>
    <n-link
      class="block-button"
      v-else-if="!image && !representation"
      :to="{ name: data.reference.slug }"
      v-text="data.buttonLabel"
    />
    <n-link
      class="block-button"
      v-else-if="image"
      :to="{
        name: 'presentations-slug',
        params: { slug: data.reference.slug }
      }"
      v-text="data.buttonLabel"
    />
    <n-link
      class="block-button"
      v-else-if="!image && representation"
      :to="{
        name: 'representations-slug',
        params: { slug: data.reference.slug }
      }"
      v-text="data.buttonLabel"
    />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-button',
  data() {
    return {}
  },
  props: ['data', 'image', 'representation'],
  components: {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.single-button {
  width: 100%;
  display: flex;
  // justify-content: flex-end;
  a {
    width: 100%;
  }
}
.button-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -$pageMargin / 2;
}

.textcontent-wrap + .button-wrap {
  margin-top: $pageMargin;
}

.block-button {
  display: flex;
  padding: 0 $pageMargin;
  height: $blobHeight;
  border-radius: $roundRadius;
  background-color: $black;
  color: $offwhite;
  font-weight: bold;
  margin-bottom: $pageMargin / 2;
  word-break: break-word;
  line-height: 1;
  // margin: 0 0 $pageMargin $pageMargin;
  transition: 0.2s filter ease-in-out;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  @include below('mobile') {
    height: auto;
    padding: 10px $pageMargin + 10px;
  }

  span {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
  &:hover {
    filter: invert(1);
  }
}
.section-template:not(.viewfull) .width_1-2 .block-button,
.section-template:not(.viewfull) .width_1-3 .block-button {
  width: 100%;
  display: block;
}
</style>
