import axios from 'axios';
import {getAccessToken} from '@/util/auth';



//更新下面的baseURL时也要更新这里的。
export const BASEURL = 'http://43.142.90.238:28080';
 //export const BASEURL = 'http://localhost:28080';
const service = axios.create({

    //baseURL: 'http://localhost:28080',
     baseURL: 'http://43.142.90.238:28080',
    // baseURL: 'https://mock.apifox.cn/m1/2428381-0-default/admin-api',

  timeout: 5000
});

service.interceptors.request.use(
  config => {
    // 在请求发送之前对请求数据进行处理
    // ...
    if (getAccessToken() ) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // 对响应数据进行处理
    // ...
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
