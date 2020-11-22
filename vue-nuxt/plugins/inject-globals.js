import { useKirby } from '../composables/use-kirby'

export default async (_, inject) => {
  const site = process.env.isStatic ? process.env.site : await useKirby().getSite()

  inject('site', site)
}
