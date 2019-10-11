<template>
	<div class="list">
		<div class="content">
			<h1>公安厅-电子证照管理</h1>

			<el-form class="formBox clear" ref="form" label-width="80px">
				<el-row>
					<el-col >
					  <el-form-item label="筛选:">
							<el-radio-group v-model="checkboxGroup1" @change='radioChange'>
					      <el-radio border v-for="city in cities" :label="city" :key="city"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col  :span='8'>
					  <el-form-item label="搜索:">
							<el-input v-model='input'></el-input>
					  </el-form-item>
					</el-col>
					<el-col  :span='8'>
							<el-button class="searchBtn" type="primary">搜索</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<div class="cardBox">
			<el-row :gutter="16">
				  <el-col :span="6" @click.native='toTab(i.port,i.typeName)' v-for ='(i,index) in list'>
						<div class="wrap ">
							<div class="clear">
								<img class="left" :src="i.imgUrl" alt="">
								<p>{{i.typeName}} <span :class="i.statusName=='在用'?'color1':'color2'">{{i.statusName}}</span></p>
								<h3>添加时间：{{i.gmtCreateStr}}</h3>
							</div>
						</div>

					</el-col>
			</el-row>
		</div>
		<el-pagination
		  background
			@current-change="handleCurrentChange"
			@prev-click = 'handleCurrentChange'
			@next-click = 'handleCurrentChange'
			:page-size='itemNum'
		  layout="prev, pager, next"
		  :total="total">
		</el-pagination>
	</div>
</template>

<script>

import icon from '@/assets/img/icon.png'
import axios from 'axios'

    export default {
    	data(){
    		return {
					input:'',
					currentPage4: 4,
					checkboxGroup1: '全部',
	        cities: ['全部','在用','停用','对接中'],
					list:[],
					itemNum:16,
					pgIndex:1,
					total:100,
					keyword:'',
					status:''
    		}
    	},
    	components: {

			},
			created(){
				this.getList();
			},
	  	methods: {
				getList(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/certificates?orgId='+sessionStorage.orgId+'&pgIndex='+that.pgIndex+'&pgCount='+that.itemNum+'&keyword='+that.keyword+'&status='+that.status,
		       }).then(function (res) {
						 that.list = res.data.elements
						 that.total = res.data.totalElements;
		       })
				},
				toTab(e,n){
					sessionStorage.port=e;
					sessionStorage.typeName=n;
					this.$router.push({
						name:'indexTab'
					})
				},
				handleCurrentChange(val){
					this.pgIndex = val;
					this.getList();
				},
				radioChange(e){
					if(e=='全部'){
						this.status=''
					}else if(e=='在用'){
						this.status=1
					}else if(e=='停用'){
						this.status=2
					}else if(e=='对接中'){
						this.status=0
					}
					this.getList();
				},
				rowRouter(row){
					this.$router.push({
						'name':'indexInfo'
					})
				}
	  	}
  	}
</script>

<style lang="less" scoped>
	.list {
		padding: 10px 24px;

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

		.cardBox {
			margin-top: 30px;
			min-height: 300px;
			.el-col {
				position: relative;
				margin-bottom: 24px;
				.wrap:hover{
					clear: both;
					.clear {
						margin-top: -8px;
						transition: all .4s ease;
						background: #fff;
						box-shadow: 0 1px 14px 1px #142352;
					}

					p {
						color: #000;
					}
					.txt {
						color: #000;
						h3 {
							opacity: 0.45;
						}
					}
				}
				.wrap {
					width: 100%;
					height: 100px;
					cursor: pointer;
					clear: both;
					position: relative;
					.clear {
						width: 100%;
						height: 100%;
						background: rgba(255,255,255,.1);
						position: absolute;
					}
					img {
						width: 60px;
						margin-top: 20px;
						margin-left: 5%;
					}
					p {
						position: absolute;
						left: 33%;
						top: 17px;
						right: 10px;
						font-size: 14px;
						color: #FFFFFF;
						span {
							font-size: 12px;
							padding: 0px 5px;
							border-radius: 3px;
							margin-left: 5px;
							display: inline-block;
							margin-top: 5px;
						}
						span.color1 {
							border:1px solid #64BE50;
							color: #64BE50;
						}
						span.color2 {
							border:1px solid #FFBB00;
							color: #FFBB00;
						}
						span.color3 {
							border:1px solid #E86161;
							color: #E86161;
						}
					}
					h3 {
						font-size: 12px;
						color: #999999;
						position: absolute;
						left: 33%;					
						bottom: 20px;
					}

				}

		  }
		}
	}
</style>
