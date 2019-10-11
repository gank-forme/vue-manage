<template>
  	<div class="login_page">
      <div class="topTit" style="text-align: center;">
      	<img src="@/assets/img/tit.png" style="width: 600px;margin-bottom: 10px;" alt="">
      </div>
      	<div class="login" >
      		<div class="message" style="font-size: 24px;">登录</div>
      		<!--<div id="darkbannerwrap"></div>-->

      			<input id="userName" name="userName" v-model='loginForm.username' placeholder="用户名" type="text"
      				autocomplete="off">
      			<hr class="hr15">
      			<input id="password" name="password" v-model='loginForm.password' placeholder="密码" type="password"
      				autocomplete="off">
      			<hr class="hr15">
      			<div style="position: relative">
      				<input type="text" id="code" name="code" v-model='loginForm.code' placeholder="验证码" maxlength="4" >
      				<img  id="img" :src="loginForm.img" @click="changeImg" style="vertical-align: middle;position: absolute;right: 20px;top: 10px;"/>
      			</div>

      			<hr class="hr15">
      			<button style="width: 100%;" type="submit"
      				@click="login">登录</button>
      			<hr class="hr20">
      			<span id="info" style="color: red"></span>
      	</div>
      <div style="text-align: center;width: 100%;margin-top: 150px;position: absolute;bottom: 20px;">
      	<p style="color: #fff;font-size: 16px;margin-bottom: 20px;">建议使用谷歌浏览器 <a href="" >点击下载MAC版</a> | <a target="_blank" href="" >点击下载Windows版</a></p>
      	<!--<img src="../static/img/bot.png" style="width: 300px;" alt="">-->
      </div>
  	</div>
</template>

<script>
	import logoImg from "@/assets/img/logo.png";
	import { login } from "@/api/user";
  import { setToken } from '@/utils/auth';
  import axios from 'axios'
  import qs from 'qs'


	export default {
	    data(){
			return {
				logo:logoImg,
        loading:true,
				loginForm: {
					username: 'gkx123',
					password: 'qwe123',
          code:'',
          img:'/ElecCertSD/authImage?'+Math.random()
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				}
			}
		},
		mounted(){
      setToken("Token",'admin');
		},
		methods: {
			changeImg(){
        this.loginForm.img = '/ElecCertSD/authImage?'+Math.random();
			},
			showMessage(type,message){
        this.$message({
            type: type,
            message: message
        });
      },
	    login() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let that = this;
        let data ={
          password:that.loginForm.password,
          userName:that.loginForm.username,
          code:that.loginForm.code
        };
        axios({
           method: 'post',
           // url: '/ElecCertSD/login?password=q12345&userName=liyanbo&code='+that.loginForm.code,
           url: '/ElecCertSD/login',
           data:qs.stringify(data)
         }).then(function (res) {
           loading.close();
           if(res.data.error==0){
             that.$router.push({ path: '/' });
           }else{
             that.changeImg();
             that.$message.error(res.data.message);
           }
         })
			},

		}
	}
</script>

<style lang="less" scoped>
@media (min-width: 1400px){
  .login {
      margin-top: 10px !important;
  }
  .topTit {
      padding-top: 100px!important;
  }
}
body,html{
  min-height:100%;
}
.login_page{
  background:url(../assets/img/bg.jpg) no-repeat center;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
a{
  color:#27A9E3;
  text-decoration:none;
  cursor:pointer;
}
.login{
  /*margin: 50px auto 0 auto;*/
  margin-top: 20px;
  min-height: 320px;
  max-width: 420px;
  padding:10px 20px;
  background: url(../assets/img/ioa.png) no-repeat center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  /* overflow-x: hidden; */
  box-sizing: border-box;
}
a.logo{
  display: block;
  height: 58px;
  width: 167px;
  margin: 0 auto 30px auto;
  background-size: 167px 42px;
}
.message {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 60px;
  /*background: #189F92;*/
  position: relative;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
#darkbannerwrap {
  // background: url(../img/login/aiwrap.png);
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}

input[type=text],
input[type=file],
input[type=password],
input[type=email], select {
  border: 1px solid #DCDEE0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  font-size: 14px;
  color: #555555;
  outline:none;
  width:100%;
  text-indent: 16px;
}
input[type=text]:focus,
input[type=file]:focus,
input[type=password]:focus,
input[type=email]:focus, select:focus {
  border: 1px solid #27A9E3;
}


input[type=submit],
button{
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #5285ff;
  border-radius: 3px;
  border: none;
  -webkit-appearance: none;
  outline:none;
  width:100%;
}
hr.hr15 {
  height: 15px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
hr.hr20 {
  height: 20px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

.copyright{
  font-size:14px;
  color:rgba(255,255,255,0.85);
  display:block;
  position:absolute;
  bottom:15px;
  right:15px;
}
</style>
