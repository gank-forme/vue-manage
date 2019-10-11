<template>
	<div class="info">
		<p>电子证照管理 / {{title}}列表 / 证照详情</p>
		<h2>证照详情</h2>
		<div class="content">
			<h1><img src="../../assets/img/info.png" alt="">{{title}}详情</h1>

			<el-form class="formBox clear" ref="form" :model="form" >
				<el-col v-for='i in column' :span="8">
				  <el-form-item :label="i.comment">
				    {{i.value}}
				  </el-form-item>
				</el-col>

			</el-form>
		</div>

		<div class="content">
			<h1><img src="../../assets/img/prev.png" alt="">证照预览</h1>

			<iframe class="ofdBox" :src='iframeSrc'></iframe>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'


    export default {
    	data(){
    		return {
					column:[],
					infoData:'',
					title:sessionStorage.typeName,
					iframeSrc:'',
					form:{}
    		}
    	},
    	components: {

			},
			created(){
				this.getList();
			},
	  	methods: {
				getList(){
					let that = this;
					axios({
						 method: 'get',
						 url: '/ElecCertSD/'+sessionStorage.port+'/vo/'+sessionStorage.tableId,
					 }).then(function (res) {
						 that.column=res.data.columnsMap;
						 that.infoData=res.data.data;
						 that.getOfd();
					 })
				},
				getOfd(){
					let that = this;
					let data = {
						'modelName':that.infoData.modelName,
						'ofdName':that.infoData.ofdName,
						'content':JSON.stringify(that.infoData)
					}
					axios({
						 method: 'post',
						 url: '/ElecCertSD/ofdpath',
						 data:qs.stringify(data)
					 }).then(function (res) {
						 that.iframeSrc = res.data;
					 })
				}
	  	}
  	}
</script>

<style lang="less" scoped>
	.info {
		padding: 10px 24px;
		p {
			opacity: 0.3;
			font-size: 14px;
			color: #FFFFFF;
		}
		h2 {
			font-size: 16px;
			color: #FFFFFF;
			padding: 10px 0;
		}
		.formBox {
			padding: 0 20px;
		}
		.content {
			margin-top: 15px;
			background: rgba(255,255,255,.1);
			padding-bottom: 10px;
			h1 {
				font-size: 16px;
				color: #FFFFFF;
				border-bottom: 1px solid rgb(233,233,233,0.1);
				padding: 16px 24px;
				margin-bottom: 25px;
				img {
					display: inline-block;
					width: 20px;
					vertical-align: text-bottom;
					margin-right: 5px;
				}
			}
			.el-col {
				max-width: 300px;
				color: #fff;
			}
			.ofdBox {
				margin-left: 20px;
				margin-bottom: 10px;
				width: 80%;
				height: 500px;
				padding: 20px;
				background: rgba(255,255,255,0.10);
				border: 1px solid rgba(255,255,255,0.50);
				img {
					display: block;
					width: 100%;
					height: 135px;
					background: #fff;
				}
				img:last-child {
					margin-top: 10px;
				}
			}
		}
	}
</style>
