<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10 container">
                <highcharts :options="chartOptions1"></highcharts>
                <highcharts :options="chartOptions2"></highcharts>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import { functions } from '../functions.js'
import { Chart } from 'highcharts-vue'

export default {
  name: 'gastos',
  mixins: [functions],
  components: {
    highcharts: Chart
  },
  data () {
    return {
      dataTipos: [],
      dataGastos: [],
      chartOptions1: {
        chart: {
          type: 'area'
        },
        title: {
          text: 'Gastos este mes'
        },
        xAxis: {
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
      chartOptions2: {
        colorAxis: {
          minColor: '#F2f2f2',
          maxColor: '#E9BC36'
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: [{ name: '', value: '1', color: '#E9BC36' }]
        }],
        title: {
          text: 'Gastos por categoria'
        }
      }
    }
  },
  async mounted () {
    await this.getData()
    this.organiceByType()
    this.organiceByMonth()
  },
  methods: {
    async getData () {
      this.dataTipos = await this.getDataCollection('tipos', 'id', 'desc')
      this.dataGastos = await this.getDataCollection('gastos', 'id', 'desc')
      this.dataGastosMes = this.justThisMonth(this.dataGastos)
    },
    organiceByType () {
      this.chartOptions2.series[0].data = []
      for (let i = 0; i < this.dataTipos.length; i++) {
        this.dataTipos[i].valor = 0
        for (let j = 0; j < this.dataGastosMes.length; j++) {
          if (this.dataTipos[i].id === this.dataGastosMes[j].tipo.id) {
            this.dataTipos[i].valor += parseInt(this.dataGastosMes[j].valor)
          }
        }
        this.chartOptions2.series[0].data.push({ name: this.dataTipos[i].nombre, value: this.dataTipos[i].valor, color: this.dataTipos[i].color })
      }
    },
    organiceByMonth () {
      const dias = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < this.dataGastosMes.length; i++) {
        const fecha = new Date(this.dataGastosMes[i].fecha)
        const dia = fecha.getDate()
        if (dias[dia] === 0) {
          dias[dia] = parseInt(this.dataGastosMes[i].valor)
        } else {
          dias[dia] += parseInt(this.dataGastosMes[i].valor)
        }
      }
      this.chartOptions1.series[0].data = dias
    },
    justThisMonth (array) {
      const fecha = new Date()
      const res = []
      for (let i = 0; i < this.dataGastos.length; i++) {
        if (new Date(this.dataGastos[i].fecha).getMonth === fecha.getMonth) res.push(this.dataGastos[i])
      }
      return res
    }
  }
}
</script>
