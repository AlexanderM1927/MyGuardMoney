<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-12 container" v-if="token">
              <q-form @submit="save">
                  <q-input color="green" v-model="recordatorio.nombre" label="Nombre">
                    <template v-slot:prepend>
                      <q-icon name="description" />
                    </template>
                  </q-input><br>
                  <q-input type="textarea" color="green" v-model="recordatorio.detalle" label="Detalle">
                  </q-input><br>
                  <DateComponent label="Hora para el correo" v-model="hora" :onlyHour="true"></DateComponent>
                  <q-select v-model="recordatorio.frecuencia" :options="options" label="Frecuencia" required>
                    <template v-slot:prepend>
                      <q-icon name="alarm_on" />
                    </template>
                  </q-select><br>
                  <DateComponent v-show="recordatorio.frecuencia && recordatorio.frecuencia.value === 'onceamonth'" label="Dia para el correo" v-model="fecha" :onlyDay="true"></DateComponent><br>
                  *Si seleccionas el último día del mes y el mes actual no llega hasta ese día (ejemplo 31, cuando el mes es de 30), la notificación llegará el último día del mes actual.
                  <q-btn label="Agregar" type="submit" class="full-width" color="positive"></q-btn>
              </q-form>
              <br>
            </div>
            <div class="col-12 container" v-else>
              Primero tienes que configurar un correo electrónico.
              <q-btn label="Ir a configuración" @click="goTo('settings')" class="full-width" color="primary"></q-btn>
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'
import { date } from 'quasar'
import DateComponent from '../components/DateComponent.vue'
import ReminderService from '../services/ReminderService'

const initialReminder = {
  frecuencia: { value: 'everyday', label: 'Todos los días' }
}

export default {
  name: 'incomings',
  mixins: [functions],
  components: { DateComponent },
  data () {
    return {
      recordatorio: initialReminder,
      data: [],
      columns: [
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
        { name: 'ops', align: 'center', label: 'Opciones', field: 'ops', sortable: true }
      ],
      options: [
        { value: 'everyday', label: 'Todos los días' },
        { value: 'onceamonth', label: 'Una vez por mes' }
      ],
      fecha: date.formatDate(Date.now(), 'DD'),
      hora: date.formatDate(Date.now(), 'HH:mm'),
      token: JSON.parse(localStorage.getItem('user')).token
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const request = await ReminderService.index(this.token)
      console.log('request', request)
      this.data = await this.getDataCollection('recordatorios', 'id', 'desc')
    },
    save () {
      if (this.recordatorio.nombre !== '') {
        const data = {
          ...this.recordatorio,
          frequency: this.recordatorio.frecuencia.value,
          day: this.fecha,
          hour: this.hora,
          token: this.token
        }
        ReminderService.store(data).then(() => {
          this.data.push(this.recordatorio)
          this.recordatorio = {
            frecuencia: {
              value: 'everyday', label: 'Todos los días'
            }
          }
          this.alert('positive', 'Recordatorio agregado')
        }).catch((error) => {
          this.alert('negative', error.response.data.message)
        })
      }
    },
    async del (id) {
      const index = this.data.findIndex(data => data.id === id)
      this.data.splice(index, 1)
      await this.deleteDataCollection('recordatorios', id)
    },
    update (scope, row, fieldEditing) {
      row[fieldEditing] = scope.value
      this.updateDataOnCollectionById('recordatorios', row.id, row)
    }
  }
}
</script>
