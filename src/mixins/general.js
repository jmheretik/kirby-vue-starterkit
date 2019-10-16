import DayJs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'

DayJs.extend(customParseFormat)
DayJs.extend(localizedFormat)

export const tags = {
  computed: {
    tags() {
      return this.page.tags.map(tag => tag.text).join(', ')
    }
  }
}

export const dayjs = {
  filters: {
    dayjs(date, format) {
      return date ? DayJs(date).format(format) : ''
    }
  }
}
