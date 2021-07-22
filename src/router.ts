import { createRouter, createWebHistory } from 'vue-router'

import { auth } from './composables/fireConf'
import Review from './pages/Review.vue'
import Home from './pages/Home.vue'
import Education from './pages/Education.vue'
import Ideas from './pages/Ideas.vue'
import Contacts from './pages/Contacts.vue'
import Algo from './pages/Algo.vue'
import Ideasland from './pages/Ideasland.vue'
import Mvp from './pages/Mvp.vue'
import MvpID from './pages/MvpID.vue'
import Admin from './pages/Admin.vue'
import AdminID from './pages/AdminID.vue'
import NewStock from './pages/NewStock.vue'
import Login from './pages/Login.vue'
import Client from './pages/Client.vue'
import Analytics from './pages/Analytics.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/review',
        name: 'Review',
        component: Review,
    },
    {
        path: '/education',
        name: 'Education',
        component: Education,
    },
    {
        path: '/ideas',
        name: 'Ideas',
        component: Ideas,
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
    },
    {
        path: '/algo',
        name: 'Algo',
        component: Algo,
    },
    {
        path: '/Ideasland',
        name: 'Ideasland',
        component: Ideasland,
    },
    {
        path: '/mvp',
        name: 'Mvp',
        component: Mvp,
    },
    {
        path: '/mvp/:id',
        name: 'MvpID',
        component: MvpID,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/admin/:id',
        name: 'AdminID',
        component: AdminID,
    },
    {
        path: '/admin/newStock',
        name: 'NewStock',
        component: NewStock,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/client',
        name: 'Client',
        component: Client,
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
// const canAccess = async () => {
//     return auth.currentUser
// }
// router.beforeEach(async (to, from) => {
//     const user = await canAccess()
//     if (to.name === 'Admin' && !user) return '/login'
// })

export default router