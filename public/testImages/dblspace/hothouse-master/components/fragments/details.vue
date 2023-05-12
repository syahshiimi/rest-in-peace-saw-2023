<template>
  <div class="details" v-if="data.date || data.reference">
    <div class="left">
      <span v-text="`${pageType} #${data.reference.categoryNumber}`" />
      <span class="bullet">•</span>
      <div class="single-furniture-wrap">
        <span
          class="tag-name"
          v-if="data.reference"
          v-text="`${data.reference.categoryName}`"
          @click="goToResults(data.reference.categoryName)"
        />
        <span class="comma">,</span>
      </div>
      <div
        class="single-furniture-wrap"
        v-if="data.tag"
        v-for="(tag, key) in data.tag"
        :key="`${tag}-${key}`"
      >
        <!-- <span class="bullet">•</span> -->
        <div class="single-furniture" @click="goToResults(tag)">
          <span class="tag-name" v-text="tag" /><span class="comma">,</span>
        </div>
      </div>
    </div>
    <span class="detail-date" v-if="data.date && route" v-text="dateFormat" />
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'v-details',
  data() {
    return {
      disableLink: false
    }
  },
  props: ['data'],
  components: {},
  computed: {
    ...mapState(['allPresentations', 'allRepresentations']),
    dateFormat() {
      return new Date(this.data.date)
        .toLocaleDateString('en-US')
        .split('/')
        .join('.')
    },
    pageType() {
      return this.$route.name === 'presentations-slug' ||
        this.$route.name === 'results'
        ? 'Presentation'
        : 'Re-presentation'
    },
    route() {
      return (
        this.$route.name === 'presentations-slug' ||
        this.$route.name === 'representations-slug' ||
        this.$route.name === 'index'
      )
    }
  },
  methods: {
    goToResults(filter) {
      if (this.$route.name === 'results') {
        this.disableLink = true
      } else {
        this.$router.push({ path: `/results?filters=${filter}` })
        this.$store.commit('SET_FILTER', {
          filter: {
            filter,
            val: true
          }
        })
      }
    }
  },
  mounted() {
    // console.log('left', this.data)
  }
}
</script>

<style lang="scss">
.details {
  border-top: 1px solid #adada8;
  border-bottom: 1px solid #adada8;
  display: flex;
  justify-content: space-between;
  font-family: $moderat;
  // font-size: $pageMargin / 2;
  padding: 19px $pageMargin 18px;
  font-size: 15px;
  @include below('tablet-small') {
    padding-left: 25px;
    padding-right: 25px;
    font-size: 13px;
  }
  @include below('mobile') {
    // flex-direction: column;
  }
  .left {
    display: flex;
    flex-wrap: wrap;
    padding-right: 50px;

    .single-furniture-wrap {
      cursor: pointer;
      margin-right: 3px;
      display: flex;
      .tag-name {
        text-decoration: underline;
      }
      .comma {
        margin-left: -2px;
      }
      &:last-child {
        .comma {
          display: none;
        }
      }
    }
    @include below('mobile') {
      padding-right: 20px;
      > span {
        margin-bottom: 1px;
      }
      > div {
        margin-bottom: 2px;
      }
    }
  }
  .detail-date {
    @include below('mobile') {
      // margin-top: 10px;
    }
  }
}
.block-section-text .details {
  padding-left: 0;
  padding-right: 0;
}
.bullet {
  margin: 0 6px;
}

@include above('tablet') {
  .width_1-3 .details {
    display: flex;
    flex-direction: column;
    .left {
      display: flex;
      // flex-direction: column;
      margin-bottom: 10px;
    }
    .bullet {
      // display: none;
    }
  }
}

@include below('medium') {
  // .section-slug:not(.viewfull) {
  //   .width_1-2 .details {
  //     display: flex;
  //     // flex-direction: column;
  //     .left {
  //       display: flex;
  //       // flex-direction: column;
  //       margin-bottom: 10px;
  //       .single-furniture-wrap:first-child .bullet {
  //         display: none;
  //       }
  //     }
  //   }
  // }
}

.furniture-wrap {
  display: flex;
}
</style>
