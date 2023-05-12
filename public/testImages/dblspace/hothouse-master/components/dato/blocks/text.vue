<template>
  <div
    class="block-image-text"
    :class="data.content.media.length == 0 ? 'no-image' : ''"
  >
    <fragments-page-link :data="data.content" />
    <div class="inner">
      <div
        class="block-section block-section-image"
        v-if="data.content.media.length > 0"
      >
        <div class="inner">
          <media-loader
            :data="media"
            class="image-wrap"
            :key="`component-${key}`"
            ref="components"
            v-for="(media, key) in data.content.media"
            :length="data.content.media.length"
          />
          <fragments-caption
            v-if="data.content.mediaCaption"
            :data="data.content.mediaCaption"
          />
        </div>
      </div>
      <fragments-details :data="data.content" />
      <div
        class="block-section block-section-text"
        v-if="data.content.title || data.content.textContent"
      >
        <fragments-title :data="data.content.title" v-if="data.content.title" />
        <fragments-text-content :data="data.content.textContent" />

        <div class="button-wrap" v-if="data.content.link.length > 0">
          <fragments-button
            :data="link"
            v-for="link in data.content.link"
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
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-text',
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
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style lang="scss">
.youtube-block-button {
  padding-top: 40px;
}
.block-section-image {
  position: relative;
  background-color: transparent;
  > .inner {
    display: flex;
  }
  .image-wrap {
    // width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
.no-image .details {
  border-top: none;
}
</style>
