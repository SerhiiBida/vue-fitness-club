import {useCookie} from "@/composables/useCookie.js";

const {getCookie} = useCookie();

// Проверка авторизации пользователя
export default function auth(to, from) {
    // setCookie("token", "", {'max-age': 0});

    if (typeof getCookie("token") === "undefined") {
        return {
            name: "login"
        };
    }

    return true;
}