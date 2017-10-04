import api from '@/services/api'

const index = () => {
  return api().get('songs')
}

export default {
  index
}
