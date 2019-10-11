<template>
	<div class="table comon">
    <p>电子证照共享管理 / 证照共享接口列表 / 接口详情</p>
		<div class="content">
			<h1>接口详情</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="7">
             <el-form-item label="机构名称">
               <el-input v-model="form.name"></el-input>
             </el-form-item>
           </el-col>
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
           <el-col :span="2">
              <el-button class="searchBtn" type="primary" @click='search'>查询</el-button>
           </el-col>
         </el-row>
				 <el-row >
           <el-col :span="9">
						 <el-button class="btns" @click="edit(0)"><img src="@/assets/img/add.png" alt="">新增接口</el-button>
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
        prop="orgName"
        label="调用部门名称"
        >
      </el-table-column>
      <el-table-column
        prop="invokeCount"
        label="调用次数">
      </el-table-column>
			<el-table-column
        prop="limitNum"
        label="每日上限次数">
      </el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
          <el-switch active-color="#13ce66" v-model="scope.row.status" @change="active_text($event, scope)"></el-switch>
        </template>
			</el-table-column>
      <el-table-column>
        <template slot-scope="scope">
					<i class="del" @click='edit(scope)'>
						<img  src="@/assets/img/edit.png" alt="">
	          <span class="looktxt">编辑</span>
					</i>
        </template>
      </el-table-column>
    </el-table>

		<el-pagination
		  background
			@current-change="handleCurrentChange"
			@prev-click = 'handleCurrentChange'
			@next-click = 'handleCurrentChange'
			:page-size='itemNum'
		  layout="prev, pager, next"
		  :total="total">
		</el-pagination>


		<el-dialog title="选择部门" :visible.sync="dialogDw">
			<div class="wrap">
				<h1>
					<span v-for='(i,index) in chats' :class="chatInd==index && Arrs[i].length>0?'act':(Arrs[i].length==0?'disabled':'')" @click='toChat(index,i)' >{{i}}</span>
				</h1>
				<div class="cityBtn">
					  山东省
				</div>
				<div class="itemWrap" id='itemWrap'>
					<el-row v-for='i in chats' :gutter="16" :id='i'>
						<div v-if='Arrs[i].length>0'>
							<el-col :span="1" >
								{{i}}
		           </el-col>
		           <el-col :span="22">
								 <el-row :gutter="8">
										<span :id='i+index' v-for='(item,index) in Arrs[i]' class='items' :class="selId==i+index?'act':''" @click='selItem(i,index)' >{{item}}</span>
								 </el-row>
		           </el-col>
						</div>
	         </el-row>
				</div>

			</div>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogDw = false">返 回</el-button>
		    <el-button type="primary" @click="dialogDw = false">提 交</el-button>
		  </div>
		</el-dialog>



		<el-dialog title="添加接口控制" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
				<el-form-item label="选择机构" :label-width="formLabelWidth">
					<el-select v-model="form.orgId" placeholder="请选择">
						 <el-option v-for='i in orgArr' :label="i.orgName" :value="i.id"></el-option>
					 </el-select>
		    </el-form-item>
		    <el-form-item label="AppId" :label-width="formLabelWidth">
		      <el-input v-model="form.appId"></el-input>
		    </el-form-item>
				<el-form-item label="私钥" :label-width="formLabelWidth">
					<el-input v-model="form.publicKey"></el-input>
				</el-form-item>
				<el-form-item label="公钥" :label-width="formLabelWidth">
					<el-input v-model="form.publicKey"></el-input>
				</el-form-item>
				<el-form-item label="上线次数" :label-width="formLabelWidth">
					<el-input v-model="form.limitNum"></el-input>
				</el-form-item>
				<el-form-item label="截止日期" :label-width="formLabelWidth">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="调用IP" :label-width="formLabelWidth">
					<el-input type="textarea" autosize v-model='form.visitIps' placeholder="请输入内容"></el-input>
				</el-form-item>

				<el-form-item label="返回字段" :label-width="formLabelWidth">

				    <el-checkbox-group v-model='sFields'>
				      <el-checkbox v-for='i in fields' :label="i.field" >{{i.comment}}</el-checkbox>
				    </el-checkbox-group>

			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">返 回</el-button>
		    <el-button type="primary" @click="submit">提 交</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'


import vPinyin from '@/lang/vue-py.js';

