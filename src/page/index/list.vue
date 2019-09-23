<template>
	<div class="list">
		<div class="content">
			<h1>公安厅-电子证照管理</h1>

			<el-form class="formBox clear" ref="form" label-width="80px">
				<el-row>
					<el-col >
					  <el-form-item label="筛选:">
							<el-radio-group v-model="checkboxGroup1" >
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
				<router-link :to="{ name: 'indexTab', params: {} }" v-for ='(i,index) in list'>
				  <el-col :span="6" >
						<div class="wrap ">
							<div class="clear">
								<img class="left" :src="i.icon" alt="">
								<p>{{i.tit}} {{i.status==1?"在用":(i.status==2?'对接中':'停用')}}</p>
								<h3>添加时间：{{i.time}}</h3>
							</div>
						</div>

					</el-col>
				</router-link>
			</el-row>
		</div>
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

import icon from '@/assets/img/icon.png'

    export default {
    	data(){
    		return {
					input:'',
					currentPage4: 4,
					checkboxGroup1: '全部',
	        cities: ['全部','在用','停用'],
					list:[
						{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},{
							icon:icon,
							tit:'身份证',
							stats:1,
							time:'2019-12-23',
						},

					]
    		}
    	},
    	components: {

			},
			created(){
			},
	  	methods: {

				handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
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
						margin-left: 20px;
					}
					p {
						position: absolute;
						left: 90px;
						top: 25px;
						font-size: 16px;
						color: #FFFFFF;
						span {
							font-size: 12px;
							padding: 2px 5px;
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
						left: 90px;
						bottom: 30px;
					}

				}

		  }
		}
	}
</style>
