<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green" elevated>
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
      content-class="bg-green text-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-white"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <gastos v-if="view === 'gastos'"></gastos>
      <tipos-gastos v-if="view === 'tipos-gastos'"></tipos-gastos>
      <analisis v-if="view === 'analisis'"></analisis>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Gastos from 'components/Gastos.vue'
import TiposGastos from 'components/TiposGastos.vue'
import Analisis from 'components/Analisis.vue'
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
    link: 'tiposgastos'
  },
  {
    title: 'Analisis',
    icon: 'analytics',
    link: 'analisis'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, Gastos, TiposGastos, Analisis },
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
