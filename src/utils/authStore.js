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
            a_max_tmp: 0,
            b_score: 0,
            b_win_round: 0,
            b_fault: 0,
            b_max: 0,
            b_max_tmp: 0,
            total_round: 0,
            done_round: 0,
            user_index: 0,
            double_use_time: 0,
            double_timer_status: 0,
            is_finish: 0,
            records:[],
            fight_history:[]
        },
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
            for (let key in data) {
                if (this.doubleMode.hasOwnProperty(key)) {
                    // 如果原始对象中有该键，则替换其值
                    this.doubleMode[key] = data[key];
                }
                // 如果原始对象没有该键，保留原始值，不做任何改变
            }
        },
        initDoubleMode(){
            this.doubleMode = {
                a_score: 0,
                a_win_round: 0,
                a_fault: 0,
                a_max: 0,
                a_max_tmp: 0,
                b_score: 0,
                b_win_round: 0,
                b_fault: 0,
                b_max: 0,
                b_max_tmp: 0,
                total_round: 0,
                done_round: 0,
                user_index: 0,
                double_use_time: 0,
                double_timer_status: 0,
                is_finish: 0,
                records:[],
                fight_history:[]
            }
        },
        updateDoubleMode(name, value) {
            // 也可以更新对象中的某个属性
            this.doubleMode[name] = value;
        },
        addDoubleModeHistory(data) {
            this.doubleModeHistory.push(data)
            console.log("3333",this.doubleModeHistory)
        },
    },
    setup() {
        const doubleTimer = ref < NodeJS.Timeout | null > null;
        return {
            doubleTimer
        };
    },
    persist: true // 开启持久化
});