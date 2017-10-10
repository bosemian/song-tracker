<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <song-bookmark></song-bookmark>
      <song-view-recently class="mt-2"></song-view-recently>
    </v-flex>
    <v-flex :class="{
      xs12: !isUserLoggedIn,
      xs6: isUserLoggedIn
    }" xs6 class="ml-2">
      <song-search></song-search>
      <songs-panel class="mt-2" :songs="songs"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { Song } from '@/services'
const SongSearch = () => import('@/components/Songs/SongSearch')
const SongsPanel = () => import('@/components/Songs/SongsPanel')
const SongBookmark = () => import('@/components/Songs/SongBookmark')
const SongViewRecently = () => import('@/components/Songs/SongViewRecently')

export default {
  components: {
    SongSearch,
    SongsPanel,
    SongBookmark,
    SongViewRecently
  },

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
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
