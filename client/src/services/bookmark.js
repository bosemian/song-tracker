import api from '@/services/api'

const index = (bookmark) => {
  return api().get('bookmarks', {
    params: bookmark
  })
    .then((res) => res.data)
}

const post = (bookmark) => {
  return api().post('bookmarks', bookmark)
    .then((res) => res.data)
}

const del = (bookmarkId) => {
  return api().delete(`bookmarks/${bookmarkId}`)
}

export default {
  index,
  post,
  del
}
