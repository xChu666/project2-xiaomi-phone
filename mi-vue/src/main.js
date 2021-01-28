//main.js是vue项目运行的入口文件
//main.js主要是创建vue的根实例，并渲染到挂载点
//ES6模块化知识
import Vue from "vue";
//导入路由对象
import router from "./router";
//import后面注意加分号
//导入样式
import  "./assets/css/reset.css";//复位
import  "./assets/fonts/iconfont.css";//字体样式

import http from "./utils/http";
Vue.prototype.$http = http;//原型链

import miAlert from "./components/mi-alert"
Vue.prototype.$alert = miAlert;//怎么用！挂载到原型上

import miNotice from "./components/mi-notice"
Vue.prototype.$notice = miNotice;

import  miConfirm from "./components/mi-confirm"
Vue.prototype.$confirm = miConfirm;

import  miLoading from "./components/mi-loading"
Vue.prototype.$loading = miLoading;


new Vue({
        el: "#app",
        template: "<router-view></router-view>",
        router
})