<template>
  <transition name="cookie">
    <div class="cookie" v-if="showCookieBanner">
      <div class="text">
        <p>Bla bla bla</p>
      </div>
      <button @click="initTracking">Accept cookies</button>
    </div>
  </transition>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'vCookie',
  data() {
    return {
      showCookieBanner: false,
      cookieName: 'YOUR-COOKIES-NAME'
    }
  },
  methods: {
    initTracking() {
      this.showCookieBanner = false
      Cookies.set(this.cookieName, 'ok', {
        expires: 31
      })
      const trakingScript = document.createElement('script')
      trakingScript.innerHTML = `
        var _paq = window._paq || []
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView'])
        _paq.push(['enableLinkTracking'])
        ;(function() {
          var u = 'https://PROJECTID.matomo.cloud/'
          _paq.push(['setTrackerUrl', u + 'matomo.php'])
          _paq.push(['setSiteId', '1'])
          var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0]
          g.type = 'text/javascript'
          g.async = true
          g.defer = true
          g.src = '//cdn.matomo.cloud/techleap.matomo.cloud/matomo.js'
          s.parentNode.insertBefore(g, s)
        })()
      `
      document.body.appendChild(trakingScript)
    }
  },
  mounted() {
    if (Cookies.get(this.cookieName) != 'ok') {
      this.showCookieBanner = true
    } else {
      this.initTracking()
    }
  }
}
</script>

<style lang="scss" scoed>
.cookie {
  align-items: flex-start;
  background: $black;
  bottom: 0;
  color: $white;
  padding: 10px;
  position: fixed;
  right: 0;
  z-index: 9;
  button {
    display: block;
  }
}
.cookie-enter-active,
.cookie-leave-active {
  transition: transform 0.5s;
}
.cookie-enter,
.cookie-leave-to {
  transform: translateY(100%);
}
</style>
