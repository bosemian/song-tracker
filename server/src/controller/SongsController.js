const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'an error has occurred trying to fetch the songs'
      })
    }
  },

  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'an error has occurred trying to create the songs'
      })
    }
  }
}