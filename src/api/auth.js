import api from "@/api/axios.js";

export default class Auth {
    constructor(serverError) {
        this.serverError = serverError;
    }

    async login(form) {
        try {
            const response = await api.post("/auth/login", form);

            console.log(response.data.user);

            this.serverError.value = response.data.user;
        } catch (error) {
            this.serverError.value = "Try again later";
        }
    }

    async register(form) {
        try {
            const response = await api.post("/auth/register", form);

            console.log(response.data.user);

            this.serverError.value = response.data.user;
        } catch (error) {
            this.serverError.value = "Try again later";
        }
    }

    logout() {

    }
}