<template>
	<ul class="mi-nav">
		<!-- router-link最终会变成a标签写样式时候也要按着a写 -->
		<li>
			<router-link to="/home">
				<i></i><span>首页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i></i><span>分类</span>
			</router-link></li>
		<li>
			<router-link to="/taste">
				<i></i><span>品味</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i></i><span>购物车</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i></i><span>个人</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "MiNav",
	};
</script>

<style>
	/*菜单*/
	ul.mi-nav{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	ul.mi-nav li{
		width: 20%;
		height: 98%;
		flex-shrink: 0;
		text-align: center;
	}
	ul.mi-nav a{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	ul.mi-nav i{
		display: block;
		width: 24px;
		height: 24px;
		margin: 0 auto;
		background: url(nav_bg.png) no-repeat;
		background-size: 100% 1000%;
	}

	ul.mi-nav span{
		display: block;
		font-size: 13px;
		color: #666;
	}
	/*分母是容器宽度减去图片宽度*/
	ul.mi-nav li:nth-child(1) i{background-position: 0 0;}
	ul.mi-nav li:nth-child(2) i{background-position: 0 22.222222%;}
	ul.mi-nav li:nth-child(3) i{background-position: 0 44.444444%;}
	ul.mi-nav li:nth-child(4) i{background-position: 0 66.666666%;}
	ul.mi-nav li:nth-child(5) i{background-position: 0 88.888888%;}

	ul.mi-nav li:nth-child(1) a.router-link-active i{background-position: 0 11.111111%;}
	ul.mi-nav li:nth-child(2) a.router-link-active i{background-position: 0 33.333333%;}
	ul.mi-nav li:nth-child(3) a.router-link-active i{background-position: 0 55.555555%;}
	ul.mi-nav li:nth-child(4) a.router-link-active i{background-position: 0 77.777777%;}
	ul.mi-nav li:nth-child(5) a.router-link-active i{background-position: 0 100.333333%;}

	/* .page-footer{
		height: 50px;
		border-top: 1px solid #f5f5f5;
	} */
</style>