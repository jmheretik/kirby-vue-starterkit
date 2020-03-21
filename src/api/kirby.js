// HTTP Basic auth headers
const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
const headers = { Authorization: 'Basic ' + auth }

// base url for api requests
const url = window.location.origin + process.env.BASE_URL + 'api'

export default {
  async get(path) {
    const resp = await fetch(`${url}/${path}`, { headers: headers })
    const json = await resp.json()
    return json.data
  },

  async getPage(id) {
    const page = await this.get(`pages/${id}?select=content`)
    return page.content
  },

  async getListedChildren(page) {
    const children = await this.get(`pages/${page}/children?select=id,num,content`)
    return children.filter(child => child.num)
  },

  async getKirbyText(page, ...fields) {
    const select = fields.map(field => field).join(',')
    return await this.get(`pages/${page}/kt?select=${select}`)
  },

  async getFiles(page) {
    return await this.get(`pages/${page}/files?select=url,type,link,content`)
  },

  async getFile(path) {
    return await this.get(`${path}?select=content`)
  },

  async getFileThumb(path, method, ...params) {
    params = params.map(field => field).join(',')
    return await this.get(`${path}/thumb?method=${method}&params=${params}`)
  }
}
