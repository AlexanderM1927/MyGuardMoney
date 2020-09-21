
const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'gastos'
    }
  },
  {
    name: 'tipos-gastos',
    path: '/tiposgastos',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'tipos-gastos'
    }
  },
  {
    name: 'gastos',
    path: '/gastos',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'gastos'
    }
  },
  {
    name: 'analisis',
    path: '/analisis',
    component: () => import('layouts/MainLayout.vue'),
    props: {
      view: 'analisis'
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
