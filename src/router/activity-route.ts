const Play_2399 = () => import('~/activity/play_2399/play_2399.vue')


export const activityRoutes = [
    {
        path: '/activity_',
        children: [
            { path: 'play_2399', component: Play_2399 },
        ]
    }
]