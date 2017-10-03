const AuthController = require('./controller/AuthController')

const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {
  app.post('/register',
  AuthControllerPolicy.register,
  AuthController.register)
}
