<template>
	<div class="page-container-list">
		<div class="page-header">
			<i class="iconfont icon-back" @click="$router.back()"></i>
			<input type="text" name="" id="search" placeholder="搜一搜" v-model="names" @keyup.enter="searchHander"/>
			<!-- v-on:input 内容变化就触发方法-->
			<i class="iconfont icon-category-selected-copy card" @click="showMode=!showMode"  v-show="!showMode"></i>
			<i class="iconfont icon-category1 card" @click="showMode=!showMode" v-show="showMode"></i>
		</div>
		<ul class="title">
			<li @click="changeOrderDir()"><span>排序</span>
				<i class="iconfont icon-paixushang-"  v-show="classDir"></i>
				<i class="iconfont  icon-paixuxia-"  v-show="!classDir"></i>
			</li>
			<li @click="changeOrderCol('price')" :class="{active:orderCol==='price'}"><span>价格</span></li>
			<li @click="changeOrderCol('sale')" :class="{active:orderCol==='sale'}"><span>销量</span></li>
			<li @click="changeOrderCol('rate')" :class="{active:orderCol==='rate'}"><span>评论</span></li>
		</ul>
		<div class="more_list" ref="scrollS" @scroll="initOrRefreshScroll">
			<div class="hid hide-scroll">
				<ul  class="listbox" :class="{card_list:!showMode,one_list:showMode}">
					<router-link v-for="item in list" :to="`/details/${item.id}`">
						<li :key="item.id">
							<img :src="`http://localhost:3000${item.avatar}`" alt="">
							<div class="shop_info">
								<p class="name" v-text="item.name"></p>
								<p class="brief" v-text="item.brief"></p>
								<p class="price"><span style="font-size: 11px;">￥</span><span
									v-text="item.price"></span></p>
								<p class="other"><span
									v-text="item.rate+'条评论'"></span><span>|</span><span
									v-text="'销量：'+item.sale"></span></p>
							</div>
						</li>
					</router-link>
				</ul>
				<p v-text="info" class="tital"></p>
			</div>
		</div>
		<div class="gotoTop" v-show="rocketShow" @click="gotoTop"></div>
	</div>
</template>

