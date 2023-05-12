import image from './image'

export default `    
    sidebar {
      ... on TextRecord {
        __typename
        title
        image {
          ${image()}
        }
        description
        reference
        hasReference
        image {
          ${image()}
        }
        links {
          image {
             ${image()}
          }
          buttonLabel
          url
          reference {
            ... on RepresentationRecord {
              id
              title
              slug
            }
            ... on AboutRecord {
              id
              title
              slug
            }
            ... on PresentationRecord {
              id
              title
              slug
            }
          }
        }
      }
      ... on ImageRecord {
        __typename
        image {
           ${image()}
        }
        reference
        hasReference 
      }
    }`
