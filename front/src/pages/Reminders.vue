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
              <q-separator inset />
              <br>
              <FullCalendar ref="calendar" :events="data" :config="config" />
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
import 'fullcalendar/dist/fullcalendar.css'
import { functions } from '../functions.js'
import { date } from 'quasar'
import DateComponent from '../components/DateComponent.vue'
import ReminderService from '../services/ReminderService'
import { FullCalendar } from 'vue-full-calendar'
import InfoReminder from 'components/dialogs/InfoReminder'

const initialReminder = {
  frecuencia: { value: 'everyday', label: 'Todos los días' }
}

export default {
  name: 'incomings',
  mixins: [functions],
  components: { DateComponent, FullCalendar },
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
      token: JSON.parse(localStorage.getItem('user')).token,
      config: {}
    }
  },
  created () {
    this.getCalendarInfo()
    this.getData()
  },
  methods: {
    async getData () {
      const request = await ReminderService.index(this.token)
      const reminders = request.data.reminders
      const year = date.formatDate(new Date(), 'YYYY')
      const month = date.formatDate(new Date(), 'MM')
      this.data = []
      for (let i = 0; i < reminders.length; i++) {
        const hours = reminders[i].hour.substring(0, reminders[i].hour.indexOf(':'))
        const minutes = reminders[i].hour.slice(reminders[i].hour.indexOf(':') + 1)
        const reminder = {
          title: reminders[i].name,
          start: date.formatDate(new Date(year, month - 1, reminders[i].day, hours, minutes), 'YYYY-MM-DD HH:mm'),
          description: reminders[i].detail,
          _id: reminders[i].id
        }
        if (reminders[i].frequency === 'onceamonth') {
          this.data.push(reminder)
        } else {
          for (let j = 0; j < 31; j++) {
            const newDate = date.addToDate(reminder.start, { days: j })
            const newReminder = {
              ...reminder
            }
            newReminder.start = date.formatDate(newDate, 'YYYY-MM-DD HH:mm')
            this.data.push(newReminder)
          }
        }
      }
      console.log(this.data)
    },
    getCalendarInfo () {
      const _this = this
      const lang = {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        daysLong: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        days: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Lista'
      }
      this.config = {
        defaultView: 'month',
        editable: false,
        displayEventTime: false,
        header: {
          left: 'prev,today,next',
          right: 'month,listMonth,basicWeek,basicDay'
        },
        buttonText: {
          today: lang.today,
          month: lang.month,
          week: lang.week,
          day: lang.day,
          listMonth: lang.list
        },
        allDayDefault: true,
        height: 'auto',
        monthNames: lang.months,
        monthNamesShort: lang.monthsShort,
        dayNames: lang.daysLong,
        dayNamesShort: lang.days,
        eventTextColor: 'white',
        eventClick: function (reminder) {
          _this.showEvent(reminder)
        },
        eventMouseover: function (event, jsEvent, view) {},
        eventMouseout: function (event, jsEvent, view) {}
      }
    },
    showEvent (reminder) {
      this.$q.dialog({
        component: InfoReminder,
        parent: this,
        reminder: reminder
      }).onOk(() => {
        // OK
      }).onCancel(() => {
        this.activateLoading()
        ReminderService.delete(reminder._id).then((data) => {
          this.alert('positive', 'Recordatorio eliminado')
          this.getData()
          this.disableLoading()
        }).catch((error) => {
          this.alert('negative', error.response.data.message)
          this.disableLoading()
        })
      }).onDismiss(() => {
        // OK
      })
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
        this.activateLoading()
        ReminderService.store(data).then(() => {
          this.recordatorio = {
            frecuencia: {
              value: 'everyday', label: 'Todos los días'
            }
          }
          this.alert('positive', 'Recordatorio agregado')
          this.getData()
          this.disableLoading()
        }).catch((error) => {
          this.alert('negative', error.response.data.message)
          this.disableLoading()
        })
      }
    }
  }
}
</script>
