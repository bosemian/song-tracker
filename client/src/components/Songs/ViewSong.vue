<template>
  <v-layout>
    <v-flex xs6>
      <panel title="Song Metadata">
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
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImage" :alt="song.title">
              <br>
              {{ song.album }}
            </v-flex>
          </v-layout>
      </panel>
    </v-flex>

    <v-flex xs6>
      <panel title="tabs" class="ml-2">
        <textarea readonly v-if="song.tabs">{{ song.tabs }}</textarea>
        <textarea v-else>Not a tabs</textarea>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const Panel = () => import('@/components/shared/Panel')

export default {
  components: {
    Panel
  },

  async created () {
    const songId = this.$store.state.route.params.id
    console.log(songId)
    const song = await Song.show(songId)
    this.song = song
  },

  data () {
    return {
      song: {}
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

textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
