<template>
  <q-page>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
              Actualmente el análisis se encuentra diseñado para el año actual {{ date.formatDate(new Date(), 'YYYY') }}.
              <div v-if="valuesMonthSelected">
                  <q-select v-model="monthSelected" @input="init()" :options="options" label="Mes" required>
                    <template v-slot:prepend>
                      <q-icon name="event" />
                    </template>
                  </q-select><br>
                  <highcharts :options="chartOptionsGastosPorDiaDelMes"></highcharts>
                  <highcharts :options="chartOptionsGastosPorCategoria"></highcharts>
                  <br>
                  <h6 class="text-h6 text-center">Tabla comparativa Ingresos - Gastos</h6>
                  <q-table
                      :dense="$q.screen.lt.md"
                      class="table"
                      :data="dataCompativeTable"
                      :columns="columnsComparativeTable"
                      row-key="name"
                      :rows-per-page-options="[0]"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="detail" :props="props">
                          {{ props.row.detail }}
                        </q-td>
                        <q-td key="incoming" :props="props">
                          {{ miles(props.row.incoming) }}
                        </q-td>
                        <q-td key="outcoming" :props="props">
                          {{ miles(props.row.outcoming) }}
                        </q-td>
                      </q-tr>
                    </template>
                    <template v-slot:bottom-row>
                      <q-tr>
                        <q-td key="detail" class="text-center">
                          <b>Total</b>
                        </q-td>
                        <q-td key="incoming">
                        </q-td>
                        <q-td key="outcoming" class="text-center">
                          <b>{{ miles(totalComparativeTable) }}</b>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                  <highcharts :options="chartOptionsIngresosVsGastos"></highcharts>
              </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { functions } from '../functions.js'
import { Chart } from 'highcharts-vue'
import { date } from 'quasar'

