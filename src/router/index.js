import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/user/login",
            name: "login",
            component: () => import("@/views/auth/LoginView.vue"),
        },
        {
            path: "/user/register",
            name: "register",
            component: () => import("@/views/auth/RegisterView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/views/errors/NotFoundView.vue"),
        },
    ]
});

export default router
