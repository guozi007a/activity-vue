const Admin = () => import('~/activity/admin/home.vue')
const Dashboard = () => import('~/activity/admin/dashboard.vue')
const ActivityList = () => import('~/activity/admin/activity-list.vue')
const ActivityAdd = () => import('~/activity/admin/activity-add.vue')
const IdCreate = () => import('~/activity/admin/id-create.vue')
const IdSearch = () => import('~/activity/admin/id-search.vue')
const EventTrackingInteractive = () => import('~/activity/admin/event-tracking-logs/interactive.vue')

export const adminRoutes = [
    { 
        path: '/admin',
        component: Admin,
        redirect: '/admin/dashboard',
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'activity-list', component: ActivityList },
            { path: 'activity-add', component: ActivityAdd },
            {
                path: 'id-manage',
                children: [
                    { path: 'create', component: IdCreate },
                    { path: 'search', component: IdSearch },
                ]
            },
            {
                path: 'event-tracking-logs',
                children: [
                    { path: 'interactive', component: EventTrackingInteractive },
                ]
            }
        ]
    }
]