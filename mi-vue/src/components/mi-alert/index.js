import Vue from "vue";

//构造mi-alert组件的构造函数
var MiAlertConstructor = Vue.extend(require("./alert.vue").default);

//动态创建、动态挂载
export default function(text){
        var instance = new MiAlertConstructor({ data:{ text }}).$mount();//text键值对简写  MiAlertConstructor传参传对象就把text传过去了
        document.body.appendChild(instance.$el);
}