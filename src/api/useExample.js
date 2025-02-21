// 在其他模块中使用封装好的请求方法
import apiService from './apiService';

// 调用 OA 登录方法
apiService.OALogin({ username: 'user', password: 'pass' })
    .then(response => {
        console.log('OA 登录成功:', response);
    })
    .catch(error => {
        console.error('OA 登录失败:', error);
    });

// 调用获取需要 token 的数据方法
apiService.getNeedTokenData()
    .then(response => {
        console.log('获取需要 token 的数据成功:', response);
    })
    .catch(error => {
        console.error('获取需要 token 的数据失败:', error);
    });