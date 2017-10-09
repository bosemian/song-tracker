<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="title"
          :rules="[required]"
          value="title"
          v-model="title"
          >
        </v-text-field>

         <v-text-field
          label="artist"
          :rules="[required]"
          value="artist"
          v-model="artist"
          >
        </v-text-field>

         <v-text-field
          label="genre"
          :rules="[required]"
          value="genre"
          v-model="genre"
          >
        </v-text-field>

         <v-text-field
          label="album"
          :rules="[required]"
          value="album"
          v-model="album"
          >
        </v-text-field>

         <v-text-field
          label="albumImage"
          :rules="[required]"
          value="albumImage"
          v-model="albumImage"
          >
        </v-text-field>

         <v-text-field
          label="youtubeId"
          :rules="[required]"
          value="youtubeId"
          v-model="youtubeId"
          >
        </v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="tabs"
          multi-line
          :rules="[required]"
          v-model="tab">
        </v-text-field>

        <v-text-field
          label="lyrics"
          multi-line
          :rules="[required]"
          v-model="lyrics">
        </v-text-field>
      </panel>

      <app-alert v-if="error" :text="error" @dismissed="onDismissed" />

      <v-btn v-if="typeForm" dark class="cyan" @click="saveForm">
        save
      </v-btn>
      <v-btn v-else dark class="cyan" @click="saveForm">
        create
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
const AppAlert = () => import('@/components/Shared/Alert')

export default {
  props: ['value', 'name'],

  created () {
    this.reload()
  },

  watch: {
    value: 'reload'
  },

  data () {
    return {
      id: null,
      title: null,
      artist: null,
      genre: null,
      album: null,
      albumImage: null,
      youtubeId: null,
      lyrics: null,
      tab: null,
      error: null,
      typeForm: '',
      required: (value) => !!value || 'Required.'
    }
  },

  components: {
    AppAlert
  },

  methods: {
    reload () {
      if (this.value) {
        this.id = this.value.id
        this.typeForm = this.name
        this.title = this.value.title
        this.artist = this.value.artist
        this.genre = this.value.genre
        this.album = this.value.album
        this.albumImage = this.value.albumImage
        this.youtubeId = this.value.youtubeId
        this.lyrics = this.value.lyrics
        this.tab = this.value.tab
      }
    },
    saveForm () {
      if (this.typeForm === 'edit') {
        this.$emit('edit', {
          id: this.id,
          title: this.title,
          artist: this.artist,
          genre: this.genre,
          album: this.album,
          albumImage: this.albumImage,
          youtubeId: this.youtubeId,
          lyrics: this.lyrics,
          tab: this.tab
        })
      } else {
        this.$emit('create', {
          title: this.title,
          artist: this.artist,
          genre: this.genre,
          album: this.album,
          albumImage: this.albumImage,
          youtubeId: this.youtubeId,
          lyrics: this.lyrics,
          tab: this.tab
        })
      }
    }
  },
  onDismissed () {
    this.error = null
  }
}
</script>
