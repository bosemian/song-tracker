<template>
  <panel title="Lyrics">
    <textarea
      v-if="song.tabs"
      readonly
      v-model="song.tabs">
    </textarea>

    <textarea
      v-else
      readonly>
      Not a tabs
    </textarea>
  </panel>
</template>

<script>
const Panel = () => import('@/components/Shared/Panel')

export default {
  props: {
    song: {
      type: Object,
      required: true,
      validate: function (value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  },

  components: {
    Panel
  }
}
</script>
