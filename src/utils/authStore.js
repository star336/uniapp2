// authStore.js
import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        isLoggingIn: false
    }),
    getters: {
        isTokenValid: (state) => !!state.token
    },
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        removeToken() {
            this.token = null;
            localStorage.removeItem('token');
        },
        startLoggingIn() {
            this.isLoggingIn = true;
        },
        endLoggingIn() {
            this.isLoggingIn = false;
        }
    }
});