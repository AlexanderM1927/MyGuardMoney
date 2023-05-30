<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
              <q-form @submit="save" v-if="options.length > 0">
                <q-input inputmode="numeric" color="green" v-model="gasto.valor" @keyup="milesInput($event, gasto)" label="Valor">
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input><br>
                <q-input color="green" v-model="gasto.nombre" label="Nombre">
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input><br>
                <q-select v-model="gasto.tipo" :options="options" label="Tipo" required>
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-select><br>
                <DateComponent v-model="fecha"></DateComponent><br>
                <q-btn label="Agregar" type="submit" class="full-width" color="positive"></q-btn>
              </q-form>
              <div v-else>
                Para comenzar, debes ingresar un tipo de gasto.
                <q-btn label="Ir a crear tipo de gasto" @click="goTo('expenses-types')" class="full-width" color="primary"></q-btn>
                <br>
                <br>
                <b>Nota:</b> Los gastos van vinculados a un tipo de gasto, de esta forma podrás organizar diferentes gasto de una misma clase, es decir, si el tipo de gasto es comida, podrás adjuntar varios gastos de la misma causa.
              </div>
              <br>
              <q-separator />
              <br>
              <q-table
                  :dense="$q.screen.lt.md"
                  class="table"
                  :data="data"
                  :columns="columns"
                  row-key="name"
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="tipo" :props="props">
                      {{ getNombre(props.row.tipo) }}
                    </q-td>
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
            <div class="col-1"></div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'
import { date } from 'quasar'
import DateComponent from '../components/DateComponent.vue'

export default {
  name: 'expenses',
  mixins: [functions],
  components: { DateComponent },
  data () {
    return {
      gasto: {},
      options: [],
      data: [],
      columns: [
        { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
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
    this.getTypes()
  },
  methods: {
    async getTypes () {
      const tipos = await this.getDataCollection('tipos')
      for (let i = 0; i < tipos.length; i++) {
        this.options.push(
          {
            label: tipos[i].nombre,
            value: tipos[i].id
          }
        )
      }
    },
    async getData () {
      this.data = await this.getDataCollection('gastos', 'id', 'desc')
    },
    async save () {
      if (this.gasto.valor !== '') {
        this.gasto.id = Date.now()
        this.gasto.valor = this.gasto.valor.replace(/\./g, '')
        this.gasto.tipo = await this.getDataCollectionById('tipos', this.gasto.tipo.value)
        this.gasto.fecha = this.fecha
        this.addToCollection('gastos', this.gasto)
        this.data.push(this.gasto)
        this.gasto = {}
        this.gasto.fecha = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
        this.alert('positive', 'Gasto agregado')
      }
    },
    async del (id) {
      const index = this.data.findIndex(data => data.id === id)
      this.data.splice(index, 1)
      await this.deleteDataCollection('gastos', id)
    },
    getNombre (obj) {
      let r = ''
      if (obj !== undefined) r = obj.nombre
      else r = obj
      return r
    },
    update (scope, row, fieldEditing) {
      row[fieldEditing] = scope.value
      this.updateDataOnCollectionById('gastos', row.id, row)
    }
  }
}
</script>
