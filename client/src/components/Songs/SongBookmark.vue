<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{ props.item.title }}
        </td>
        <td class="text-xs-right">
          {{ props.item.artist }}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import { BookMark } from '@/services'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        }
      ],
      pagination: {
        sortBy: 'date',
        descending: true
      },
      bookmarks: []
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },

  async created () {
    if (this.isUserLoggedIn) {
      this.bookmarks = await BookMark.index({
        userId: this.user.id
      })
    }
  }
}
</script>

<style>

</style>

