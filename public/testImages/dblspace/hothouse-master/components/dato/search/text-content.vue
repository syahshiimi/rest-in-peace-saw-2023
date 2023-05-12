<template>
  <div class="textcontent-search" v-if="data">
    <div
      v-if="data"
      :class="{
        active: showMore === true && letterCounter(data) < 400,
        cut: letterCounter(data) > 400 && showMore === false
      }"
      class="block-content-textcontent"
    >
      <div v-html="data" />
    </div>
    <!-- <fragments-more-button
      v-if="letterCounter(data) > 3000"
      :class="{ active: showMore === true }"
      @click.native="toggle"
      :data="text"
    /> -->
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'text-content',
  data() {
    return {
      showMore: false
    }
  },
  props: ['data'],
  components: {},
  computed: {
    ...mapState(['updateScrollTrigger']),
    text() {
      return this.showMore ? 'less' : 'more'
    }
  },
  methods: {
    ...mapActions(['setUpdateScrollTrigger']),
    letterCounter(str) {
      let cleanText = str.replace(/<\/?[^>]+(>|$)/g, '')
      return cleanText.length
    },
    toggle() {
      // change state to update scrolltrigger stuff in other components
      this.setUpdateScrollTrigger(Math.random())
      this.showMore = !this.showMore
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.textcontent-search {
  .block-content-textcontent {
    display: block;
    // padding: calc(#{$pageMargin} / 2);
    &.cut {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 20;
      -webkit-box-orient: vertical;
      // height: calc(#{$fontsize}* 1.2 * #{$lineShow});
      @include below('medium') {
        -webkit-line-clamp: 10;
      }
      @include below('small') {
        -webkit-line-clamp: 8;
      }
      @include below('tablet') {
        -webkit-line-clamp: 12;
      }
      @include below('tablet-small') {
        -webkit-line-clamp: 10;
      }
    }

    &.active {
      overflow: none;
      text-overflow: auto;
      display: block;
      -webkit-line-clamp: none;
      -webkit-box-orient: none;
    }
  }
}

@media (max-width: 2400px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 19;
      }
    }
  }
}
@media (max-width: 2400px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 18;
      }
    }
  }
}
@media (max-width: 2100px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 16;
      }
    }
  }
}
@media (max-width: 1980px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 15;
      }
    }
  }
}
@media (max-width: 1800px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 13;
      }
    }
  }
}
@media (max-width: 1600px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 11;
      }
    }
  }
}
@media (max-width: 1400px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 9;
      }
    }
  }
}
@media (max-width: 1200px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 8;
      }
    }
  }
}
@media (max-width: 1100px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 7;
      }
    }
  }
}
@media (max-width: 1024px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 15;
      }
    }
  }
}
@media (max-width: 900px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 13;
      }
    }
  }
}
@media (max-width: 768px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 11;
      }
    }
  }
}
@media (max-width: 700px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 10;
      }
    }
  }
}
@media (max-width: 600px) {
  .textcontent-search {
    .block-content-textcontent {
      &.cut {
        -webkit-line-clamp: 12;
      }
    }
  }
}
</style>
