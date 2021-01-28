<template>
	<div class="page-container">
		<div class="page-banner"></div>
		<div class="page-head">
			<i class="iconfont icon-back goBack" @click="$router.back()"></i>
			<p>确认订单</p>
			<span class="edit"></span>
		</div>
		<div class="address">
			<div class="address-info" :key="defaults.id" @click="xuanAddress;isShow=!isShow">
				<p><span class="receiveName" v-text="defaults.receiveName"></span><span class="receivePhone" v-text="defaults.receivePhone"></span></p>
				<p><span class="receiveRegion" v-text="defaults.receiveRegion"></span><span class="receiveDetail" v-text="defaults.receiveDetail"></span></p>
			</div>
		</div>
		<div class="myCart_shop">
			<div class="myCart_shop-top">
				<img src="./logo_xiaomi.png" alt="">
				<p>小米自营</p>
			</div>
			<!-- 渲染的数据 -->
			<ul class="myCart_shop-shops">
				<li class="myCart_shop-shop" v-for="item in cartShop">
					<div class="shop_img">
						<img :src="item.avatar" alt="">
					</div>
					<div class="shop_info">
						<div class="shop_name" v-text="item.name"></div>
						<div class="shop_price">
							<p v-html="'<span>￥</span >' + item.price"></p>
							<div>x<span v-text="item.count"></span></div>
						</div>
						<div class="otherBox"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="page-bottom">
			<div class="total">
				<span>合计：</span>
				<p><span>￥</span><span v-text="totil"></span><span>.00</span></p>
			</div>
			<div class="selected" @click="selected">提交</div>
		</div>
		<transition name="popup">
			<div class="submit" v-show="isShow" @click.self="isShow=!isShow">
				<div class="write">
					<p>选择地址</p>
					<div class="shopCount">
						<ul class="address-list">
							<li v-for="(item,index) in addressAll" :key="item.id" >
								<input type="radio" name="address" :key="item.isDefault" @click="xuanAddress(item.id,index)">
								<div class="address-list-info">
									<p><span v-text="item.receiveName"></span><span v-text="item.receivePhone"></span></p>
									<p><span v-text="item.receiveRegion + ' ' +item.receiveDetail"></span></p>
								</div>
								<i class="edit" @click="bianji(item.id)"></i>
							</li>
						</ul>
					</div>
					<div class="cartButton">
						<button @click="$router.push('/addAddress')">+添加地址</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "ConfirmOrder",
		data(){
	                return {
	                        strId:this.$route.params.arr,
                                defaults:{},//默认地址对象
                                shops:[],
                                idS : [],//结算id的数组
		                cartShop:[],//传过来的对象
                                isShow:false,//控制动画效果
		                addressAll:[],//所有地址的数组
                                totil:0,//商品总价格
		                addressId:0
	                }
		},
		methods:{
		        //编辑地址
                        bianji(id){
	                        this.$router.push({ path: "/modifyAddress",query:{ id } });
                        },
		        //地址选择
                        xuanAddress(id,index){
                                this.defaults = this.addressAll[index];
                                this.addressId = id;
                                console.log(this.addressId)
                        },
			//点击提交
                        selected(){
                                this.$http({
                                        url: "/order/confirm",
                                        method:"post",
                                        data:{
                                                "ids": this.idS,
                                                "account": this.totil,
                                                "addressId": this.addressId,
                                        },
                                },false)
	                                .then(data => {
	                                        this.$router.push({ path:"/confirmPayment",query:{data} })
	                                        console.log(data)
	                                })
                        }

		},
		created(){
		        //接收传过来的字符串转为数组
		        let idss = this.strId.split("-")
			idss.forEach(item => {
			        this.idS.push(parseInt(item))
			})
			//默认地址
		        this.$http({ url: "/address/get_default" })
			.then(data => {
			        console.log(data)
				this.defaults = data;
                                this.addressId = data.id
			},false);
			//渲染要结算的商品
		        this.$http({
			        url: "/cart/list_ids",
                                method: "post",
                                data:{
                                        "ids": this.idS,
                                },
		        },false)
			        .then(data => {
                                        this.cartShop = data
			                console.log(data)
                                        //传要结算的商品id
                                        this.cartShop.forEach(item => {
                                                //所有商品价格
                                                this.totil += item.price;
                                                console.log(this.totil)
                                        })
			        });

		        //获取所有地址
			this.$http({ url: "/address/list" })
				.then(addressS => {
				        this.addressAll = addressS
				},false)
		},

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
		justify-content: space-around;
	}
	.address p{
		display: flex;
		justify-content: space-between;
	}
	.address p:nth-child(1){
		font-weight: bold;
	}
	.address p:nth-child(2){
		font-size: 13px;
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
		color: #bf1111;
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
	}

	.page-bottom .total{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		flex: 2;
		justify-content: flex-start;
		margin-right: 3vw;
	}
	.page-bottom .total>span{
		font-size: 13px;
		color: #000;
		font-weight: bold;
	}
	.page-bottom .total>p{
		color: #BF1111;
		font-size: 22px;
		font-weight: bold;
	}
	.page-bottom .total>p>span:nth-child(1){
		color: #BF1111;
		font-size: 16px;
		font-weight: bold;
	}
	.page-bottom .selected{
		background: #BF1111;
		color: #fff;
		font-weight: bold;
		border-radius: 19px;
		height: 100%;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.submit{
		z-index: 10000;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
	}
	.submit .write{
		z-index: 1000;
		position: fixed;
		width: 100%;
		height: 60%;
		bottom: 0;
		background: #fff;
		border-radius: 10px 10px 0 0;
	}
	.write{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.write>p{
		width: 100%;
		padding: 2vw;
		flex-shrink: 0;
		font-size: 14px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.shopCount{
		flex-grow: 1;
		width: 100%;
		padding: 2vw;
		box-sizing: border-box;
		overflow: hidden;
	}
	ul.address-list{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	ul.address-list li{
		width: 100%;
		height: 25vw;
		padding: 2vw;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		color: #333;
	}
	.address-list-info{
		display: flex;
		flex: 1;
		padding: 0 2vw;
		flex-direction: column;
		justify-content: space-around;
	}
	.address-list-info>p{
		display: flex;
		justify-content: space-between;
	}
	.address-list-info>p:nth-child(2){
		font-size: 13px;
	}
	ul.address-list li i{
		height: 18px;
		width: 18px;
		background: url(./icon_edit_gray.png) no-repeat center center;
		background-size: cover;
	}
	.cartButton{
		flex-shrink: 0;
		width: 94%;
		height: 44px;
		margin-bottom: 20px;
	}

	.cartButton button{
		height: 100%;
		width: 100%;
		border-radius: 22px;
		background: #DF261B;
		outline: none;
		border: none;
		font-size: 14px;
		color: #fff;
	}

	/*延时动画*/
	.popup-enter{
		transform: translateY(100%)
	}
	.popup-enter-active{
		transition: all ease 1.5s;
	}
	.popup-enter-to{
		transform: translateY(0);
	}
	.popup-leave{
		transform: translateY(0);
	}
	.popup-leave-active{
		transition: all ease 0.5s;
	}
	.popup-leave-to{
		transform: translateY(100%);
	}
</style>