import axios from "axios";
// import store from "@/store";
import { useRouter } from "vue-router";
import { getToken } from "./auth";
import type { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue';

type AxiosConfig = {
  headers: {
    Authorization: string
  }
}

interface Response {
  code: number;
  data: any;
  msg: string;
}


const router = useRouter();
// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let token = getToken()
    if (token) {
      (config as AxiosConfig).headers["Authorization"] = `Bearer ${token}`
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error, "err"); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  response => {
    return response.data;
  },
  error => {
    console.log("err" + error); // for debug
    message.error(error.response.data.error.message)
    return Promise.reject(error);
  }
);

export default service;
