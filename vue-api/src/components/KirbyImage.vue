<template>
  <img :src="src" :alt="alt" />
</template>

<script>
import { useKirby } from '../composables/use-kirby'

export default {
  name: 'KirbyImage',
  props: ['file', 'thumb', 'params'],
  setup: async props => {
    const { getFile, getFileThumb } = useKirby()
    const link = props.file.fileLink ?? props.file.link

    return {
      src: !props.thumb ? props.file.url : await getFileThumb(link, props.thumb, props.params),
      alt: props.file.alt ?? (await getFile(link)).alt
    }
  }
}
</script>
