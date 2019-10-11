<template>
	<div class="infoMana">
		<p>电子证照管理 / 模板管理 / 模板详情</p>
		<div class="content">
			<h1>模板详情</h1>

			<el-form class="formBox clear" ref="form" :model="form" label-width="80px">
				<el-form-item label="模板状态">
					 <el-switch active-color="#13ce66" v-model="switchFlag"></el-switch>
			  </el-form-item>
				<el-form-item label="模板名称">
					 <span class="vals">{{form.tempName}}</span>
			  </el-form-item>
				<el-form-item label="模板版本">
					 <span class="vals">{{form.version}}</span>
			  </el-form-item>
				<el-form-item label="模板预览">
					<iframe class="ofdBox" :src='form.ofdUrl'>
				 </iframe>
			  </el-form-item>
				<el-form-item label="">
					<el-button type="primary" @click='update'>保存更改</el-button>
					<el-button class="btns">返回</el-button>
			  </el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
import axios from 'axios'

    export default {
    	data(){
    		return {
					switchFlag:'',
					form: {}
    		}
    	},
    	components: {

			},
			created(){
				this.getTabData();
			},
	  	methods: {
				onSubmit() {
	        console.log('submit!');
	      },
				getTabData(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/ofdTemplate/'+sessionStorage.elId,
		       }).then(function (res) {
						 that.form = res.data;
						 if(that.form.status==1){
							 that.switchFlag =true
						 }else{
							 that.switchFlag =false
						 }
		       })
				},
				update(){
					let that = this;
					let data = {
						id: sessionStorage.elId,
						status: that.switchFlag?1:2
					};
		      axios({
		         method: 'PUT',
		         url: '/ElecCertSD/ofdTemplate',
						 data:data
		       }).then(function (res) {
						 that.$message({
							 message: '恭喜你，这是一条成功消息',
				 		 	 type: 'success'
			       });
						 setTimeout(function(){
							 history.go(-1);
						 },1000)
		       })
				},
	  	}
  	}
</script>

<style lang="less" scoped>
	.infoMana {
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
			.vals {
				color: #fff;
			}
			.items {
				font-size: 13px;
				color: #FFFFFF;
				padding: 0px 10px;
				display: inline-block;
				background: rgba(255,255,255,0.10);
				margin-right: 10px;
			}

			.ofdBox {
				margin-bottom: 10px;
				width: 90%;
				height: 500px;
				padding: 20px;
				background: rgba(255,255,255,0.10);
				border: 1px dotted rgba(255,255,255,0.50);
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
