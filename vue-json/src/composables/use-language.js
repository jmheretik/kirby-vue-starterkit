let prefix = ''

export const useLanguage = () => {
  const init = languages => {
    if (document.documentElement.lang.startsWith('<?= kirby')) {
      document.documentElement.lang =
        languages?.find(language => window.location.href.includes('/' + language.code))?.code ??
        languages?.find(language => language.isDefault)?.code ??
        'en'
    }

    prefix = languages?.find(language => document.documentElement.lang === language.code)?.prefix ?? ''
  }

  return {
    init,
    prefix
  }
}
