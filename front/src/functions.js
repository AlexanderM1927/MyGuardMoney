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
        await this.db.collection(collection).get().then(data => {
          answer = data
        })
      } else {
        await this.db.collection(collection).orderBy(by, order).get().then(data => {
          answer = data
        })
      }
      return answer
    },
    async getDataCollectionById (collection, value, by = '', order = '') {
      let answer = []
      if (by === '' && order === '') {
        await this.db.collection(collection).doc({ id: value }).get().then(data => {
          answer = data
        })
      } else {
        await this.db.collection(collection).doc({ id: value }).orderBy(by, order).get().then(data => {
          answer = data
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
    async updateDataOnCollectionById (collection, id, data) {
      this.db.collection(collection)
        .doc({ id: id })
        .set(data)
        .then(response => {
          console.log('Delete successful, now do something.')
        })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteDatabase () {
      this.db.delete()
    },
    isNumber (n) {
      const number = n.replaceAll('.', '')
      return /^\d+$/.test(number)
    },
    miles (input) {
      if (input && input !== undefined) {
        if (typeof input === 'number') input = input.toString()
        let num = input.replace(/\./g, '')
        if (!this.isNumber(input)) {
          num = ''
        } else {
          if (!isNaN(num)) {
            num = parseInt(num)
            const options = { style: 'decimal', useGrouping: true }
            num = num.toLocaleString('es', options)
          }
        }
        return num
      }
    },
    milesInput (event) {
      event.target.value = this.miles(event.target.value)
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
