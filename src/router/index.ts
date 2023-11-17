import { createRouter, createWebHistory } from "vue-router";
import { adminRoutes } from "./admin-route";
import { activityRoutes } from "./activity-route";

const routes = [
    ...adminRoutes,
    ...activityRoutes,
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})