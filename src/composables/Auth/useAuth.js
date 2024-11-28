import api from "@/api/axios.js";
import {useCookie} from "@/composables/useCookie.js";
import {useUserStore} from "@/stores/user.js";

export const useAuth = (router = undefined, displayServerErrors = undefined) => {
    const {setCookie} = useCookie();
    const userStore = useUserStore();

    const register = async (form) => {
        try {
            const response = await api.post("/auth/register", form);

            const token = response.data.token;

            setCookie("token", token, {secure: true, "max-age": 7200})

            await router.push({
                name: "trainings"
            });

        } catch (error) {
            if (error.response?.status === 422) {
                const rawErrors = error.response.data.errors;

                displayServerErrors.general = error.response.data?.message;

                sortErrors(rawErrors);
            } else {
                displayServerErrors.general = "Try again later";
            }
        }
    };

    const login = async (form) => {
        try {
            const response = await api.post("/auth/login", form);

            const token = response.data.token;

            setCookie("token", token, {secure: true, "max-age": 7200})

            await router.push({
                name: "trainings"
            });

        } catch (error) {
            if (error.response?.status === 422) {
                const rawErrors = error.response.data.errors;

                console.log(error.response.data);

                displayServerErrors.general = error.response.data?.message;

                sortErrors(rawErrors);
            } else {
                displayServerErrors.general = "Try again later";
            }
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
        } catch (error) {
            console.log(error.response?.status);
        }

        userStore.resetUser();

        setCookie("token", "", {"max-age": 0});

        await router.push({
            name: "login"
        });
    };

    // Проверка авторизации
    const checkAuthentication = async () => {
        try {
            const response = await api.post("/auth/check");

            return true;

        } catch (error) {
            userStore.resetUser();

            setCookie("token", "", {"max-age": 0});

            return false;
        }
    };

    const sortErrors = (rawErrors) => {
        Object.keys(rawErrors).forEach((key) => {
            displayServerErrors[key].push(...rawErrors[key]);
        });
    };

    return {
        register,
        login,
        logout,
        checkAuthentication
    }
};