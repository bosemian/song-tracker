<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-tool-title>Register</v-tool-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <input type="text" name="email" v-model="email" placeholder="email" />
          <br>
          <input type="password" name="password" v-model="password" placeholder="password" />
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn
            class="cyan"
            @click="register">
            Register
          </v-btn>
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
        await Auth.register({
          email: this.email,
          password: this.password
        })
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

