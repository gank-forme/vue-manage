<template>
	<div class="table">
		<p>电子证照管理 / 身份证列表</p>
		<div class="content">
			<h1>身份证列表</h1>
			<el-form class="formBox clear" ref="form" :model="form" label-width="80px">
				<el-col :span="6">
				  <el-form-item label="搜索条件">
				    <el-input v-model="form.name"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="6">
				  <el-form-item label="证照状态">
						<el-select v-model="form.region" placeholder="请选择">
							 <el-option label="区域一" value="shanghai"></el-option>
							 <el-option label="区域二" value="beijing"></el-option>
						 </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="6">
				  <el-form-item label="生成时间">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				  </el-form-item>
				</el-col>
				<el-col :span="2">
				   <el-button class="searchBtn" type="primary">搜索</el-button>
				</el-col>
			</el-form>

		</div>


		<el-table
      :data="tableData"
			@row-click='rowRouter'
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="证件号码">
      </el-table-column>
			<el-table-column
        prop="address"
        label="证照签发机关">
      </el-table-column>
			<el-table-column
        prop="address"
        label="生成时间">
      </el-table-column>
			<el-table-column
        label="状态">
				<template slot-scope="scope">
					<span  class="lastItem" :class='scope.$index==2?"stop":""'>
						<i></i>
						{{scope.$index==2?"停用":"在用"}}
					</span>
	      </template>
      </el-table-column>
    </el-table>

		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
			background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
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
	      },
				rowRouter(row){
					this.$router.push({
						'name':'indexInfo'
					})
				}
	  	}
  	}
</script>

<style lang="less" scoped>
	.table {
		padding: 10px 24px;
		p {
			opacity: 0.3;
			font-size: 14px;
			color: #FFFFFF;
		}
		.content {
			margin-top: 15px;
			background: rgba(255,255,255,.1);
			h1 {
				font-size: 16px;
				color: #FFFFFF;
				border-bottom: 1px solid rgb(233,233,233,0.1);
				padding: 16px 24px;
				margin-bottom: 25px;
			}
			.el-col {
				max-width: 300px;
				.el-form-item__label {
						color: #fff !important;
				}
			}
			.searchBtn {
				margin-left: 30px;
			}
		}
		.lastItem {
			color: #4CAF50;
			i {
				display: inline-block;
				width: 5px;
				height: 5px;
				border-radius: 5px;
				background: #4CAF50;
				vertical-align: middle;
				margin-right: 5px;
			}
		}
		.lastItem.stop {
			color: #E86161;
			i {
				display: inline-block;
				width: 5px;
				height: 5px;
				border-radius: 5px;
				background: #E86161;
				vertical-align: middle;
				margin-right: 5px;
			}
		}
	}
</style>
