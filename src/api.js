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
}
