import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import CameraPage from '@/components/CameraPage'
// import ZoomPage from '@/components/ZoomPage'
import ScanPage from '@/components/ScanPage'

Vue.use(IonicVueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CameraPage,
  },
  // {
  //   path: '/zoom',
  //   name: 'zoom',
  //   component: ZoomPage,
  // },
  {
    path: '/scan',
    name: 'scan',
    component: ScanPage,
  }
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
