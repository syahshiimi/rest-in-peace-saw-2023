<template>
  <section class="section-about section-template">
    <div class="inner grid-layout">
      <div class="panel-content">
        <component-loader
          :data="content"
          :key="`component-${key}`"
          ref="components"
          v-for="(content, key) in about.content"
          :class="`single-block-${key}`"
        />
      </div>
      <presentation-sidebar
        :sidebar="about.sidebar"
        :contenttype="`about`"
        class="sidebar-presentation"
      />
    </div>
  </section>
</template>
<script>
import aboutQuery from '~/assets/graphql/about.js'
import getAsyncData from '~/assets/js/utils/datas/getAsyncData'
import head from '~/assets/js/head'
import emitter from '~/assets/js/events/EventsEmitter'
import { mapActions } from 'vuex'
export default {
  async asyncData(context) {
    return getAsyncData(context, aboutQuery)
  },
  head() {
    return head(this.about.seo)
  },
  components: {
    vComponentLoader: () => import('~/components/componentLoader.vue')
  },
  methods: {
    ...mapActions(['setNavOpen', 'setSearchOpen', 'setShareOpen']),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
      this.setShareOpen(false)
    }
  },
  mounted() {
    emitter.emit('PAGE:MOUNTED')
    this.close_menus()
  }
}
</script>

<style lang="scss">
.section-about {
  .single-block-0 {
    .details {
      display: none;
    }
  }
}
</style>
