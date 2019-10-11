<template>
	<div class="table">
    <!-- <card-list></card-list> -->
		<div class="content">
			<h1>模板管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="9">
             <el-form-item label="模板名称">
               <el-input v-model="form.name"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="9">
              <el-form-item label="模板状态">
                <el-select v-model="form.region" placeholder="请选择">
                   <el-option label="在用" value="1"></el-option>
                   <el-option label="停用" value="2"></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
             <el-form-item label="创建时间">
               <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
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
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="tempName"
        label="模板名称"
        width="200"
        >
      </el-table-column>
      <el-table-column
        width="100"
        prop="version"
        label="模板版本">
      </el-table-column>

			<el-table-column
        width="100"
        label="状态">
        <template slot-scope="scope">
					<span  class="lastItem" :class='scope.row.status==2?"stop":""'>
						<i></i>
						{{scope.row.status==2?"停用":"在用"}}
					</span>
	      </template>
      </el-table-column>
			<el-table-column
        prop="gmtCreate"
        width='200'
        label="创建时间">
      </el-table-column>
      <el-table-column
        >
				<template slot-scope="scope">
					<i class="del" @click='rowRouter(scope.row)'>
						<img   src="@/assets/img/lookInfo.png" alt="">
						<span class="looktxt">查看</span>
					</i>
					<i class="del" @click='delFun(scope)'>
						<img   src="@/assets/img/delete.png" alt="">
						<span class="looktxt">删除</span>
					</i>
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
import cardList from "../components/cardList";  // card列表
import axios from 'axios'

    export default {
      name:'infoShow',
      components: {
  		   cardList
  		},
    	data(){
    		return {
					tableData: [],
					currentPage4: 1,
          multipleSelection:[],
					selArr:[],
					itemNum:10,
					pgIndex:0,
					total:0,
					keyword:'',
					status:'',
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
				this.getTabData();

			},
	  	methods: {
				search(){
					let that = this;
					that.pgIndex=1;
		      axios({
		         method: 'get',
						 url: '/ElecCertSD/ofdTemplates',
						 params:{
							 pgIndex:that.pgIndex,
							 pgCount:that.itemNum,
							 sortColumn: 'gmt_create desc',
							 typeName:that.form.name,
							 status:that.form.region,
							 beginTime:that.form.date1?new Date(that.form.date1).format("yyyy-MM-dd"):''
						 }
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
		       });
				},
				handleCurrentChange(val){
					this.pgIndex = val;
					this.getTabData();
				},
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },

				getSelOp(){
		      let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/authorities',
		       }).then(function (res) {
						 that.selArr = res.data;
		       })
		    },
				getTabData(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/ofdTemplates?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&sortColumn=gmt_create+desc',
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
		       })
				},
				del(e){
					let that = this;
		      axios({
		         method: 'DELETE',
		         url: '/ElecCertSD/ofdTemplates/'+e,
		       }).then(function (res) {
						 that.getTabData();
		       })
				},
        delFun(scope){
					let that = this;
					this.$confirm('确认删除？')
	          .then(_ => {
	           	that.del(scope.row.id);
	          })
	          .catch(_ => {});
        },
				rowRouter(row){
					sessionStorage.elId = row.id;
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
			cursor: pointer;
			margin-right: 10px;
			color: #32ABFF;
			img {
				width: 15px;
	      vertical-align: middle;
				margin-right: 2px;
			}
			span {
				font-size: 12px;

			}
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
