import getData from '~/assets/js/utils/datas/getData'
import getQuery from '~/assets/js/utils/datas/getQuery'
import storeJson from '~/assets/js/utils/datas/storeJson'
const getAsyncData = async (context, query, name = '', variables = {}) => {
  const dataName = name !== '' ? name : context.route.name
  if (process.server && process.env.NODE_ENV === 'production') {
    const data = await getQuery(query, variables, dataName)
    if (!data) return
    await storeJson(dataName, data)
    return data
  }
  if (process.env.NODE_ENV !== 'production') {
    return getQuery(query, variables, dataName)
  } else {
    return getData(dataName)
  }
}
export default getAsyncData
