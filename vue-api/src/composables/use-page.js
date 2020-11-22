import { onActivated } from 'vue'
import { useRoot } from './use-root'
import { useKirby } from './use-kirby'

export const usePage = async () => {
  const { $route, $site } = useRoot()
  const { getPage, getKirbyTextForPath } = useKirby()

  onActivated(() => (document.title = `${$site.title} | ${page.title}`))

  const page = await getPage($route.path).catch(async () =>
    Object.assign({}, ...(await Promise.all([getPage('error'), getKirbyTextForPath('error', 'text')])))
  )

  return page
}
