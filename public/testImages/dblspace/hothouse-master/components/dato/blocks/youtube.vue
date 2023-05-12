<template>
  <div class="block-youtube">
    <fragments-page-link :data="data.content" />
    <div class="inner">
      <div class="block-section block-section-youtube">
        <fragments-video
          v-if="data.content.videoUrl && !data.content.vimeoUrl"
          :data="data.content.videoUrl"
        />
        <fragments-vimeo
          v-if="data.content.vimeoUrl"
          :url="data.content.vimeoUrl"
          :poster="hasPoster"
        />
      </div>
      <fragments-details :data="data.content" />
      <div
        class="block-section block-section-text"
        v-if="data.content.title || data.content.textContent"
      >
        <fragments-title :data="data.content.title" />
        <span class="subtitle" v-html="data.content.subtitle" />
        <fragments-text-content :data="data.content.textContent" />
        <div
          class="button-wrap to_squeeze"
          v-if="data.content.links.length > 0"
        >
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
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'youtube',
  data() {
    return {}
  },
  props: ['data', 'position'],
  components: {},
  computed: {
    aspectRatio() {
      return
    },
    hasPoster() {
      if (this.data.content.poster) {
        return this.data.content.poster.url
      } else {
        return null
      }
    },
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
.youtube-block-button {
  padding-top: 40px;
}
.block-section-youtube {
  position: relative;
  width: 100%;
  // height: vw(450);
  height: 0;
  padding-bottom: 56.25%;
  background-color: $darkgrey;
  .iframe-youtube,
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.subtitle {
  white-space: pre-line;
  margin-bottom: $pageMargin / 2;
}

.is-ios .block-youtube iframe {
  object-fit: revert;
}
</style>
