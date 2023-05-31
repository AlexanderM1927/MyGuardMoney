import Api from '../boot/axios'

export default {
  store (params) {
    return Api().post('emails', params)
  },
  checkIfEmailIsVerfied (params) {
    return Api().get('emails' + params.id)
  },
  verifyEmail (params) {
    return Api().put('emails/' + params.id, params)
  }
}
