<template>
	<div class="loading">
		<p>loading...</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name:"MiLoading",
		data(){
	                return {

	                }
		}
	}
</script>

<style scoped>
	.loading{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
		z-index:999;
		background-color: rgba(255,255,255,.9) ;
	}
	.loading p{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		color: #b0b0b0;

	}
</style>