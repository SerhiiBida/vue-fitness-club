import {useCookie} from "@/composables/useCookie.js";
import {useAuth} from "@/composables/Auth/useAuth.js";
import {useUserStore} from "@/stores/user.js";

// Проверка авторизации пользователя
export default async function auth(to, from) {
    const {getCookie} = useCookie();
    const {checkAuthentication} = useAuth();
    const userStore = useUserStore();

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
            name: "trainings"
        };
    }

    // Не авторизован
    if (!authPages.includes(to.name) && !isAuthenticated) {
        return {
            name: "login"
        };
    }

    // Обновить данные про пользователя в Store
    if (isAuthenticated && !userStore.isAuthenticated) {
        await userStore.updateUser();
    }

    return true;
}