<template>
	<div class="page-container-details">
		<div class="icon infoA" v-if="show">
			<img src="./detailsImg/icon_arrow_left_circle_gray.png" alt="" @click="$router.back()">
			<img src="./detailsImg/icon_more_solidgray3.png" alt="" class="right_icon">
		</div>
		<div class="out" v-else>
			<div class="icon2 infoA">
				<img src="./detailsImg/icon_arrow_left_darkgray2.png" alt="" @click="$router.back()">
				<img src="./detailsImg/icon_more_lightgray2.png" alt="" class="right_icon">
			</div>
			<div class="page_title">
				<ul class="fourTitl">
					<li>商品</li>
					<li>评价</li>
					<li>详情</li>
					<li>推荐</li>
				</ul>
			</div>
		</div>
		<div class="page-contant">
			<div class="contant_box" @scroll="activeShow" ref="xian">
				<!-- 轮播图 -->
				<div class="container">
					<div class="scroll-container" ref="scroll">
						<ul class="scroll-content" ref="scrollContent">
							<li>
								<img :src="banner[banner.length-1]" alt="">
							</li>
							<li v-for="(item,i) in banner" :key="i">
								<img :src="item" alt="">
							</li>
							<li>
								<img :src="banner[0]" alt="">
							</li>>
						</ul>
					</div>
					<div class="count">
						<span v-text="bannerCount"></span><span v-text="'/'+banner.length"></span>
					</div>
				</div>
				<!-- 显示内容 -->
				<div class="main">
					<!-- 价格信息 -->
					<div class="all_info">
						<div class="info_price">
							<p class="price"><span style="font-size:18px;">￥</span><span v-text="dataInfo.price"></span></p>
							<i></i>
						</div>
						<p class="name" v-text="dataInfo.name"></p>
						<p class="brief" v-text="dataInfo.brief"></p>
					</div>
					<!-- 分期 -->
					<div class="staging">
						<span>分期</span><span>可选3/6/12期</span>
					</div>
					<!-- 发送 -->
					<div class="staging_box">
						<p><span>已选</span><span class="countOver" @click="isShow=!isShow;isButton=true">1件</span></p>
						<p><span>送至</span><input class="regions-picker" type="text" placeholder="北京 北京市 海淀区 清河街道" readonly="readonly"></p>
					</div>
					<!-- 商品详情 -->
					<div class="shop-info">
						<ul class="info-title">
							<li>商品详情</li>
							<li>包装参数</li>
							<li>常见问题</li>
							<li>安装服务</li>
						</ul>
						<div class="info-img" >
							<img v-for="item in other" :src="`http://localhost:3000${item}`" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-bottom">
			<div>
				<img src="./detailsImg/mi_shop_icon.png" alt="">
				<p>小米</p>
			</div>
			<div class="cartCount" @click="$router.push('/cart')">
				<div class="redPoint" v-text="allCount" v-show="cartCounts"></div>
				<img src="./detailsImg/icon_shop_cart.png" alt="">
				<p>购物车</p>
			</div>
			<button class="goCart" @click="isShow=!isShow;isButton=false">加入购物车</button>
			<button class="goBuy">立即购买</button>
		</div>
		<transition name="popup">
			<div class="submit" v-if="!isShow" @click.self="isShow=!isShow">
				<div class="write">
					<div class="shopInfo">
						<img :src="`http://localhost:3000${dataInfo.avatar}`" alt="">
						<div class="pic-info">
							<p><span>￥</span><span v-text="dataInfo.price"></span></p>
							<p v-text="'已选'+count+'件'"></p>
						</div>
					</div>
					<div class="shopCount">
						<div class="count_box">
							<p>数量</p>
							<div class="calculation">
								<mi-count :count.sync="count" @increase="increaseHandler" @decrease="decreaseHandler"></mi-count>
							</div>
						</div>
					</div>
					<div class="countButton" v-show="!isButton">
						<button class="goCart" @click="addCart">加入购物车</button>
						<button class="goBuy">立即购买</button>
					</div>
					<div class="cartButton buttonShow" v-show="isButton">
						<button @click="addCart">确定</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import imagesLoaded from "imagesloaded";
	import IScroll from "iscroll";
	import MiCount from "../../components/mi-count";
	export default {
	        name: "Detail",
                components:{
                        "mi-count":MiCount,
                },
                data:function(){
                        return {
                                banner:[],
                                urlId: parseInt(this.$route.params.cid),
                                other:[],
                                dataInfo:{},
                                show:true,//控制头部
                                isShow:true, //控制弹框动画
                                isButton:true,//控制弹框内按钮
                                cartCounts:false,//控制购物车角标
                                count:1,
                                allCount:0,//获取购物车商品总数量
	                        bannerCount:1,//轮播图数量变化
                        }
                },
                methods:{
                        //下滑一定高度导航变化
                        activeShow(){
                                this.show = this.$refs.xian.scrollTop >= this.$refs.xian.scrollWidth ? false :  true
                        },
                        //点击数量加减
                        //数量加
                        increaseHandler(){
                                // 操纵数据，有个方法就行
                        },
                        //数量减
                        decreaseHandler(){
                                // 操纵数据，有个方法就行
                        },
                        //加入购物车
                        addCart(){
				this.$http({
                                        method:"post",
                                        url: "http://localhost:3000/cart/add",
					data:{
                                                pid: this.urlId,
                                                count: this.count,
					}
				},false)
				.then(data => {
                                        this.isShow = !this.isShow;//隐藏弹框
                                        this.$notice("加入成功")
                                        this.cartCounts=true
                                        this.allCount += this.count//直接操作数据，大哥NB
//					this.cartAdd().one();
				})
                        },
			//获取商品总数量
	                cartAdd(){
                                this.$http({ url:"/cart/total"},false)
                                .then(data => {
                                        this.allCount = data
                                        if(this.allCount > 0 && sessionStorage.getItem("token")){
                                                this.cartCounts = true;
                                                console.log(this.cartCounts)
                                        }else{
                                                this.cartCount = false;
                                                console.log(this.cartCounts)
                                        };
                                })
	                },
                },
                created(){
                        this.$http({ url:`/product/model/` + this.urlId },false)
	                        .then( product => {
                                        this.dataInfo = product;
                                        console.log(this.dataInfo)
                                        this.banner = product.bannerImgs.split(",");
                                        this.other = product.otherImgs.split(",");
	                        });
			this.cartAdd();
                },
		watch:{
                         banner(){
				this.$refs.scrollContent.style.width = (this.banner.length + 2) + "00%";
				this.$nextTick(() => {
				        imagesLoaded(this.$refs.scrollContent,() => {
                                                this.$nextTick(() => {
                                                        this.scroll = new IScroll(this.$refs.scroll,{
                                                                scrollY:false,//关闭竖向滚动
                                                                scrollX:true,//开启横向滚动
                                                                snap:true,//开启轮播图模滚动（开启对齐模式）
                                                                momentum:false,//关闭惯性滚动
                                                        });
                                                        this.scroll.on("scrollStart",() => clearTimeout(this.timer))
							this.scroll.on("scrollEnd",() => {
                                                                this.bannerCount ++
							        this.scroll.disable();
                                                                if (this.scroll.currentPage.pageX === 0) {
                                                                        this.scroll.goToPage(this.banner.length, 0, 0);
                                                                        this.bannerCount  = this.banner.length;
                                                                } else if (this.scroll.currentPage.pageX === this.banner.length + 1) {
                                                                        this.scroll.goToPage(1, 0, 0);
                                                                        this.bannerCount  = 1;
                                                                } else {}
                                                                this.scroll.enable();
                                                                this.timer = setTimeout(() => this.scroll.next(),3000)
							});
							this.scroll.goToPage(1,0,0);
//                                                        this.timer = setTimeout(() => this.scroll.next(),3000)
                                                        this.timer = setTimeout(() => {
                                                                this.scroll.next();
                                                        },3000)

                                                })
				        })

				})
                         }
		}
	}
