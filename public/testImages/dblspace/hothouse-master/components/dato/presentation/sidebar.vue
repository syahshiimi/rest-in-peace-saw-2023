<template>
  <div class="sidebar">
    <div class="sidebar-scroller" :style="`background-color: ${background};`">
      <div class="inner sidebar-inner">
        <side-loader
          :data="content"
          :key="`sides-${key}`"
          :number="key"
          ref="components"
          v-for="(content, key) in sidebarIntro"
          :odd="odd"
          :even="even"
        />
        <div v-if="$route.name === `index`">
          <div class="notes-header">
            <h3>Research Topics</h3>
          </div>
          <side-loader
            :data="content"
            :key="`sidebar-${key}`"
            :number="key"
            ref="components"
            v-for="(content, key) in sidebarNotes"
            :odd="odd"
            :even="even"
          />
          <common-all-tags :data="sortbyFrequency.slice(0, 30)" />
          <div class="notes-header">
            <h3>Socials</h3>
          </div>
          <side-loader
            :data="content"
            :key="`side-${key}`"
            :number="key"
            ref="components"
            v-for="(content, key) in sidebarSocial"
            :odd="odd"
            :even="even"
          />
        </div>
        <div class="wrap-notes" v-if="showNotes">
          <div class="notes-header">
            <h3>Notes</h3>
          </div>
          <common-all-tags
            :odd="odd"
            :even="even"
            :data="tags"
            v-if="$route.name === 'presentations-slug'"
          />
          <side-loader
            :data="content"
            :number="key"
            :key="`component-${key}`"
            ref="components"
            v-for="(content, key) in sidebarNotes"
            :odd="odd"
            :even="even"
            :class="[
              content.hasReference
                ? 'has-reference reference-' + content.reference + ''
                : 'no-reference'
            ]"
            :refidx="[content.hasReference ? content.reference : null]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import gsap from 'gsap'
