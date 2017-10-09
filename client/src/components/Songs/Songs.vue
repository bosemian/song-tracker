<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <song-search></song-search>
      <songs-panel :songs="songs"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const SongSearch = () => import('@/components/Songs/SongSearch')
const SongsPanel = () => import('@/components/Songs/SongsPanel')

export default {
  components: {
    SongsPanel,
    SongSearch
  },

  data () {
    return {
      songs: null
    }
  },

  async created () {
    // do a request to the backend
    this.songs = await Song.index()
  }
}
</script>
