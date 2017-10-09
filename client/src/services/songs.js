import api from '@/services/api'

const index = (search) => {
  return api().get('songs', {
    params: {
      search: search
    }
  })
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
    .then((res) => res.data)
}

export default {
  index,
  post,
  show,
  put
}
