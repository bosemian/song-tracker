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
          v-if="isUserLoggedIn"
          tag="span"
          :to="{name: 'song-edit', params: { id: song.id }}"
          exact>
          <v-btn dark class="amber">Edit</v-btn>
        </router-link>

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="green"
          @click="setBookmark">
          Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="red"
          @click="unSetBookmark">
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
      bookmark: null
    }
  },

  async created () {
    this.reload()
  },

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },

  watch: {
    song: 'reload',
    bookmark: 'reloadBookmark'
  },

  methods: {
    async reload () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.reloadBookmark()
      } catch (err) {
        console.log(err)
      }
    },
    async setBookmark () {
      try {
        this.bookmark = await BookMark.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unSetBookmark () {
      try {
        await BookMark.del(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    async reloadBookmark () {
      const bookmarks = await BookMark.index({
        songId: this.song.id,
        userId: this.$store.state.user.id
      })
      if (bookmarks.length) {
        bookmarks
          .filter((bk) => {
            return this.song.id === bk.SongId
          })
          .map((bk) => {
            this.bookmark = bk
          })
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