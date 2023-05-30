<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
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
            </div>
            <div class="col-1"></div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'

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
      this.alert('positive', 'La base de datos fue eliminada exitosamente')
    }
  }
}
</script>
