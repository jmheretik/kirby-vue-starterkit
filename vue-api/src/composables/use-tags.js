import { computed } from 'vue'

export const useTags = page => computed(() => page.tags.map(({ text }) => text).join(', '))
