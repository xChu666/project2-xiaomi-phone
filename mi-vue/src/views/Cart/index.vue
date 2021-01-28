<template>
	<div class="cart-body">
		<div class="page-container">
			<div class="page-banner"></div>
			<div class="page-head">
				<i class="iconfont icon-back" @click="$router.back()"></i>
				<p>购物车</p>
				<span class="edit" @click="isEdit = !isEdit" v-text="isEdit ? '完成' : '编辑'">编辑</span>
			</div>
			<div class="myCart_shop">
				<div class="myCart_shop-top">
					<span v-show="list.length"><i class="checkbox" :class="{ checked : isAllCheck}" @click="toogleAllCheck"></i></span>
					<p>小米自营</p>
					<span>已免运费</span>
				</div>
				<!-- 渲染的数据 -->
				<ul class="myCart_shop-shops" v-if="list.length > 0">
					<li class="myCart_shop-shop" v-for="item in list" :key="item.id">
						<div class="iBox">
							<i class="checkbox" :class="{checked:item.checked1}" v-show="!isEdit" @click="item.checked1=!item.checked1"></i>
							<i class="checkbox" :class="{checked:item.checked2}" v-show="isEdit" @click="item.checked2=!item.checked2"></i>
						</div>
						<div class="shop_img">
							<img :src="`http://localhost:3000${item.avatar}`" alt="">
						</div>
						<div class="shop_info">
							<div class="shop_name" v-text="item.name"></div>
							<div class="shop_price">
								<p><span></span><span class="one_price" v-text="`￥${item.price}.00`"></span></p>
								<mi-count :count.sync="item.count" @increase="increaseHandler(item.id)" @decrease="decreaseHandler(item.id)"></mi-count>
							</div>
							<div class="otherBox"></div>
						</div>
					</li>
				</ul>
				<p v-else>暂无购物记录</p>
			</div>
			<div class="page-bottom">
				<div class="choise">
					<span v-show="list.length"><i class="checkbox" :class="{ checked : isAllCheck}" @click="toogleAllCheck"></i></span>
					<p>全选</p>
				</div>
				<div class="total">
					<span>合计：</span>
					<p><span v-text="`￥${total}.00`"></span></p>
				</div>
				<router-link :to="`/confirmOrder/${str}`" v-show="!isEdit">
					<div class="selected show"  @click="settlement">结算<span v-show="amount" v-text="`(${amount})`"></span></div>
				</router-link>
				<a v-show="isEdit">
					<div class="deleteGoods"  @click="deleteList">删除<span v-show="amount" v-text="`(${amount})`"></span></div>
				</a>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import  MiCount from "../../components/mi-count";
	export default {
	        name:"Cart",
		components:{
			"mi-count":MiCount,
		},
                data:function(){
                        return{
                                list:[],
                                isEdit:false,
	                        str:"",
                        }
                },
                computed:{
                        //计算总价格
                        total:function(){
                                let result = 0;
                                this.list.forEach(item => {
                                        if(item.checked1) result += item.price * item.count
                                })
                                return result;
                        },
                        //计算总数量
                        amount:function(){
                                let result = 0;
                                this.list.forEach(item => {//取反优先级最低，记得加括号
                                        //两套计算数量用同一套（不是一定会进某一个，最多进一个所以用俩if）
                                        if((!this.isEdit) && item.checked1) result += item.count;
                                        if(this.isEdit && item.checked2) result += item.count
                                })
                                return result;
                        },
                        //单选影响全选
                        isAllCheck:function(){
                                if(this.isEdit){
                                        return this.list.every(item => item.checked2)
                                }else{
                                        return this.list.every(item => item.checked1)
                                }
                        }
                },
                methods:{
                        //结算
                        settlement(){
				let ids = [];
				this.list.forEach(item => {
				        console.log(item)
                                        if(item.checked1){
                                                ids.push(item.id)
                                        };
                                });
				this.str = ids.join("-");
				console.log(this.str)
                                console.log(ids)
//				this.$http({
//                                        url:"/cart/list_ids",
//			                 method:"post",
//			                 data:{
//			                     ids,
//			                 },
//				},false)
//					.then(data => {
//					        console.log(data)
//						this.$router.push({ path:"/confirmOrder" ,query:{data}})
//					})
                        },

                        //全选影响单选
                        toogleAllCheck:function(){
                                //得先定义个变量存一下值，不然计算属性会一直拿值计算，就崩了灾难性错误
                                let flag = this.isAllCheck;
                                //优雅的三步运算
                                this.list.forEach(item => item[ this.isEdit ? "checked2" : "checked1"] = !flag)
                        },
                        //组件加减方法
                        //数量加
                        increaseHandler:function(id){
                                this.$http({
	                                method:"post",
                                        url:"/cart/increase/" + id,
                                },false)
	                                .then(data => {
//                                                let i = this.list.findIndex( item => item.id === id);
//                                                if(this.list[i].count >= 5) return;
//                                                this.list[i].count++;
                                                console.log("数量+1")
	                                })
//                                case 401:
//                                sessionStorage.clear();
//                                this.$router.replace({ path:"/login" ,query:{ to : this.$route}});
//                                break;
                        },
                        //数量减
                        decreaseHandler:function(id){
                                this.$http({
                                        method:"post",
                                        url:"http://localhost:3000/cart/decrease/" + id,
                                },false)
	                                .then(data => {
//                                                let i = this.list.findIndex( item => item.id === id);
//                                                if(this.list[i].count <= 1) return;
//                                                this.list[i].count--;
                                                console.log("数量-1");
	                                })
                        },
                        //删除
                        deleteList: function(){
                                this.$confirm("确认删除商品？")
                                        .then(() => {
		                                let ids = [];
		                                for(let i = this.list.length - 1; i >= 0 ;i--){
		                                        if(this.list[i].checked2){
		                                                //勾选的id存到ids
		                                                ids.push(this.list[i].id)
		                                                this.list.splice(i,1)
		                                        }
		                                }
		                                console.log(ids);
                                                this.$http({
                                                        method:"post",
                                                        url:"http://localhost:3000/cart/remove",
                                                        data:{
                                                                ids
                                                        },
                                                },false)
                                                .then(data => {
                                                        this.$notice("删除成功")
                                                })
					})
                        }
                },
                created:function(){
                        this.$http({
                                method:"post",
                                url:"http://localhost:3000/cart/list",
                        },false)
                        .then(data => {
                                data.forEach(item => {
                                        item.checked1 = true;
                                        item.checked2 = false;
                                })
                                this.list = data;
                        })
                }
	}
