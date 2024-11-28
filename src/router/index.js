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
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/user/register",
            name: "register",
            component: () => import("@/views/auth/RegisterView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/user/profile",
            name: "profile",
            component: () => import("@/views/user/ProfileView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/trainings",
            name: "trainings",
            component: () => import("@/views/training/TrainingsView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/trainings/:id",
            name: "training",
            component: () => import("@/views/training/TrainingView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/memberships",
            name: "memberships",
            component: () => import("@/views/training/MembershipsView.vue"),
            meta: {
                middleware: [auth],
            }
        },
        {
            path: "/memberships/:id",
            name: "membership",
            component: () => import("@/views/training/MembershipView.vue"),
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
            const result = await middleware[i](to, from);

            if (typeof result === "object") {
                return result;
            }
        }
    }
});

export default router;
