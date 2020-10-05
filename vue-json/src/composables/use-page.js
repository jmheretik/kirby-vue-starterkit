import { onActivated } from 'vue'
import { useRoot } from './use-root'
import { useKirby } from './use-kirby'

export const usePage = async () => {
  const { $site, $router } = useRoot()
  const { getPage } = useKirby()
  let page

  onActivated(() => (document.title = `${$site.title} | ${page.title}`))

  try {
    page = await getPage($router.currentRoute.value.path)
  } catch {
    page = await getPage('error')
  }

  return page
}
