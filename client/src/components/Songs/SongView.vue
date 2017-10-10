<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-meta :song="song" />
      </v-flex>

       <v-flex xs6 class="ml-2">
         <song-you-tube :youtubeId="song.youtubeId" />
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs6 class="mt-2">
        <song-tabs :song="song"/>
      </v-flex>

      <v-flex xs6 class="ml-2 mt-2">
        <song-lyrics :song="song" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Song, SongHistory } from '@/services'
const SongMeta = () => import('@/components/Songs/SongMeta')
const SongYouTube = () => import('@/components/Songs/SongYouTube')
const SongLyrics = () => import('@/components/Songs/SongLyrics')
const SongTabs = () => import('@/components/Songs/SongTabs')

export default {
  components: {
    SongMeta,
    SongYouTube,
    SongLyrics,
    SongTabs
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },

  async created () {
    const songId = this.route.params.id
    try {
      const song = await Song.show(songId)
      this.song = song
    } catch (err) {
      console.log(err)
    }
    if (this.isUserLoggedIn) {
      await SongHistory.post({
        songId: songId,
        userId: this.user.id
      })
    }
  },

  data () {
    return {
      song: {}
    }
  }
}
</script>
