import axios from 'axios'
import _flattenDeep from 'lodash/flattenDeep'

let apiUrl

const getSite = async () => {
  const resp = await axios.get(`${apiUrl}/home.json`)
  const site = resp.data.site

  site.routes = _flattenDeep(site.children.map(page => [page.id, page.children.map(child => child.id)]))

  return site
}

const getPage = async id => {
  const resp = await axios.get(`${apiUrl}/${id}.json`)

  return resp.data
}

const getFile = async url => {
  const resp = await axios.get(url, { responseType: 'stream' })

  return resp.data
}

export default {
  init: url => {
    apiUrl = url

    return {
      getSite,
      getPage,
      getFile
    }
  }
}
