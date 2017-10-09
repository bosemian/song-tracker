<template>
  <panel title="Songs">
    <v-btn
      slot="action"
      :to="{
        name: 'songs-create'
      }"
      class="cyan accent-2"
      light
      medium
      absolute
      right
      middle
      fab>
      <v-icon>add</v-icon>
    </v-btn>

    <div
      v-for="song in songArry"
      class="song"
      :key="song.id">

      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>

          <router-link
            tag="span"
            :to="{name: 'song-view', params: { id: song.id }}"
            exact>
            <v-btn dark class="cyan">view</v-btn>
          </router-link>
        </v-flex>

        <v-flex xs6>
          <img class="album-image" :src="song.albumImage" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import { Song } from '@/services'
export default {
  props: {
    songs: {
      type: Array,
      required: true,
      validate: function (value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  },
  created () {
    this.reload()
  },

  data () {
    return {
      songArry: []
    }
  },

  methods: {
    reload () {
      if (this.songs) {
        this.songArry = this.songs
      }
    }
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songArry = await Song.index(value)
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
