<template>
  <div class="menu-overlay with-blob-nav">
    <div class="inner">
      <n-link
        :to="{ name: 'about' }"
        class="nav-link"
        @click.native="close_menus"
      >
        <div class="inner">
          <div class="blob-about hhblob">
            <span v-text="`About Hothouse`" />
          </div>
        </div>
      </n-link>
      <span class="menu-category-title" v-text="`Presentations`" />
      <n-link
        class="nav-link"
        v-for="(presentation, key) in allPresentations"
        :key="presentation.slug"
        :to="{
          name: 'presentations-slug',
          params: { slug: presentation.slug }
        }"
        @click.native="close_menus"
      >
        <fragments-blob-bar :data="presentation" :number="key" />
      </n-link>
      <span class="menu-category-title" v-text="`Re-presentation`" />
      <n-link
        class="nav-link"
        v-for="(representation, key) in allRepresentations"
        :key="representation.slug"
        :to="{
          name: 'representations-slug',
          params: { slug: representation.slug }
        }"
        @click.native="close_menus"
      >
        <fragments-blob-bar :data="representation" :number="key" />
      </n-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['allRepresentations', 'allPresentations'])
  },
  methods: {
    ...mapActions(['setNavOpen', 'setSearchOpen']),
    close_menus() {
      this.setNavOpen(false)
      this.setSearchOpen(false)
    }
  }
}
</script>

<style lang="scss">
.with-blob-nav {
  transform-origin: top right;
  border-radius: $roundRadius;
  background-color: $black;

  &.menu-overlay {
    opacity: 0;
    pointer-events: none;
    transition: 0.3s opacity ease-in-out, 0.3s transform ease-in-out;
    transform: scale(0);
    position: fixed;
    right: $pageMargin;
    z-index: 5;
    top: calc(#{$pageMargin} * 4);
    max-width: 100vw;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
    > .inner {
      max-height: calc(
        100vh - #{$pageMargin} - #{$pageMargin} - #{$blobHeightMob} - #{$pageMargin}
      );
      @include below('tablet-small') {
        max-height: calc(
          100vh - #{$pageMarginMob} - #{$pageMarginMob} - #{$blobHeightMob} - #{$pageMarginMob}
        );
      }
    }
    @include below('tablet') {
      width: calc(100% - #{$pageMargin} - #{$pageMargin});
    }
    @include below('tablet-small') {
      top: $pageMarginMob + $blobHeightMob + $pageMarginMob;
      right: $pageMarginMob;
      width: calc(100% - #{$pageMarginMob} - #{$pageMarginMob});
      max-width: calc(100vw - #{$pageMarginMob} - #{$pageMarginMob});
    }
    @include below('mobile') {
      right: auto;
      left: $pageMarginMob;
    }
  }

  overflow: auto;
  > .inner {
    display: flex;
    flex-direction: column;
    min-width: 800px;
    position: relative;
    width: 100%;
    height: 100%;

    color: $white;
    padding: 35px;

    @include below('tablet') {
      min-width: auto;
    }
    @include below('mobile') {
      padding: 25px;
    }
  }
  .menu-category-title {
    margin-bottom: 17px;
    font-size: $pageMargin;
    @include below('small') {
      font-size: 26px;
    }
    @include below('tablet') {
      // font-size: 20px;
    }
    @include below('mobile') {
      font-size: 18px !important;
    }
  }

  .nav-link {
    transition: 0.2s ease-in-out filter;
    &.nuxt-link-exact-active {
      pointer-events: none;
      > .inner {
        .hhblob,
        .circle-blob {
          background-color: $white;
          pointer-events: none;
        }
        .spacer-blob svg path {
          fill: white !important;
        }
      }
    }

    &:hover {
      filter: invert(1);
    }
    &:not(:last-child) {
      margin-bottom: $pageMargin;
      @include below('mobile') {
        margin-bottom: $pageMarginMob + 5px;
      }
    }
    &:last-child {
      padding-bottom: $pageMargin;
      @include below('mobile') {
        padding-bottom: $pageMarginMob;
      }
    }
    > .inner {
      display: flex;
      .hhblob,
      .circle-blob {
        background-color: $grey;
        color: $black;
      }

      .blob-name,
      .blob-about {
        flex-grow: 1;
      }
    }
    .hhblob span {
      position: relative;
      top: auto;
      left: auto;
      transform: none;
      // font-size: 14px;
    }
    .blob-category {
      min-width: 35%;
      @include below('mobile') {
        padding: 0;
        min-width: 100px;
      }
    }
    .blob-name {
      @include below('mobile') {
        padding: 0;
        // min-width: 40%;
        span {
          width: 90%;
          line-height: 1;
        }
      }
    }
  }

  @include below('mobile') {
    .circle-blob {
      display: none;
    }
  }
}
</style>
