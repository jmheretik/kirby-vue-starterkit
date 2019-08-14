<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script>
import Note from './components/Note.vue'

const env = variable => process.env['VUE_APP_' + variable] || ''

export default {
  name: 'app',
  components: {
    Note
  },
  data() {
    return {
      notes: []
    }
  },
  created() {
    const api = window.location.origin + env('BACKEND_PUBLIC_PATH') + '/api'
    const auth = btoa(env('API_EMAIL') + ':' + env('API_PASSWORD'))
    const headers = { Authorization: 'Basic ' + auth }

    let self = this

    fetch(`${api}/pages/notes/children`, { headers: headers })
      .then(response => response.json())
      .then(result => {
        self.notes = result.data
      })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
