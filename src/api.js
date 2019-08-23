export default class Api {
  constructor() {
    const env = variable => process.env['VUE_APP_' + variable] || ''
    const auth = btoa(env('API_EMAIL') + ':' + env('API_PASSWORD'))

    this.headers = { Authorization: 'Basic ' + auth }
    this.url = window.location.origin + env('BACKEND_PUBLIC_PATH') + '/api'
  }

  async get(path) {
    const resp = await fetch(`${this.url}/${path}`, { headers: this.headers })
    const json = await resp.json()
    return json.data
  }

  async getPage(pageId) {
    const page = await this.get(`pages/${pageId}?select=content`)
    return page.content
  }

  async getListedChildren(pageId) {
    const children = await this.get(`pages/${pageId}/children?select=id,num,content`)
    return children.filter(child => child.num)
  }

  async getFiles(pageId) {
    return await this.get(`pages/${pageId}/files?select=url,type,link,content`)
  }

  async getFileContent(link) {
    const file = await this.get(`${link.substr(1)}?select=content`)
    return file.content
  }

  async getFileProcessed(link, method, w, h) {
    const url = link.replace('pages/', '').replace('files/', '')
    return await this.get(`process/${method}/${url.substr(1)}?w=${w}&h=${h}`)
  }

  async getKirbyText(pageId, ...fields) {
    const select = fields.map(field => field).join(',')
    return await this.get(`kt/${pageId}?select=${select}`)
  }
}
