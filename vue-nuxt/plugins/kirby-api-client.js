import KirbyApi from './kirby-api'

const apiUrl =
  process.env.NODE_ENV !== 'development' ? process.env.NUXT_ENV_KIRBY_URL : window.location.origin + process.env.NUXT_ENV_BASE_URL.slice(0, -1)

const api = KirbyApi.init(apiUrl)

export default async ({ app }, inject) => {
  inject('api', api)
  inject('site', await api.getSite())
}
