<template>
	<div class="info">
		<p>电子证照管理 / 身份证列表 / 证照详情</p>
		<h2>证照详情</h2>
		<div class="content">
			<h1><img src="../../assets/img/info.png" alt="">身份证详情</h1>

			<el-form class="formBox clear" ref="form" :model="form" label-width="80px">
				<el-col v-for='i in 11' :span="8">
				  <el-form-item label="搜索条件:">
				    段誉
				  </el-form-item>
				</el-col>

			</el-form>
		</div>

		<div class="content">
			<h1><img src="../../assets/img/prev.png" alt="">证照预览</h1>

			<div class="ofdBox">
				<img src="" alt="">
				<img src="" alt="">
			</div>
		</div>



	</div>
</template>

<script>

    export default {
    	data(){
    		return {
					tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
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
			.el-col {
				max-width: 300px;
				color: #fff;
			}
			.ofdBox {
				margin-left: 20px;
				margin-bottom: 10px;
				width: 220px;
				height: 280px;
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
