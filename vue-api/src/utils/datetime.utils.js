const dateTimeFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Prague'
}

export const DateTimeUtils = {
  format(date, template) {
    if (!date) return

    const dateParts = new Intl.DateTimeFormat(document.documentElement.lang, dateTimeFormatOptions).formatToParts(new Date(date))

    for (const part of dateParts) {
      template = template.replace(new RegExp(`\\b${part.type}\\b`, 'g'), part.value)
    }

    return template.replace('dayPeriod', '')
  }
}
