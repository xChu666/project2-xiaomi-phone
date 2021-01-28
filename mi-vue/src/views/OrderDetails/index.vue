<template>
	<div class="page-container">
		<div class="page-banner"></div>
		<div class="page-head">
			<i class="iconfont icon-back goBack" @click="$router.back()"></i>
			<p>订单详情</p>
			<span class="edit"></span>
		</div>

		<div class="address">
			<div class="address-info">
				<p><span class="receiveName" v-text="oneOrder.receiveName"></span><span class="receivePhone" v-text="oneOrder.receivePhone"></span></p>
				<p><span class="receiveRegion"  v-text="oneOrder.receiveRegion"></span><span class="receiveDetail" v-text="oneOrder.receiveDetail"></span></p>
			</div>
		</div>
		<div class="myCart_shop">
			<div class="myCart_shop-top">
				<img src="./logo_xiaomi.png" alt="">
				<p>小米自营</p>
			</div>
			<!-- 渲染的数据 -->
			<ul class="myCart_shop-shops">
				<li class="myCart_shop-shop" v-for="item in oneOrder.details">
					<div class="shop_img">
						<img :src="item.avatar" alt="">
					</div>
					<div class="shop_info">
						<div class="shop_name" v-text="item.name"></div>
						<div class="shop_price">
							<p v-html="'<span>￥</span>' + item.price"></p>
							<div>x<span v-text="item.count"></span></div>
						</div>
						<div class="otherBox"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="otherInfo">
			<p>订单编号<span v-text="oneOrder.orderId"></span></p>
			<p>下单时间<span v-text="oneOrder.orderTime"></span></p>
			<p>订单金额<span v-text="oneOrder.account"></span></p>
		</div>
		<div class="page-bottom">
			<div class="delete" @click="deleteOrder">删除订单</div>
			<div class="pay" @click="payOrder">去支付</div>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "OrderDetails",
		data(){
	                return {
				orderId: this.$route.query.data,//接收订单编号
				oneOrder:{},
	                }
		},
		methods:{
			//删除订单
			deleteOrder(){
				this.$confirm("确认删除该订单？")
					.then(() => {
						this.$http({ url: "/order/remove/" + this.orderId })
							.then(data => {
							        this.$router.push("./myOrder")
							})
					})
			},
			//带来一单
			payOrder(){
				this.$router.push({ path: "./confirmPayment" , query:{ data: this.orderId } })
			},
		},
		created(){
		        this.$http({ url: "/order/list_all" })
			        .then(data => {
					data.forEach(item => {
					        if(this.orderId === item.orderId){
							this.oneOrder = item;
							console.log(this.oneOrder)
					        }
					})
			        })
		}
	}
</script>

<style scoped>
	body{
		background: #f4f4f4;
	}
	.page-container{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 16vw;
	}
	.page-banner{
		height: 50vw;
		width: 100%;
		background: url(./bg_page_header.png) no-repeat center center;
		background-size: cover;
		position: absolute;
		top: 0;
		z-index: -1;
	}
	.page-head{
		width: 100%;
		height: 20vw;
		position: fixed;
		display: flex;
		align-items: center;
		font-weight: bold;
		color: #fff;
	}
	.page-head i{
		height: 100%;
		width: 12vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-head p{
		height: 100%;
		flex: 1;
		display: flex;
		font-size: 20px;
		justify-content: center;
		align-items: center;
	}
	.page-head span{
		height: 100%;
		font-size: 14px;
		width: 12vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address{
		display: flex;
		flex-direction: column;
		width: 94%;
		height: 20vw;
		padding: 2vw 4vw;
		box-sizing: border-box;
		border-radius: 10px;
		margin: 23vw 0 7vw;
		background: #fff;
		color: #333;
		font-size: 13px;
		justify-content: space-around;
	}
	.address p{
		display: flex;
		justify-content: space-between;
	}
	.address p:nth-child(2){
		color: #999;
	}
	.myCart_shop{
		width: 94%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		border-radius: 10px;
	}

	.myCart_shop-top{
		display: flex;
		width: 100%;
		height: 12vw;
		padding: 2vw;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid #FEFCF7;
	}
	.myCart_shop-top img{
		height: 24px;
		width: 24px;
	}
	.myCart_shop-top p{
		margin-left: 3vw;
		font-size: 14px;
		color: #333;
		flex-grow: 1;
	}
	ul.myCart_shop-shops{
		width: 100%;
	}
	.myCart_shop-shop{
		display: flex;
		align-items: center;
		height: 28vw;
		width: 100%;
		padding: 3vw;
		box-sizing: border-box;
	}
	.myCart_shop-shop:last-child{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.myCart_shop-shop .shop_info{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: 14px;
		color: #333;
	}
	ul.myCart_shop-shops .shop_img{
		height: 100%;
		background: #f4f4f4;
		border-radius: 5px;
		margin: 0 3vw;
	}
	ul.myCart_shop-shops img{
		height: 100%;
	}
	.shop_price{
		display: flex;
	}
	.shop_price>p{
		flex-grow: 1;
		color: #999;
		font-size: 15px;
	}
	.shop_price>p>span{
		font-size: 10px;
	}
	.shop_price div{
		flex: 0.5;
		display: flex;
		justify-content: flex-end;
		font-weight: bold;
		color: #333;
	}
	ul.myCart_shop-shops .otherBox{
		height: 10vw;
	}
	ul.myCart_shop-shops .myCart_shop-shop .calculation{
		width: 24vw;
		display: flex;
	}
	ul.myCart_shop-shops .myCart_shop-shop .calculation span{
		display: flex;
		width: 8vw;
		justify-content: center;
		align-items: center;
	}
	ul.myCart_shop-shops .myCart_shop-shop .calculation span:nth-child(2){
		background-color: #F4F4F4;
	}
	.otherInfo{
		margin-top: 5vw;
		width: 94%;
		border-radius: 10px;
		background: #fff;
		padding: 3vw;
		box-sizing: border-box;
	}
	.otherInfo p{
		width: 100%;
		padding: 2vw 0;
		font-size: 12px;
		color: #999;
		border-bottom: 1px solid #EDEDED;
	}
	.otherInfo p:last-child{
		border: none;
	}
	.otherInfo p span{
		color: #333;
		font-size: 13px;
		padding-left: 3vw;
	}

	.page-bottom{
		position: fixed;
		bottom: 0;
		height: 14vw;
		width: 100%;
		flex-shrink: 0;
		background: #fff;
		border-top: 1px solid #EDEDED;
		display: flex;
		padding: 2vw;
		box-sizing: border-box;
		align-items: center;
		justify-content: flex-end;
		font-size: 14px;
		color: #666;
	}
	.page-bottom div{
		padding: 1vw 3vw;
		border: 1px solid #818181;
		border-radius: 19px;
		margin-right: 3vw;
	}
	.page-bottom div:nth-child(2){
		border: 1px solid #D91A15;
		color: #fff;
		background: #D91A15;
	}
</style>