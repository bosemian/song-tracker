<template>
  <v-layout>
    <song-form @save="save" v-model="song"></song-form>
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

  computed: {
    listField () {
      let field = [
        { name: 'title' },
        { name: 'artist' },
        { name: 'genre' },
        { name: 'album' },
        { name: 'albumImage' },
        { name: 'youtubeId' }
      ]

      return field
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
      this.error = null
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
    },
    initialSubmit (name, value) {
      let list = this.listField
      list.map((field) => {
        if (field.name === name) {
          this.song[field.name] = value
        }
      })
    },
    onDismissed () {
      this.error = null
    }
  }
}
</script>
