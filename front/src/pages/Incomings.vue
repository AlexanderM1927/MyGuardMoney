<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-12 container">
              <q-form @submit="save">
                  <q-input inputmode="numeric" color="green" v-model="ingreso.valor" @keyup="milesInput($event, ingreso)" label="Valor">
                    <template v-slot:prepend>
                      <q-icon name="attach_money" />
                    </template>
                  </q-input><br>
                  <q-input color="green" v-model="ingreso.nombre" label="Nombre">
                    <template v-slot:prepend>
                      <q-icon name="description" />
                    </template>
                  </q-input><br>
                  <DateComponent v-model="fecha"></DateComponent><br>
                  <q-btn label="Agregar" type="submit" class="full-width" color="positive"></q-btn>
                </q-form>
                <br>
                <q-table
                  :dense="$q.screen.lt.md"
                  class="table"
                  :data="data"
                  :columns="columns"
                  row-key="name"
                  :rows-per-page-options="[15]"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="nombre" :props="props">
                        {{ props.row.nombre }}
                        <q-popup-edit v-model="props.row.nombre" v-slot="scope">
                          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="update(scope, props.row, 'nombre')" />
                        </q-popup-edit>
                      </q-td>
                      <q-td key="valor" :props="props">
                        {{ miles(props.row.valor) }}
                        <q-popup-edit v-model="props.row.valor" v-slot="scope">
                          <q-input inputmode="numeric" color="green" v-model="scope.value" dense autofocus counter @keyup.enter="update(scope, props.row, 'valor')" @keyup="milesInput($event)" label="Valor">
                            <template v-slot:prepend>
                              <q-icon name="attach_money" />
                            </template>
                          </q-input>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="fecha" :props="props">
                        {{ props.row.fecha }}
                        <q-popup-edit v-model="props.row.fecha" v-slot="scope">
                          <DateComponent v-model="scope.value" :enterEventParams="{ 'scope': scope, 'row': props.row, field: 'fecha' }" @enterEvent="update"></DateComponent><br>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="ops" :props="props">
                        <a class="text-red" style="cursor: pointer; padding: 5px;" @click="del(props.row.id)"> <q-icon size="md" name="delete"/>
                          <q-tooltip :delay="1000" :offset="[0, 10]">eliminar</q-tooltip>
                        </a>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'
import { date } from 'quasar'
import DateComponent from '../components/DateComponent.vue'

export default {
  name: 'incomings',
  mixins: [functions],
  components: { DateComponent },
  data () {
    return {
      ingreso: {},
      data: [],
      columns: [
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
        { name: 'ops', align: 'center', label: 'Opciones', field: 'ops', sortable: true }
      ],
      fecha: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.data = await this.getDataCollection('ingresos', 'id', 'desc')
    },
    async save () {
      if (this.ingreso.valor !== '') {
        this.ingreso.id = Date.now()
        this.ingreso.valor = this.ingreso.valor.replace(/\./g, '')
        this.ingreso.fecha = this.fecha
        this.addToCollection('ingresos', this.ingreso)
        this.data.push(this.ingreso)
        this.ingreso = {}
        this.ingreso.fecha = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
        this.alert('positive', 'Ingreso agregado')
      }
    },
    async del (id) {
      const index = this.data.findIndex(data => data.id === id)
      this.data.splice(index, 1)
      await this.deleteDataCollection('ingresos', id)
    },
    update (scope, row, fieldEditing) {
      row[fieldEditing] = scope.value
      this.updateDataOnCollectionById('ingresos', row.id, row)
    }
  }
}
</script>
