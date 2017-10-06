<template>
  <panel title="YouTube Video">
    <youtube
      :video-id="youtubeId"
      :player-width="600"
      :player-height="330">
    </youtube>
  </panel>
</template>

<script>
const Panel = () => import('@/components/Shared/Panel')

export default {
  props: {
    youtubeId: {
      type: String,
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
