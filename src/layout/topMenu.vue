
<template>
    <div class="menu_top wflex rflex" ref="menuTop">
        <bread></bread>
        <!-- <el-menu
            mode="horizontal"
            class="el-menu-demo rflex el-scrollbar2 top-scrollbar2"
            :background-color="menuObj.bgColor"
            :text-color="menuObj.textColor"
            :active-text-color="menuObj.activeTextColor"
            :default-active="$route.path"
            >
            <template v-for="(item,index) in topRouters">
                <router-link :to="$route.matched[1].path+'/'+item.path" :key="index">
                    <el-menu-item :index="$route.matched[1].path+'/'+item.path">
                      {{ $t(`commons.${item.path}`) }}
                    </el-menu-item>
                </router-link>
            </template>
        </el-menu> -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Bread from './bread.vue';

    export default {
        name:'top-menu',
        components:{
          Bread
        },
        data(){
            return {
                menuObj:{
                    bgColor:'',
                    textColor:'#303133',
                    activeTextColor:'#ff6428',
                },
            }
        },
        computed:{
            ...mapGetters(['topRouters'])
        },
        created(){
           //this.setLeftInnerMenu();  // 针对刷新页面时，也需要加载顶部菜单
        },
        mounted(){
        },
        methods:{


        },
        watch:{
            
        }
    }

</script>

<style lang="less" scoped>
    .menu_top{
        // width:calc(100% - 350px);
        .el-menu-demo{
            overflow-y:hidden;
            flex:1;
        }
        .el-menu-item:focus, .el-menu-item:hover {
            outline: 0;
            background-color: #ceeda8;
        }
        .router-link-active{

        }
    }
</style>
