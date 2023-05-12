/* example imgixParams
`
{
    ar:"1:1",
    fit: crop
}
`
*/

const image = (params) => {
  params = params ? params : '{}'
  return ` 
    alt
    title
    url
    height
    width
    colors {
      hex
    }
    focalPoint {
      x
      y
    }
    responsiveImage(imgixParams:${params}) {
      bgColor
      aspectRatio
      height
      sizes
      src
      webpSrcSet
      srcSet
      width
      alt
      base64
      title
    }`
}
export default image