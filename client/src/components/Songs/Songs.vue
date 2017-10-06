<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <router-link
          slot="action"
          :to="{name: 'songs-create'}">
          <v-btn fab light medium absolute right middle class="cyan accent-2">
            <v-icon>add</v-icon>
          </v-btn>
        </router-link>

        <div
          class="song"
          v-for="song in songs"
          :key="song.id">
          <v-layout>
            <v-flex xs6>
              <div class="song-title">
                {{ song.title }}
              </div>
              <div class="song-artist">
                {{ song.artist }}
              </div>
              <div class="song-genre">
                {{ song.genre }}
              </div>

              <router-link
                tag="span"
                :to="{name: 'view-song', params: { id: song.id }}"
                exact>
                <v-btn dark class="cyan">view</v-btn>
              </router-link>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImage" :alt="song.title">
            </v-flex>
          </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const Panel = () => import('@/components/Shared/Panel')

export default {
  components: {
    Panel
  },

  data () {
    return {
      songs: null
    }
  },

  async created () {
    // do a request to the backend
    this.songs = await Song.index()
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
