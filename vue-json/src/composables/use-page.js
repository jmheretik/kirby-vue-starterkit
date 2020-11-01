import { onActivated } from 'vue'
import { useRoot } from './use-root'
import { useKirby } from './use-kirby'

export const usePage = async () => {
  const { $site, $route } = useRoot()
  const { getPage } = useKirby()

  onActivated(() => (document.title = `${$site.title} | ${page.title}`))

  const page = await getPage($route.path).catch(() => getPage('error'))

  return page
}
