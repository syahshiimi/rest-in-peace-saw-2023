export default ({ store }, inject) => {
  const isInWebAppiOS = window.navigator.standalone == true
  const isInWebAppChrome = window.matchMedia('(display-mode: standalone)')
    .matches
  const isStandAlone = window.location.search.indexOf('standalone') !== -1

  const standalone = isInWebAppiOS || isInWebAppChrome || isStandAlone

  if ('serviceWorker' in navigator && standalone) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
    })
  }
}
