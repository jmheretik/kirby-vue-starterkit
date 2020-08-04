import KirbyApi from './kirby-api'

const apiUrl =
  process.env.NODE_ENV !== 'development' ? process.env.NUXT_ENV_KIRBY_URL : window.location.origin + process.env.NUXT_ENV_BASE_URL.slice(0, -1)

export default async ({ app }, inject) => {
  const api = KirbyApi.init(apiUrl)
  const site = process.env.site ?? (await api.getSite())

  inject('api', api)
  inject('site', site)
}
