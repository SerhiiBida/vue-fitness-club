import {useCookie} from "@/composables/useCookie.js";

const {getCookie} = useCookie();

// Проверка авторизации пользователя
export default function auth(to, from) {
    const authPages = ["login", "register"];

    // Авторизованный, пытается зарегистрироваться
    if (authPages.includes(to.name) && typeof getCookie("token") !== "undefined") {
        return {
            name: "workouts"
        };
    }

    // setCookie("token", "", {'max-age': 0});
    if (typeof getCookie("token") === "undefined") {
        return {
            name: "login"
        };
    }

    // Проверить токен на валидность
    // ...

    // Обновить данные про пользователя в Store
    // ...

    return true;
}