<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <app-text-field
          :key="field.name"
          v-for="field in listField"
          :name="field.name"
          @update="initialSubmit"
          v-model="song">
        </app-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="tab"
          multi-line
          v-model="song.tab">
        </v-text-field>

        <v-text-field
          label="lyrics"
          multi-line=""
          v-model="song.lyrics">
        </v-text-field>
      </panel>

      <app-alert v-if="error" :text="error" @dismissed="onDismissed" />

      <v-btn dark class="cyan" @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const Panel = () => import('@/components/Shared/Panel')
const AppAlert = () => import('@/components/Shared/Alert')

export default {
  //  beforeRouteEnter: (to, from, next) => {
  //   // TODO check state from user if null redirect to login
  //   if (!this.isAuth) {
  //     next({ path: '/login', query: { redirect: to.fullPath } })
  //     return
  //   }
  //   next()
  // },
  components: {
    Panel,
    AppAlert
  },

  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImage: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null
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
    },

    isAuth () {
      return this.$store.getters.getCurrentUser
    }
  },

  methods: {
    async create () {
      this.error = null
      const allField = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!allField) {
        this.error = 'Please fill in all the required fills.'
        return
      }
      try {
        await Song.post(this.song)
        this.$router.push('/songs')
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
