import api from './api'

const register = (credentials) => {
  return api().post('register', credentials)
}

const login = (credentials) => {
  return api().post('login', credentials)
}

const isAuth = () => {

}

export default {
  register,
  login,
  isAuth
}
