const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
const headers = { Authorization: 'Basic ' + auth }
const url = window.location.origin + process.env.BASE_URL + 'api'

export default {
  async get(path) {
    const resp = await fetch(`${url}/${path}`, { headers: headers })
    const json = await resp.json()
    return json.data
  },

  async getPage(pageId) {
    const page = await this.get(`pages/${pageId}?select=content`)
    return page.content
  },

  async getListedChildren(pageId) {
    const children = await this.get(`pages/${pageId}/children?select=id,num,content`)
    return children.filter(child => child.num)
  },

  async getFiles(pageId) {
    return await this.get(`pages/${pageId}/files?select=url,type,link,content`)
  },

  async getKirbyText(pageId, ...fields) {
    const select = fields.map(field => field).join(',')
    return await this.get(`pages/${pageId}/kt?select=${select}`)
  },

  async getFileContent(fileUrl) {
    const file = await this.get(`${fileUrl.substr(1)}?select=content`)
    return file.content
  },

  async getFileThumb(fileUrl, method, params) {
    return await this.get(`${fileUrl.substr(1)}/thumb?method=${method}&params=${JSON.stringify(params)}`)
  }
}
