<template>
	<div class="page-container-category">
		<div class="page-header">
			<div>搜一搜</div>
		</div>
		<div class="page-content">
			<div class="page-content_left hide-scroll">
				<ul class="list-main">
					<li v-for="item in listMain" :key="item.id"
					    :class="{ active: item.id === activeId }" @click="toggleId(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="page-content_right hide-scroll">
				<img :src="avatar" alt="" class="avatar">
				<ul class="list-sub" v-if="listSub.length > 0">
					<li v-for="item in listSub" :key="item.id" class="list-sub clearfix">
						<router-link :to="`/list/${item.id}`">
							<img :src="item.avatar" alt="">
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
				<p v-else class="empty">暂无相关商品，敬请期待</p>
			</div>
		</div>
		<div class="page-footer">
			<mi-nav></mi-nav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        //import 临时的名字 from "../../components/mi-nav"//这里是导入
        import MiNav from "../../components/mi-nav"

        export default {//导出组件
                name: "Category",
                components: {
                        // "mi-nav": 临时的名字//这里是注册
                        "mi-nav": MiNav,
                },
                data: function(){//不能写成箭头函数
                        return {
                                listMain: [],
                                activeId: 0,//记录当前激活的一级分类的id
                                listSub: [],
                                avatar: ""
                        }
                },
                methods: {
                        toggleId: function(id){
                                if(this.activeId === id) return;
                                this.activeId = id;
                                this.avatar = this.listMain.find(item => item.id === id).avatar;
                                this.$http({url: "/category/list/" + id}).then(data =>{this.listSub = data;
                                })
                        }
                },
                //数据加载完的事情
                created: function(){
                        //发送ajax请求一级分类的数据
                        // console.log("组件创建完毕了，我准备发ajax请求页面的起始数据")
                        this.$http({url: "/category/list/0"})
                                .then(data =>{
                                        this.listMain = data;
                                        this.toggleId(this.listMain[0].id)
                                })

                }
        };
</script>

<style scoped>
	.page-container-category {
		height: 100%;
		display: flex;
		flex-direction: column; /*列*/
	}

	.page-header {
		height: 12vw;
		/* background: #ff0; */
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page-header > div {
		width: 85%;
		height: 65%;
		border-radius: 20px;
		background: #eee;
		padding-left: 20px;
		display: flex;
		align-items: center;
		color: #666;
		font-size: 14px;
	}

	.page-content {
		flex-grow: 1;
		display: flex;
		border-top: 1px solid #b0b0b0;
		overflow: hidden;
	}

	.page-content_left {
		width: 24.8vw;
		flex-shrink: 0;
		overflow: auto;
	}

	.page-content_left ul.list-main {
		width: 75px;
		height: 100%;
		margin: 0 auto;
		/* background: #0f0; */
	}

	.page-content_left ul.list-main li {
		height: 50px;
		line-height: 50px;
		text-align: center;
		width: 100%;
		color: #333;
		font-size: 13px;
	}

	.page-content_left ul.list-main span {
		padding: 5px 10px;
		border-radius: 10px;
	}

	.page-content_left ul.list-main li.active span {
		background: #E11B14;
		color: #fff;
	}

	.page-content_right {
		flex: 1;
		background: #eee;
		border-left: 1px solid #b0b0b0;
		overflow: auto;
		padding: 2.66666vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	/*右边样式*/
	.page-content_right .avatar {
		width: 96%;
		border-radius: 5px;
		flex-shrink: 0;
	}

	.page-content_right p.empty, ul.list-sub {
		width: 96%;
		flex: 1;
		background: #fff;
		border-radius: 5px;
		padding: 2.666666vw;
		box-sizing: border-box;
		margin: 10px;
	}

	.page-content_right p.empty, ul.list-sub li {
		height: 97px;
		float: left;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page-content_right p.empty, ul.list-sub img {
		height: 76px;
	}

	.page-content_right p.empty, ul.list-sub span {
		display: block;
		text-align: center;
		font-size: 11px;
		color: #666;
	}

	ul.list-sub li {
		width: 33.333333%;
	}

	.page-footer {
		height: 13.333333vw;
		border-top: 1px solid #f5f5f5;
	}

</style>