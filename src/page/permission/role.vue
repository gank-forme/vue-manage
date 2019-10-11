<template>
	<div class="table comon">
    <p>系统权限管理 / 角色管理</p>
		<div class="content">
			<h1>角色管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
					 <el-col :span="9">
              <el-form-item label="角色">
                <el-select v-model="form.region" placeholder="请选择">
									 <el-option v-for='i in selArr' :label="i.roleName" :value="i.roleName"></el-option>
								 </el-select>
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
        >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        >
      </el-table-column>
			<el-table-column
        prop="roleDesc"
        label="角色描述"
        >
      </el-table-column>
			<el-table-column
        prop="userCount"
        label="用户数量"
        >
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
					<i class="del" @click='look(scope)'>
						<img   src="@/assets/img/lookInfo.png" alt="">
						<span class="looktxt">查看</span>
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

		<el-dialog title="查看角色" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
				<el-form-item label="角色名称" :label-width="formLabelWidth">
		      <el-input v-model="form.roleName"></el-input>
		    </el-form-item>
		    <el-form-item label="角色描述" :label-width="formLabelWidth">
		      <el-input v-model="form.roleDesc"></el-input>
		    </el-form-item>
				<el-form-item label="角色权限" :label-width="formLabelWidth">
					<el-row :gutter="8" >

						<el-col :span="10" v-if='form.permissionList.length==0'>无</el-col>
						<div v-else>
							<el-col :span="10" >一级菜单</el-col>
							<el-col :span="10" >二级菜单</el-col>
						</div>

					</el-row>

					<el-row :gutter="8" v-for='i in form.permissionList'>
						<el-col :span="8"  v-if='i.parentId==0'>
					    <el-checkbox :value='true' label="12312" >{{i.permName}}</el-checkbox>
						</el-col>
						<el-col :span="16" >
							<el-checkbox :value='true' v-for='j in form.permissionList' v-if='j.parentId==i.id' label="12312" >{{j.permName}}</el-checkbox>
						</el-col>
					</el-row>
				</el-form-item>
		  </el-form>
		  <!-- <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">返 回</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
		  </div> -->
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
			tableData: [],
			itemNum:10,
			pgIndex:0,
			total:0,
			keyword:'',
			status:'',
			sortColumn:'',
			multipleSelection:[],
			form: {
				permissionList:[]
			},
			sFields:[],
			permissions:[],
			resultArr:[],

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
		this.chatList(this.bmArr);
		this.getList();
		this.getOp();
		this.getPermissions();

	},
	methods: {
		search(){
			let that = this;
			that.pgIndex=1;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/roles',
				 params:{
					 pgIndex:that.pgIndex,
					 pgCount:that.itemNum,
					 sortColumn: 'gmt_create desc',
					 roleName:that.form.region
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
		look(scope){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/role/'+scope.row.id
			 }).then(function (res) {
				 that.dialogFormVisible = true;
				 that.form=res.data;
			 });
		},
		getPermissions(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/permissions'
			 }).then(function (res) {
				 that.permissions=res.data;
			 });
		},
		getList(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/roles?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&sortColumn=gmt_create+desc',
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
		chatList(e){
			let that =this;
			for(var i=0;i<that.chats.length;i++){
				that.Arrs[that.chats[i]]=[];
				for(var j=0;j<e.length;j++){
					if(vPinyin.chineseToPinYin(e[j]).charAt(0)==that.chats[i]){
						that.Arrs[that.chats[i]].push(e[j]);
					}
				}
			}
		},
		toChat(e,i){
			this.chatInd=e;
			this.scrollToBottom(i);
		},
		selItem(m,n){
			this.selId = m+n;
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
