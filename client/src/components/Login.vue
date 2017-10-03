<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <form-auth @login="login" v-model="form"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { Auth } from '@/services'
const Form = () => import('@/components/Auth/Form')

export default {
  components: {
    FormAuth: Form
  },

  data () {
    return {
      form: {
        email: '',
        password: '',
        error: null
      }
    }
  },

  methods: {
    async login () {
      try {
        const { email, password } = this.form
        const res = await Auth.login({ email, password })
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

