<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
              <q-form @submit="save" v-if="options.length > 0">
                <q-input color="green" v-model="gasto.valor" @keyup="milesInput()" label="Valor">
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input><br>
                <q-input color="green" v-model="gasto.nombre" label="Nombre">
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input><br>
                <q-select v-model="gasto.tipo" :options="options" label="Tipo" required :rules="[val => !!val || 'Tienes que llenar este campo']">
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-select><br>
                <q-input color="green" label="Fecha y hora" required :rules="[val => !!val || 'Tienes que llenar este campo']" v-model="gasto.fecha">
                  <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="gasto.fecha" mask="YYYY-MM-DD HH:mm" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="gasto.fecha" mask="YYYY-MM-DD HH:mm" format24h />
                        </q-popup-proxy>
                      </q-icon>
                  </template>
                </q-input><br>
                <q-btn label="Agregar" type="submit" class="full-width" color="positive"></q-btn>
              </q-form>
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
                    </q-td>
                    <q-td key="valor" :props="props">
                      {{ miles(props.row.valor) }}
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
</template>

<script>
import { functions } from '../functions.js'
import { date } from 'quasar'

export default {
  name: 'gastos',
  mixins: [functions],
  data () {
    return {
      gasto: {},
      options: [],
      data: [],
      columns: [
        { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo', sortable: true },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'valor', align: 'center', label: 'Valor', field: 'valor', sortable: true },
        { name: 'ops', align: 'center', label: 'Opciones', field: 'ops', sortable: true }
      ]
    }
  },
  created () {
    this.getData()
    this.getTypes()
    this.gasto.fecha = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    async getTypes () {
      const tipos = await this.getDataCollection('tipos')
      for (let i = 0; i < tipos.length; i++) {
        this.options.push(tipos[i].nombre)
      }
    },
    async getData () {
      this.data = await this.getDataCollection('gastos', 'id', 'desc')
    },
    async save () {
      if (this.gasto.valor !== '') {
        this.gasto.id = Date.now()
        this.gasto.valor = this.gasto.valor.replace(/\./g, '')
        this.gasto.tipo = await this.getDataCollectionByNombre('tipos', this.gasto.tipo)
        this.addToCollection('gastos', this.gasto)
        this.data.push(this.gasto)
        this.gasto = {}
        this.gasto.fecha = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
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
    milesInput () {
      this.gasto.valor = this.miles(this.gasto.valor)
    }
  }
}
</script>
