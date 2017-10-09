const AuthController = require('./controller/AuthController')
const SongsController = require('./controller/SongsController')
const BookmarksController = require('./controller/BookmarksController')

const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthControllerPolicy.register,
    AuthController.register)

  app.post('/login',
    AuthController.login)

  app.get('/songs',
    SongsController.index)

  app.get('/songs/:songId',
    SongsController.show)

  app.post('/songs',
    SongsController.post)

  app.put('/songs/:songId',
    SongsController.put)

  app.get('/bookmarks',
    BookmarksController.index)
  app.post('/bookmarks',
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    BookmarksController.delete)
}
