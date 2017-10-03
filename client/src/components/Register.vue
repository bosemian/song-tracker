<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="tab-tracker-form" autocomplete="">
            <v-text-field
              label="Email"
              v-model="email">
            </v-text-field>
            <v-text-field
                label="Password"
                type="password"
                v-model="password">
            </v-text-field>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
              dark
              class="cyan"
              @click="register">
              Register
            </v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { Auth } from '@/services'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async register () {
      try {
        const res = await Auth.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
      } catch (err) {
        this.error = err.response.data.error
      }
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

