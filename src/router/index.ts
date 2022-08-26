import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('../views/login/index.vue') },

        { path: '/table', component: () => import('../views/table/index.vue') },
    ],
})


export default router