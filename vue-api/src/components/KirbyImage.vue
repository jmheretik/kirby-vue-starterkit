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

    const [src, alt] = await Promise.all([
      !props.thumb ? props.file.url : getFileThumb(link, props.thumb, props.params),
      props.file.alt ?? getFile(link).then(file => file.alt)
    ])

    return { src, alt }
  }
}
</script>
