import image from './fragments/image'
import seo from './fragments/seo'
import sidebar from './fragments/sidebar'
import sections from './fragments/sections'
import color from './fragments/color'

export default `query aboutQuery {
  about {
    title
    slug
    ${sidebar}
    content {
      width
      content {
        ${sections.blockYoutubeRecord}
        ${sections.blockImageTextRecord}
        ${sections.blockSliderRecord}
      }
    }
    ${seo}
  }
}`
