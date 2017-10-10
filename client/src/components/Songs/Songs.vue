<template>
  <v-layout>
    <v-flex xs6>
      <song-bookmark></song-bookmark>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <song-search></song-search>
      <songs-panel class="mt-2" :songs="songs"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const SongSearch = () => import('@/components/Songs/SongSearch')
const SongsPanel = () => import('@/components/Songs/SongsPanel')
const SongBookmark = () => import('@/components/Songs/SongBookmark')

export default {
  components: {
    SongSearch,
    SongsPanel,
    SongBookmark
  },

  data () {
    return {
      songs: null
    }
  },

  async created () {
    this.songs = await Song.index()
  }
}
</script>
