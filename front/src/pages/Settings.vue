<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-12 container">
              <q-btn label="Actualizar aplicación"
                @click="updateApp"
                class="full-width"
                color="primary">
              </q-btn>
              <br>
              <q-separator />
              <br>
              <q-btn label="Eliminar datos"
                @click="deleteData"
                class="full-width"
                color="primary">
              </q-btn>
              <br>
              <q-separator />
              <br>
              <q-btn label="Agregar correo electrónico"
                @click="addEmail"
                class="full-width"
                color="primary">
              </q-btn>
              <br>
              <q-separator />
              <br>
              Para agregar esta aplicación en tu dispositivo iOS, presiona el boton del navegador para compartir, y agregarlo a tu pantalla de inicio (Add to Home Screen)
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'
import EmailService from '../services/EmailService'

export default {
  name: 'expenses',
  mixins: [functions],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    updateApp () {
      caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))))
      location.reload()
    },
    async deleteData () {
      await this.deleteDatabase()
      localStorage.removeItem('user')
      this.alert('positive', 'La base de datos fue eliminada exitosamente')
    },
    addEmail () {
      this.$q.dialog({
        title: 'Verifica tu correo electrónico',
        message: 'Con tu correo electrónico podrás usar los recordatorios.',
        prompt: {
          model: '',
          type: 'email' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(async (data) => {
        const userObj = {
          email: data,
          token: this.generateToken()
        }
        this.activateLoading()
        EmailService.store(userObj).then((data) => {
          localStorage.setItem('user', JSON.stringify(userObj))
          this.alert('positive', 'Se envió un correo para verificar tu cuenta, por favor sigue las instrucciones.')
          this.disableLoading()
        }).catch((error) => {
          this.alert('negative', error.response.data.message)
          this.disableLoading()
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
