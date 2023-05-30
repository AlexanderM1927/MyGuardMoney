<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
              <q-form @submit="save">
                <q-input color="green" v-model="type.nombre" required label="Nombre">
                  <template v-slot:prepend>
                    <q-icon name="account_balance" />
                  </template>
                </q-input>
                <br>
                <q-input class="my-input" label="Color (click en el icono)" v-model="type.color" required>
                  <template v-slot:prepend>
                    <q-icon name="palette">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="type.color" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <br>
                <q-btn type="submit" label="Agregar" class="full-width" color="positive"></q-btn>
              </q-form>
              <br>
              <q-separator />
              <div class="text-h6">Tipos actuales</div>
                <q-table
                  :dense="$q.screen.lt.md"
                  class="table"
                  :data="data"
                  :columns="columns"
                  row-key="name"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="name" :props="props">
                        {{ props.row.nombre }}
                        <q-popup-edit v-model="props.row.nombre" v-slot="scope">
                          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="update(scope, props.row, 'nombre')" />
                        </q-popup-edit>
                      </q-td>
                      <q-td key="color" :props="props">
                        <div class="type-color" :style="`background: ${props.row.color}`" />
                        <q-popup-edit v-model="props.row.color" v-slot="scope">
                          <q-input class="my-input" label="Color (click en el icono)" v-model="scope.value" @keyup.enter="update(scope, props.row, 'color')" required>
                            <template v-slot:prepend>
                              <q-icon name="palette">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-color v-model="scope.value" />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="ops" :props="props">
                        <a class="text-red" style="cursor: pointer; padding: 5px;" @click="del(props.row)"> <q-icon size="md" name="delete"/>
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

export default {
  name: 'expenses-types',
  mixins: [functions],
  data () {
    return {
      type: {},
      columns: [
        { name: 'name', align: 'center', label: 'Nombre', field: 'name', sortable: true },
        { name: 'color', align: 'center', label: 'Color', field: 'color', sortable: true },
        { name: 'ops', align: 'center', label: 'Opciones', field: 'ops', sortable: true }
      ],
      data: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    save () {
      if (this.type.nombre !== '') {
        this.type.id = Date.now()
        this.addToCollection('tipos', this.type)
        this.data.push(this.type)
        this.type = {}
        this.alert('positive', 'Tipo agregado')
      } else {
        this.alert('negative', 'El nombre es obligatorio')
      }
    },
    async getData () {
      this.data = await this.getDataCollection('tipos', 'id', 'desc')
    },
    async del (tipo) {
      const gastos = await this.getDataCollection('gastos', 'id', 'desc')
      const gastosWhereTipo = gastos.filter(gasto => gasto.tipo.id === tipo.id)
      if (gastosWhereTipo.length > 0) {
        const confirmationDelete = confirm('Este tipo de gasto tiene asociado gastos, si lo eliminas, la gráfica relacionada con los tipos de gastos puede que se dañe el mes que se generen')
        if (confirmationDelete) {
          const index = this.data.findIndex(data => data.id === tipo.id)
          this.data.splice(index, 1)
          await this.deleteDataCollection('tipos', tipo.id)
        }
      } else {
        const index = this.data.findIndex(data => data.id === tipo.id)
        this.data.splice(index, 1)
        await this.deleteDataCollection('tipos', tipo.id)
      }
    },
    update (scope, row, fieldEditing) {
      row[fieldEditing] = scope.value
      this.updateDataOnCollectionById('tipos', row.id, row)
    }
  }
}
</script>
<style scoped>
.type-color {
  width: 1rem;
  height: 1rem;
  content: ' ';
  margin-left: auto;
  margin-right: auto;
}
</style>
