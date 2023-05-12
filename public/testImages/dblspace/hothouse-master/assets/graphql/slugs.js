import sections from './fragments/sections'
import sidebar from './fragments/sidebar'
import color from './fragments/color'

export default `query slugsQuery {
    allPresentations(first: 100){
      slug
      title
          bottomBarColour {
      ${color}
    }
      pageBackground {
      ${color}
      }
      position
      categoryNumber
      categoryName
      ${sidebar}
      content {
      width
      hasReference
      content {
        ${sections.blockYoutubeRecord}
        ${sections.blockImageTextRecord}
        ${sections.blockSliderRecord}
      }
    }
    }
    allRepresentations(first: 100){
      slug
      title
      categoryNumber
      position
      categoryName
          bottomBarColour {
      ${color}
    }
      pageBackground {
      ${color}
      }
      ${sidebar}
      content {
        width
        hasReference
        content {
          ${sections.blockYoutubeRecord}
          ${sections.blockImageTextRecord}
          ${sections.blockSliderRecord}
        }
      }
    }
  }`
