import image from './fragments/image'
import color from './fragments/color'
import seo from './fragments/seo'
import sidebar from './fragments/sidebar'
import sections from './fragments/sections'

export default `query indexQuery {
  index {
    title
    subtitle
    ${sidebar}
    content {
      width
      hasReference
      reference
      content {
        ${sections.blockYoutubeRecord}
        ${sections.blockImageTextRecord}
        ${sections.blockSliderRecord}
      }
    }   
    ${seo}
  }
}`
