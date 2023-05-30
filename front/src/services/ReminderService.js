import Api from '../boot/axios'

export default {
  store (params) {
    return Api().post('reminders', params)
  },
  get () {
    return Api().get('reminders')
  },
  update (params) {
    return Api().put('reminders/' + params.id, params)
  },
  delete (id) {
    return Api().delete('reminders/' + id)
  }
}