export default {
  name: 'analysis',
  mixins: [functions],
  components: {
    highcharts: Chart
  },
  data () {
    return {
      totalIngresosComparative: 0,
      totalGastosComparative: 0,
      date: date,
      valuesMonthSelected: null,
      dataTiposPorMes: [],
      totalComparativeTable: 0,
      columnsComparativeTable: [
        { name: 'detail', align: 'center', label: 'Nombre', field: 'detail', sortable: true },
        { name: 'incoming', align: 'center', label: 'Debitos', field: 'incoming', sortable: true },
        { name: 'outcoming', align: 'center', label: 'Creditos', field: 'outcoming', sortable: true }
      ],
      dataCompativeTable: [],
      monthSelected: {
        value: 0, label: 'Enero'
      },
      options: [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ],
      dataTipos: [],
      dataGastos: [],
      chartOptionsGastosPorDiaDelMes: {
        chart: {
          type: 'area'
        },
        title: {
          text: 'Gastos este mes'
        },
        xAxis: {
          title: {
            text: 'Dias'
          },
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        },
        yAxis: {
          title: {
            text: 'Valor'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          },
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, '#E9BC36']
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          name: 'Gastos',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: '#E9BC36'
        }]
      },
      chartOptionsGastosPorCategoria: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f}%'
            },
            showInLegend: true
          }
        },
        colorAxis: {
          minColor: '#F2f2f2',
          maxColor: '#E9BC36'
        },
        series: [{
          colorByPoint: true,
          data: [{ name: '', value: '1', color: '#E9BC36' }]
        }],
        title: {
          text: 'Gastos por categoria'
        }
      },
      chartOptionsIngresosVsGastos: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f}%'
            },
            showInLegend: true
          }
        },
        colorAxis: {
          minColor: '#F2f2f2',
          maxColor: '#E9BC36'
        },
        series: [{
          colorByPoint: true,
          data: [{ name: '', value: '1', color: '#E9BC36' }]
        }],
        title: {
          text: 'Ingresos vs Gastos'
        }
      }
    }
  },
  async mounted () {
    const mesActual = date.formatDate(new Date(), 'M')
    const filter = this.options.find(obj => obj.value === parseInt(mesActual))
    this.monthSelected = filter
    await this.init()
  },
  methods: {
    async init () {
      await this.getData()
      this.organiceByType()
      this.organiceByMonth()
      this.fillTable()
      this.generateChartComparative()
    },
    fillTable () {
      this.dataCompativeTable = []
      this.totalComparativeTable = 0
      const ingresosMesActual = this.valuesMonthSelected.incoming
      const gastosPorTipoMesActual = this.dataTiposPorMes
      for (let i = 0; i < ingresosMesActual.length; i++) {
        this.dataCompativeTable.push(
          {
            detail: ingresosMesActual[i].nombre,
            incoming: ingresosMesActual[i].valor,
            outcoming: 0
          }
        )
        this.totalIngresosComparative += parseInt(ingresosMesActual[i].valor)
      }
      for (let i = 0; i < gastosPorTipoMesActual.length; i++) {
        this.dataCompativeTable.push(
          {
            detail: gastosPorTipoMesActual[i].nombre,
            outcoming: gastosPorTipoMesActual[i].valor,
            incoming: 0
          }
        )
        this.totalGastosComparative += parseInt(gastosPorTipoMesActual[i].valor)
      }
      this.totalComparativeTable = parseInt(this.totalIngresosComparative) - parseInt(this.totalGastosComparative)
    },
    async getData () {
      this.dataTipos = await this.getDataCollection('tipos', 'id', 'desc')
      this.dataGastos = await this.getDataCollection('gastos', 'id', 'desc')
      this.dataIngresos = await this.getDataCollection('ingresos', 'id', 'desc')
      this.valuesMonthSelected = this.selectMonth()
    },
    organiceByType () {
      this.chartOptionsGastosPorCategoria.series[0].data = []
      for (let i = 0; i < this.dataTipos.length; i++) {
        this.dataTiposPorMes[i] = {
          id: this.dataTipos[i].id,
          valor: 0,
          nombre: this.dataTipos[i].nombre,
          color: this.dataTipos[i].color
        }
        for (let j = 0; j < this.valuesMonthSelected.outcoming.length; j++) {
          if (this.dataTiposPorMes[i].id === this.valuesMonthSelected.outcoming[j].tipo.id) {
            this.dataTiposPorMes[i].valor += parseInt(this.valuesMonthSelected.outcoming[j].valor)
          }
        }
        this.chartOptionsGastosPorCategoria.series[0].data.push({ name: this.dataTiposPorMes[i].nombre, y: this.dataTiposPorMes[i].valor, color: this.dataTiposPorMes[i].color })
      }
    },
    generateChartComparative () {
      this.chartOptionsIngresosVsGastos.series[0].data = []
      this.chartOptionsIngresosVsGastos.series[0].data.push({ name: 'Ingresos', y: this.totalIngresosComparative, color: '#21BA45' })
      this.chartOptionsIngresosVsGastos.series[0].data.push({ name: 'Gastos', y: this.totalGastosComparative, color: '#FF0000' })
    },
    organiceByMonth () {
      const dias = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < this.valuesMonthSelected.outcoming.length; i++) {
        const fecha = new Date(this.valuesMonthSelected.outcoming[i].fecha)
        const dia = fecha.getUTCDate() - 1
        if (dias[dia] === 0) {
          dias[dia] = parseInt(this.valuesMonthSelected.outcoming[i].valor)
        } else {
          dias[dia] += parseInt(this.valuesMonthSelected.outcoming[i].valor)
        }
      }
      this.chartOptionsGastosPorDiaDelMes.series[0].data = dias
    },
    selectMonth () {
      const resGastos = []
      const resIngresos = []
      date.formatDate(new Date(), 'M')
      for (let i = 0; i < this.dataGastos.length; i++) {
        if (parseInt(date.formatDate(new Date(this.dataGastos[i].fecha), 'M')) === this.monthSelected.value) {
          resGastos.push(this.dataGastos[i])
        }
      }
      for (let i = 0; i < this.dataIngresos.length; i++) {
        if (parseInt(date.formatDate(new Date(this.dataIngresos[i].fecha), 'M')) === this.monthSelected.value) {
          resIngresos.push(this.dataIngresos[i])
        }
      }
      return {
        incoming: resIngresos,
        outcoming: resGastos
      }
    }
  }
}
</script>
