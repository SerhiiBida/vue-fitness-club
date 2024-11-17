import {createRouter, createWebHistory} from 'vue-router'

import auth from "@/middleware/auth.js";

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
            path: "/workouts",
            name: "workouts",
            component: () => import("@/views/training/WorkoutsView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/views/errors/NotFoundView.vue"),
        },
    ]
});

// Проверки перед переходом
router.beforeEach(async (to, from) => {
    // Запуск промежуточных проверок
    const middleware = to.meta?.middleware;

    if (Array.isArray(middleware)) {
        for (let i = 0; i < middleware.length; i++) {
            const result = middleware[i](to, from);

            console.log(typeof result)

            if (typeof result === "object") {
                return result;
            }
        }
    }
});

export default router
