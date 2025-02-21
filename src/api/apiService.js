// apiService.js
import request from '../utils/request';

class ApiService {
    constructor() {
        this.request = request;
    }

    // OA 登录请求
    async OALogin(data) {
        return this.request.post('/login/oaLogin', data);
    }

    // 获取需要 token 的数据
    async getNeedTokenData() {
        return this.request.get('/api/need-token');
    }

    // 其他请求方法可以根据需求继续添加
    async postAnotherNeedTokenData(data) {
        return this.request.post('/api/another-need-token', data);
    }
}

// 创建 ApiService 类的实例
const apiService = new ApiService();

// 导出实例
export default apiService;