<template>
	<div class="table">
    <p>电子证照共享管理 / 证照接口调用日志</p>
		<div class="content">
			<h1>证照接口调用日志</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
					<el-col :span="6">
            <el-form-item label="调用部门">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
					<el-col :span="9">
             <el-form-item label="时间范围">
							 <el-date-picker
						      v-model="value2"
						      type="daterange"
						      align="right"
						      unlink-panels
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :picker-options="pickerOptions">
						    </el-date-picker>
             </el-form-item>
           </el-col>
           <el-col :span="2">
              <el-button class="searchBtn" type="primary" @click='search'>查询</el-button>
           </el-col>
         </el-row>

			</el-form>

		</div>


		<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
				width='100'
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="调用部门"
        >
      </el-table-column>
      <el-table-column
        prop="userIp"
        label="操作IP">
      </el-table-column>
			<el-table-column
        prop="module"
        label="模块名称">
      </el-table-column>
			<el-table-column
        label="是否成功">
				<template slot-scope="scope">
          <span class="lastItem" :class='scope.row.flag==1?"":"stop"'>{{scope.row.flag==1?'成功':'失败'}}</span>
        </template>
      </el-table-column>
			<el-table-column
        prop="gmtCreate"
        label="操作时间">
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
      name:'infoShow',
      components: {

  		},
    	data(){
    		return {
					tableData: [],
					itemNum:10,
					pgIndex:0,
					total:0,
					keyword:'',
					status:'',
					sortColumn:'',
					beginTime:'',
					endTime:'',
          multipleSelection:[],
					form: {},
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
	        value2: ''
    		}
    	},
			created(){
				this.getList();
			},
	  	methods: {
				search(){
					let that = this;
					that.pgIndex=1;
					that.beginTime  = that.value2?new Date(that.value2[0]).format("yyyy-MM-dd hh:mm:ss"):'';
					that.endTime  = that.value2?new Date(that.value2[1]).format("yyyy-MM-dd hh:mm:ss"):'';
					axios({
						 method: 'get',
						 url: '/ElecCertSD/operlogs',
						 params:{
							 pgIndex:that.pgIndex,
							 pgCount:that.itemNum,
							 sortColumn: 'gmt_create desc',
							 typeIs:1,
							 keyword:that.form.name,
							 beginTime:that.beginTime,
							 endTime:that.endTime
						 }
					 }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
					 });
				},
				handleCurrentChange(val){
					this.pgIndex = val;
					this.getList();
				},
        delFun(scope){
          console.log(scope);
        },
				rowRouter(row){
					sessionStorage.tableId = row.id;
					this.$router.push({
						'name':'shareLogInfo'
					})
				},
				getList(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/operlogs?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&typeIs=1&sortColumn=gmt_create+desc&beginTime='+that.beginTime+'&endTime='+that.endTime,
		       }).then(function (res) {
						 that.tableData = res.data.elements;
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
    .del {
      display: none;
      width: 15px;
      vertical-align: middle;
      cursor: pointer;
    }
		.looktxt {
			display: none;
			color: #32ABFF;
			margin-left: 5px;
		}
		.content {
			margin-top: 15px;
			background: rgba(255,255,255,.1);
      .formBox {
        padding: 0 20px;
      }
			h1 {
				font-size: 16px;
				color: #FFFFFF;
				border-bottom: 1px solid rgb(233,233,233,0.1);
				padding: 16px 24px;
				margin-bottom: 25px;
			}
			.el-col {
				// max-width: 300px;
        .btns	{
          border: 1px solid #DCDFE6;
          color: #fff;
          background: transparent;
          img {
            vertical-align: bottom;
            width: 12px;
            height: 12px;
            margin-right: 5px;
          }
        }

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
