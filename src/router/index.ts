import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/Stores/userStore'


const authCheck = (to: any, from: any, next: any) => {
  const userStore = useUserStore()

  if (userStore.isLoggedIn) {
    if (to.name === 'login') {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/Dashboard/Dashboard.vue'),
    beforeEnter: authCheck,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'pending-inspection-reports',
    path: '/pending-inspection-reports',
    component: () => import('@/pages/InspectionReports/PendingInspectionReports.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'completed-inspections-reports',
    path: '/completed-inspections-reports',
    component: () => import('@/pages/InspectionReports/CompletedInspectionReports.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'create-inspection-report',
    path: '/reports/create/:id',
    component: () => import('@/pages/InspectionReports/CreateInspectionReport.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'edit-inspection-report',
    path: '/reports/edit/:id',
    component: () => import('@/pages/InspectionReports/EditInspectionReport.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'view-inspection-report',
    path: '/reports/view/:id',
    component: () => import('@/pages/InspectionReports/ViewInspectionReport.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'knowledge-base',
    path: '/knowledge-base',
    component: () => import('@/pages/KnowledgeBase/KnowledgeBase.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@/pages/Settings/Settings.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'settings-user',
    path: '/settings/user',
    component: () => import('@/pages/Settings/UserSettings.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'information',
    path: '/information',
    component: () => import('@/pages/Information/About.vue'),
    beforeEnter: authCheck,
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/pages/Search/SearchReports.vue'),
    beforeEnter: authCheck,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
