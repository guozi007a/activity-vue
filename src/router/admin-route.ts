const Admin = () => import('~/activity/admin/home.vue')
const Dashboard = () => import('~/activity/admin/dashboard.vue')
const ActivityList = () => import('~/activity/admin/activity-list.vue')
const ActivityAdd = () => import('~/activity/admin/activity-add.vue')
const IdCreate = () => import('~/activity/admin/id-create.vue')
const IdSearch = () => import('~/activity/admin/id-search.vue')
const EventTrackingInteractive = () => import('~/activity/admin/event-tracking-logs/interactive.vue')
const Charge = () => import('~/activity/admin/charge.vue')
const ChargeLogs = () => import('~/activity/admin/charge-logs.vue')
const Gifts = () => import('~/activity/admin/gifts/gifts.vue')

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
            },
            {
                path: 'charge',
                children: [
                    { path: 'index', component: Charge },
                    { path: 'logs', component: ChargeLogs },
                ]
            },
            { path: 'gifts', component: Gifts },
        ]
    }
]