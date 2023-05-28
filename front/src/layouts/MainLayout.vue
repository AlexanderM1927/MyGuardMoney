<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          MyGuardMoney
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-white text-center text-h6"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :view="view"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <gastos v-if="view === 'gastos'"></gastos>
      <tipos-gastos v-if="view === 'tipos-gastos'"></tipos-gastos>
      <analisis v-if="view === 'analisis'"></analisis>
      <ingresos v-if="view === 'ingresos'"></ingresos>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Gastos from 'components/Gastos.vue'
import TiposGastos from 'components/TiposGastos.vue'
import Analisis from 'components/Analisis.vue'
import Ingresos from 'components/Ingresos.vue'
import { functions } from '../functions'

const linksData = [
  {
    title: 'Gastos',
    icon: 'attach_money',
    link: 'gastos'
  },
  {
    title: 'Tipos gastos',
    icon: 'article',
    link: 'tipos-gastos'
  },
  {
    title: 'Ingresos',
    icon: 'account_balance',
    link: 'ingresos'
  },
  {
    title: 'Analisis',
    icon: 'analytics',
    link: 'analisis'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, Gastos, TiposGastos, Analisis, Ingresos },
  mixins: [functions],
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  props: ['view']
}
</script>
