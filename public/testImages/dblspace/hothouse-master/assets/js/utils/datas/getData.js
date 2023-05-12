import { get } from 'axios'
let cache = new Map()
const getData = async (name) => {
  return new Promise((resolve) => {
    const url = `/api/${name}/index.json`
    let res = cache.get(url)
      ? cache.get(url)
      : get(url)
          .then((json) => {
            cache.set(url, json.data)
            return json.data
          })
          .catch((e) => ({
            Error: e
          }))
    resolve(res)
  })
}

export default getData
