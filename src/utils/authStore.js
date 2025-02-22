// authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        isLoggingIn: false
    }),
    getters: {
        isTokenValid: (state) => !!state.token
    },
    actions: {
        setToken(token) {
            this.token = token;
        },
        removeToken() {
            this.token = null;
        },
        startLoggingIn() {
            this.isLoggingIn = true;
        },
        endLoggingIn() {
            this.isLoggingIn = false;
        }
    },
    persist: true // 开启持久化
});