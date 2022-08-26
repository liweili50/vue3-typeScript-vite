import axios from "axios";
import store from "@/store";
import { useRouter } from "vue-router";

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
    if (store.getters.token) {
      config.headers["Authorization"] = `Bearer ${store.getters.token}`
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

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Dialog.confirm({
          title: "提示",
          message: "会话过期，请重新登录！"
        })
          .then(() => {
            // on confirm
            store.dispatch("user/resetToken").then(() => {
              // location.reload()
              router.replace("/");
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
  
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
