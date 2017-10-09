<template>
  <v-app id="app">
    <v-app>
      <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </v-app>
</template>

<script>
export default {
  name: 'app',

  created () {
    if (localStorage.getItem('token')) {
      this.$store.state.token = localStorage.getItem('token')
      this.$store.state.user.id = localStorage.getItem('id')
      this.$store.state.token.email = localStorage.getItem('email')
      this.$store.state.token.isUserLoggedIn = true
    }
  },

  components: {
    PageHeader: () => import('@/components/Header')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
