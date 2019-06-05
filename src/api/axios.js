import axios from 'axios'
import { Message } from 'element-ui';
axios.defaults.baseURL = 'http://localhost:8886'
axios.defaults.withCredentials = true;
//添加请求拦截器
axios.interceptors.request.use(
    config => {
        config.params = Object.assign({})
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//添加响应拦截器
axios.interceptors.response.use(
    res => {
        if(res.status == 200){
            if(res.data.code==0){
                return res.data.data
            }else{
                Message.error(res.data.msg);
                return Promise.reject(res);
            }
        }else {
            return Promise.reject(res)
    }
    },
    error => {
        return error.response.data
    }
)
export default {
    baseURL: axios.defaults.baseURL,
    get: function (url, data = {}, headers) {
        return axios.get(url, data,headers)
    },
    post: function (url, data = {}) {
        return axios.post(url, data)
    },
    put: function (url, data = {}) {
        return axios.put(url, data);
    },
    delete: function (url, data = {}) {
        return axios.delete(url, data);
    },
    all: function (parmars) {
        return axios.all(parmars);
    },
    spread: function (cb) {
        return axios.spread(cb);
    }
}