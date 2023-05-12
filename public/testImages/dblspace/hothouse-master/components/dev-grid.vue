<template>
  <div class="dev-grid" v-show="isShown">
    <ul>
      <li v-for="i in 20" :key="`li-${i}`"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Grid',
  data() {
    return { isShown: false }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'g') {
        this.isShown = !this.isShown
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss">
.dev-grid {
  bottom: 0;
  left: 50%;
  max-width: $maxWidthPx;
  padding: 0 $pageMargin;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(-50%);
  width: 100vw;
  z-index: 1000;
  ul {
    display: flex;
    width: 100%;
    height: 100%;
  }
  li {
    flex: 1;
    height: 100%;
    width: grid(1, false);
    background: red;
    opacity: 0.3;
    &:nth-child(2n) {
      background: lightcoral;
    }
  }
  li + li {
    margin-left: 0;
  }
  @for $i from 1 through 20 {
    li:nth-child(#{$i}) {
      @if $i <= $desktopColumns {
        display: block;
      } @else {
        display: none;
      }
    }
  }
  @include above(large) {
    padding: 0 $pageMargin;
    li {
      width: gridL(1, false);
    }
    li + li {
      margin-left: 0;
    }
  }
  @include below(small) {
    padding: 0 $pageMargin;
    li {
      width: gridS(1, false);
    }
    li + li {
      margin-left: 0;
    }
    @for $i from 1 through 20 {
      li:nth-child(#{$i}) {
        @if $i <= $mobileColumns {
          display: block;
        } @else {
          display: none;
        }
      }
    }
  }
}
</style>
