<template>
  <v-layout>
    <song-form @edit="save" v-model="song" name="edit"></song-form>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const SongForm = () => import('@/components/Songs/SongForm')

export default {
  components: {
    SongForm
  },

  data () {
    return {
      song: {
        id: null,
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      }
    }
  },

  async created () {
    const songId = this.$store.state.route.params.id
    try {
      const song = await Song.show(songId)
      this.song = song
    } catch (err) {
      console.log(err)
    }
  },

  methods: {
    async save (song) {
      const allField = Object
        .keys(song)
        .every(key => !!song[key])
      if (!allField) {
        this.error = 'Please fill in all the required fills.'
        return
      }
      try {
        const res = await Song.put(song)
        // const songId = this.$store.state.route.params.id
        this.$router.push({ name: 'song-view', params: { id: res.id } })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
