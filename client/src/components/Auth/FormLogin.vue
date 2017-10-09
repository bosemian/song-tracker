<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <form-auth @login="login" v-model="form"/>
        <app-alert v-if="error" :text="error" @dismissed="onDismissed" />
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Auth } from '@/services'
const Form = () => import('@/components/Auth/Form')

export default {
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem('token')) {
      next(to.query.redirect || '/')
      return
    }
    next()
  },

  components: {
    FormAuth: Form
  },

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },

  methods: {
    async login () {
      try {
        const { email, password } = this.form
        const res = await Auth.login({ email, password })
        this.$store.dispatch('setToken', res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.user.id)
        localStorage.setItem('email', res.data.user.email)
        this.$store.dispatch('setUser', res.data.user)
        this.$router.replace(this.$route.query.redirect || '/')
      } catch (err) {
        this.error = err.response.data.error
      }
    },

    onDismissed () {
      this.error = null
    }
  }
}
</script>
