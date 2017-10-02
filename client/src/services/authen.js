import api from './api'

const register = (credentials) => {
  return api().post('register', credentials)
}

export default {
  register
}
