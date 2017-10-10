<template>
  <v-toolbar class="cyan" dark fixed>
    <v-toolbar-title class="mr-4">
      <router-link to="/" class="tab-tracker" tag="span">TabTracker</router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn flat dark :to="'/songs'">
        Browser
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!userIsAuth"
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
        menuItems = []
      }

      return menuItems
    },
    userIsAuth () {
      return this.$store.state.isUserLoggedIn
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
      this.$router.push('/songs')
    }
  }
}
</script>

<style scoped>
.tab-tracker {
  cursor: pointer;
}

.tab-tracker:hover {
  color: #E9E;
}
</style>
