<template>
  <panel title="Lyrics">
    <textarea
      v-if="song.lyrics"
      readonly
      v-model="song.lyrics">
    </textarea>

    <textarea
      v-else
      readonly>
      Not a lyrics
    </textarea>
  </panel>
</template>

<script>

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
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}

</style>
