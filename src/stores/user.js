import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useUserStore = defineStore("user", () => {
    const user = reactive({
        token: "",
        username: "",
        email: "",
        isAuthenticated: false
    });

    const getUser = computed(() => {
        return user;
    });

    const isAuthenticated = computed(() => {
        return user.isAuthenticated;
    });

    function setUser(userData) {
        Object.keys(user).forEach((key) => {
            user[key] = userData[key];
        });
    }

    return {
        getUser,
        isAuthenticated,
        setUser
    };
});