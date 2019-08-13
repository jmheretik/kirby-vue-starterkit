<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script>
import Note from './components/Note.vue'

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
    let self = this

    const api = `${window.location.origin}/api`
    const headers = { Authorization: 'Basic YXBpQGFwaS5jb206YXBpYXBpYXBp' }

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
