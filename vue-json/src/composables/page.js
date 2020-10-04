import { ref, watchEffect } from 'vue'
import getRoot from './root'

export default async () => {
  const { $router, $api, $site } = getRoot()
  const page = ref(null)

  try {
    page.value = await $api.getPage($router.currentRoute.value.path)
  } catch {
    page.value = await $api.getPage('error')
  }

  watchEffect(() => (document.title = `${$site.title} | ${page.value.title}`))

  return page
}
