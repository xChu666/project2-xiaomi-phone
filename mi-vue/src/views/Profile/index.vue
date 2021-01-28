<template>
	<div class="page-container-profile">
		<div class="page-header">
			<div class="avatar">
				<img src="./mypic/avatar2.png" v-if="isShow">
				<img src="./mypic/avatar.png" v-else>
			</div>
			<div class="log" v-if="isShow" @click="goLogin">请登录</div>
			<div class="log" v-else v-html="name"></div>
			<div class="info_right" v-show="isShow"></div>
		</div>
		<div class="border_bottom"></div>
		<div class="page-content">
			<div class="myOrder">
				<p class="myOrders" @click="$router.push('/myOrder')">我的订单</p>
				<i></i>
			</div>
			<div class="options">
				<ul class="opt_nav">
					<li>
						<img src="./mypic/noPay.png" >
						<p>待付款</p>
					</li>
					<li>
						<img src="./mypic/noGet.png" >
						<p>待收货</p>
					</li>
					<li>
						<img src="./mypic/evaluation.png" >
						<p>评价</p>
					</li>
					<li>
						<img src="./mypic/afterSale.png" >
						<p>退款/售后</p>
					</li>
				</ul>
			</div>
			<div class="border_bottom"></div>
			<div class="features">
				<div class="info">
                <span>
                    <img src="./mypic/ucenter_icon_assets.png" >
                </span>
					<p>我的资产</p>
					<div class="info_right"></div>
				</div>
				<div class="info">
                <span>
                    <img src="./mypic/ucenter_icon_collection.png" >
                </span>
					<p>我的收藏</p>
					<div class="info_right"></div>
				</div>
				<div class="info myAddress" @click="$router.push('/address')">
                <span>
                    <img src="./mypic/ucenter_icon_address.png" >
                </span>
					<p>地址管理</p>
					<div class="info_right"></div>
				</div>
				<div class="border_bottom"></div>
				<div class="info">
                <span>
                    <img src="./mypic/ucenter_icon_qualifi.png" >
                </span>
					<p>资质证照</p>
					<div class="info_right"></div>
				</div>
				<div class="info">
                <span>
                    <img src="./mypic/ucenter_icon_protocol.png" >
                </span>
					<p>协议规则</p>
					<div class="info_right"></div>
				</div>
				<div class="info">
                <span>
                    <img src="./mypic/ucenter_icon_feedback.png" >
                </span>
					<p>帮助与反馈</p>
					<div class="info_right"></div>
				</div>
				<div class="dropOut" v-show="!isShow" @click="outLogin">退出</div>
			</div>
		</div>
		<div class="page-footer">
			<mi-nav></mi-nav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import MiNav from "../../components/mi-nav"
        export  default{
                name: "Profile",
                components: {
                        "mi-nav":MiNav
                },
                data:function(){
                        return {
                                isShow: true,
                                name:""
                        }
                },
                methods:{
                        //去登陆
                        goLogin() {
                                this.$router.replace({ path:"/login" ,query:{ to:this.$route }})
                        },
                        //退出登录
                        outLogin(){
                                sessionStorage.clear();
                                this.isShow = true;
                        },
                },
                //起始函数
                created:function(){
                        if(sessionStorage.getItem("token") != null){
                                this.isShow = false;
                                this.name = sessionStorage.getItem("name");
                        }else{
                                this.isShow = true;
                        }
                },
        };
</script>

<style scoped>
	.page-container-profile{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.page-container-profile .page-header{
		height: 99px;
		border-bottom: 1px solid #eee;
		background: url(./mypic/ucenter_bg_top.png);
		background-size: cover;
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}
	.page-container-profile .page-header .avatar{
		width: 60px;
		height: 60px;
		/* background: url(); */
		/* background: #0f0; */
		padding-left: 25px;
	}
	.page-container-profile .page-header .avatar img{
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.page-container-profile .page-header .log{
		line-height: 60px;
		padding-left: 20px;
		flex: 1;
		font-size: 14px;
		color: #fff;
	}
	.page-container-profile .page-header .info_right{
		width: 18px;
		height: 18px;
		margin-right: 25px;
		background: url(./mypic/icon_arrow_right_darkgray.png) no-repeat center center;
		background-size: cover;
	}
	.page-container-profile .border_bottom{
		height: 5px;
		width: 100%;
		background: #F4F4F4;
	}
	.page-container-profile .page-content{
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.page-container-profile .myOrder{
		height: 40px;
		border: 1px solid #eee;
		padding: 0 15px 0 25px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	.page-container-profile .myOrder p{
		color: #333;
		font-size: 14px;
		flex: 1;
	}
	.page-container-profile i{
		display: block;
		height: 15px;
		width: 15px;
		background: url(./mypic/icon_arrow_right_darkgray.png) no-repeat center center;
		background-size: cover;
	}
	.page-container-profile .options{
		height: 70px;
	}
	.page-container-profile .options .opt_nav{
		height: 70px;
		display: flex;
		color: #666666;
		font-size: 12px;
	}
	.page-container-profile .options .opt_nav img{
		width: 40px;
		height: 40px;
		margin: 0 auto;
	}
	.page-container-profile .options .opt_nav li{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 25%;
		height: 70px;
		text-align: center;
	}
	.page-container-profile .features{
		overflow: auto;
		flex-grow: 1;
		background: #F3F3F3;
	}
	.page-container-profile .features .info{
		height: 49px;
		width: 100%;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		align-items: center;
		background: #fff;
	}
	.page-container-profile .features .info span{
		width: 38px;
		height: 38px;
		display: block;
		padding-left: 15px;
	}
	.page-container-profile .features .info span img{
		width: 38px;
		height: 38px;
	}
	.page-container-profile .features .info p{
		font-size: 14px;
		color: #333;
		flex-grow: 1;
	}
	.page-container-profile .features .info .info_right{
		width: 15px;
		height: 15px;
		margin-right: 10px;
		background: url(./mypic/icon_arrow_right_darkgray.png ) no-repeat center center;
		background-size: cover;
	}
	.page-container-profile .features .dropOut{
		margin: 10px auto;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #C7C7C7;
		font-size: 13px;
		background: #fff;
		color: #333;
		align-self: center;
	}
	.page-container-profile .page-footer{
		height: 50px;
		border-top: 1px solid #f5f5f5;
	}
</style>