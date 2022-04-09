import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/base.css";
import axios from "axios";

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

app.config.globalProperties.$axios = axios;
app.use(router);

app.mount("#app");
