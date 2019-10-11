<template>
	<div class="table">
		<p>电子证照管理 / {{title}}列表</p>
		<div class="content">
			<h1>{{title}}</h1>
			<el-form class="formBox clear" ref="form" :model="form" label-width="80px">

				<el-col :span="9">
					<el-form-item label="时间范围">
						<el-date-picker
							 v-model="value2"
							 type='daterange'
							 align="right"
							 unlink-panels
							 range-separator="至"
							 start-placeholder="开始日期"
							 end-placeholder="结束日期"
							 :picker-options="pickerOptions">
						 </el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
				  <el-form-item label="签发机关">
				    <el-input v-model="keyword"></el-input>
				  </el-form-item>
				</el-col>

				<el-col :span="2">
				   <el-button class="searchBtn" type="primary" @click='search'>搜索</el-button>
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
        prop="number"
        label="证件号码">
      </el-table-column>
			<el-table-column
        prop="issuingUnit"
        label="证照签发机关">
      </el-table-column>
			<el-table-column
        prop="issuingDate"
        label="生成时间">
      </el-table-column>
			<el-table-column
        label="状态">
				<template slot-scope="scope">
					<span  class="lastItem" :class='scope.row.status==2?"stop":""'>
						<i></i>
						{{scope.row.status==2?"停用":"在用"}}
					</span>
	      </template>
      </el-table-column>
    </el-table>

		<el-pagination
      @size-change="handleCurrentChange"
      @current-change="handleCurrentChange"
			@prev-click = 'handleCurrentChange'
			@next-click = 'handleCurrentChange'
      :page-sizes="[10]"
      :page-size="itemNum"
			background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>

<script>
import axios from 'axios'

    export default {
    	data(){
    		return {
					tableData: [],
					itemNum:16,
					pgIndex:0,
					total:0,
					keyword:'',
					status:'',
					sortColumn:'',
					beginTime:'',
					endTime:'',
					title:sessionStorage.typeName,
					pickerOptions: {
		        shortcuts: [{
		          text: '最近一周',
		          onClick(picker) {
		            const end = new Date();
		            const start = new Date();
		            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		            picker.$emit('pick', [start, end]);
		          }
		        }, {
		          text: '最近一个月',
		          onClick(picker) {
		            const end = new Date();
		            const start = new Date();
		            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		            picker.$emit('pick', [start, end]);
		          }
		        }, {
		          text: '最近三个月',
		          onClick(picker) {
		            const end = new Date();
		            const start = new Date();
		            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		            picker.$emit('pick', [start, end]);
		          }
		        }]
		      },
		      value2: '',
					form: {}
    		}
    	},
    	components: {

			},
			created(){
				this.getList();
			},
	  	methods: {
				search(){
					let that = this;
					that.pgIndex=1;
					console.log(that.value2);
					that.beginTime  = that.value2?new Date(that.value2[0]).format("yyyy-MM-dd hh:mm:ss"):'';
					that.endTime  = that.value2?new Date(that.value2[1]).format("yyyy-MM-dd hh:mm:ss"):'';
		      axios({
		         method: 'get',
						 url: '/ElecCertSD/'+sessionStorage.port+'s/vo?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&sortColumn=gmt_create+desc&beginTime='+that.beginTime+'&endTime='+that.endTime,
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
		       });
				},
				onSubmit() {
	        console.log('submit!');
	      },
				handleCurrentChange(val){
					this.pgIndex = val;
					this.getList();
				},
				rowRouter(row){
					sessionStorage.tableId = row.id;
					this.$router.push({
						'name':'indexInfo'
					})
				},
				getList(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/'+sessionStorage.port+'s/vo?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&sortColumn=gmt_create+desc&beginTime='+that.beginTime+'&endTime='+that.endTime,
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
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
