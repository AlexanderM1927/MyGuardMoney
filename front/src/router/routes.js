
const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Expenses.vue') }
    ],
    props: {
      view: 'expenses'
    }
  },
  {
    name: 'expenses-types',
    path: '/expenses-types',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Tipos de gastos', path: '', component: () => import('pages/Types.vue') }
    ],
    props: {
      view: 'expenses-types'
    }
  },
  {
    name: 'expenses',
    path: '/expenses',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Gastos', path: '', component: () => import('pages/Expenses.vue') }
    ],
    props: {
      view: 'expenses'
    }
  },
  {
    name: 'analysis',
    path: '/analysis',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Analisis', path: '', component: () => import('pages/Analysis.vue') }
    ],
    props: {
      view: 'analysis'
    }
  },
  {
    name: 'incomings',
    path: '/incomings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Ingresos', path: '', component: () => import('pages/Incomings.vue') }
    ],
    props: {
      view: 'incomings'
    }
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Ingresos', path: '', component: () => import('pages/Settings.vue') }
    ],
    props: {
      view: 'settings'
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
