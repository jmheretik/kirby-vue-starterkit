// HTTP Basic auth headers
const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
const headers = { Authorization: 'Basic ' + auth }

// base url for api requests
const url = window.location.origin + process.env.BASE_URL + 'api'

const get = async path => {
  const resp = await fetch(`${url}/${path}`, { headers: headers })
  const json = await resp.json()
  return json.data
}

const asyncMap = async (array, callback) => Promise.all(array.map(callback))

export default {
  async getSite() {
    const site = await get('site?select=title')
    const children = await get('site/children?select=id,title,template,status,hasChildren')

    return {
      ...site,
      children: await asyncMap(children, async page => ({
        ...page,
        children: page.hasChildren ? await this.getChildren(page.id) : []
      }))
    }
  },

  async getPage(id) {
    const page = await get(`pages/${id}?select=content`)
    return page.content
  },

  async getChildren(page) {
    return get(`pages/${page}/children?select=id,template,status,content`)
  },

  async getKirbyText(page, ...fields) {
    const select = fields.map(field => field).join(',')
    return get(`pages/${page}/kt?select=${select}`)
  },

  async getFiles(page) {
    return get(`pages/${page}/files?select=url,type,link,content`)
  },

  async getFile(path) {
    return get(`${path}?select=content`)
  },

  async getFileThumb(path, method, ...params) {
    params = params.map(field => field).join(',')
    return get(`${path}/thumb?method=${method}&params=${params}`)
  }
}
