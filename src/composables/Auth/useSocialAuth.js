import {googleAuthCodeLogin} from "vue3-google-login";
import {useRouter} from "vue-router";

import {useCookie} from "@/composables/useCookie.js";
import api from "@/api/axios.js";

export const useSocialAuth = (displayServerErrors, resetDisplayServerErrors) => {
    const router = useRouter();
    const {setCookie} = useCookie();

    // Создаем свою сессию пользователя(Laravel:Sanctum)
    const createAuthorizationSession = async (authorizationCode) => {
        try {
            const response = await api.post(
                "/auth/login-google",
                {code: authorizationCode}
            );

            const token = response.data.token;

            setCookie("token", token, {secure: true, "max-age": 7200})

            await router.push({
                name: "workouts"
            });

        } catch (error) {
            const status = error.response.status;
            const inputError = error.response.data?.error;

            if ((status === 400 || status === 500) && typeof inputError === "string") {
                displayServerErrors.general = inputError;
            } else {
                displayServerErrors.general = "Please try again later";
            }
        }
    };

    const loginGoogle = async () => {
        resetDisplayServerErrors();

        try {
            const response = await googleAuthCodeLogin();

            const authorizationCode = response.code;

            await createAuthorizationSession(authorizationCode);

        } catch (error) {
            displayServerErrors.general = "Please try again later";
        }
    }

    return {
        loginGoogle
    };
}