import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import HomePage from '@/components/HomePage'
import CameraPage from '@/components/CameraPage'
// import ZoomPage from '@/components/ZoomPage'
import ScanPage from '@/components/ScanPage'
import FormPage from '@/components/FormPage'
import BadgePage from '@/components/BadgePage'

Vue.use(IonicVueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/photos',
    name: 'photos',
    component: CameraPage,
  },
  {
    path: '/scan',
    name: 'scan',
    component: ScanPage,
  },
  {
    path: '/badge',
    name: 'badge',
    component: BadgePage,
  },
  {
    path: '/forms',
    name: 'forms',
    component: FormPage,
  },
  // {
  //   path: '/zoom',
  //   name: 'zoom',
  //   component: ZoomPage,
  // },
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
