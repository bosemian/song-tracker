import api from '@/services/api'

const index = (params) => {
  return api().get('histories', {
    params: params
  })
    .then((res) => res.data)
}

const post = (history) => {
  return api().post('histories', history)
}

export default {
  index,
  post
}
