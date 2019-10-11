<template>
	<div class="info">
		<p>电子证照管理 / 目录管理 / 目录详情</p>
		<div class="content" v-loading='loading'
		element-loading-background="rgba(0, 0, 0, 0)">
			<h1 class="topTit">目录详情</h1>
			<div class="tabCon">
				<table>
					<tbody>
						<tr>
							<td>
								<h2>证照类型名称</h2>
								<p>CertificateTypeName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.typeName' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照类型代码</h2>
								<p>CertificateTypeCode</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.typeCode' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照定义机构</h2>
								<p>CertificateDefineAuthorityName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.authority' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照定义机构代码</h2>
								<p>CertificateDefineAuthorityCode</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.authorityCode' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照定义机构级别</h2>
								<p>CertificateDefineAuthorityLevel</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.authorityLevel' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>关联事项名称</h2>
								<p>ItemName</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.itemName' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>关联事项代码</h2>
								<p>ItemCode</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.itemCode' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>持证主体类别</h2>
								<p>CertificateHolderCategory</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.holderCategory' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>有限期限范围</h2>
								<p>ValidtyRange</p>
							</td>
							<td>
								<el-input type="textarea" autosize v-model='form.validtyRange' placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照颁发机构级别</h2>
								<p>CertificateIssuingAuthorityLevel</p>
							</td>
							<td>
								<el-select v-model="form.authorityIssuedLevel" placeholder="请选择">
									 <el-option label="国家级" value="国家级"></el-option>
									 <el-option label="省级" value="省级"></el-option>
									 <el-option label="地市级" value="地市级"></el-option>
									 <el-option label="区县级" value="区县级"></el-option>
									 <el-option label="乡镇级" value="乡镇级"></el-option>
									 <el-option label="其他" value="其他"></el-option>

								 </el-select>
							</td>
						</tr>
						<tr>
							<td>
								<h2>证照颁发机构</h2>
								<p>CertificateIssuingAuthority</p>
							</td>
							<td>
								<el-select v-model="form.orgId" placeholder="请选择">
									 <el-option v-for='i in orgArr' :label="i.orgName" :value="i.id"></el-option>
								 </el-select>
							</td>
						</tr>

					</tbody>
				</table>
			</div>

		</div>

		<div class="bottom">
			<el-button type="primary" v-if='!addFlag' @click='update'>保存</el-button>
			<el-button type="primary" v-if='addFlag' @click='add'>提交</el-button>

			<el-button class="btns">返回</el-button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

    export default {
    	data(){
    		return {
					loading:true,
					addFlag:false,
					form: {},
					orgArr:[]
    		}
    	},
    	components: {

			},
			created(){
				this.getOrg();
				if(sessionStorage.listId){
					this.getTabData();
					this.addFlag=false;
				}else{
					this.addFlag=true;
				}
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
				onSubmit() {
	        console.log('submit!');
	      },
				getTabData(){
					let that = this;
					that.loading=true;
		      axios({
		         method: 'get',
		         url: '/ElecCertSD/certificate/'+sessionStorage.listId,
		       }).then(function (res) {
						 that.form = res.data;
						 that.loading=false;
		       })
				},
				update(){
					let that = this;
					let data = {
						authority: that.form.authority,
						authorityCode: that.form.authorityCode,
						authorityIssuedLevel: that.form.authorityIssuedLevel,
						authorityLevel: that.form.authorityLevel,
						holderCategory: that.form.holderCategory,
						id: that.form.id,
						itemCode: that.form.itemCode,
						itemName: that.form.itemName,
						orgId: that.form.orgId,
						typeCode: that.form.typeCode,
						typeName: that.form.typeName,
						validtyRange: that.form.validtyRange,
					};
		      axios({
		         method: 'PUT',
		         url: '/ElecCertSD/certificate',
						 data:data
		       }).then(function (res) {
						 that.$message({
							 message: '恭喜你，这是一条成功消息',
				 		 	 type: 'success'
			       });
						 setTimeout(function(){
							 history.go(-1);
						 },1000)
		       })
				},
				add(){
					let that = this;
					let data = {
						authority: that.form.authority,
						authorityCode: that.form.authorityCode,
						authorityIssuedLevel: that.form.authorityIssuedLevel,
						authorityLevel: that.form.authorityLevel,
						holderCategory: that.form.holderCategory,
						id: that.form.id,
						itemCode: that.form.itemCode,
						itemName: that.form.itemName,
						orgId: that.form.orgId,
						typeCode: that.form.typeCode,
						typeName: that.form.typeName,
						validtyRange: that.form.validtyRange,
					};
		      axios({
		         method: 'POST',
		         url: '/ElecCertSD/certificate',
						 data:data
		       }).then(function (res) {
						 that.$message({
							 message: '恭喜你，这是一条成功消息',
				 		 	 type: 'success'
			       });
						 setTimeout(function(){
							 history.go(-1);
						 },1000)
		       })
				}
	  	}
  	}
</script>

<style lang="less" scoped>
	.info {
		padding: 10px 24px;
		p {
			opacity: 0.3;
			font-size: 14px;
			color: #FFFFFF;
		}
		.topTit {
			font-size: 16px;
			color: #FFFFFF;
			padding: 10px 0;
		}
		.content {
			margin-top: 15px;
			background: rgba(255,255,255,.1);
			padding-bottom: 10px;
			h1 {
				font-size: 16px;
				color: #FFFFFF;
				border-bottom: 1px solid rgb(233,233,233,0.1);
				padding: 16px 24px;
				margin-bottom: 25px;

			}
			.tabCon {
				padding: 20px;
				padding-bottom: 50px;
			}
			table {
				width: 70% !important;
				margin: 0 auto;
				text-align: center;
				td {
					padding: 10px 20px;
					h2 {
						font-size: 14px;
						color: #fff;
					}
				}
			}

		}
		.bottom {
			width: 100%;
			left: 0px;
			position: fixed;
			bottom: 0;
			text-align: right;
			background: #3B5694;
			padding: 10px 0;
			.btns {
				margin-right: 20px;
			}
		}
	}
</style>
