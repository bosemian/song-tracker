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

        <div v-for="song in songs" :key="song.id">
          {{ song.title }}
          {{ song.artist }}
          {{ song.album }}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { Song } from '@/services'
const Panel = () => import('@/components/Panel')

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
    this.songs = (await Song.index()).data
  }
}
</script>
