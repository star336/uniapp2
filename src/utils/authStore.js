// authStore.js
import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        isLoggingIn: false,
        doubleMode: {
            a_score: 0,
            a_win_round: 0,
            a_fault: 0,
            a_max: 0,
            b_score: 0,
            b_win_round: 0,
            b_fault: 0,
            b_max: 0,
            total_round: 0,
            done_round: 0,
            user_index: 0,
            double_use_time: 0,
            double_timer_status: 0,
        }
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
        },
        addPiniaUseTime() {
            // 每次调用 updateUseTime 时，将 double_use_time 加 1
            this.doubleMode.double_use_time += 1;
        },
        setDoubleMode(data) {
            // 可以直接覆盖整个对象
            this.doubleMode = data;
        },
        updateDoubleMode(name, value) {
            // 也可以更新对象中的某个属性
            this.doubleMode[name] = value;
        }
    },
    setup() {
        const doubleTimer = ref < NodeJS.Timeout | null > null;
        return {
            doubleTimer
        };
    },
    persist: true // 开启持久化
});