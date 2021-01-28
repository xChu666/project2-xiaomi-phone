import Vue from 'vue';
import axios from 'axios';

let alwaysPendingPromise = new Promise(() => {});
let loadingCount = 0;  // 记录当前的loading有几个

export default function(userOptions, showLoading = true) {
        let defaultOptions = {
                method: "get",
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": sessionStorage.getItem("token")
                }
        };
        let options = Object.assign({}, defaultOptions, userOptions);
        if(options.data) options.data = JSON.stringify(options.data);
        if(showLoading) {
                loadingCount++;
                Vue.prototype.$loading.show();                  //开启loading效果
        }
        return axios(options)
                // 故意延时1秒做loading效果
                .then(response => {
                        return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                        resolve(response);
                                }, 1000);
                        });
                })
                .then(response => {
                        if(response.status === 200) {
                                switch(response.data.code) {
                                        case 200:
                                                console.log(loadingCount);
                                                if(showLoading) loadingCount-- === 1 && Vue.prototype.$loading.close(); // 关闭loading效果
                                                return response.data.data;
                                        case 199:
                                        case 404:
                                        case 401:
                                        case 500:
                                                throw new Error(response.data.msg);
                                }
                        }
                })
                .catch(error => {
                        // 不管前面哪里错了，到我这里我希望收到一个错误对象，携带相关的错误信息，
                        // 我弹出来给用户看！！我兜底
                        if(showLoading) loadingCount-- === 1 && Vue.prototype.$loading.close(); // 关闭loading效果
                        Vue.prototype.$alert(error.message);
                        return alwaysPendingPromise; // 返回一个永远是pending的promise不要让后面的then执行
                });
};