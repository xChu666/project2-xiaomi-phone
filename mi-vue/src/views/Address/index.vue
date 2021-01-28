<template>
	<div class="page-container">
		<div class="page-header">
			<div class="info_left" @click="$router.back()"></div>
			<p>收货地址</p>
			<div class="null"></div>
		</div>
		<div class="page-main">
			<ul class="new-address hide-scroll">
				<li v-for="item in addressAll" :key="item.id">
					<div class="info_top">
						<div class="address-info">
							<div class="info-sbox">
								<p v-text="item.receiveName"></p><span v-text="item.receivePhone"></span>
							</div>
							<p class="p-info" v-text="item.receiveRegion + item.receiveDetail"></p>
						</div>
						<i class="revise" @click="bianji(item.id)"></i>
					</div>
					<div class="info_bottom">
						<span class="default_address" :class="{ default_back : item.isDefault === 1}" v-text="item.isDefault === 1?'默认地址':'设为默认地址'" @click="moren(item.isDefault,item.id)"></span>
						<span class="delete_address" @click="removeAddress(item.id)">删除地址</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="page-footer">
			<button @click="$router.push('/addAddress')">+添加地址</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: "Address",
		data(){
		        return {
				addressAll:[],
		        }
		},
		methods:{
		        //编辑地址
			bianji(id){
			        this.$router.push({ path: "/modifyAddress" , query:{id}})
			},
		        //渲染所有地址
                        xuanAddress(){
                                this.$http({ url: "/address/list" },false)
                                        .then(data => {
                                                this.addressAll = data
                                                console.log(data)
                                        })
                        },
			//设置默认地址
                        moren(isDef,id){
				if(isDef === 1) return;
				this.$http({ url: "/address/set_default/ " +  id },false)
					.then(data => {
                                                this.xuanAddress()
						this.$notice("设置成功")
					        })
                        },
			//删除地址
                        removeAddress(id){
//				console.log(id)
	                        this.$confirm("确认删除该地址？")
		                        .then(() => {
				                this.$http({ url: "/address/remove/" + id},false)
                                                        .then(data => {
                                                         let index = this.addressAll.findIndex(item =>  item.id === id );
//                                                        console.log(index)
                                                        this.addressAll.splice(index,1);
                                                        this.$notice("删除成功")
                                                })
		                        })
                        }
		},
		created(){
			this.xuanAddress()
		}
	}
</script>

<style scoped>
	.page-container{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.page-header{
		height: 44px;
		/* background: #0f0; */
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
		/* background: #F4F4F4; */
		overflow: hidden;
		display: flex;
	}
	ul.new-address{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
	}
	ul.new-address li{
		padding: 3px;
		box-sizing: border-box;
		height: 100px;
		width: 96%;
		border-bottom: 1px solid #F1F1F1;
		/* background: #ff0; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	ul.new-address li .info_top{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	ul.new-address li .info_bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 0 10px;
		margin-top: -5px;
		box-sizing: border-box;
	}
	ul.new-address li .info_bottom .default_address{
		color: #3DA5FE;
	}
	/* 设为默认地址的样式 */
	ul.new-address li .info_bottom .default_back{
		background: #f06;
		padding: 3px;
		border-radius: 2px;
		color: #fff;
	}
	ul.new-address li .info_bottom .delete_address{
		color: #f05;
	}
	ul.new-address li .address-info{
		height: 60px;
		flex: 1;
		margin: 10px 0 10px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.info-sbox p{
		flex-grow: 1;
	}
	.info-sbox span{
		color: #333;
	}
	ul.new-address li .address-info .p-info{
		font-size: 12px;
		color: #666;
	}
	.info-sbox{
		display: flex;
		font-size: 15px;
	}
	ul.new-address li .revise{
		width: 17px;
		height: 17px;
		background: url(icon_edit_gray.png) no-repeat center center;
		background-size: cover;
		margin: 10px 16px 10px 10px;
	}

	.page-footer{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72px;
	}
	.page-footer button{
		height: 44px;
		width: 100%;
		margin: 15px;
		color: #845f3f;
		line-height: 44px;
		text-align: center;
		border: 1px solid #A58A73;
		outline: none;
		border-radius: 5px;
	}
</style>