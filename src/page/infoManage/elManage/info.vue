<template>
	<div class="infoMana">
		<p>电子证照管理 / 模板管理 / 模板详情</p>
		<div class="content">
			<h1>模板详情</h1>

			<el-form class="formBox clear" ref="form" :model="form" label-width="80px">
				<el-form-item label="模板状态">
					 <el-switch active-color="#13ce66" v-model="form.delivery"></el-switch>
			  </el-form-item>
				<el-form-item label="模板版本">
					 <span class="vals">123123123123</span>
			  </el-form-item>
				<el-form-item label="模板状态">
					 <span class="vals">123123123123</span>
			  </el-form-item>
				<el-form-item label="模板状态">
					 <span class="vals">123123123123</span>
			  </el-form-item>
				<el-form-item label="模板状态">
					 <span class='items' v-for='i in 11'>是的</span>
			  </el-form-item>
				<el-form-item label="模板状态">
					<div class="ofdBox">
					 <img src="" alt="">
					 <img src="" alt="">
				 </div>
			  </el-form-item>
				<el-form-item label="">
					<el-button type="primary">保存更改</el-button>
					<el-button class="btns">返回</el-button>
			  </el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>

    export default {
    	data(){
    		return {

					currentPage4: 4,
					form: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: true,
	          type: [],
	          resource: '',
	          desc: ''
	        }
    		}
    	},
    	components: {

			},
			created(){
			},
	  	methods: {
				onSubmit() {
	        console.log('submit!');
	      },
				handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      }
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
				width: 220px;
				height: 280px;
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
