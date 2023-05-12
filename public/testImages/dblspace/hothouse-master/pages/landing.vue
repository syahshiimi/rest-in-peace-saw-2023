<template>
  <section class="section-slug section-template section-index">
    <div class="inner grid-layout ">
      <presentation-sidebar
        :sidebar="index.sidebar"
        :contenttype="`index`"
        class="sidebar-index"
      />
      <div class="panel-content">
        <component-loader :data="index.content[0]" :position="0" />
        <h3 v-text="index.subtitle" />
        <!-- <component-loader :data="index.content[1]" :position="1" /> -->
        <component-loader
          :data="content"
          :key="`component-${key}`"
          :position="key + 1"
          ref="components"
          v-for="(content, key) in index.content.slice(1, 3)"
        />
        <h3 v-text="`Presentations`" />
        <div class="latest-posts">
          <index-landing-block
            :data="content"
            :number="key"
            :image="content.sidebar[0].image"
            :key="`block-${key}`"
            v-for="(content, key) in allPresentations.slice(0, 6)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import indexQuery from '~/assets/graphql/index.js'
import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import head from '~/assets/js/head'
import { mapState, mapActions } from 'vuex'
export default {
  async asyncData(context) {
    return getAsyncData(context, indexQuery)
  },
  head() {
    return head(this.index.seo)
  },
  components: {},
  computed: {
    ...mapState(['allPresentations', 'allRepresentations'])
  },
  methods: {
    ...mapActions([
      'setNavOpen',
      'setSearchOpen',
      'setShareOpen',
      'setDarkMode'
    ]),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setShareOpen(false)
    }
  },
  mounted() {
    // console.log(this.allPresentations)
    this.close_menus()
    this.setDarkMode(true)
    // document.body.classList.add('dark-mode')
  }
}
</script>

<style lang="scss">
.section-index {
  // background-color: $darkgrey;
  min-height: 100vh;
  h3 {
    padding: 20px;
  }
  .panel-content {
    margin-left: 25%;
    // margin-bottom: $pageMargin;
  }
  .latest-posts {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
    .search-block {
      @include below('tablet') {
        width: 50%;
        &:last-child {
          display: none;
        }
      }
    }
  }
  .index-nav-links {
    width: 100%;
  }
  .with-blob-nav {
    background-color: transparent;
    > .inner {
      padding: 0;
    }
    .wrap-links {
      display: flex;
      flex-direction: column;
      padding: $pageMargin #{$pageMargin + $pageMargin / 2} $pageMargin;
      border-radius: $roundRadius;
      @include below(small) {
        padding: $pageMargin;
      }
      @include below('mobile') {
        padding: $contentPaddingMob;
      }
      &.wrap-links-presentations {
        background-color: #efefef;
        .menu-category-title {
          color: $black;
        }
      }
      &.wrap-links-representations {
        background-color: $black;
      }
      .menu-category-title {
        font-size: 26px;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
