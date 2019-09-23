<template>
	<div class="analyList">
		<h1 class="clear">
			电子证照统计分析
			<el-button class="btns right" type="primary">数据指标说明</el-button>
			<el-button class="right" type="primary"><img src="@/assets/img/update.png" alt="">导出数据</el-button>
		</h1>
		<el-select v-model="value" placeholder="请选择">
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>

		<div class="numBox">
				<el-row :gutter="16">
					  <el-col :span="6" v-for ='(i,index) in liBg' :key='index'>
							<div class="wrap">
								<img class="botImg" :src="i.img" alt="">
								<div class="txt">
									<h2>{{i.tit}} <img src="@/assets/img/icon_info_circle@3x.png" alt="">	</h2>
									<p>{{i.num}}</p>
								</div>
							</div>
						</el-col>
				</el-row>
				<el-row :gutter="16">
					  <el-col :span="12" >
							<div class="wrap-2">
								<h2>今日证照调用次数占比 <img src="@/assets/img/icon_info_circle@3x.png" alt="">	</h2>

							</div>
						</el-col>

						<el-col :span="12" >
							<div class="wrap-2">
								<h2>今日证照调用次数TOP10 <img src="@/assets/img/icon_info_circle@3x.png" alt="">	</h2>

							</div>
						</el-col>
				</el-row>
				<h1 class="tit"><img src="@/assets/img/icon_datatitle@3x.png" alt=""> 山东省证照调用量数据分析</h1>
				<el-row :gutter="16">
					  <el-col :span="17" >
							<div class="wrap-2">
								<h2>山东省证照调用量趋势分析 <img src="@/assets/img/icon_info_circle@3x.png" alt="">	</h2>

							</div>
						</el-col>

						<el-col :span="7" >
							<div class="wrap-2">
								<h2>山东省证照调用量同环比分析 <img src="@/assets/img/icon_info_circle@3x.png" alt="">	</h2>

							</div>
						</el-col>
				</el-row>

		</div>

	</div>
</template>

<script>
import li1 from '@/assets/img/icon_data1@3x.png'
import li2 from '@/assets/img/icon_data2@3x.png'
import li3 from '@/assets/img/icon_data3@3x.png'
import li4 from '@/assets/img/icon_data4@3x.png'



  export default {
    name:'analyList',
    components: {

		},
  	data(){
  		return {
				options: [{
          value: '山东省',
          label: '山东省'
        }, {
          value: '选项2',
          label: '山东省'
        }, {
          value: '选项3',
          label: '山东省'
        }, {
          value: '选项4',
          label: '山东省'
        }, {
          value: '选项5',
          label: '山东省'
        }],
        value: '山东省',
				liBg:[
					{
						img:li1,
						tit:'证照总签发量',
						num:'123123123'
					},
					{
						img:li2,
						tit:'在用证照量',
						num:'123'
					},
					{
						img:li3,
						tit:'今日新增证照数',
						num:'2323'
					},
					{
						img:li4,
						tit:'今日有效使用量',
						num:'2323'
					},
				],
  		}
  	},
		created(){
		},
  	methods: {

  	}
	}

</script>

<style lang="less" scoped>
	.analyList {
		padding: 20px;
		h1.clear {
			font-size: 16px;
			color: #FFFFFF;
			.btns {
				margin: 0 20px;
			}
		}
		.el-select {
			width: 100px;
			background: #4e6797;
			color: #fff;
			margin: 10px 0;
			.el-input__inner {
				border: none;
			}
		}
		.numBox {
			margin-top: 5px;
			.tit {
				font-size: 18px;
				color: #FFFFFF;
				padding-bottom: 16px;
				img {
					width: 24px;
					vertical-align: middle;
				}
			}
			.wrap {
				width: 100%;
				position: relative;
				background: rgba(255, 255, 255, 0.1);
				height: 120px;

			}
			.wrap-2 {
				width: 100%;
				position: relative;
				background: rgba(255, 255, 255, 0.1);
				height: 376px;
				h2 {
					padding: 10px 20px;
					font-size: 16px;
					color: #fff;
					border-bottom: 1px solid #E9E9E9;
					img {
						width: 15px;
						float: right;
						margin-top: 5px;
					}
				}

			}
			.el-row{
				margin-bottom: 16px;
			}
			.el-col {
				.botImg {
					display: block;
					width: 68px;
					position: absolute;
					right: 0;
					bottom: 0;
				}
				.txt {
					position: absolute;
					top: 20%;
					width: 100%;
					h2 {
						font-size: 14px;
						color: #FFFFFF;
						opacity: 0.6;
						padding: 0 20px;
						img {
							width: 15px;
							float: right;
						}
					}
					p {
						font-size: 26px;
						color: #FFFFFF;
						margin-top: 15px;
						padding: 0 20px;
					}
				}

		  }
		}
	}
</style>