export default {
  name:'infoShow',
  components: {

	},
	data(){
		return {
			subType:'',
			orgArr:[],
			tableData: [],
			tableData1: [],
			itemNum:10,
			pgIndex:0,
			total:0,
			keyword:'',
			status:'',
			sortColumn:'',
			beginTime:'',
			endTime:'',
      multipleSelection:[],
			dialogDw:false,
			dialogFormVisible: false,
      formLabelWidth: '120px',
			dir:false,
			sd:false,
			sFields:[],
			fields:[],
			form: {
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
			value2: '',
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
		this.getFields();
		this.getOrg();
	},
	methods: {
		getOrg(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/organizations?type=0',
			 }).then(function (res) {
				 that.orgArr = res.data.elements;
			 })
		},
		active_text (value, scope) {
			let that = this;
			let data ={
				id:scope.row.id,
				status:scope.row.status?1:2
			};
			axios({
				 method: 'post',
				 url: '/ElecCertSD/updateStatus',
				 data:qs.stringify(data)
			 }).then(function (res) {
				 if(res.data.error==0){
						that.getList();
				 }
			 })
		},
		search(){
			let that = this;
			that.pgIndex=1;
			that.beginTime  = that.value2?new Date(that.value2[0]).format("yyyy-MM-dd hh:mm:ss"):'';
			that.endTime  = that.value2?new Date(that.value2[1]).format("yyyy-MM-dd hh:mm:ss"):'';
			axios({
				 method: 'get',
				 url: '/ElecCertSD/interfaceOrgs',
				 params:{
					 pgIndex:that.pgIndex,
					 pgCount:that.itemNum,
					 sortColumn: 'gmt_create desc',
					 keyword:that.form.name,
					 beginTime:that.beginTime,
					 endTime:that.endTime,
					 certId:sessionStorage.tableId
				 }
			 }).then(function (res) {
				 if(res.data.elements){
					 res.data.elements.forEach(item => {
	            if(item.status==1){
								item.status=true;
							}else{
								item.status=false;
							}
	         })
				 }
				 that.tableData = res.data.elements;
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
		getGenerate(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/generate',
			 }).then(function (res) {
				 that.form=res.data;
			 })
		},
		getFields(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/getFields/'+sessionStorage.tableId,
			 }).then(function (res) {
				 that.fields=res.data;
			 })
		},
		addFun(){

		},
		edit(scope){
			// this.getGenerate();

			this.dialogFormVisible=true;

			if(scope!=0) {
				this.form = scope.row;
				this.sFields = this.form.fieldsArr
				this.subType = 1;
			}else{
				this.getGenerate();
				this.sFields=[];
				this.subType = 0;
			}
		},
		submit(){
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
				appId:that.form.appId,
				certId:sessionStorage.tableId,
				endDate:that.form.endDate,
				fields:JSON.stringify(that.sFields),///
				id:that.form.id,///
				limitNum:that.form.limitNum,
				orgId:that.form.orgId,
				privateKey:that.form.privateKey,
				publicKey:that.form.publicKey,
				templateType:that.form.templateType,
				visitIps:that.form.visitIps,
			};

			axios({
				 method: method,
				 url: '/ElecCertSD/interfaceOrg',
				 data:data
			 }).then(function (res) {
				 if(res.data.error==0){
					 	that.dialogFormVisible=false;
					 	that.form={};
						that.getList();
				 }
			 })
		},
		getList(){
			let that = this;
			axios({
				 method: 'get',
				 url: '/ElecCertSD/interfaceOrgs?certId='+sessionStorage.tableId+'&pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&sortColumn=&beginTime=gmt_create+desc'+that.beginTime+'&endTime='+that.endTime,
			 }).then(function (res) {
				 if(res.data.elements){
					 res.data.elements.forEach(item => {
	            if(item.status==1){
								item.status=true;
							}else{
								item.status=false;
							}
	         })
				 }
				 that.tableData = res.data.elements;
				 that.total = res.data.totalElements;
			 })
		},
    delFun(scope){
      console.log(scope);
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
			background: #32ABFF url("../../../assets/img/botRight.png") 79px 9px no-repeat;
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
				background: #32ABFF url("../../../assets/img/botRight.png") bottom right no-repeat;
				background-size: 20px;
				color: #fff;
			}
		}
	}

}
</style>
