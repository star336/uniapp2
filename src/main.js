import {
    createSSRApp
} from "vue";
import App from "./App.vue";
import uView from './uni_modules/vk-uview-ui';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


// 打印环境变量
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.VITE_VERSION);

export function createApp() {
    const app = createSSRApp(App);
    app.use(uView)
    app.use(pinia)
    return {
        app,
    };
}
