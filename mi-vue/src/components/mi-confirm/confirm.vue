<template>
	<div class="confirm" @click.self="close">
		<div class="content">
			<img :src="titleImg" alt="">
			<p v-text="text"></p>
			<div>
				<button @click="ok">确 定</button>
				<button @click="close">取 消</button>
			</div>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import titleImg from "./icon.png"
        export default {
                name: "MiConfirm",
                data(){
                        return {
                                text: "",
                                titleImg,
                                resolve:null
                        }
                },
                methods:{
			close(){
			        this.$destroy(true),
				this.$el.parentNode.removeChild(this.$el);

			},
	                ok(){
				//todo ..
		                this.resolve();
			        this.close();
			}
                }
        }
</script>

<style scoped>
	.confirm {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0, 0.5);
	}

	.content {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		min-width: 65%;
		max-width: 80%;
		border-radius: 4px;
	}
	.content img {
		display: block;
		margin: 0 auto;
		width: 60px;
		margin-top: 20px;
	}
	.content p {
		font-size: 15px;
		text-indent: 2em;
		color: rgb(132,132,132);
		padding: 10px 10px 20px;
	}
	.content div{
		width:100%;
		display: flex;
	}
	.content button {
		display: block;
		width: 50%;
		padding: 10px 0;
		text-align: center;
		color: rgb(130,192,208);
		font-size: 16px;
		background-color: transparent;
		border: none;
		border-top: 1px solid #b0b0b0;
		outline: none;
	}
	.content button:nth-child(1){
		border-right: 1px solid #b0b0b0;
	}
</style>