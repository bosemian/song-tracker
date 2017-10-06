<template>
  <v-layout>
    <song-form @edit="save" name="edit" v-model="song"></song-form>
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
      song: null
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
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!allField) {
        this.error = 'Please fill in all the required fills.'
        return
      }
      try {
        await Song.put(song)
        const songId = this.$store.state.route.params.id
        this.$router.push({ name: 'song-view', params: { id: songId } })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
