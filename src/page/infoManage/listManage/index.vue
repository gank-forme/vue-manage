<template>
	<div class="table">
    <!-- <card-list></card-list> -->
		<div class="content">
			<h1>目录管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="7">
             <el-form-item label="证照类型名称">
               <el-input v-model="form.name"></el-input>
             </el-form-item>
           </el-col>
            <el-col :span="7">
             <el-form-item label="创建时间">
               <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
             </el-form-item>
           </el-col>

	           <el-col :span="7">
	              <el-form-item label="证照颁发机构">
	                <el-input v-model="form.desc"></el-input>
	              </el-form-item>
	            </el-col>

						<el-col :span="2">
               <el-button class="searchBtn" type="primary" @click='search'>搜索</el-button>
            </el-col>
           <el-col :span="9">
             <el-form-item label="证照定义机构">
               <el-select v-model="form.region" placeholder="请选择">
                  <el-option v-for='i in selArr' :label="i" :value="i"></el-option>
                </el-select>
             </el-form-item>
           </el-col>

         </el-row>

          <el-row >
            <el-col >
               <el-button disabled class="btns" ><img src="@/assets/img/update.png" alt="">导出Excel文件</el-button>

               <el-button class="btns" @click='rowRouter0'><img src="@/assets/img/add.png" alt="">新增</el-button>

            </el-col>
          </el-row>

			</el-form>

		</div>


		<el-table
		 v-loading='loading'
		 element-loading-background="rgba(0, 0, 0, 0)"
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
        prop="typeName"
        label="证照类型名称"
        width="170"
        >
      </el-table-column>
      <el-table-column
        width="200"
        prop="authority"
        label="证照定义机构">
      </el-table-column>
			<el-table-column
        width="150"
        prop="orgName"
        label="证照颁发机构">
      </el-table-column>
			<el-table-column
        width="100"
        prop="holderCategory"
        label="持证主体类别">
      </el-table-column>
			<el-table-column
				width="200"
        prop="gmtCreate"
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
					loading:true,
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
				this.getSelOp();
				this.getTabData();
			},
	  	methods: {
				search(){
					let that = this;
					that.loading= true;
					that.pgIndex=1;
					console.log(that.form.date1);
		      axios({
		         method: 'get',
						 url: '/ElecCertSD/certificates',
						 params:{
							 pgIndex:that.pgIndex,
							 pgCount:that.itemNum,
							 sortColumn: 'gmt_create desc',
							 typeName:that.form.name,
							 orgName:that.form.desc,
							 authority:that.form.region,
							 beginTime:that.form.date1?new Date(that.form.date1).format("yyyy-MM-dd"):''
						 }
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
						 that.loading= false;
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
					that.loading= true;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/certificates?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&sortColumn=gmt_create+desc',
		       }).then(function (res) {
						 that.tableData = res.data.elements
						 that.total = res.data.totalElements;
						 that.loading= false;
		       })
				},
				del(e){
					let that = this;
		      axios({
		         method: 'DELETE',
		         url: '/ElecCertSD/certificate/'+e,
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
					sessionStorage.listId = row.id;
					this.$router.push({
						'name':'listManageInfo'
					})
				},
				rowRouter0(){
					sessionStorage.listId='';
					this.$router.push({
						'name':'listManageInfo'
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

	}
</style>
