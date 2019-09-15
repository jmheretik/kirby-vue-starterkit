import mmnt from 'moment'

export const tags = {
  computed: {
    tags() {
      return this.page.tags.map(tag => tag.text).join(', ')
    }
  }
}

export const moment = {
  filters: {
    moment(date, format) {
      return date ? mmnt(date).format(format) : ''
    }
  }
}
