import axios from "axios";

import {useCookie} from "@/composables/useCookie.js";

const {getCookie} = useCookie();

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
    const token = getCookie("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;