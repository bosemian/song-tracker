<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <app-text-field
          :key="field.name"
          v-for="field in listFieldMeta"
          :name="field.name"
          :song="song[field.name]"
          @update="initialSubmit">
        </app-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="tabs"
          multi-line
          v-model="song.tab">
        </v-text-field>

        <v-text-field
          label="lyrics"
          multi-line
          v-model="song.lyrics">
        </v-text-field>
      </panel>

      <app-alert v-if="error" :text="error" @dismissed="onDismissed" />

      <v-btn dark class="cyan" @click="saveForm">
        save
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
const Panel = () => import('@/components/Shared/Panel')
const AppAlert = () => import('@/components/Shared/Alert')

export default {
  props: ['value'],

  created () {
    if (this.value) {
      this.song = this.value
    }
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

  components: {
    Panel,
    AppAlert
  },

  methods: {
    saveForm () {
      this.$emit('save', this.song)
    },
    initialSubmit (name, value) {
      let list = this.listFieldMeta
      list.map((field) => {
        if (field.name === name) {
          this.song[field.name] = value
        }
      })
    }
  },

  computed: {
    listFieldMeta () {
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

    listFieldsStruct () {
      let field = [
        { name: 'tab' },
        { name: 'lyrics' }
      ]

      return field
    }
  }
}
</script>