export default {
  name: 'sidebar',
  data() {
    return {}
  },
  props: ['sidebar', 'top', 'contenttype', 'color', 'odd', 'even', 'tags'],
  components: {},
  computed: {
    ...mapState(['isSidebarOpen']),
    ...mapGetters(['sortbyFrequency']),
    background() {
      return this.color ? this.color : '#aaa7a2'
    },
    sidebarIntro() {
      if (this.$route.name === 'presentations-slug') {
        return this.sidebar.slice(0, 1)
      } else if (this.$route.name === 'representations-slug') {
        return this.sidebar.slice(0, 2)
      } else if (this.$route.name === 'index') {
        return this.sidebar.slice(0, 2)
      } else {
        return this.sidebar
      }
    },
    sidebarNotes() {
      if (this.$route.name === 'presentations-slug') {
        return this.sidebar.slice(1)
      } else if (this.$route.name === 'representations-slug') {
        return this.sidebar.slice(1).slice(1)
      } else if (this.$route.name === 'index') {
        return this.sidebar.slice(2, 3)
      } else {
        return ''
      }
    },
    sidebarSocial() {
      return this.$route.name === 'index' ? this.sidebar.slice(3, 4) : ''
    },
    showNotes() {
      // check if notes needs to show
      if (this.contenttype == 'presentation') {
        if (this.sidebar.length >= 2) {
          return true
        } else {
          return false
        }
      } else if (this.contenttype == 'representation') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    isSidebarOpen(val) {
      if (this.isSidebarOpen) {
        // hide main content
        gsap.to('.single-block .inner', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        })
        gsap.to('.to_squeeze', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut',
          onComplete: function() {
            // after content is hidden
            // squeeze  main content
            gsap.to('.section-template .panel-content', {
              // scaleX: 0.4,
              width: '40%',
              duration: 0.6,
              ease: 'power3.inOut'
            })
            // and pull out side bar
            gsap.to('.sidebar', {
              x: 0,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: function() {
                gsap.to('.close-sidebar-wrap', {
                  opacity: 1,
                  duration: 0.2,
                  ease: 'power1.inOut'
                })
              }
            })
          }
        })
      } else {
        //////// close sidebar
        // first hide the 'Hide' button
        gsap.to('.close-sidebar-wrap', {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.inOut',
          onComplete: function() {
            // after 'hide' button is hidden
            // close drawer
            gsap.to('.sidebar', {
              x: document.querySelector('.sidebar').offsetWidth - 30,
              duration: 0.6,
              ease: 'power3.inOut'
            })
            // and exapnd panelcontent width
            gsap.to('.section-template .panel-content', {
              width:
                document.querySelector('.section-template > .inner')
                  .offsetWidth - 15,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: function() {
                gsap.to('.single-block .inner', {
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power1.inOut'
                })
                gsap.to('.to_squeeze', {
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power1.inOut'
                })
              }
            })
          }
        })
      }
    }
  },
  methods: {
    ...mapActions(['setSidebarOpen'])
  },
  mounted() {}
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  // top: calc(#{$pageMargin} + #{$blobHeight} + #{$pageMargin});
  top: 0;
  right: $pageMargin;
  // width: grid(3, false);
  width: calc(0.25 * (100vw - #{$pageMargin} - #{$pageMargin}));
  // height: calc(100vh - #{$pageMargin} - #{$blobHeight} - #{$pageMargin});
  height: 100%;
  overflow: auto;
  // border-radius: $roundRadius;
  border-bottom-right-radius: $roundRadius;
  border-bottom-left-radius: $roundRadius;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @include above(large) {
    width: gridL(3, false);
  }
}
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar-scroller {
  margin-top: calc(#{$pageMargin} + #{$blobHeight} + #{$pageMargin});
  // background-color: $sidebar;
  padding: $pageMargin;
  border-radius: $roundRadius;
  @include below('tablet') {
    padding: 15px;
  }
}
.sidebar-index {
  right: auto;
  left: $pageMargin;

  .sidebar-scroller {
    min-height: calc(
      100vh - #{$pageMargin} - #{$blobHeight} - #{$pageMargin} - #{$pageMargin}
    );
    // padding: 0;
  }

  .sidebar-inner {
    // min-height: calc(
    //   100vh - #{$pageMargin} - #{$blobHeight} - #{$pageMargin} - #{$pageMargin}
    // );
    display: flex;
    flex-direction: column;
    .single-sidebar-block:first-child {
      // flex-grow: 1;

      .block-button {
        margin-top: 30px;
      }
    }
    .single-sidebar-block:last-child {
      // flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding-top: 0px;
      padding-bottom: 0px;

      .side-description {
        order: 2;
        // margin-top: 20px;
      }

      > div:last-child {
        img {
          width: 12px;
          // margin-left: 5px;
        }
      }
    }
    @include below('mobile') {
      .block-button {
        margin-bottom: 0;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
}

.section-slug-representation .sidebar {
  right: auto;
  left: $pageMargin;
}
.notes-header {
  display: block;
  padding: $pageMargin;
  text-align: center;
}

.has-reference {
  transition: 0.2s background-color ease-in-out;
  &.active {
    background-color: $lightgrey !important;
  }
}
.wrap-notes p {
}

.sidebar-clickarea-mobile {
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  // background-color: red;
  display: none;
  z-index: 3;
}

@include below('tablet-small') {
  .sidebar,
  .section-slug-representation .sidebar {
    right: 0;
    left: auto;
    z-index: 3;
    width: 250px;
    max-width: 60%;
    transform: translateX(100%) translateX(#{- $pageMargin});
    // height: calc(
    //   100vh - #{$pageMarginMob} - #{$blobHeightMob} - #{$pageMarginMob}
    // );
    // top: calc(#{$pageMarginMob} + #{$blobHeightMob} + #{$pageMarginMob});
  }

  .sidebar-scroller {
    // top: calc(#{$pageMarginMob} + #{$blobHeightMob} + #{$pageMarginMob});
    margin-top: calc(#{$pageMarginMob} + #{$blobHeightMob} + #{$pageMarginMob});
    padding-bottom: 70px;
  }

  .sidebar-clickarea-mobile {
    display: block;
  }

  .sidebar {
    // transition: 0.6s transform ease-in-out;
  }

  .sidebar-open .sidebar {
    // transform: translateX(0);
  }

  .close-sidebar-wrap {
    display: flex;
    font-weight: bold;

    // transform: rotate(-90deg) translateX(-50%) translateY(-0%);
    // padding: 10px;
    width: 250px;
    max-width: 60%;

    > .inner {
      transform-origin: top left;
      display: flex;
      transform: rotate(-90deg) translateX(-50%) translateY(calc(-100% - 10px));
      svg {
        width: 18px;
        margin-left: 5px;
        height: 17px;
      }
    }
  }
  .sidebar-open .close-sidebar-wrap {
    pointer-events: auto;
  }
}
</style>
