<template>
  <div class="tag hhblob">
    <label :for="tag" class="container-checkbox">
      <input v-model="toggle" type="checkbox" />
      <span v-text="tag" />
      <!-- <img src="~static/images/close.svg" alt="close-icon" /> -->
    </label>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'v-tag',
  props: ['tag'],
  data() {
    return {
      toggle: false
    }
  },
  watch: {
    toggle(val) {
      this.$emit('input', { filter: this.tag, val })
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss">
.disabled {
  .tag {
    pointer-events: none;
    background-color: $grey;
  }
}
.tag {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0;
  .container-checkbox {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0 20px;
    @include below('mobile') {
      padding: 0 13px;
    }
  }
  .container-checkbox input {
    position: absolute;
    opacity: 0;
    display: block;
    cursor: pointer;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
}
</style>
