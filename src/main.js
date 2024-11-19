import "./assets/css/main.css";

import {createApp} from "vue";
import {createPinia} from "pinia";
import VueAxios from "vue-axios";
import axios from "axios";
import vue3GoogleLogin from 'vue3-google-login'

import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify.js";
import env from "../env.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueAxios, axios);
app.use(vue3GoogleLogin, {
    clientId: env.googleClientId
})

app.mount("#app");
