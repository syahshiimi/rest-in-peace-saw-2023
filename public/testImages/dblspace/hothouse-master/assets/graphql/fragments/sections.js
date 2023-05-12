import image from './image'
import reference from './reference'

export default {
  blockYoutubeRecord: `
        ... on BlockYoutubeRecord {
            __typename
            vimeoUrl
            poster {
              ${image()}
            }
            id
            label
            textContent
            title
            subtitle
            date
            videoUrl
            tag
            links {
              url
              buttonLabel
            }
            ${reference}
        }`,
  blockImageTextRecord: `
        ... on BlockImageTextRecord {
            __typename
            id
            label
            link {
                buttonLabel
                url
            }
          media {
            ... on SingleVideoRecord {
                __typename
                videoUrl
            }
            ... on SingleImageRecord {
                __typename
                image {
                     ${image()}
                }
            }
          }
          mediaCaption
          tag
          title
          date
          textContent
          ${reference}
        }  
    `,
  blockSliderRecord: `
        ... on BlockSliderRecord {
          __typename
          id
          title
          date
          description
          tag
          links {
            url
             buttonLabel
          }
          label
          images {
            slideVideoUrl
            slideImage {
                 ${image()}
            }
            imageFit
          }
          ${reference}
        }
    `,
  internalLinkRecord: `
        ... on InternalLinkRecord {
        id
        __typename
        reference {
          ... on PresentationRecord {
            id
            __typename
            slug
            title
          }
          ... on RepresentationRecord {
            id
            __typename
            slug
            title
          }
        }
        buttonLabel
      }
  `,
  singleLinkRecord: `
      ... on SingleLinkRecord {
        id
        __typename
        url
        buttonLabel
      }`,
  scheduleLinkRecord: `
  ... on ScheduleLinkRecord {
        id
        __typename
        buttonLabel
      }`,
  socialsBlockRecord: `
          ... on SocialsBlockRecord {
          id
          _modelApiKey
                    __typename
          socials {
            title
            url
            width
            image {
              ${image()}
            }
          }
          title
      }
  `,
  creditsBlockRecord: `
        ... on CreditsBlockRecord {
          id
          _modelApiKey
          __typename
          title
          credit {
            image {
              title
              url
            },
            logowidth
          }
        }`,
  broadcastBlockRecord: `
          ... on BroadcastBlockRecord {
          id
          _modelApiKey
          title
          __typename
          buttons {
              ... on ScheduleLinkRecord {
              id
            __typename
            buttonLabel
      }
            ... on SingleLinkRecord {
        id
        __typename
        url
        buttonLabel
      }
              ... on InternalLinkRecord {
        id
        __typename
        reference {
          ... on PresentationRecord {
            id
            __typename
            slug
            title
          }
          ... on RepresentationRecord {
            id
            __typename
            slug
            title
          }
        }
        buttonLabel
      }
          }
          description
          furniture
          image {
            ${image()}
          }
        }`
}
