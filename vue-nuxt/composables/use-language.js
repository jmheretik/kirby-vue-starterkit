let prefix = ''

export const useLanguage = () => {
  const init = (languages) => {
    if (process.client) {
      const location = window.location.href
      const language =
        languages.find((language) => location.endsWith(`/${language.code}`) || location.includes(`/${language.code}/`)) ||
        languages.find((language) => language.isDefault)

      document.documentElement.lang = language != null ? language.code : 'en'
      prefix = language != null ? language.code : ''
    }
  }

  return {
    init,
    prefix,
  }
}
