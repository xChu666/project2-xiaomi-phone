import Vue from "vue"

var MiConfirmConstructor = Vue.extend(require("./confirm.vue").default);

export default function(text){
        return new Promise(resolve => {
                var instance = new MiConfirmConstructor( {data:{text,resolve} } ).$mount();
                document.body.appendChild(instance.$el);
        })
}