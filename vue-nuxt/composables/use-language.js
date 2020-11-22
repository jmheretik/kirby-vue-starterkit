let prefix = ''

export const useLanguage = () => {
  const init = (languages) => {
    const location = process.env.isStatic ? '/' + process.env.language : window.location.href
    const language =
      languages.find((language) => location.endsWith(`/${language.code}`) || location.includes(`/${language.code}/`)) ||
      languages.find((language) => language.isDefault)

    document.documentElement.lang = language != null ? language.code : 'en'
    prefix = language != null ? language.code : ''
  }

  return {
    init,
    prefix,
  }
}
