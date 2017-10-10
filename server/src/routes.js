const AuthController = require('./controller/AuthController')
const SongsController = require('./controller/SongsController')
const BookmarksController = require('./controller/BookmarksController')
const HistoriesController = require('./controller/HistoriesController')

const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

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
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

  app.get('/histories',
    HistoriesController.index)
  app.post('/histories',
    HistoriesController.post)
}
