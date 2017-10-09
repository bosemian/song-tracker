<template>
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

        <router-link
          tag="span"
          :to="{name: 'song-edit', params: { id: song.id }}"
          exact>
          <v-btn dark class="amber">Edit</v-btn>
        </router-link>

        <v-btn
          v-if="isUserLoggedIn && !isBookmarked"
          dark
          class="cyan"
          @click="bookmark">
          Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && isBookmarked"
          dark
          class="cyan"
          @click="unbookmark">
          Unbookmark
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="song.albumImage" :alt="song.title">
        <br>
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import { BookMark } from '@/services'

export default {
  props: {
    song: {
      type: Object,
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

  data () {
    return {
      isBookmarked: false
    }
  },

  async created () {
    try {
      const bookmark = await BookMark.index({
        songId: this.songs.id,
        userId: this.$store.state.user.id
      })
      this.isBookmarked = !!bookmark
    } catch (err) {
      console.log(err)
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },

  methods: {
    async bookmark () {
      try {
        await BookMark.post({
          songId: this.songs.id,
          userId: this.$store.state.user.id
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unbookmark () {
      try {
        await BookMark.del({
          songId: this.songs.id,
          userId: this.$store.state.user.id
        })
      } catch (err) {
        console.log(err)
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