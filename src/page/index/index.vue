<template>
	<div class="index">
		<h1 class="title">电子证照管理</h1>
		<div class="search clear margin">
			<input class="left" type="text" name="" placeholder="请输入部门名称" v-model='searchVal'>
			<div class="right" @click='search'>搜索</div>
		</div>
		<div class="numBox">
				<el-row :gutter="16">
					<transition-group name="fade">
					  <el-col :span="8" v-for ='(i,index) in liBg' :key='index'>
							<img :src="i.img" alt="">
							<div class="txt">
								<h2>{{i.tit}}</h2>
								<p>{{i.num}}</p>
							</div>
						</el-col>
					</transition-group>
				</el-row>
			</router-link>
		</div>

		<div class="listTit clear">
			<img class="left" src="../../assets/img/head1.png" alt="">
			<span class="left">证照所属部门列表</span>
			<span class="right">统计结果截止于：2019-08-29 13:34:24</span>
		</div>

		<div class="listBox">
			<el-row :gutter="16">

				  <el-col :span="8"  @click.native='toList(i.orgId)' v-for ='(i,index) in list'>
						<div class="wrap">
							<div class="clear clears">
								<div class="name">
									<img class="left" :src="i.imgUrl" alt=""> {{i.orgName}}
								</div>

								<div class="txt clear">
									<div class="left first">
										<h3>证照种类</h3>
										<p>{{i.certCount}}</p>
									</div>
									<div class="left">
										<h3>证照签发量</h3>
										<p>{{i.certIssueSum}}</p>
									</div>
								</div>
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
		import li1 from '@/assets/img/li_bg1.png'
		import li2 from '@/assets/img/li_bg2.png'
		import li3 from '@/assets/img/li_bg3.png'

		import icon from '@/assets/img/icon.png'

		import axios from 'axios'


    export default {
    	data(){
    		return {
					searchVal:'',
					liBg:[
						{
							img:li1,
							tit:'证照总签发量',
							num:0
						},
						{
							img:li2,
							tit:'证照种类',
							num:0
						},
						{
							img:li3,
							tit:'在用证照数量',
							num:0
						},
					],
					list:[],
					itemNum:9,
					pgIndex:1,
					total:100,
					// currentPage4: 4
    		}
    	},
    	components: {

			},
			created(){
				this.getIndexList();
			},
	    mounted(){
			},
	  	methods: {
				search(){
					let that = this;
					that.pgIndex=1;
					that.itemNum=9;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/orgCertificates?keyword='+that.searchVal+'&pgIndex='+that.pgIndex+'&pgCount='+that.itemNum,
		       }).then(function (res) {
						 that.list = res.data.elements;
						 that.total = res.data.totalElements;
		       });
				},
				getIndexList(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/orgCertificates?pgIndex='+that.pgIndex+'&pgCount='+that.itemNum,
		       }).then(function (res) {
						 that.list = res.data.elements;
						 that.total = res.data.totalElements;
		       });
					 this.getTotal();
				},
				getTotal(){
					let that = this;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/certStatistics',
		       }).then(function (res) {
						 that.liBg[0].num=res.data.certIssueSum;
						 that.liBg[1].num=res.data.certCount;
						 that.liBg[2].num=res.data.ingCertIssueSum;
		       });
				},
				toList(e){
					sessionStorage.orgId=e;
					this.$router.push({
						name:'indexList'
					})
				},
				handleCurrentChange(val){
					this.pgIndex = val;
					this.getIndexList();
				},
				// @current-change="handleCurrentChange"
				// @prev-click = 'prevChange'
				// @next-click = 'nextChange'
				selectStyle (item) {
	        var _this=this;
	        this.$nextTick(function () {
	          this.list.forEach(function (item) {
	            _this.$set(item,'active',false);
	          });
	          this.$set(item,'active',true);
	        });
	      },
	      outStyle (item) {
	        this.$set(item,'active',false);
	      }
	  	}
  	}
</script>

<style lang="less" scoped>
	.index {
		width: 97%;
		margin: 0 auto;
		.title {
			font-size: 32px;
			text-align: center;
			color: #fff;
			letter-spacing: 6px;
		}

		.search {
			width: 552px;
			margin-top: 48px;
			input {
				width: 480px;
				background: #3F5484;
				border: 1px solid rgba(217,217,217,0.30);
				height: 38px;
				font-size: 16px;
				color: #fff;
				text-indent: 30px;
			}
			.right {
				width: 70px;
				background: #32ABFF;
				font-size: 16px;
				line-height: 40px;
				color: #FFFFFF;
				text-align: center;
			}

		}

		.numBox {
			margin-top: 64px;
			.el-col {
				height: 120px;
				position: relative;
				img {
					display: block;
					width: 100%;
					min-height: 120px;
					max-height: 140px;
				}
				.txt {
					position: absolute;
					top: 30%;
					left: 30px;
					h2 {
						font-size: 14px;
						color: #FFFFFF;
						opacity: 0.6;
					}
					p {
						font-size: 26px;
						color: #FFFFFF;
						margin-top: 5px;
					}
				}

		  }
		}
		.listTit {
			margin-top: 48px;
			margin-bottom: 24px;
			font-size: 16px;
			color: #fff;
			img {
				width: 15px;
				margin-right: 10px;
				margin-top: 5px;
			}
			.right {
				opacity: 0.3;
				font-size: 14px;
			}
		}
		.listBox {
			.el-col {
				height: 170px;
				position: relative;
				margin-bottom: 24px;
				.wrap:hover {

					clear: both;
					.clears {
						margin-top: -8px;
						transition: all .4s ease;
						background: #fff;
						box-shadow: 0 1px 14px 1px #142352;
					}

					.name {
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
					cursor: pointer;
					clear: both;
					position: relative;
					cursor: pointer;
					height: 169px;
					.clears {
						width: 100%;
						height: 100%;
						background: rgba(255,255,255,.1);
						position: absolute;
					}
					.name {
						margin-top: 20px;
						margin-left: 20px;
						font-size: 18px;
						color: #FFFFFF;
						line-height: 50px;
						img {
							width: 48px;
							margin-right: 10px;
						}
					}
					.txt {
						color: #FFFFFF;
						.first {
							margin-left: 60px;
							margin-right: 50px;
						}
						h3 {
							font-size: 14px;
							opacity: 0.3;
							margin-top: 24px;
						}
						p {
							font-size: 20px;
							margin-top: 10px;
						}
					}
				}

		  }
		}
	}

</style>
