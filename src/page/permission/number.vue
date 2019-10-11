<template>
	<div class="table comon">
    <p>系统权限管理 / 用户管理</p>
		<div class="content">
			<h1>用户管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="9">
             <el-form-item label="用户">
               <el-input v-model="form.desc"></el-input>
             </el-form-item>
           </el-col>
					 <el-col :span="9">
              <el-form-item label="角色">
                <el-select v-model="form.region" placeholder="请选择">
									 <el-option v-for='i in selArr' :label="i.roleName" :value="i.id"></el-option>
								 </el-select>
              </el-form-item>
            </el-col>
           <el-col :span="2">
              <el-button class="searchBtn" type="primary" @click='search'>查询</el-button>
           </el-col>
         </el-row>
				 <el-row >
           <el-col :span="9">
						 <el-button class="btns" @click="edit(0)"><img src="@/assets/img/add.png" alt="">新增用户</el-button>
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
        >
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        >
      </el-table-column>
			<el-table-column
        prop="organization.orgName"
        label="所在单位"
        >
      </el-table-column>
			<el-table-column
        prop="role.roleName"
        label="角色"
        >
      </el-table-column>
			<el-table-column
        prop="userName"
        label="登录账号"
        >
      </el-table-column>
			<el-table-column
        prop="phone"
        label="联系电话"
        >
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
					<i class="del" @click='edit(scope)'>
						<img  src="@/assets/img/edit.png" alt="">
						<span class="looktxt">编辑</span>
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



		<el-dialog title="修改用户" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
				<el-form-item label="用户姓名" :label-width="formLabelWidth">
		      <el-input v-model="editForm.realName"></el-input>
		    </el-form-item>
				<el-form-item label="登录账号" :label-width="formLabelWidth">
		      <el-input v-model="editForm.userName"></el-input>
		    </el-form-item>
				<el-form-item label="用户密码" :label-width="formLabelWidth">
		      <el-input v-model='password'></el-input>
		    </el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
		      <el-input v-model="editForm.phone"></el-input>
		    </el-form-item>

				<el-form-item label="所在单位" :label-width="formLabelWidth">
					<el-select v-model="editForm.orgId" placeholder="请选择">
						 <el-option v-for='i in orgArr' :label="i.orgName" :value="i.id"></el-option>
					 </el-select>
		    </el-form-item>
				<el-form-item label="用户角色" :label-width="formLabelWidth">
					<el-select v-model="editForm.roleId" placeholder="请选择">
						 <el-option v-for='i in selArr' :label="i.roleName" :value="i.id"></el-option>
					 </el-select>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">返 回</el-button>
		    <el-button type="primary" @click="addFun">保 存</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>

import axios from 'axios'

import vPinyin from '@/lang/vue-py.js';

