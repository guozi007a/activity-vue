const Admin = () => import('~/activity/admin/home.vue')
const Dashboard = () => import('~/activity/admin/dashboard.vue')
const ActivityList = () => import('~/activity/admin/activity-list.vue')
const IdCreate = () => import('~/activity/admin/id-create.vue')
const IdSearch = () => import('~/activity/admin/id-search.vue')

export const adminRoutes = [
    { 
        path: '/admin',
        component: Admin,
        redirect: '/admin/dashboard',
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'activity-list', component: ActivityList },
            {
                path: 'id-manage',
                children: [
                    { path: 'create', component: IdCreate },
                    { path: 'search', component: IdSearch },
                ]
            }
        ]
    }
]