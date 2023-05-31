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
        >
          <div class="text-white text-center text-h6">MyGuardMoney</div>
          <div class="text-white text-center text-subtitle2">Manejar tus gastos nunca había sido tan fácil</div>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { functions } from '../functions'

const linksData = [
  {
    title: 'Gastos',
    icon: 'attach_money',
    link: 'expenses'
  },
  {
    title: 'Tipos gastos',
    icon: 'article',
    link: 'expenses-types'
  },
  {
    title: 'Ingresos',
    icon: 'account_balance',
    link: 'incomings'
  },
  {
    title: 'Análisis',
    icon: 'analytics',
    link: 'analysis'
  },
  {
    title: 'Recordatorios',
    icon: 'notifications_active',
    link: 'reminders'
  },
  {
    title: 'Configuración',
    icon: 'settings',
    link: 'settings'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
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
