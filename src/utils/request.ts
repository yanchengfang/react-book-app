import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { message as AntdMessage } from "antd";

interface AxiosInstanceType extends AxiosInstance {
  get< T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete< T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head< T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options< T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post< T = unknown>(url: string, data?:unknown, config?: AxiosRequestConfig): Promise<T>; 
  put< T = unknown>(url: string, data?:unknown, config?: AxiosRequestConfig): Promise<T>; 
  patch< T = unknown>(url: string, data?:unknown, config?: AxiosRequestConfig): Promise<T>; 
}

const instance: AxiosInstanceType = axios.create({
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  console.log(config, "请求拦截器==>")
  return config;
}, (error) => {
   return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  console.log(response, "响应拦截器<==")
  const { data, status } = response
  if (status === 200) {
    return data
  } else if (status === 401) {
    // 跳转登录
  } else {
    AntdMessage.error("服务端异常")
  }
}, (error) => {
   return Promise.reject(error)
})

export default instance