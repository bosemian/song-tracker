const {
  Bookmark,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      let where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmark = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map((bk) => bk.toJSON())
        .map((bk) => _.extend(
          {},
          bk.Song,
          bk
        ))

      res.send(bookmark)
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'an error has occurred trying to fetch the bookmarks'
      })
    }
  },

  async post (req, res) {
    try {
      const { songId, userId } = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'an error has occurred trying to create the bookmarks'
      })
    }
  },

  async delete (req, res) {
    try {
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'an error has occurred trying to delete the bookmarks'
      })
    }
  }
}
