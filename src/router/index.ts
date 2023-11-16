import { createRouter, createWebHistory } from "vue-router";

const Play_2399 = () => import('~/activity/play_2399/play_2399.vue')
const Admin = () => import('~/activity/admin/home.vue')

const routes = [
    { 
        path: '/admin',
        component: Admin,
    },
    {
        path: '/activity_',
        children: [
            { path: 'play_2399', component: Play_2399 },
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})