<template>
  <section
    class="results-page"
    :class="{
      viewfull: view_full == true,
      searchopen: isSearchOpen == true
    }"
  >
    <fragments-view-settings
      :number="activeFilters.length > 0 ? filteredBlocks.length + 1 : 1"
    />
    <div class="panel-content">
      <div class="inner" v-if="activeFilters.length > 0">
        <search-block
          v-for="content in filteredBlocks"
          :key="content.content.id"
          :data="content"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import emitter from '~/assets/js/events/EventsEmitter'
export default {
  data() {
    return {
      view_full: false
    }
  },
  components: {
    vComponentLoader: () => import('~/components/componentLoader.vue')
  },
  computed: {
    ...mapState([
      'allPresentations',
      'allRepresentations',
      'activeFilters',
      'allBlocks',
      'isSearchOpen'
    ]),
    ...mapGetters(['allBlocks', 'filteredBlocks']),
    getRandomInt() {
      return Math.floor(Math.random() * Math.floor(5000))
    }
  },
  methods: {
    viewFull() {
      // console.log('received full')
      this.view_full = true
    },
    viewDefault() {
      // console.log('received default')
      this.view_full = false
    }
  },
  mounted() {
    // receive click emits from child component
    emitter.on('VIEW:FULL', this.viewFull.bind(this))
    emitter.on('VIEW:DEFAULT', this.viewDefault.bind(this))
  }
}
</script>

<style lang="scss">
.results-page {
  padding: $pageMargin;
  padding-top: 100px;
  transition: 0.3s padding ease-in-out;
  &.searchopen {
    padding-top: 250px;
  }
  @include below('tablet') {
    padding: $pageMarginMob;
    padding-top: 70px;
    &.searchopen {
      padding-top: 280px;
    }
  }
  @include below('mobile') {
    // padding: $pageMarginMob;
    &.searchopen {
      padding-top: 350px;
    }
  }
  &.viewfull {
    .search-block {
      width: 100%;
    }
  }
  .panel-content {
    > .inner {
      display: flex;
      flex-wrap: wrap;

      .details .left {
        flex-wrap: wrap;
        padding-right: 0;
      }
    }
    .search-block {
      transition: 0.3s width ease-in-out;
    }
  }
}
</style>
