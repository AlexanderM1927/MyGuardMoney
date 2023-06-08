import Api from '../boot/axios'

export default {
  store (params) {
    return Api().post('reminders', params)
  },
  index (token) {
    return Api().get('reminders/' + token)
  },
  update (params) {
    return Api().put('reminders/' + params.id, params)
  },
  delete (id) {
    return Api().delete('reminders/' + id)
  },
  deleteAllReminders (token) {
    return Api().delete('reminders-all/' + token)
  }
}
