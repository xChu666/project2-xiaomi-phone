<template>
	<p v-text="text" class="notice"></p>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "MiNotice",
		data(){
	                return {
	                        text:"",
	                }
		},
		//创建完了看不见，得挂载上了才能看见
		mounted(){
		        setTimeout(() => {
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el)
		        },1500)
		}
	}
</script>

<style scoped>
	p.notice {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 100000;
		transform: translate(-50%, -50%);
		background-color: #000;
		color: #fff;
		font-size: 14px;
		padding: 10px 20px;
		border-radius: 4px;
	}
</style>