// request.js
import {useRouter} from 'vue-router';
import axios from 'axios';
import {useAuthStore} from './authStore';

class Request {
    constructor() {
        this.router = useRouter();
        this.apiConfig = {
            // 配置哪些 API 需要 token，这里可以根据实际情况添加或修改
            '/api/need-token': true,
            '/api/another-need-token': true
        };
        // 登录接口的 URL，根据实际情况修改
        this.loginUrl = '/api/login';
        this.authStore = useAuthStore();
    }

    // 检查 token 是否有效，可根据后端逻辑添加过期时间验证
    isTokenValid() {
        return this.authStore.isTokenValid;
    }

    // 获取 token
    getToken() {
        return this.authStore.token;
    }

    // 设置 token
    setToken(token) {
        this.authStore.setToken(token);
    }

    // 请求登录获取 token
    async requestLoginToken(loginData) {
        try {
            this.authStore.startLoggingIn();
            const response = await axios.post(this.loginUrl, loginData);
            const newToken = response.data.token; // 假设返回结果中有 token 字段
            this.setToken(newToken);
            return newToken;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            this.authStore.endLoggingIn();
        }
    }

    // 处理需要登录的情况
    async handleLogin() {
        // 跳转到登录页
        await this.router.push({name: 'Login'});
        // 等待登录完成，通过 Pinia 状态监听
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.isTokenValid()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 500);
        });
    }

    // 发送请求的通用方法
    async sendRequest(method, url, data = {}) {
        let headers = {};
        const needToken = this.apiConfig[url];

        if (needToken) {
            if (!this.isTokenValid()) {
                if (this.authStore.isLoggingIn) {
                    // 避免重复登录请求
                    await this.handleLogin();
                } else {
                    // 从 Pinia 存储中获取登录数据，可根据实际情况修改
                    const loginData = {username: 'yourUsername', password: 'yourPassword'};
                    await this.requestLoginToken(loginData);
                }
            }
            headers.Authorization = `Bearer ${this.getToken()}`;
        }

        try {
            const response = await axios({
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                data: method === 'POST' ? data : undefined
            });
            return response.data;
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) {
                // token 无效，重新登录
                this.authStore.removeToken();
                await this.handleLogin();
                return this.sendRequest(method, url, data);
            }
            console.error('Request error:', error);
            throw error;
        }
    }

    // get 请求方法
    async get(url) {
        return this.sendRequest('GET', url);
    }

    // post 请求方法
    async post(url, data) {
        return this.sendRequest('POST', url, data);
    }
}

// 创建请求实例
const request = new Request();

export default request;