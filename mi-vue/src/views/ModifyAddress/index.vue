<template>
	<div class="page-container">
		<div class="page-header">
			<div class="info_left" @click="$router.back()"></div>
			<p>编辑地址</p>
			<div class="null"></div>
		</div>
		<div class="page-main">
			<ul class="modify-info">
				<li>
					<span>收货姓名</span><input type="text" v-model="names" placeholder="请输入收货人姓名" />
				</li>
				<li>
					<span>手机号码</span><input type="text" v-model="phone" placeholder="请输入收货人电话" />
				</li>
				<li>
					<span>所在地区</span><input type="text" v-model="address" placeholder="请选择省/市/区/街道" class="regions-picker"/>
				</li>
				<li>
					<span>详细地址</span><input type="text" v-model="detaileds" placeholder="请输入街道地址" />
				</li>
			</ul>
			<button type="button" @click="saveAddress">保存</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "ModifyAddress",
		data(){
	                return {
	                        id:this.$route.query.id,
                                names:"",
                                phone:"",
                                address:"",
                                detaileds:"",
	                }
		},
		methods:{
		        saveAddress(){
		                this.$http({
			                url:"/address/update",
			                method:"post",
		                        data:{
                                                "id": this.id,
                                                "receiveName": this.names,
                                                "receivePhone":this.phone ,
                                                "receiveRegion": this.address,
                                                "receiveDetail": this.detaileds,
		                        }
		                })
			                .then(data => {
						this.$notice("修改成功");
						this.$router.back()
			                })
		        }
		},
		created(){
			console.log(this.id)
			this.$http({ url:"/address/model/" + this.id })
				.then(data => {
					console.log(data);
                                        this.names = data.receiveName;
                                        this. phone = data.receivePhone;
                                        this.address = data.receiveRegion;
                                        this.detaileds = data.receiveDetail;
				})
		},
	}
</script>

<style scoped>
	.page-container{
		height: 100%;
		display: flex;
		background: #F6F6F6;
		flex-direction: column;
	}
	.page-header{
		height: 44px;
		display: flex;
		align-items: center;
	}
	.page-header .info_left{
		height: 48px;
		width: 39px;
		background: url(icon_arrow_left_black.png) no-repeat center center;
		background-size: cover;
	}
	.page-header p{
		text-align: center;
		flex-grow: 1;
		color: #333;
	}
	.page-header .null{
		height: 48px;
		width: 39px;
	}
	.page-main{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	ul.modify-info{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
	}
	ul.modify-info li{
		width: 96%;
		height: 50px;
		border-bottom: 1px solid #F1F1F1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	ul.modify-info span{
		display: block;
		width: 80px;
		margin-left: 10px;
		font-size: 13px;
		color: #333;
	}
	ul.modify-info input{
		flex-grow: 1;
		margin-right: 10px;
		outline: none;
		border: none;
	}
	ul.modify-info .default{

	}
	ul.modify-info .default input{
		width: 20px;
	}
	.page-main button{
		width: 80px;
		height: 36px;
		line-height: 36px;
		background: #835E3F;
		color: #fff;
		font-size: 14px;
		border-radius: 3px;
		border: none;
		outline: none;
		margin-top: 20px;
	}


</style>