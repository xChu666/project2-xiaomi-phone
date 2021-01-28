<template>
	<div class="back">
		<div class="log_container">
			<h1>欢迎登录小米有品</h1>
			<div v-show="loginMode">
				<input type="text" placeholder="邮箱/手机号码/小米ID" v-model.trim="name">
				<input type="password" placeholder="密码" v-model="pwd">
				<button class="btn_1" @click="loginPwd">登录</button>
				<button class="btn_2" @click="loginMode=!loginMode">手机短信登录/注册</button>
			</div>
			<div v-show="!loginMode">
				<input type="text" placeholder="手机号">
				<input type="text" placeholder="短信验证码">
				<button class="btn_1" @click="loginPhone">立即登录/注册</button>
				<button class="btn_2" @click="loginMode=!loginMode">用户名密码登录</button>
			</div>
			<p @click="goRegister">立即注册</p>
		</div>
	</div>
</template>

<script>
        import MiNav from "../../components/mi-nav";

        export default {
                name: "Login",
                compinents: {
                        "mi-nav": MiNav,
                },
                data: function(){
                        return {
                                loginMode: true, //true表示用户名密码登录
                                name: "",
                                pwd: ""
                        };
                },
                methods: {
                        //跳转注册页面
                        goRegister(){
                                // window.location.href = "../register/index.html"
                        },
                        //手机号登录时
                        loginPhone(){
                                this.$alert("手机号验证码登录功能暂未开放，请切换为用户名密码登录")
                        },
                        //用户名密码登录，收集用户账号信息验证是否为空，向服务器发送Ajax请求，再返回结果
                        loginPwd(){
                                this.$http({
                                        method: "post",
                                        url: "/user/login_pwd",
                                        data: {
                                                //.trim()清除前后无效空格
                                                name: this.name,
                                                pwd: this.pwd
                                        },
                                },false)
	                                .then(data => {
	                                        this.$notice("登陆成功")
                                                sessionStorage.setItem("token", data);
                                                sessionStorage.setItem("name", this.name);
                                                this.$router.replace(this.$route.query.to || "/Category");
	                                })
//                                case 401:
//                                sessionStorage.clear();
//                                this.$router.replace({
//                                        path: "/login",
//                                        query: {to: this.$route}
//                                });
//                                break;
                        }
                }
        }
</script>

<style>
	.back {
		width: 100%;
		height: 100%;
		background: url(./imgback.png) no-repeat center center;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.log_container {
		width: 90%;
		flex-grow: 1;
		/* background: #3DA5FE; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.log_container h1 {
		font-size: 24px;
		color: #333;
		padding: 60px 10px 0;
	}

	.log_container > div {
		width: 90%;
	}

	.log_container > div input {
		outline: none;
		border: none;
		border-bottom: 1px solid #ECECEC;
		display: block;
		width: 100%;
		height: 67px;
		padding: 20px 10px;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0);
	}

	.log_container > div button {
		height: 47px;
		margin-top: 20px;
		margin-bottom: 10px;
		outline: none;
		display: block;
		width: 100%;
		border: none;
		font-size: 17px;
		font-weight: bold;
		border-radius: 20px;
	}

	.log_container > div .btn_1 {
		color: #fff;
		background: #D5AD72;
	}

	.log_container > div .btn_2 {
		color: #666;
		background: #F0F0F0;
	}

	.log_container p {
		font-size: 14px;
		color: #999;
		margin-top: 3vw;
	}

	.log_container p:hover {
		color: #333;
	}


</style>