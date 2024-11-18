import {useCookie} from "@/composables/useCookie.js";
import {useAuth} from "@/composables/Auth/useAuth.js";

const {getCookie} = useCookie();
const {checkAuthentication} = useAuth();

// Проверка авторизации пользователя
export default async function auth(to, from) {
    const authPages = ["login", "register"];

    let isAuthenticated;

    // Статус авторизации
    if (typeof getCookie("token") !== "undefined") {
        isAuthenticated = await checkAuthentication();
    } else {
        isAuthenticated = false;
    }

    // Авторизованный, пытается зарегистрироваться
    if (authPages.includes(to.name) && isAuthenticated) {
        return {
            name: "workouts"
        };
    }

    // Не авторизован
    if (!authPages.includes(to.name) && !isAuthenticated) {
        return {
            name: "login"
        };
    }

    // Обновить данные про пользователя в Store
    // ...

    return true;
}