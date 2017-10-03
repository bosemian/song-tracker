import api from './api'

const register = (credentials) => {
  return api().post('register', credentials)
}

const login = (credentials) => {
  return api().post('login', credentials)
}

export default {
  register,
  login
}
