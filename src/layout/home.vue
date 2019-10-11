<template>
    <div class="home rflex">
        <left-menu :data='data'></left-menu>
        <div class="menu_right wflex el-scrollbar" ref="menu_right" :style="{left:sidebar.width+'px'}">
            <head-nav :data='data'></head-nav>
            <div class="menu_content" ref="menu_content">

                <router-view></router-view><!--页面渲染入口-->
            </div>
            <!-- <footerNav></footerNav> -->
            <backTop :ele="$refs.menu_right"></backTop>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from 'vuex'

    import HeadNav from './headNav.vue';
	import LeftMenu from './leftMenu.vue';
	import FooterNav from './footerNav.vue';
	import backTop from 'cps/backTop';

  import axios from 'axios'
  import store from '@/store/store.js'

    export default {
        name: 'home',
        data(){
            return {
              data:{}
            }
        },
        computed:{
            ...mapGetters(['sidebar']),
        },
        components:{
            HeadNav,
            LeftMenu,
            FooterNav,
            backTop
        },
        created() {
          let that = this;
          axios({
             method: 'get',
             url: '/ElecCertSD/userinfo',
           }).then(function (res) {
             that.data = res.data;
           })

        },
        mounted (){
        },
        watch:{

        }
    }
</script>
<style scoped lang='less'>
    .home{
        .menu_right{
            overflow: auto;
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            background: url('../assets/img/topBg.png') no-repeat ;
            background-size: 100%;
            .menu_content{
                position: relative;
                margin-top:60px;
                width:100%;
                // background:#f0f2f5;
            }

        }
    }
</style>
