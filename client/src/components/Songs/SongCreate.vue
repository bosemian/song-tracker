<template>
  <v-layout>
    <song-form @create="create" name="create" v-model="song"></song-form>
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
      song: null,
      error: ''
    }
  },

  methods: {
    async create (song) {
      console.log(song)
      this.error = null
      const allField = Object
        .keys(song)
        .every(key => !!song[key])

      if (!allField) {
        this.error = 'Please fill in all the required fills.'
        return
      }
      try {
        await Song.post(song)
        this.$router.push('/songs')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
