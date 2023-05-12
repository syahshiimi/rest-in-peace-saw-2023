export default `
       reference {
      ... on PresentationRecord {
        id
        slug
        title
        position
        categoryName
        categoryNumber
      }
      ... on RepresentationRecord {
        id
        title
        slug
        position
        categoryName
        categoryNumber
      }
    }
`
