<template>
  <v-toolbar class="cyan" dark fixed>
    <v-toolbar-title class="mr-4">
      <router-link to="/" tag="span" exact>TabTracker</router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat dark :to="'/songs'">
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        flat dark
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        {{ item.title }}
      </v-btn>

      <v-btn
        v-if="userIsAuth"
        flat dark @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  computed: {
    menuItems () {
      let menuItems = [
        {title: 'Log In', link: '/login'},
        {title: 'Sign Up', link: '/register'}
      ]
      if (this.userIsAuth) {
        menuItems = [
          {title: 'Log Out', link: '/logout'}
        ]
      }

      return menuItems
    },
    userIsAuth () {
      return this.$store.getters.getCurrentUser.isUserLoggedIn
    }

  },

  methods: {
    navigateTo (path) {
      this.$router.push(path)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // TODO Redirect to homepage
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>

