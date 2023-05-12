<template>
  <div class="broadcast-block" :style="`background-color: ${color};`">
    <fragments-image v-if="data.image" :image="data.image" />
    <fragments-furniture v-if="data.furniture" :data="data.furniture" />
    <div class="inner-block">
      <fragments-title v-if="data.title" :data="data.title" />
      <fragments-text-content
        v-if="data.description"
        :data="data.description"
      />
      <link-loader
        class="single-link"
        :data="button"
        :key="`component-${key}`"
        ref="components"
        v-for="(button, key) in data.buttons"
        :class="key == data.buttons.length - 1 ? 'last-button' : ''"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'broadcast-block',
  data() {
    return {}
  },
  props: ['data', 'odd', 'even', 'number'],
  computed: {
    oddColor() {
      return this.odd ? this.odd : '#e3e2db'
    },
    evenColor() {
      return this.even ? this.even : '#d0cfc9'
    },
    color() {
      return this.number % 2 == 0 ? this.evenColor : this.oddColor
    }
  },
  methods: {},
  mounted() {
    // console.log(this.data)
  }
}
</script>
<style lang="scss">
.broadcast-block {
  border-radius: $roundRadius;

  .inner-block {
    padding: $pageMargin;
    @include below('mobile') {
      padding: 25px 25px 30px;
    }
  }
  .textcontent-wrap {
    & + .broadcast-menu-link {
      margin-top: 33px;
    }
  }
  &.first-event-block {
    h2 {
      font-size: 30px;
      @include below('mobile') {
        font-size: 22px !important;
        p {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
