<template>
  <n-link
    v-if="data.content && data.content.reference && data.content.reference.slug"
    :to="{
      name: category,
      params: {
        slug:
          data.content && data.content.reference && data.content.reference.slug
            ? data.content.reference.slug
            : ''
      },
      hash: `#block-${data.content.id}`
    }"
    class="search-block"
    :class="{ four: this.$route.name === 'results' }"
  >
    <fragments-page-link :data="data.content" />
    <div class="media-wrapper" v-if="hasImage">
      <fragments-image
        v-if="$route.name === 'index' && image"
        :image="image"
        class="search-block-media to_squeeze"
      />
      <fragments-image
        v-if="
          $route.name === 'results' &&
            data.content &&
            data.content.media &&
            data.content.media[0] &&
            data.content.media[0].image
        "
        :image="data.content.media[0].image"
        class="search-block-media"
      />
      <fragments-video
        v-if="
          $route.name === 'results' &&
            data.content &&
            data.content.media &&
            data.content.media[0] &&
            data.content.media[0].videoUrl
        "
        :data="data.content.media[0].videoUrl"
        class="search-block-media"
      />
      <fragments-video
        v-if="
          $route.name === 'results' && data.content && data.content.videoUrl
        "
        :data="data.content.videoUrl"
        class="search-block-media"
      />
      <fragments-image
        v-if="
          data.content &&
            data.content.images &&
            data.content.images[0] &&
            data.content.images[0].slideImage
        "
        :image="data.content.images[0].slideImage"
        class="search-block-media"
      />
    </div>
    <div
      class="block-section block-section-text to_squeeze"
      :class="!hasImage ? 'no-image' : ''"
      v-if="!hasImage && data.content && data.content.textContent"
    >
      <search-text-content :data="data.content.textContent" />
    </div>
    <fragments-details
      v-if="data.content"
      :data="data.content"
      class="to_squeeze"
    />
    <div class="block-section block-section-text to_squeeze">
      <fragments-title v-if="data.content.title" :data="data.content.title" />
      <fragments-title
        v-if="!data.content.title || data.content.title === ' '"
        :data="`Read More`"
      />
    </div>
  </n-link>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'search-block',
  data() {
    return {}
  },
  props: ['data', 'image'],
  components: {},
  computed: {
    category() {
      if (this.$route.name === 'index') {
        return 'presentations-slug'
      } else if (
        this.data.content &&
        this.data.content.reference &&
        this.data.content.reference.categoryName &&
        this.data.content.reference.categoryName === 'Event'
      ) {
        return 'representations-slug'
      } else {
        return 'presentations-slug'
      }
    },
    hasImage() {
      return (
        this.image ||
        (this.$route.name === 'results' &&
          this.data.content &&
          this.data.content.media &&
          this.data.content.media[0] &&
          this.data.content.media[0].image) ||
        (this.$route.name === 'results' &&
          this.data.content &&
          this.data.content.media &&
          this.data.content.media[0] &&
          this.data.content.media[0].videoUrl) ||
        (this.$route.name === 'results' &&
          this.data.content &&
          this.data.content.videoUrl) ||
        (this.data.content &&
          this.data.content.images &&
          this.data.content.images[0] &&
          this.data.content.images[0].slideImage)
      )
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.viewfull .search-block {
  max-height: none;
  .block-section-text {
    padding-bottom: $pageMargin;
    height: auto;
    &.no-image {
      height: auto;
      padding: $pageMargin;
    }
  }
}

.search-block {
  position: relative;
  background-color: $offwhite;
  max-height: vw(500);
  display: flex;
  flex-direction: column;
  @include below('tablet') {
    max-height: none;
  }
  .block-section-text {
    &.no-image {
      margin-top: 0;
      height: 0;
      padding: $pageMargin $pageMargin calc(75% - #{$pageMargin});
      @include below('mobile') {
        height: auto;
        padding: $pageMarginMob;
      }
    }
  }
  .media-wrapper {
    position: relative;
    // width: 100%;
    // height: vw(250);
    // height: 100%;
    height: 0;
    padding-bottom: 75%;

    .search-block-media,
    .search-block-media img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      // z-index: 2;
    }
  }
  &:nth-child(n) {
    background-color: $offgrey;
  }
  &:nth-child(2n) {
    background-color: $offwhite;
  }
  &:nth-child(5n) {
    background-color: $offwhite;
  }
  &:nth-child(6n) {
    background-color: $offgrey;
  }
  &:nth-child(7n) {
    background-color: $offwhite;
  }
  &:nth-child(8n) {
    background-color: $offgrey;
  }
  &:nth-child(12n) {
    background-color: $offwhite;
  }
  &:nth-child(13n) {
    background-color: $offwhite;
  }
  &:nth-child(14n) {
    background-color: $offgrey;
  }
  &:nth-child(18n) {
    background-color: $offwhite;
  }
  &:nth-child(22n) {
    background-color: $offgrey;
  }
  &:nth-child(23n) {
    background-color: $offwhite;
  }
  &:nth-child(24n) {
    background-color: $offgrey;
  }
  &:nth-child(25n) {
    background-color: $offgrey;
  }
  &:nth-child(27n) {
    background-color: $offgrey;
  }
  &:nth-child(28n) {
    background-color: $offwhite;
  }
  border-radius: $roundRadius;
  width: calc(100% / 3);
  &.four {
    width: 25%;
    @include below('tablet') {
      width: 50%;
    }
    @include below('mobile') {
      width: 100%;
    }
  }
  img,
  iframe {
    border-top-right-radius: $roundRadius;
    border-top-left-radius: $roundRadius;
  }
  .details {
    pointer-events: none;
  }
}
.page-results .search-block iframe {
  pointer-events: none;
  object-fit: contain !important;
  object-position: top;
}
</style>
