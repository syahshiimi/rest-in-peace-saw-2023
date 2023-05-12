import color from './fragments/color'
import image from './fragments/image'
import sections from './fragments/sections'

export default `query livestreamQuery {
  livestream {
    vimeoUrl
    poster {
      ${image()}
    }
    fallbackimg {
      ${image()}
    }
    broadcastState
    broadcast {
      to
      title
      number
      from
      color {
        ${color}
      }
             evenBlockColor {
        ${color}
      }
    oddBlockColor {
        ${color}
      }
      content {
        ${sections.broadcastBlockRecord}
        ${sections.creditsBlockRecord}
        ${sections.socialsBlockRecord}
      }
            events {
        title
        date
        tags
        color {
         ${color}
        }
               evenBlockColor {
        ${color}
      }
    oddBlockColor {
        ${color}
      }
        header {
          title
          image {
            ${image()}
          }
          furniture
          description
          buttons {
            ${sections.scheduleLinkRecord}
            ${sections.singleLinkRecord}
            ${sections.internalLinkRecord}
          }
        }
        schedule {
          buttons {
            ${sections.singleLinkRecord}
            ${sections.internalLinkRecord}
          }
          to
          title
          preEventImageCover {
      ${image()}
    }
          postEventImageCover {
      ${image()}
    }
          livestreamLink
          image {
      ${image()}
    }
          furniture
          from
          showMoreContent
          description
        }
      }
    }
  }
  broadcast {
          to
      title
      number
      from
      color {
        ${color}
      }
          evenBlockColor {
        ${color}
      }
    oddBlockColor {
        ${color}
      }
      content {
        ${sections.broadcastBlockRecord}
        ${sections.creditsBlockRecord}
        ${sections.socialsBlockRecord}
      }
            events {
              date
        title
        tags
        color {
         ${color}
        }
               evenBlockColor {
        ${color}
      }
    oddBlockColor {
        ${color}
      }
        header {
          title
          image {
            ${image()}
          }
          furniture
          description
          buttons {
            ${sections.scheduleLinkRecord}
            ${sections.singleLinkRecord}
            ${sections.internalLinkRecord}
          }
        }
        schedule {
          buttons {
            ${sections.singleLinkRecord}
            ${sections.internalLinkRecord}
          }
          to
          title
          preEventImageCover {
      ${image()}
    }
          postEventImageCover {
      ${image()}
    }
          livestreamLink
          image {
      ${image()}
    }
          furniture
          from
          showMoreContent
          description
        }
      }

  }
}`
