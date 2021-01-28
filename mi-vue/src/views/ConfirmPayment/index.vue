<template>
	<div class="page-container">
		<div class="page-header">
			<i class="iconfont icon-back goback" @click="noPay"></i>
			<p>有品收银台</p>
			<i></i>
		</div>
		<div class="page-contant">
			<div class="price">
				<p><span>￥</span><span class="allPrice" v-text="prices"></span><span>.00</span></p>
				<div class="times">支付剩余时间：
					<div id="hours">00</div><span>:</span>
					<div id="mins">00</div><span>:</span>
					<div id="secs">00</div>
				</div>
			</div>
			<div class="pay">
				<div class="zfb">
					<i></i>
					<div>支付宝 <span>推荐</span></div>
					<input type="radio" name="pay" checked>
				</div>
				<div class="xiaomi">
					<i></i>
					<div>小米钱包</div>
					<input type="radio" name="pay">
				</div>
			</div>
			<div class="page-footer">
				<div class="ready-pay" @click="readyPay">确认支付￥<span class="allPrice" v-text="prices"></span></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: "ConfirmPayment",
		data(){
		        return {
		                orderId:this.$route.query.data,
			        prices:0
		        }
		},
		methods:{
                        noPay(){
				this.$confirm("放弃支付吗")
					.then(() => {
					this.$router.push("/myOrder");
				})
                        },
                        readyPay(){
				this.$http({ url:"/order/pay/"  + this.orderId, })
					.then(data => {
						this.$notice("支付成功")
						this.$router.push("./myOrder")
					},false)
                        },
		},
		created(){
		        this.$http({ url:"/order/account/" + this.orderId, })
			        .then(data => {
			                console.log(data)
                                        this.prices = data;
			        })
		}
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
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.page-contant .price{
		height: 30vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #d71d1d;
	}
	.page-contant .price .times{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-contant .price p>span{
		font-size: 13px;
	}
	.page-contant .price p>span:nth-child(2){
		font-size: 25px;
		font-weight: bold;
	}
	.page-contant .price div{
		font-size: 12px;
		margin-top: 1vw;
	}
	.pay{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.pay>div{
		width: 90%;
		display: flex;
		align-items: center;
		padding: 3vw 5vw;
		box-sizing: border-box;
		color: #333;
		font-size: 14px;
		background: #fff;
	}
	.pay>div:nth-child(1){
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		border-bottom: 1px solid #F4F4F4;
	}
	.pay>div:last-child{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		border: none;
	}
	.pay>div>div{
		flex: 1;
		padding: 0 2vw;
		box-sizing: border-box;
	}
	.zfb>i{
		height: 30px;
		width: 30px;
		background: url(./pay_alipay.png) no-repeat center center;
		background-size: cover;
	}
	.xiaomi>i{
		height: 30px;
		width: 30px;
		background: url(./pay_mipay.png) no-repeat center center;
		background-size: cover;
	}
	.zfb>div>span{
		background: #D81814;
		color: #fff;
		font-size: 9px;
		padding: 1px 3px;
		border-radius: 7px;

	}

	.page-footer{
		height: 15vw;
		background: #fff;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3vw;
		box-sizing: border-box;
	}
	.ready-pay{
		height: 100%;
		width: 100%;
		font-size: 15px;
		color: #fff;
		font-weight: bold;
		background: #E21D15;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>