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
import Calc from './pages/Calc.vue'
import NewSector from './pages/NewSector.vue'
import SectorID from './pages/SectorID.vue'
import Sectors from './pages/Sectors.vue'
import Sector from './pages/Sector.vue'

const routes = [
    {
        path: '/',
        redirect: '/client',
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
    {
        path: '/calc',
        name: 'Calc',
        component: Calc,
    },
    {
        path: '/admin/newSector',
        name: 'NewSector',
        component: NewSector,
    },
    {
        path: '/admin/sector/:id',
        name: 'SectorID',
        component: SectorID,
    },
    {
        path: '/sectors',
        name: 'Sectors',
        component: Sectors,
    },
    {
        path: '/sector',
        name: 'Sector',
        component: Sector,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    auth.onAuthStateChanged(user => {
        if (to.name === 'Admin' && !user) next({ name: 'Login'})
        else next()
    })
})

export default router