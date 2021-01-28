import  Vue from "vue";

var  MiNoticeConstructor = Vue.extend(require("./notice.vue").default);
export default function(text){
        var instance = new MiNoticeConstructor({data:{text}}).$mount();
        document.body.appendChild(instance.$el);
}