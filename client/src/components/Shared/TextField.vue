<template>
  <v-text-field
    :label="name"
    :value="dataProp"
    @input="update">
  </v-text-field>
</template>

<script>
export default {
  props: ['name', 'value'],

  data () {
    return {
      dataProp: ''
    }
  },

  methods: {
    update (event) {
      this.dataProp = event
      this.$emit('update', this.name, this.dataProp)
    }
  }
}
</script>
