<template>
	<div class="table comon">
    <p>系统权限管理 / 角色管理</p>
		<div class="content">
			<h1>角色管理</h1>
			<el-form class="formBox clear" ref="form" :model="form" :inline='true'>
        <el-row >
          <el-col :span="9">
             <el-form-item label="角色名称">
               <el-input v-model="form.desc"></el-input>
             </el-form-item>
           </el-col>
					 <el-col :span="9">
              <el-form-item label="角色状态">
                <el-select v-model="form.region" placeholder="请选择">
									 <el-option label="区域一" value="shanghai"></el-option>
									 <el-option label="区域二" value="beijing"></el-option>
								 </el-select>
              </el-form-item>
            </el-col>
           <el-col :span="2">
              <el-button class="searchBtn" type="primary">查询</el-button>
           </el-col>
         </el-row>
				 <el-row >
           <el-col :span="9">
						 <el-button class="btns" @click="dialogFormVisible = true"><img src="@/assets/img/add.png" alt="">新增角色</el-button>
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
        prop="name"
        label="角色名"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="真实姓名">
      </el-table-column>
			<el-table-column
        prop="name"
        label="最后操作人">
      </el-table-column>
			<el-table-column
        prop="name"
        label="最后操作时间">
      </el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
          <el-switch active-color="#13ce66" v-model="scope.row.delivery"></el-switch>
        </template>
			</el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <img class="del" @click='delFun(scope)' src="@/assets/img/edit.png" alt="">
          <span class="looktxt">编辑</span>
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
				<el-form-item label="选择部门" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="每日上限次数" :label-width="formLabelWidth">
		      <el-input v-model="form.resource"></el-input>
		    </el-form-item>
				<el-form-item label="共享到期时间" :label-width="formLabelWidth">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="调用IP" :label-width="formLabelWidth">
					<el-input v-model="form.ip"></el-input>
				</el-form-item>
				<el-form-item label="返回字段" :label-width="formLabelWidth">

				    <el-checkbox-group v-model="form.type">
				      <el-checkbox label="123" name="type"></el-checkbox>
				      <el-checkbox label="2323" name="type"></el-checkbox>
				      <el-checkbox label="123123123" name="type"></el-checkbox>
				      <el-checkbox label="啥电费1" name="type"></el-checkbox>
							<el-checkbox label="1231231233" name="type"></el-checkbox>
				      <el-checkbox label="啥电费" name="type"></el-checkbox>
				    </el-checkbox-group>

			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">返 回</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>


import vPinyin from '@/lang/vue-py.js';

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
				delivery: false
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: true
      },{
        date: '2016-05-02',
        name: '王小虎',
        address: '2.0',
				delivery: false
      },],
			currentPage4: 4,
      multipleSelection:[],
			dialogDw:false,
			dialogFormVisible: false,
      formLabelWidth: '120px',
			form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
				ip:''
      },
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
	},
	methods: {
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
				'name':'shareListInfo'
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