export default {
  name:'infoShow',
  components: {

	},
	data(){
		return {
			selArr:[],
			orgArr:[],
			tableData: [],
			itemNum:10,
			pgIndex:0,
			total:0,
			keyword:'',
			status:'',
			sortColumn:'',
			multipleSelection:[],
			editForm: {},
			form: {},
			password:'',

			dialogDw:false,
			dialogFormVisible: false,
      formLabelWidth: '120px',
			chatInd:0,
			selId:'',
			chats:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			bmArr:[
				'阿斯蒂','啊阿斯蒂','啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','阿斯蒂','啊阿斯蒂','啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','阿斯蒂','啊阿斯蒂','啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊','吧','不碍事','车werwerwer','吃啥的','的速度','额啥电费','乐山大佛','额啥电费','乐山大佛','额啥电费','乐山大佛','我去','我去','我去','要','余氏东风',
				'在啥地方','跑啥的','去玩儿'
			],
			Arrs:{}
		}
	},
	created(){
		this.getList();
		this.getOp();
		this.getOrg();

	},
	methods: {
		search(){
			let that = this;
			that.pgIndex=1;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/users',
				 params:{
					 pgIndex:that.pgIndex,
					 pgCount:that.itemNum,
					 sortColumn: 'gmt_create desc',
					 roleId:that.form.region,
					 keyword:that.form.desc
				 }
			 }).then(function (res) {
				 that.tableData = res.data.elements
				 that.total = res.data.totalElements;
			 });
		},
		scrollToBottom(e){
      this.$nextTick(() => {
        let wrap = document.getElementById('itemWrap'); // 获取对象
				let item = document.getElementById(e);
        wrap.scrollTop = item.offsetTop-171 // 滚动高度
        console.log(item.offsetTop);
      })
    },
		onSubmit() {
			console.log('submit!');
		},
		handleCurrentChange(val){
			this.pgIndex = val;
			this.getList();
		},
		delFun(scope){
			let that = this;
			this.$confirm('确认删除？')
				.then(_ => {
					that.del(scope.row.id);
				})
				.catch(_ => {});
		},
		del(e){
			let that = this;
			axios({
				 method: 'DELETE',
				 url: '/ElecCertSD/user/'+e,
			 }).then(function (res) {
				 that.getList();
			 })
		},

		getList(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/users?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&sortColumn=gmt_create+desc',
			 }).then(function (res) {
				 that.tableData = res.data.elements;
				 that.total = res.data.totalElements;
			 })
		},
		getOp(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/roles',
			 }).then(function (res) {
				 that.selArr = res.data.elements;
			 })
		},
		getOrg(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/organizations?type=0',
			 }).then(function (res) {
				 that.orgArr = res.data.elements;
			 })
		},
		edit(scope){
			// this.getGenerate();
			this.dialogFormVisible=true;
			if(scope!=0) {
				this.getEditInfo(scope.row.id);
				this.subType = 1;
			}else{
				this.editForm={};
				this.subType = 0;
			}

		},
		getEditInfo(e){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/user/'+e,
			 }).then(function (res) {
				 that.editForm = res.data;
				 that.id =e;
			 })
		},
		addFun(){
			let that = this;
			let id,method;
			if(that.subType==0){
				id='0';
				method='POST';
			}else{
				id=that.id+'';
				method='PUT';
			}
			let data ={
				password:that.password,
				orgId:that.editForm.orgId,
				id:id,
				phone:that.editForm.phone,
				realName:that.editForm.realName,
				roleId:that.editForm.roleId,
				userName:that.editForm.userName
			};

			axios({
				 method: method,
				 url: '/ElecCertSD/user',
				 data:data
			 }).then(function (res) {
				 if(res.data.error==0){
					 	that.dialogFormVisible=false;
					 	that.editForm={};
						that.getList();
				 }
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
	.wrap {
		h1 {
			font-size: 14px;
			span {
				cursor: pointer;
				color: #999;
				padding: 5px;
			}
			span.act {
				color: #000;
				font-weight: 700;
			}
			span.disabled {
				// cursor: not-allowed;
				pointer-events: none;
				opacity: 0.3;
			}
		}
		.cityBtn {
			width: 100px;
			height: 28px;
			text-align: center;
			color: #fff;
			font-weight: 600;
			line-height: 28px;
			background: #32ABFF url("../../assets/img/botRight.png") 79px 9px no-repeat;
			background-size: 20px;
			margin: 15px 25px;
		}
		.itemWrap {
			max-height: 300px;
			overflow-y: auto;
			box-shadow: 0 4px 4px 0 rgba(0,0,0,0.10);
			padding: 10px;
			.items {
				display: inline-block;
				padding: 5px 2.5%;
				margin-right: 10px;
				background: #F4F4F5;
				text-align: center;
				color: #333333;
				margin-bottom: 10px;
				cursor: pointer;
			}
			.items.act {
				background: #32ABFF url("../../assets/img/botRight.png") bottom right no-repeat;
				background-size: 20px;
				color: #fff;
			}
		}
	}

}
</style>
