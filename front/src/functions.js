import { QSpinnerGears, QSpinnerAudio } from 'quasar'
import Localbase from 'localbase'

export const functions = {
  data () {
    return {
      db: {}
    }
  },
  created () {
    this.db = new Localbase('db')
  },
  methods: {
    addToCollection (collection, data) {
      this.db.collection(collection).add(data)
        .then(response => {
          console.log('Agregado')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async getDataCollection (collection, by = '', order = '') {
      let answer = []
      if (by === '' && order === '') {
        await this.db.collection(collection).get().then(users => {
          answer = users
        })
      } else {
        await this.db.collection(collection).orderBy(by, order).get().then(users => {
          answer = users
        })
      }
      return answer
    },
    async getDataCollectionByNombre (collection, value, by = '', order = '') {
      let answer = []
      if (by === '' && order === '') {
        await this.db.collection(collection).doc({ nombre: value }).get().then(users => {
          answer = users
        })
      } else {
        await this.db.collection(collection).doc({ nombre: value }).orderBy(by, order).get().then(users => {
          answer = users
        })
      }
      return answer
    },
    async deleteDataCollection (collection, id) {
      this.db.collection(collection)
        .doc({ id: id })
        .delete()
        .then(response => {
          console.log('Delete successful, now do something.')
        })
        .catch(error => {
          console.log(error)
        })
    },
    isNumber (n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) },
    miles (input) {
      if (input !== undefined) {
        var num = input.replace(/\./g, '')
        if (!this.isNumber(input)) {
          num = ''
        } else {
          if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.')
            num = num.split('').reverse().join('').replace(/^[.]/, '')
          }
        }
        return num
      }
    },
    goTo (location) {
      this.$router.push('/' + location).catch(err => {
        if (err._name === 'NavigationDuplicated') {
          // console.log('it is in page')
        }
      })
    },
    alert (type, msg) {
      this.$q.notify({
        message: msg,
        color: type
      })
    },
    activateLoading (message, spinner = 0) {
      var show = {
        message: message
      }

      if (spinner === 1) {
        show.spinner = QSpinnerGears
      } else if (spinner === 2) {
        show.spinner = QSpinnerAudio
      }
      this.$q.loading.show(show)
    },
    disableLoading () {
      this.$q.loading.hide()
    }
  }
}