</script>

<style scoped>
	ul.myCart_shop-shops li i.checkbox{
		display: inline-block;
		width: 24px;
		height: 24px;
		background-size: 100% 100%;
		background-image: url(./cartImg/icon_checkbox_uncheck.png);
	}
	ul.myCart_shop-shops li i.checkbox.checked{
		background-image: url(./cartImg/icon_checkbox_check.png);
	}
	.cart-body{
		background: #f4f4f4;
		height: 100%;
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
		background: url(./cartImg/bg_page_header.png) no-repeat center center;
		background-size: cover;
		position: absolute;
		top: 0;
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
		width: 15vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.myCart_shop{
		width: 94%;
		margin-top: 30vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		border-radius: 10px;
		z-index: 3;
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
	.myCart_shop-top p{
		margin-left: 3vw;
		font-size: 14px;
		color: #333;
		flex-grow: 1;
	}
	.myCart_shop-top span{
		font-size: 11px;
		color: #666;
		width: auto;
	}
	.myCart_shop-top i.checkbox{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-size: 100% 100%;
		background-image: url(./cartImg/icon_checkbox_uncheck.png);
	}

	.myCart_shop-top i.checkbox.checked{
		background-image: url(./cartImg/icon_checkbox_check.png);
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
	.myCart_shop-shop .iBox{
		padding: 2vw;
	}
	.myCart_shop-shop .iBox i{
		width: 20px;
		height: 20px;
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
	.shop_price>p>span:nth-child(1){
		font-size: 10px;
	}
	ul.myCart_shop-shops .otherBox{
		height: 10vw;
	}
	ul.myCart_shop-shops .myCart_shop-shop .calculation{
		width: 24vw;
		display: flex;
	}
	ul.myCart_shop-shops .myCart_shop-shop .calculation span{
		display: block;
		width: 8vw;
		height: 8vw;
		justify-content: center;
		align-items: center;
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
	.page-bottom .choise,.total{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.page-bottom a{
		background: red;
		border-radius: 20px;
		font-size: 15px;
		color: #fff;
		text-align: center;
		line-height: 10vw;
		font-weight: bold;
		flex: 1;
	}
	.selected,.deleteGoods{
		width: 100%;
		height:100%;
	}
	.selected.show,.deleteGoods.show{
		display: block;
	}
	.page-bottom .choise{
		font-size: 13px;
		flex: 0.5;
		color: #333;
		justify-content: space-around;
	}
	.page-bottom .choise span i.checkbox{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-size: 100% 100%;
		background-image: url(./cartImg/icon_checkbox_uncheck.png);
	}
	.page-bottom .choise span i.checkbox.checked{
		background-image: url(./cartImg/icon_checkbox_check.png);
	}
	.page-bottom .total{
		flex: 2;
		justify-content: flex-end;
		margin-right: 3vw;
	}
	.page-bottom .total>span{
		font-size: 13px;
		color: #000;
		font-weight: bold;
	}
	.page-bottom .total>p{
		color: #bf1111;
	}
</style>