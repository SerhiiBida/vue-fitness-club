import api from "@/api/axios.js";
import {useCookie} from "@/composables/useCookie.js";

export const useAuth = (router, displayServerErrors) => {
    const {setCookie} = useCookie();

    const register = async (form) => {
        try {
            const response = await api.post("/auth/register", form);

            const token = response.data.token;

            setCookie("token", token, {secure: true, 'max-age': 7200})

            await router.push({
                name: "workouts"
            });

        } catch (error) {
            if (error.response?.status === 422) {
                const rawErrors = error.response.data.errors;

                sortErrors(rawErrors);
            } else {
                displayServerErrors.general = "Try again later";
            }
        }
    }

    const sortErrors = (rawErrors) => {
        Object.keys(rawErrors).forEach((key) => {
            displayServerErrors[key].push(...rawErrors[key]);
        });
    }

    return {
        register
    }
}

// export default class UseAuth {
//     constructor(serverErrors) {
//         this.serverErrors = serverErrors;
//     }
//
//     async login(form) {
//         try {
//             const response = await api.post("/auth/login", form);
//
//             console.log(response.data.user);
//
//         } catch (error) {
//             // this.serverError.value = "Try again later";
//         }
//     }
//
//     async register(form) {
//         try {
//             const response = await api.post("/auth/register", form);
//
//             const token = response.data.token;
//
//             setCookie()
//
//         } catch (error) {
//             if (error.response.status === 422) {
//                 this.getSortErrors(error.response.data.errors);
//             } else {
//                 this.serverErrors.general = "Try again later";
//             }
//         }
//     }
//
//     logout() {
//
//     }
//
//     getSortErrors(errors) {
//         Object.keys(errors).forEach((key) => {
//             this.serverErrors[key].push(...errors[key]);
//         });
//     }
// }