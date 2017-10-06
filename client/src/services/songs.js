import api from '@/services/api'

const index = () => {
  return api().get('songs')
    .then((res) => res.data)
}

const post = (song) => {
  return api().post('songs', song)
}

const show = (songId) => {
  return api().get(`songs/${songId}`)
    .then((res) => res.data)
}

const put = (song) => {
  return api().put(`songs/${song.id}`, song)
}

export default {
  index,
  post,
  show,
  put
}
