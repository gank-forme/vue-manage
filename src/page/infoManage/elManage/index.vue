<template>
	<div class="table">
    <!-- <card-list></card-list> -->
		<div class="content">
			<h1>模板管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="9">
             <el-form-item label="模板名称">
               <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="9">
              <el-form-item label="模板状态">
                <el-select v-model="form.region" placeholder="请选择">
                   <el-option label="区域一" value="shanghai"></el-option>
                   <el-option label="区域二" value="beijing"></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
             <el-form-item label="创建时间">
               <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
             </el-form-item>
           </el-col>

           <el-col :span="2">
              <el-button class="searchBtn" type="primary">查询</el-button>
           </el-col>
         </el-row>
         <el-row >
           <el-col :span="9">
              <el-form-item label="证照所属部门">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col >
               <el-button class="btns" ><img src="@/assets/img/update.png" alt="">导出Excel文件</el-button>

               <el-button class="btns" ><img src="@/assets/img/add.png" alt="">新增</el-button>

               <el-button class="btns" >删除</el-button>
            </el-col>
          </el-row>

			</el-form>

		</div>


		<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
		@row-click='rowRouter'
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="模板名称"
        width="100"
        >
      </el-table-column>
      <el-table-column
        width="200"
        prop="address"
        label="模板版本">
      </el-table-column>
			<el-table-column
        width="150"
        prop="name"
        label="模板使用期限">
      </el-table-column>
			<el-table-column
        width="200"
        label="状态">
        <template slot-scope="scope">
					<span  class="lastItem" :class='scope.$index==2?"stop":""'>
						<i></i>
						{{scope.$index==2?"停用":"在用"}}
					</span>
	      </template>
      </el-table-column>
			<el-table-column
        prop="name"
        width='200'
        label="创建时间">
      </el-table-column>
      <el-table-column
        width='55'
        >
        <template slot-scope="scope">
          <img class="del" @click='delFun(scope)' src="@/assets/img/delete.png" alt="">
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
import cardList from "../components/cardList";  // card列表



    export default {
      name:'infoShow',
      components: {
  		   cardList
  		},
    	data(){
    		return {
					tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '2.0'
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
	        }
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
        },
				rowRouter(row){
					this.$router.push({
						'name':'elManageInfo'
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
      width: 20px;
      vertical-align: bottom;
      cursor: pointer;
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
				max-width: 300px;
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
