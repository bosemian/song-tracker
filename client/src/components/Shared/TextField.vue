<template>
  <v-text-field
    :label="name"
    :value="dataProp"
    :rules="[required]"
    @input="update">
  </v-text-field>
</template>

<script>
export default {
  props: ['name', 'value'],

  data () {
    return {
      dataProp: '',
      required: (value) => !!value || 'Required.'
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
