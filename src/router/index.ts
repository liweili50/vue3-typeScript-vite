import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../components/Layout.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            component: Layout,
            children: [
                { path: '/dashboard', component: () => import('../views/dashboard/index.vue') },
                { path: '/table', component: () => import('../views/table/index.vue') },
            ]
        },
        { path: '/login', component: () => import('../views/login/index.vue') },
    ],
})


export default router