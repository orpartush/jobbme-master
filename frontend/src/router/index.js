import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import AddPosition from '@/views/AddPosition/AddPosition.vue'
import EditPosition from '@/views/EditPosition/EditPosition.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import PositionList from '@/components/PositionList/PositionList.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'positions',
        name: 'PositionList',
        component: PositionList
      },
      {
        path: 'new-position',
        name: 'AddPosition',
        component: AddPosition
      },
      {
        path: 'edit-position',
        name: 'EditPosition',
        component: EditPosition
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/getIsAuthenticated']
  if (to.name === 'Home' && isAuthenticated) next({ name: 'PositionList' })
  else if ((to.name === 'Home' || to.name === 'PositionList') && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
