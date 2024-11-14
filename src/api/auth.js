import api from "@/api/axios.js";

export default class Auth {
    constructor(serverError) {
        this.serverError = serverError;
    }

    async login() {
        try {
            const response = await api.post("/auth/login");

            this.serverError = response.data;
        } catch (error) {
            this.serverError = error;
        }
    }

    register() {

    }

    logout() {

    }
}