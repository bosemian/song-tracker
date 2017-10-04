<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <app-text-field
          :key="field.name"
          v-for="field in listField"
          :name="field.name"
          @update="load"
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

      <v-btn dark class="cyan" @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
const Panel = () => import('@/components/Panel')
export default {
  components: {
    Panel
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
      }
    }
  },
  computed: {
    listField () {
      let field = [
        { name: 'title', val: '' },
        { name: 'artist', val: '' },
        { name: 'genre', val: '' },
        { name: 'album', val: '' },
        { name: 'albumImage', val: '' },
        { name: 'youtubeId', val: '' }
      ]

      return field
    }
  },

  methods: {
    create () {
      console.log(this.song)
    },
    load (name, value) {
      let list = this.listField
      list.map((field) => {
        if (field.name === name) {
          this.song[field.name] = value
        }
      })
    }
  }
}
</script>
