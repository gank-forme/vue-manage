<template>
	<div class="info">
		<p>电子证照管理 / 目录管理 / 目录详情</p>
		<div class="content">
			<h1 class="topTit">目录详情</h1>
			<div class="tabCon">
				<table>
					<tbody>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>

						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
							<td>
								<h2>证照类型名称：</h2>
								<p>certificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.name' placeholder="请输入内容"></el-input>
							</td>
						</tr>

					</tbody>
				</table>
			</div>

		</div>

		<div class="bottom">
			<el-button type="primary">保存更改</el-button>
			<el-button class="btns">返回</el-button>
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
	          delivery: false,
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
	.info {
		padding: 10px 24px;
		p {
			opacity: 0.3;
			font-size: 14px;
			color: #FFFFFF;
		}
		.topTit {
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

			}
			.tabCon {
				padding: 20px;
			}
			table {
				width: 100%;
				td {
					padding: 10px 20px;
					h2 {
						font-size: 14px;
						color: #fff;
					}
				}
			}

		}
		.bottom {
			width: 100%;
			left: 0px;
			position: fixed;
			bottom: 0;
			text-align: right;
			background: #3B5694;
			padding: 10px 0;
			.btns {
				margin-right: 20px;
			}
		}
	}
</style>
