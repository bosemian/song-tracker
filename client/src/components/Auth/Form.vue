<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <form @submit.prevent="submit">
      <v-text-field
        type="email"
        label="E-mail"
        v-model="email"
        required
      ></v-text-field>
        <v-text-field
        type="password"
        label="Password"
        v-model="password"
        required
      ></v-text-field>
      <v-btn dark class="cyan" type="submit">
        {{ formName }}
      </v-btn>
    </form>
  </div>
</template>

<script>
export default {
  props: ['value'],

  created () {
    this.reload()
    this.checkCurrentPath()
  },

  watch: {
    form: 'reload',
    formName: 'checkCurrentPath'
  },

  data: () => ({
    formName: '',
    email: '',
    password: '',
    error: null
  }),

  methods: {
    reload () {
      if (this.form) {
        this.email = this.value.email
        this.password = this.value.password
        this.error = this.value.error
      }
    },
    submit () {
      this.$emit('input', {
        email: this.email,
        password: this.password,
        error: this.error
      })
      this.$emit(this.formName)
    },
    checkCurrentPath () {
      this.formName = this.$route.name
    }
  }
}
</script>
