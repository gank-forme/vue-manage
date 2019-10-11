import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

// import '@/permission' // permission control

// import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;

Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}

new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
