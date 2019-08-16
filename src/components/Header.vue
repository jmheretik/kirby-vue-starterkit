<template>
  <header class="header">
    <a class="logo" :href="site.url">{{ site.title }}</a>

    <nav id="menu" class="menu">
      <a v-for="page in site.children" :key="page.id" :href="page.url">
        {{ page.title }}
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['site']
}
</script>

<style>
.header {
  margin-bottom: 1.5rem;
}

.header a {
  position: relative;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  padding: 0.5rem 0;
  font-weight: 700;
}

.header .logo {
  display: block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu a {
  margin: 0 0.75rem;
}

.menu a[aria-current] {
  border-bottom: 2px solid #000;
}

@media screen and (min-width: 40rem) {
  .header .logo {
    margin-bottom: 0;
  }
  .header {
    flex-direction: row;
    justify-content: space-between;
  }
  .menu {
    margin-right: -0.75rem;
  }
}
</style>
