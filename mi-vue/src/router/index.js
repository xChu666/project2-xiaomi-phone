//创建路由对象，并导出
import  Vue from "vue";
import VueRouter from "vue-router";

//views文件夹内要能够把所有views文件夹中的页面级组件统一导入，整合
// 成一个对象再统一导出让当前文件使用所有页面级组件时代码更加优雅
import views from "../views"

Vue.use(VueRouter)//很关键
var router = new VueRouter({
        routes:[
                {path:"/",redirect:"/home"},
                { path:"/home", component: views.Home },
                { path:"/category", component: views.Category },
                { path:"/profile", component: views.Profile },
                { path:"/cart/", component: views.Cart },
                { path:"/login", component: views.Login },
                { path:"/list/:cid", component: views.List },
                { path:"/details/:cid", component: views.Details},
                { path:"/confirmOrder/:arr", component: views.ConfirmOrder},
                { path:"/confirmPayment/", component: views.ConfirmPayment},
                { path:"/myOrder/", component: views.MyOrder},
                { path:"/orderDetails/", component: views.OrderDetails},
                { path:"/address/", component: views.Address},
                { path:"/addAddress/", component: views.AddAddress},
                { path:"/modifyAddress/", component: views.ModifyAddress},
        ],
})

export default router;
//路由守卫
router.beforeEach(function(to,from,next){
        if(to.meta.needAuth && !sessionStorage.getItem("token")){
                next({ path:"/login",query:{ to } });
        }else{
                next()
        }
})