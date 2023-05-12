import getQuery from './assets/js/utils/datas/getQuery.js'
import slugsQuery from './assets/graphql/slugs.js'

const getRoutes = async () => {
  return getQuery(slugsQuery, {}, 'slugsQuery').then(
    ({ allPresentations, allRepresentations }) => {
      const routes = []
      allPresentations.forEach((slug) => {
        routes.push('/presentations/' + slug)
      })
      allRepresentations.forEach((slug) => {
        routes.push('/representations/' + slug)
      })
      return routes
    }
  )
}

export default {
  target: 'static',
  components: [
    '~/components/',
    { path: '~/components/common/', prefix: 'common' },
    { path: '~/components/fragments/', prefix: 'fragments' },
    { path: '~/components/livestream/', prefix: 'livestream' },
    { path: '~/components/dato/presentation', prefix: 'presentation' },
    { path: '~/components/dato/blocks', prefix: 'blocks' },
    { path: '~/components/dato/search', prefix: 'search' },
    { path: '~/components/dato/index', prefix: 'index' },
    { path: '~/components/dato/broadcast', prefix: 'broadcast' }
  ],
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover'
      },
      {
        rel: 'preconnect',
        href: 'https://your-project-url.matomo.cloud'
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.jsdelivr.net'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vuex-router-sync.js',
    '~plugins/pwa.client.js',
    '~plugins/plugins.client.js',
    '~plugins/swiper.client.js',
    '~plugins/slide.client.js',
    { src: '~/plugins/vue-youtube', mode: 'client', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-191935677-1'
      }
    ]
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxt/components',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
    '@nuxtjs/svg'
  ],
  sitemap: {
    hostname: 'https://h0t.house'
  },
  pwa: {
    workbox: {
      clientsClaim: false,
      cachingExtensions: '@/plugins/workbox-range-request.js'
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      scss: { sourceMap: false }
    },
    /*
     ** You can extend webpack config here
     */
    transpile: ['vue-youtube'],
    extend(config, ctx) {}
  },
  router: {
    trailingSlash: false,
    async scrollBehavior(to) {
      // // if (to.hash) {
      // //   return window.scrollTo({ top: document.querySelector(to.hash).offsetTop + window.innerHeight, behavior: 'smooth' });
      // // }
      const findEl = async (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
        )
      }
      // if (to.hash) {
      //   let el = await findEl(to.hash)
      //   if ('scrollBehavior' in document.documentElement.style) {
      //     return setTimeout(function() {
      //       window.scrollTo({
      //         top: el.getBoundingClientRect().top + window.scrollY - 40,
      //         behavior: 'smooth'
      //       })
      //     }, 1000)
      //   } else {
      //     return window.scrollTo(
      //       0,
      //       el.getBoundingClientRect().top + window.scrollY
      //     )
      //   }
      // }
      // return window.scrollTo({ top: 0 })
      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          })
        } else {
          return window.scrollTo(
            0,
            el.getBoundingClientRect().top + window.scrollY
          )
        }
      }
      return window.scrollTo({ top: 0 })
    }
  },
  generate: {
    concurrency: 1
  },
  styleResources: {
    scss: ['~/assets/scss/includes.scss']
  }
}
