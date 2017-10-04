import api from '@/services/api'

const index = () => {
  return api().get('songs')
}

const post = (song) => {
  return api().post('songs', song)
}

export default {
  index,
  post
}