<script>
        import IScroll from "iscroll/build/iscroll-probe";
        import imagesLoaded from "imagesloaded"

        export default {
                name: "List",
                data(){
                        return {
                                list: [],//当前显示的商品数量
                                rocketShow: false,//小火箭显示隐藏
                                showMode: true,//标识当前列表显示模式
                                names: "",//关键字
                                cid: parseInt(this.$route.params.cid),
                                orderDir: "asc",//排序
                                classDir: true,//排序图标样式
                                orderCol: "price",//类型
                                pageSize: 6,//加载数量
                                isLoading: false,//标识当前是否有ajax请求未完成，处于加载状态//不要频繁点击
                                hasMore: true,//标识当前还有没有更多数据可供加载
                                isTriggerLoadMore: false,//标识当前是否触发了加载更多
                        }
                },
                created(){
                        this.getData()
                },
	        beforeDestroy(){
                        //页面销毁前，释放iscroll实例对象占用的内存
                        //实例(instance)：看得见摸得着
                        this.scroll.destroy();
                        this.scroll = null;
	        },
                watch: {
                        showMode(){ this.initOrRefreshScroll(); },//点击卡片触发
                        list(){ this.initOrRefreshScroll(); },//商品触发
                },
                methods: {
                        getData(isLoadMore = false){//isLoadMore默认是false，上面不用传
                                if(!isLoadMore){
                                        this.list = [];//如果不是加载更多，把list清空，从新增数据里加载
                                        this.rocketShow = false;//回到顶部不显示
                                }
                                this.isLoading = true;
                                this.$http({
                                        method: "post",
                                        url: "http://localhost:3000/product/list",
                                        data: {
                                                "name": this.names,
                                                "cid": this.cid,
                                                "orderCol": this.orderCol,
                                                "orderDir": this.orderDir,
                                                "begin": isLoadMore?this.list.length:0,
                                                "pageSize": this.pageSize,
                                        },
                                },false)
	                                .then(data => {
                                                this.list = this.list.concat(data);
                                                this.isLoading = false;
                                                this.hasMore = data.length === this.pageSize;
	                                })
//                                this.$axios({
//                                        method: "post",
//                                        url: "http://localhost:3000/product/list",
//                                        headers: {
//                                                "Content-Type": "application/json"
//                                        },
//                                        data: JSON.stringify({
//                                                "name": this.names,
//                                                "cid": this.cid,
//                                                "orderCol": this.orderCol,
//                                                "orderDir": this.orderDir,
//                                                "begin": isLoadMore?this.list.length:0,
//                                                "pageSize": this.pageSize,
//                                        }),
//                                })
                                //then函数一定会返回一个promise对象，如果then里面的参数函数没有
                                // 返回一个promise对象，而then会自己封装一个直接成功的promise对象并携带这个值！
                                //如果参数函数返回的是一个promise对象,则then就直接返回参数对象返回的promise对象，
                                // 自己不会再封装一个promise对象。
                                // 这样才能挡住下面一秒(时间自己设置)
//                                        .then(response =>{
//                                                return new Promise((resovle, reject) =>{
//                                                        setTimeout(() =>{
//                                                                resovle(response)
//                                                        }, 1000);
//                                                })
//                                        })
//                                        .then(response =>{//成功的回调函数
//                                                console.log(response)
//                                                if(response.status === 200){
//                                                        switch(response.data.code){
//                                                                case 200:
//                                                                        this.list = this.list.concat(response.data.data);
//                                                                        this.isLoading = false;
//                                                                        this.hasMore = response.data.data.length === this.pageSize;
//                                                                        break;
//                                                                case 500:
//                                                                case 404:
//                                                                case 401:
//                                                                case 199:
//                                                                        alert(response.data.msg);
//                                                        }
//                                                }
//                                        })
//                                        .catch(error =>{//失败的回调函数
//                                                console.log(error)
//                                        })
                        },
                        changeOrderCol(col){//选项
                                if(this.isLoading) {
                                        this.$notice("亲，你的操作太频繁了..")
                                return;
                                };
				this.orderCol = col;
				this.getData();
                        },
                        changeOrderDir(){//排序
                                if(this.isLoading) {
                                        this.$notice("亲，你的操作太频繁了..")
                                return;
                        };
                              this.orderDir =  this.orderDir === "asc" ?  "desc": "asc";
                              this.classDir = !this.classDir;
                              this.getData();
                        },
                        searchHander(){//搜索框
                                if(this.isLoading) {
                                        this.$notice("亲，你的操作太频繁了..")
                                        return;
                                };
                                this.getData();
                        },
                        initOrRefreshScroll(){//滚动
                                // iscroll规定在调用new IScroll代码时必须保证滚动区域完全渲染完毕
                                //且滚动内容比滚动容器宽或高
                                this.$nextTick(() =>{        //保证list变化导致dom更新完毕
                                        imagesLoaded(this.$refs.scrollS, () =>{//保证滚动区域内的所有图片加载完毕
                                                this.$nextTick(() =>{       //保证滚动区域内所有图片渲染完毕
                                                        if(!this.scroll){
                                                                this.scroll = new IScroll(this.$refs.scrollS, {
                                                                        click: true,//开启iscroll点击事件
                                                                        deceleration: 0.003,//设置iscroll滚动的阻尼系数，数越大阻力约小
                                                                        bounce: false,//关闭iscroll的回弹效果
                                                                        probeType: 2,//开启iscroll滚动监听，监听等级2
                                                                });
                                                                this.scroll.on("scroll", () =>{
                                                                        //console.log(this.scroll.y)
                                                                        //实时判断当前滚动位置，有没有触发加载更多，给用户一个友好的提示
                                                                        if(this.isLoaded || !this.hasMore) return;
                                                                        this.rocketShow = Math.abs(this.scroll.y) >= 150;
                                                                        this.isTriggerLoadMore = this.scroll.y === this.scroll.maxScrollY;
                                                                });
                                                                this.scroll.on("scrollEnd", () =>{
                                                                        //需不需要加载更多
                                                                        if(this.isTriggerLoadMore){
                                                                                this.isTriggerLoadMore = false;
                                                                                this.getData(true);
                                                                        }
                                                                })
                                                        }else{
                                                                this.scroll.refresh();
                                                        }
                                                });
                                        });
                                });
                        },
                        gotoTop(){
                                this.rocketShow = false
                                this.scroll.scrollTo(0,0,1000);
                        },
                },
                computed: {//计算函数，自动判断情况
                        info(){
                                if(this.isLoading) return "加载中..";
                                else if(this.isTriggerLoadMore) return "放手立即加载..";
                                else if(this.hasMore) return "上拉加载更多.."
                                else if(this.list.length === 0) return "暂无相关商品数据，敬请期待.."
                                else return "亲亲已经不能给再多啦.."
                        }
                },
        }
