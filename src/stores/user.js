import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {useRouter} from "vue-router";

import api from "@/api/axios.js";
import {useCookie} from "@/composables/useCookie.js";

export const useUserStore = defineStore("user", () => {
    const {getCookie} = useCookie();
    const router = useRouter();

    const user = reactive({
        token: "",
        username: "",
        email: "",
        roleName: "",
        isAuthenticated: false
    });

    const isAuthenticated = computed(() => {
        return user.isAuthenticated;
    });

    function reset() {
        Object.keys(user).forEach((key) => {
            if (typeof user[key] === "string") {
                user[key] = "";
            } else {
                user[key] = false;
            }
        });
    }

    // Обновить с сервера данные про пользователя
    async function updateUser() {
        try {
            const response = await api.get("/users/current");

            const userData = response.data.user;

            Object.keys(user).forEach((key) => {
                if (key === "token") {
                    user[key] = getCookie("token");

                } else if (key === "isAuthenticated") {
                    user[key] = true;

                } else if (key === "roleName") {
                    user[key] = userData["role_name"];

                } else {
                    user[key] = userData[key];
                }
            });

        } catch (error) {
            if (error.response.status === 402) {
                reset();

                await router.push({
                    name: "login"
                });
            }
        }
    }

    return {
        user,
        isAuthenticated,
        updateUser
    };
});