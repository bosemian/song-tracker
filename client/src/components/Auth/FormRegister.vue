<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form-auth @register="register" v-model="form"/>
      </panel>
    </v-flex>
  </v-layout>
</template>


<script>
import { Auth } from '@/services'
const Form = () => import('@/components/Auth/Form')

export default {
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem('vuex')) {
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
        password: '',
        error: null
      }
    }
  },

  methods: {
    async register () {
      try {
        const { email, password } = this.form
        const res = await Auth.register({ email, password })
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
        this.$router.push('/songs')
      } catch (err) {
        this.error = err.response.data.error
      }
      this.email = ''
      this.password = ''
    }
  }
}
</script>
