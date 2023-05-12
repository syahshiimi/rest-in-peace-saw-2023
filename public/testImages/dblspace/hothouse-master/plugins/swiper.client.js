// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// // import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'

// Vue.use(VueAwesomeSwiper /* { default options with global component } */)

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Swiper, EffectFade } from 'swiper'
Swiper.use([EffectFade])
Vue.use(VueAwesomeSwiper)
