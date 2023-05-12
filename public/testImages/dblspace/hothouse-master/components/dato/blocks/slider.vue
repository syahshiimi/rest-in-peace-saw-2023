<template>
  <div class="block-slider">
    <fragments-page-link :data="data.content" />
    <div class="inner">
      <fragments-slider :sliderdata="data.content" :slidertype="`nonstatic`" />
    </div>
    <fragments-details class="to_squeeze" :data="data.content" />
    <div class="slider-text-content to_squeeze" v-if="data.content.title">
      <fragments-title :data="data.content.title" />
      <fragments-text-content
        v-if="data.content.description"
        :data="data.content.description"
      />
      <div class="button-wrap to_squeeze" v-if="data.content.links.length > 0">
        <fragments-button
          :data="link"
          v-for="link in data.content.links"
          :key="link.buttonLabel"
        />
      </div>
      <div
        class="youtube-block-button"
        v-if="$route.name === 'index' && position !== 0"
      >
        <fragments-index-button
          :data="buttonData"
          :representation="category"
          :presentation="category"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'slider',
  data() {
    return {}
  },
  props: ['data', 'position'],
  components: {},
  computed: {
    buttonData() {
      return {
        buttonLabel: `Read More`,
        reference: {
          slug: this.data.content.reference.slug
        }
      }
    },
    category() {
      return this.data.content.reference.categoryName === 'Event'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.block-slider {
  position: relative;
}
.slider-text-content {
  padding: $pageMargin $pageMargin calc(#{$pageMargin} + 5px);
}
</style>
