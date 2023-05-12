import image from './fragments/image'
import seo from './fragments/seo'
import sidebar from './fragments/sidebar'
import sections from './fragments/sections'
import color from './fragments/color'

export default `query presentationQuery($slug: String!) {
  presentation(filter: {slug: {eq: $slug}}) {
    title
    slug
    pageBackground {
      ${color}
    }
    oddContentCardBackground {
      ${color}
    }
    evenContentCardBackground {
      ${color}
    }
    sidebarBackground {
      ${color}
    }
    textColor {
      ${color}
    }
    bottomBarColour {
      ${color}
    }
    categoryNumber
    categoryName
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
