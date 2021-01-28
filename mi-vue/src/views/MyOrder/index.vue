<template>
	<div class="page-container">
		<div class="page-header">
			<i class="iconfont icon-back goBack" @click="$router.back()"></i>
			<p>我的订单</p>
			<i></i>
		</div>
		<div class="page-contant">
			<ul class="page-tatil">
				<li @click="orders('all','list_all')"><span :class="{ active: orderCol==='all'}">全部</span></li>
				<li @click="orders('no','list_unpay')"><span :class="{ active: orderCol==='no'}">待付款</span></li>
				<li @click="orders('pay','list_pay')"><span :class="{ active: orderCol==='pay'}">待收货</span></li>
				<li @click="orders('outs','')"><span :class="{ active: orderCol==='outs'}">退款订单</span></li>
				<li @click="orders('over','')"><span :class="{ active: orderCol==='over'}">已收货</span></li>
			</ul>
			<div class="order-box">
				<div class="active" v-show="isShow">
					<ul class="allOrder">
						<li v-for="item in orderAll" @click="goDetails(item.orderId)">
							<div class="tatil">
								<i></i>
								<p>小米自营</p>
								<span></span>
							</div>
							<ul class="oneOrder yiOrder">
								<li class="myCart_shop-shop" v-for="items in item.details">
									<div class="shop_img">
										<img :src="items.avatar" alt="">
									</div>
									<div class="shop_info">
										<div class="shop_name" v-text="items.name"></div>
										<div class="shop_price">
											<p v-html="'<span>￥</span>'+ items.price"></p>
											<div class="calculation">
												<span class="num" v-text="'x'+items.count"></span>
											</div>
										</div>
										<div class="otherBox"></div>
									</div>
								</li>
							</ul>
							<div class="allTotil">
								<p>共<span v-text="item.details.length"></span>种商品</p>
								<p>总金额</p>
								<p><span>￥</span><span class="orderPrice" v-text="item.account"></span><span>.00</span></p>
							</div>
							<div class="sub-bottom">
								<span class="deleteOrder" @click="removeOrder(item.orderId)">删除订单</span>
								<p class="payOrNo" v-text="item.pay===1? '再来一单':'去支付'" @click="payOrNo(item.orderId)"></p>
							</div>
						</li>
					</ul>
				</div>

				<div v-show="!isShow">
					<div class="noShop">
						<img src="./no_result_order.png" alt="">
						<p>目前没有待收货订单哦~</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script TYPE="text/ecmascript-6">
	export default {
		name: "MyOrder",
		data(){
			return {
				orderAll: [],
				orderCol:"all",
				urls : "list_all",
				isShow:false,
			}
		},
		methods: {
		        //渲染订单
			orders( col ,urls){
                                this.orderCol = col;
                                this.urls = urls;
				if(urls === ""  ){
                                       this. isShow = false
					return
				}else{
                                        this. isShow = true
                                        this.$http({ url:"/order/" + urls })
                                                .then(data => {
                                                        this.orderAll = data;
	                                                console.log(this.orderAll)
                                                        if(this.orderAll.length === 0){
                                                                this. isShow = false
                                                        }else{
                                                                this. isShow = true
                                                        }
                                                })
				}
			},
			//删除订单
                        removeOrder(id){
			        this.$confirm("确认删除订单？")
				        .then(() => {
                                                this.$http({ url: "/order/remove/" + id },false)
                                                        .then(data => {
								this.$notice("删除成功 ")
                                                                this.orders(this.orderCol,this.urls);
                                                        })
				        })

                        },
			//去支付或者再来一单
                        payOrNo(orderId){
				this.$http({ url:"/order/pay/"  + orderId})
					.then(data => {
					        this.$router.push({ path:"./confirmPayment" ,query:{data:orderId}})
					})
                        },
			goDetails(orderId){
                                this.$router.push({ path: "./orderDetails",query:{data:orderId} })
                                console.log(orderId)

			}

		},
		created(){
		        //初始渲染全部
                        this.orders(this.orderCol,this.urls);
		},
	}
</script>

<style scoped>
	.page-container{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #F4F4F4;
	}
	.page-header{
		height: 12vw;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	.page-header i{
		width: 10%;
		padding: 3vw;
		box-sizing: border-box;
	}
	.page-header p{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-contant{
		height: 100%;
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}
	ul.page-tatil{
		height: 12vw;
		display: flex;
		flex-shrink: 0;
	}
	ul.page-tatil li{
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		color: #333;
	}
	ul.page-tatil li span{
		padding: 1vw 2vw;
		border-radius: 5vw;
	}
	ul.page-tatil li span.active{
		background: #DFB455;
		color: #fff;
	}
	.order-box{
		display: flex;
		flex-direction: column;
		/* background: #0f0; */
		overflow: hidden;
		height: 100%;
	}
	.order-box>div{
		flex: 1;
		padding: 5vw;
		box-sizing: border-box;
		width: 100%;
		/* height: 100%; */
		overflow: auto;
	}
	.order-box>div.active{
		display: block;
	}
	.order-box>div>ul{
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		/* background: #00f; */
	}
	.order-box>div>ul>li{
		border-radius: 20px;
		/* height: 50vw;后面要删 */
		padding: 2vw;
		box-sizing: border-box;
		background: #fff;
		margin: 3vw 0;
	}
	.order-box>div>ul>li img{
		height: 100%;
	}
	.order-box>div>ul>li .tatil{
		height: 12vw;
		display: flex;
		align-items: center;
		padding: 1vw;
		box-sizing: border-box;
	}
	.order-box>div>ul>li .tatil i{
		width: 25px;
		height: 25px;
		background: url(./logo_xiaomi.png) no-repeat center center;
		background-size: cover;
	}
	.order-box>div>ul>li .tatil p{
		font-size: 15px;
		color: #333;
		flex: 1;
		margin-left: 3vw;
	}
	.order-box>div>ul>li .tatil span{
		font-size: 14px;
		color: #999;
	}
	.sub-bottom{
		display: flex;
		height: 12vw;
		justify-content: space-between;
		align-items: center;
		padding: 2vw;
		font-size: 14px;
	}
	.sub-bottom span{
		color: #999;
	}
	.sub-bottom p{
		color: #bf1111;
		border-radius: 10px;
		padding: 1vw;
		border: 1px solid #bf1111;
	}
	.allTotil{
		display: flex;
		font-size: 12px;
		color: #333;
		justify-content: flex-end;
		align-items: center;
	}
	.allTotil>p{
		padding: 0 1vw;
	}
	.allTotil>p>.orderPrice{
		font-size: 16px;
	}
	.allTotil>p:nth-child(3)>span:nth-child(3){
		color: #151515;
	}
	ul.yiOrder{
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
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: 14px;
		color: #333;
	}
	ul.yiOrder .shop_img{
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
		color: #bf1111;
		font-size: 15px;
	}
	.shop_price>p>span{
		font-size: 10px;
	}
	ul.yiOrder .otherBox{
		height: 10vw;
	}
	ul.yiOrder .myCart_shop-shop .calculation{
		width: 8vw;
		display: flex;
	}
	.noShop{
		width: 100%;
		height: 50vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #666;
		font-size: 12px;
	}
	.noShop img{
		width: 90px;
		height: 90px;
		margin: 10vw 0 4vw;
	}
</style>