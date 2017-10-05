const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

function parseToJson (data) {
  const obj = data.toJSON()
  return {
    id: obj.id,
    email: obj.email
  }
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send({
        user: parseToJson(user),
        token: jwtSignUser(parseToJson(user))
      })
    } catch (err) {
      // email already exits
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // user not exits
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      // password not exits
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      // return user
      console.log('new user', parseToJson(user))
      res.send({
        user: parseToJson(user),
        token: jwtSignUser(parseToJson(user))
      })
    } catch (err) {
      // error unexpected
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
