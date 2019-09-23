<template>
	<div class="table">
    <p>电子证照共享管理 / 证照接口调用日志 / 证照接口调用日志详情</p>
		<div class="content">
			<h1>证照接口调用日志详情</h1>

			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >

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
        prop="name"
        label="操作IP"
        >
      </el-table-column>
      <el-table-column
        label="调用结果">
				<template slot-scope="scope">
          <span  class="lastItem" :class="scope.row.status==0?'':'stop'">{{scope.row.status==0?'成功':'失败'}}</span>
        </template>
      </el-table-column>
			<el-table-column
        prop="name"
        label="详细时间">
      </el-table-column>

    </el-table>		
	</div>
</template>

<script>

    export default {
      name:'infoShow',
      components: {

  		},
    	data(){
    		return {
					tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:0
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:0
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:0
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0',
						status:1
          },],
					currentPage4: 4,
          multipleSelection:[],
					form: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
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
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        delFun(scope){
          console.log(scope);
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
