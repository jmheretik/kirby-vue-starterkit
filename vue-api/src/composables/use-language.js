let prefix = ''

export const useLanguage = () => {
  const init = languages => {
    if (document.documentElement.lang.startsWith('<?= kirby')) {
      const location = window.location.href

      document.documentElement.lang =
        languages.find(language => location.endsWith(`/${language.code}`) || location.includes(`/${language.code}/`))?.code ??
        languages.find(language => language.isDefault)?.code ??
        'en'
    }

    prefix = languages.find(language => document.documentElement.lang === language.code)?.prefix ?? ''
  }

  return {
    init,
    prefix
  }
}