</script>

<style>
	.gotoTop{
		background: url("gotoTop.png") no-repeat center center;
		position: fixed;
		right: 20px;
		bottom: 30px;
		background-size: cover;
		width:32px;
		height: 32px;
	}
	.page-container-list {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #F4F4F4;
	}

	.page-container-list .page-header {
		height: 12vw;
		flex-shrink: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-shrink: 0;
		background: #fff;
	}

	.page-container-list .page-header i {
		font-size: 20px !important;
		flex-shrink: 0;
	}

	.page-container-list .page-header input {
		flex: 0.8;
		height: 9vw;
		outline: none;
		border: none;
		background: #F5F5F5;
		border-radius: 9vw;
		padding: 10px;
		box-sizing: border-box;
	}

	.page-container-list ul.title {
		height: 10vw;
		/* background: red; */
		display: flex;
		justify-content: center;
		flex-shrink: 0;
		background: #fff;
	}

	.page-container-list ul.title li {
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #333;
		background: #fff;
	}

	.page-container-list ul.title li.active {
		color: #FF1818;
	}

	.page-container-list .page-content .title>i {
		font-size: 14px !important;
		margin-left: 3px;
		color: #f00;
	}

	.page-container-list .more_list {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden; /*iscroll插件要求*/
		touch-action: pan-y; /*消除iscroll滚动警告*/
	}

	.page-container-list .hid>p{
		text-align: center;
		padding: 3px;
		color: #666;
		font-size: 14px;
	}

	.page-container-list .paixu {
		color: red;
	}

	/* 卡片样式1 */
	.page-container-list.page-container-list ul.one_list {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.page-container-list.page-container-list ul.one_list li {
		height: 32vw;
		padding: 3vw;
		box-sizing: border-box;
		display: flex;
		background: #fff;
	}

	.page-container-list.page-container-list ul.one_list li img {
		height: 100%;
	}

	.page-container-list.page-container-list ul.one_list li .shop_info {
		height: 100%;
		flex-grow: 1;
		padding: 1vw 1vw 1vw 5vw;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.page-container-list ul.one_list li .shop_info .name {
		font-size: 14px;
		color: #333;
	}

	.page-container-list ul.one_list li .shop_info .brief {
		font-size: 11px;
		color: #888;
	}

	.page-container-list ul.one_list li .shop_info .price {
		font-size: 17px;
		color: #fa4f0B;
	}

	.page-container-list ul.one_list li .shop_info .other {
		font-size: 10px;
		color: #888;
	}

	.page-container-list ul.one_list li .shop_info .other span {
		margin: 0 1vw;
	}

	/* 卡片样式2 */
	.page-container-list ul.card_list {
		flex-grow: 1;
		display: flex;
		padding: 3vw;
		box-sizing: border-box;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.page-container-list ul.card_list a {
		width: 48%;
	}

	.page-container-list ul.card_list li {
		padding: 2vw;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		border-radius: 3vw;
		background: #fff;
		margin-bottom: 3vw;
	}

	.page-container-list ul.card_list li img {
		width: 100%;
	}

	.page-container-list ul.card_list li .shop_info {
		padding: 2vw 0;
		box-sizing: border-box;
		margin-top: -5vw;
	}

	.page-container-list ul.card_list li .shop_info p {
		width: 100%;
	}

	.page-container-list ul.card_list li .shop_info .name {
		font-size: 14px;
		color: #333;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.page-container-list ul.card_list li .shop_info .brief {
		font-size: 11px;
		color: #888;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.page-container-list ul.card_list li .shop_info .price {
		font-size: 17px;
		color: #fa4f0B;
	}

	.page-container-list ul.card_list li .shop_info .other {
		font-size: 10px;
		color: #888;
		display: flex;
		justify-content: space-around;
	}

	.page-container-list ul.card_list li .shop_info .other span {
		margin: 0 1vw;
	}

</style>