<template>
  <v-toolbar class="cyan" dark fixed>
    <v-toolbar-title class="mr-4">
      <router-link to="/" tag="span" exact>TabTracker</router-link>
    </v-toolbar-title>
    <!-- TODO: Implement Me -->
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items> -->
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo('/login')">
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo('/register')">
        Sign Up
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    navigateTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
</style>