</script>

<style scoped>
	.page-container-details{
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #F4F4F4;
	}

	.container{width: 100%; position: relative}
	.scroll-container {width: 100%; overflow: hidden;touch-action: pan-x;}
	ul.scroll-content{white-space: nowrap;font-size: 0}
	ul.scroll-content li{display: inline-block;width: 100vw}
	ul.scroll-content li img{width: 100%}
	.count{
		position: absolute;
		bottom:10px;
		right:10px;
		width: 60px;
		height:40px;
		border-radius: 20px;
		background: rgba(200,200,200,.6);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
	}



	.page-container-details .infoA{
		width: 100%;
		height: 11vw;
		flex-shrink: 0;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.page-container-details .icon img{
		height: 100%;
	}
	.page-container-details .icon .right_icon{
		height: 65%;
		margin-right: 5px;
	}
	.page-container-details .icon2 img{
		height: 100%;
	}
	.page-container-details .icon2 .right_icon{
		height: 65%;
		margin-right: 5px;
	}

	.page-container-details .page_title{
		width: 100%;
		height: 11vw;
		flex-shrink: 0;
		background: #EFEFF0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
	}
	.page-container-details .page_title ul.fourTitl{
		width: 70%;
		height: 100%;
		display: flex;
	}
	.page-container-details .page_title ul.fourTitl li{
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #333;
	}

	.page-container-details .page-contant{
		flex-grow: 1;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.page-container-details .contant_box{
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.page-container-details .swiper-container{
		flex-shrink: 0;
		width: 100%;
	}
	.page-container-details .swiper-wrapper img{
		width: 100%;
		display: block;
	}
	.page-container-details .main{
		flex: 1;
	}
	.page-container-details .main .all_info{
		height: 30vw;
		display: flex;
		background: #fff;
		flex-direction: column;
		justify-content: space-evenly;
		padding: 3vw;
		box-sizing: border-box;
	}
	.page-container-details .main .all_info .brief{
		width: 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.page-container-details .all_info .info_price{
		color: #B4731F;
		font-size: 26px;
	}
	.page-container-details .all_info .name{
		font-size: 17px;
		color: #333;
		font-weight: bold;
	}
	.page-container-details .all_info .brief{
		font-size: 13px;
		color: #888;
	}

	.page-container-details .main .staging{
		display: flex;
		align-items: center;
		height: 13vw;
		background: #fff;
		font-size: 13px;
		padding: 0 4vw;
		box-sizing: border-box;
		margin: 3vw 0;
	}
	.page-container-details .main .staging span:nth-child(1){
		display: block;
		font-weight: bold;margin-right: 5vw;
	}
	.page-container-details .main .staging span:nth-child(2){
		display: block;
		flex-grow: 1;
	}
	.page-container-details .main .staging_box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 26vw;
		background: #fff;
		font-size: 13px;
		padding: 0 4vw;
		box-sizing: border-box;
		margin: 3vw 0;
	}
	.page-container-details .main .staging_box p{
		display: flex;
		height: 50%;
		align-items: center;
	}
	.page-container-details .main .staging_box span:nth-child(1){
		width: 8vw;
		font-weight: bold;
		margin-right: 5vw;
		border-bottom: 1px solid #f4f4f4;
	}
	.page-container-details .main .staging_box span:nth-child(2){
		flex-grow: 1;
		display: flex;
		height: 100%;
		align-items: center;
		border-bottom: 1px solid #DADADA;
	}
	.page-container-details .main .staging_box input{
		outline: none;
		border: none;
		width: 100%;
	}
	.page-container-details ul.info-title{
		height: 11vw;
		display: flex;
	}
	.page-container-details ul.info-title li{
		height: 100%;
		width: 25%;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-container-details .info-img{
		width: 100%;
	}
	.page-container-details .info-img img{
		width: 100%;
		display: block;
	}
	.page-container-details .page-bottom{
		height: 15vw;
		flex-shrink: 0;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box;
	}
	.page-container-details .page-bottom>div{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.page-container-details .page-bottom>div img{
		height: 25px;
	}
	.page-container-details .page-bottom>div p{
		font-size: 9px;
	}
	.page-container-details .page-bottom>button{
		height: 38px;
		flex: 3;
		font-size: 14px;
		color: #fff;
		font-weight: bold;
		outline: none;
		border: none;
	}
	.page-container-details .page-bottom .cartCount{
		position: relative;
	}
	.page-container-details .page-bottom .cartCount .redPoint{
		position: absolute;
		height: 4vw;
		width: 4vw;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 10px;
		font-weight: bold;
		text-align: center;
		line-height: 4vw;
		right: 2vw;
	}
	.page-container-details .page-bottom .goCart{
		border-bottom-left-radius: 19px;
		border-top-left-radius: 19px;
		background: #E1B659;
	}
	.page-container-details .page-bottom .goBuy{
		border-bottom-right-radius: 19px;
		border-top-right-radius: 19px;
		background: #DA1B15;
	}
	.page-container-details .submit{
		z-index: 10000;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
	}
	.page-container-details .submit .write{
		z-index: 10000;
		position: fixed;
		width: 100%;
		height: 70%;
		bottom: 0;
		background: #fff;
		border-radius: 10px 10px 0 0;
	}
	.page-container-details .write{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.page-container-details .write .shopInfo{
		height: 45vw;
		width: 100%;
		/* background: #DA1B15; */
		padding: 4vw;
		box-sizing: border-box;
		display: flex;
	}
	.page-container-details .write .shopInfo img{
		height: 100%;
	}
	.page-container-details .write .shopInfo .pic-info{
		flex-grow: 1;
		height: 100%;
		display: flex;
		padding: 7vw 0;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.page-container-details .write .shopInfo .pic-info p:nth-child(1){
		font-size: 26px;
		color: rgb(180, 115, 31);
	}
	.page-container-details .write .shopInfo .pic-info p:nth-child(1) span:nth-child(1){
		font-size: 17px;
	}
	.page-container-details .write .shopInfo .pic-info p:nth-child(2){
		font-size: 13px;
		color: #666;
	}

	.page-container-details .write .shopCount{
		flex-grow: 1;
		width: 100%;
		padding: 5vw;
		box-sizing: border-box;
	}
	.page-container-details .write .shopCount .count_box{
		height: 100%;
		display: flex;
	}
	.page-container-details .write .shopCount .count_box p{
		font-size: 13px;
		color: #333;
		font-weight: bold;
		flex-grow: 1;
	}
	.page-container-details .write .shopCount .count_box .calculation{
		width: 24vw;
		height: 8vw;
		display: flex;
	}
	.page-container-details .write .shopCount .count_box .calculation span{
		display: flex;
		width: 8vw;
		height: 8vw;
		align-items: center;
		justify-content: center;

	}
	/* 点数量 */
	.page-container-details .countButton>button{
		width: 50%;
		height: 44px;
		font-size: 14px;
		color: #fff;
		font-weight: bold;
		outline: none;
		border: none;
		float: left;
	}
	.page-container-details .countButton .goCart{
		border-bottom-left-radius: 19px;
		border-top-left-radius: 19px;
		background: #E1B659;
	}
	.page-container-details .countButton .goBuy{
		border-bottom-right-radius: 19px;
		border-top-right-radius: 19px;
		background: #DA1B15;
	}

	/* 点加入购物车 */
	.page-container-details .cartButton,.countButton{
		width: 94%;
		height: 44px;
		margin-bottom: 20px;
	}

	.page-container-details .write .cartButton button{
		height: 100%;
		width: 100%;
		border-radius: 22px;
		background: #DF261B;
		outline: none;
		border: none;
		font-size: 14px;
		color: #fff;
	}
	.page-container-details .cartButton.buttonShow,.countButton.buttonShow{
		display: block;
	}
	/*延时动画*/
	.popup-enter{
		transform: translateY(200%)
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
		transform: translateY(200%);
	}

</style>