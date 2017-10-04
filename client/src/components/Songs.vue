<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
const Panel = () => import('@/components/Panel')

export default {
  components: {
    Panel
  }
}
</script>
