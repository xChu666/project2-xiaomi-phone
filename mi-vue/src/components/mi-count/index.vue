<template>
	<div class="calculation">
		<button :disabled="count === 1" @click.prevent="decreaseHandler">-</button>
		<span v-text="count"></span>
		<button :disabled="count === maxCount" @click.prevent="increaseHandler">+</button>
	</div>
</template>

<script>
	export default {
	        name: "MiCount",
                props:{
                        count:{
                                type: Number,
                                required:true,
                        },
                        maxCount:{
                                type: Number,
                                default:5
                        }
                },
                methods:{
                        increaseHandler(){
                                this.$emit("increase");//如果需要传参可以写在后面this.$emit("increase",参数)
                                this.$emit("update:count",this.count + 1)
                        },
                        decreaseHandler(){
                                this.$emit("decrease");
                                this.$emit("update:count",this.count - 1)
                        }
                }
	}
</script>

<style>
	.calculation button{
		height: 100%;
		width: 30px;
		outline-style: none;
		border: none;
	}
</style>