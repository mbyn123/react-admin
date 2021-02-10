import axios from 'axios'
import {getUserInfo} from "@/utils/session"

var http = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    config.headers['Token'] =  getUserInfo().token
    config.headers['Username'] = getUserInfo().username
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    console.log(response)
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http