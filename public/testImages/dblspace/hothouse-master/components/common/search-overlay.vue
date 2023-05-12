<template>
  <div
    class="search-overlay"
    :class="{
      active:
        ($route.name === 'results' &&
          !isNavOpen &&
          !isShareOpen &&
          isSearchOpen) ||
        ($route.query.filter > 0 &&
          !isNavOpen &&
          !isShareOpen &&
          isSearchOpen) ||
        (this.activeFilters.length === 0 &&
          !isNavOpen &&
          !isShareOpen &&
          isSearchOpen)
    }"
  >
    <div class="inner">
      <div class="fixed-tag" v-for="tag in removeCategory" :key="tag">
        <fragments-tag :tag="tag" @input="setFilter" />
      </div>
      <div
        class="single-tag"
        v-for="tag in removeFilter.slice(0, filtersToShow)"
        :key="tag"
      >
        <fragments-tag :tag="tag" @input="setFilter" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import gsap from 'gsap'

export default {
  data() {
    return {
      filtersToShow: 11
    }
  },
  computed: {
    ...mapState([
      'activeFilters',
      'isNavOpen',
      'isShareOpen',
      'isSearchOpen',
      'allRepresentations',
      'allPresentations',
      'allTags'
    ]),
    ...mapGetters(['getUniq', 'removeFilter', 'removeCategory']),
    limitTags() {
      if (process.browser) {
        return window.innerWidth <= 520 ? 0 : 3
      }
    }
  },
  watch: {
    $route(to, from) {
      if (from.query.filter && to.query.filter) {
        // console.log(this.$route.query)
        this.$router.go()
      }
      if (to.name === 'results') {
        this.setSearchOpen(true)
      }
    }
  },
  methods: {
    ...mapActions(['setSearchOpen']),
    setFilter(filter) {
      this.$store.commit('SET_FILTER', { filter })
      if (
        this.$route.name === 'index' ||
        this.$route.name === 'about' ||
        this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug'
      ) {
        this.$router.push({ path: `/results?filters=${filter.filter}` })
      } else {
        if (this.$route.name === 'results') {
          const filters = this.$route.query.filters
            ? this.$route.query.filters.split(',')
            : []
          filters.push(filter.filter)
          // console.log(filters)
          // console.log(filters.join(`,`))
          this.$router.push({ path: `/results?filters=${filters.join(`,`)}` })
          // console.log(this.$route)
        }
      }
    },
    addFilter() {
      if (this.activeFilters.length > 0) {
        this.filtersToShow += this.activeFilters.length
      }
    },
    pushFiltersFromUrl() {
      const filters = this.$route.query.filters
        ? this.$route.query.filters.split(',')
        : []
      filters.forEach((filter) =>
        this.$store.commit('SET_FILTER', {
          filter: {
            filter,
            val: true
          }
        })
      )
    },
    setTags() {
      this.$store.commit('ALL_TAGS', {
        tags: this.getUniq
      })
    }
  },
  mounted() {
    this.setTags()
    this.pushFiltersFromUrl()
    if (this.$route.name === 'results' && this.activeFilters.length === 0) {
      this.setSearchOpen(true)
      gsap.to('.actual-nav .search-overlay .single-tag', {
        opacity: 1,
        scale: 1,
        delay: 0.1,
        ease: 'power2.Out',
        duration: 0.2,
        stagger: {
          each: 0.025,
          from: 'random'
        },
        onComplete() {
          //allow click
          document.querySelector('.actual-nav').classList.remove('no-interact')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.search-overlay {
  position: fixed;
  left: $pageMargin;
  top: calc(#{$pageMargin} * 4);
  width: calc(100% - #{$pageMargin} - #{$pageMargin});
  @include below('tablet-small') {
    top: 65px;
    left: $pageMarginMob;
    width: calc(100% - #{$pageMarginMob} - #{$pageMarginMob});
  }
  &.active {
    opacity: 1;
    transform: scale(1);
    .single-tag {
      transform: scale(0);
      opacity: 0;
    }
  }
  opacity: 0;
  pointer-events: none;
  transition: 0.3s opacity ease-in-out, 0.3s transform ease-in-out;
  transform: scale(0);
  z-index: 5;
  transform-origin: top left;
  > .inner {
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: $roundRadius;
    // background-color: black;
    color: $white;
    // padding: 35px;
  }
  .hhblob {
    // background-color: black;
    // color: black;
  }
  .fixed-tag {
    margin: 0 $pageMargin / 2 $pageMargin / 2 0;
    padding: 0;
    @include below('mobile') {
      margin: 0 10px 10px 0;
    }
  }
  .single-tag {
    margin: 0 $pageMargin / 2 $pageMargin / 2 0;
    opacity: 0;
    transform-origin: top left;
    transform: scale(0);
    padding: 0;

    @include below('mobile') {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
