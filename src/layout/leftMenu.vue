<template>
   <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
        <div class="menu_page_top rflex">
            <img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" >
            <span class='title' v-show="sidebar.opened">{{$t('commons.xiaoai')}}</span>
        </div>
        <div class="menu_page_bottom is-scroll-left">
            <el-menu
                mode="vertical"
                theme="dark"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
                    <template v-for="(item,index) in data.permissionList" >
                        <!--表示 有一级菜单-->
                        <el-menu-item class="dropItem" v-if='item.childPermission.length == 0' :index='item.name' @click.native='toNav(item.name)'>
                            <img width="25" style="margin-right:5px;" :src='getImgSrc(item.icon)'></img>
                            <span  slot="title">{{item.permName}}</span>
                        </el-menu-item>

                        <!--表示 有二级或者多级菜单 -->
                        <el-submenu v-else :index='item.permission'>
                            <template slot="title">
                              <img width="25" style="margin-right:5px;"  :src='getImgSrc(item.icon)'></img>
                              <span slot="title">{{item.permName}}</span>
                            </template>
                            <!--直接定位到子路由上，子路由也可以实现导航功能-->

                            <el-menu-item v-for='i in item.childPermission' :index=' i.name ' @click.native='toNav(i.name)'>
                                <span slot="title"> {{ i.permName }}</span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { asyncRouterMap, constantRouterMap ,allRouter} from '@/router'
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";
import logoImg from "@/assets/img/logo.png";
import axios from 'axios'
import store from '@/store/store.js'



export default {
  name: "left-Menu",
  props:['data'],
  data() {
    return {
       menuObj:{
          // bgColor:'#121f3e',
         textColor:'#fff',
         activeTextColor:'#eee',
         permission_routers:[]
       },
       logo:logoImg,
    };
  },
  computed:{
      ...mapGetters([
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
    //console.log(store.state.userData);

  },
  mounted(){
    //this.menuObj.permission_routers=store.state.userData.permissionList;
  },
  methods: {
    toNav(e){
      console.log(e);
      this.$router.push({
        name:e
      })
    },
    getImgSrc(e){
      if(e!=''){
        return require("@/assets/img/"+e+".png");
      }
    }
  }
};
</script>


<style lang="less" scoped>
  @left-bgColor:#fff;  // 左侧菜单背景颜色;
  @icon-link:#FF6C60;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        background-image: linear-gradient(-180deg, #2C4381 0%, #111F4C 100%);
        color: #fff;
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .logo {
            width: 20px;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo{
            // width:25px;
        }
        .title{
            font-size: 14px;
            i{
                color:#FF6C60;
            }
        }
    }
  .menu_page_bottom {
      width:100%;
      overflow-y: auto;
      overflow-x: hidden;
      flex:1;
      margin-top:1px;
      z-index: 10;
      box-shadow: 0 0 10px 0 #21346B;
      background-image: linear-gradient(-180deg, #2C4381 0%, #111F4C 100%);
  }


</style>
