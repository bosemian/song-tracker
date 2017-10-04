<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <div v-for="song in songs" :key="song.title">
          {{ song.title }}
          {{ song.artist }}
          {{ song.album }}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const Panel = () => import('@/components/Panel')

export default {
  components: {
    Panel
  },

  data () {
    return {
      songs: null
    }
  },

  async created () {
    // do a request to the backend
    this.song = await Song.index()
  }
}
</script>
