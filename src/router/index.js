import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
// import { topRouterMap } from "./topRouter";
import nav1 from "@/assets/img/nav1.png";
import nav2 from "@/assets/img/nav2.png";
import nav3 from "@/assets/img/nav3.png";
import nav4 from "@/assets/img/nav4.png";
import nav5 from "@/assets/img/nav5.png";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// function filterTopRouterMap(name){
// 	let router = topRouterMap.find((item) => {
// 		return item.parentName === name;
// 	});
// 	return router.data; // arr
// }

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',
    component: Layout,
		// redirect: '/index/index',
		hidden:true
  },
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
			icon: nav2,
		},
		noDropdown:true,
		children:[
			{
				path:'index',
				meta:{
					title:'首页',
					icon:nav2,
					routerType:'leftmenu'
				},
				component: () => import('@/page/index/index'),
			},
			{
				path:'list',
				name:'indexList',
				meta:{
					title:'列表页',
					icon:nav2,
					routerType:'leftmenu'
				},
				component: () => import('@/page/index/list'),
			},
			{
				path:'table',
				name:'indexTab',
				meta:{
					title:'表格页',
					icon:nav2,
					routerType:'leftmenu'
				},
				component: () => import('@/page/index/table'),
			},
			{
				path:'info',
				name:'indexInfo',
				meta:{
					title:'详情页',
					icon:nav2,
					routerType:'leftmenu'
				},
				component: () => import('@/page/index/info'),
			}

		]
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'电子证照生成管理',
			icon: nav1,
	  },
	  component:Layout,
	  children:[
		{
		   path:'listManage',
		   name:'listManage',
		   meta: {
					title:'目录管理',
					icon: 'iconinfo',
					routerType:'leftmenu',
			 },
	  	 component: () => import('@/page/infoManage/listManage/index'),
		},
    {
     path:'/infoManage/listManage/info',
     name:'listManageInfo',
     meta: {
        title:'详情',
        icon: 'iconinfo',
        routerType:'leftmenu',
     },
     hidden: true,
     component: () => import('@/page/infoManage/listManage/info')
    },
		{
			path:'elManage',
			name:'elManage',
			meta: {
				title:'模板管理',
				icon: 'iconinfo',
				routerType:'leftmenu',
			},
			component: () => import('@/page/infoManage/elManage/index'),
    },
    {
     path:'/infoManage/elManage/info',
     name:'elManageInfo',
     meta: {
        title:'详情',
        icon: 'iconinfo',
        routerType:'leftmenu',
     },
     hidden: true,
     component: () => import('@/page/infoManage/elManage/info')
    },

	  ]
	}
]

	//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/permission/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/shareMange',
		name: 'shareMange',
		component:Layout,
		meta: {
			title:'电子共享服务管理',
			icon: nav3,
		},
		children:[
			// {
			// 	path:'shareConfig',
			// 	name: 'shareConfig',
			// 	meta:{
			// 		title:'证照共享接口配置',
			// 		icon:'iconuser',
			// 	  routerType:'leftmenu'
			// 	},
			// 	 component: () => import('@/page/userList/userList'),
			// },
			{
				path:'shareList',
				name: 'shareList',
				meta:{
					title:'证照共享接口列表',
					icon:'iconuser',
				  routerType:'leftmenu'
				},
				 component: () => import('@/page/share/shareList/index'),
			},
      {
				path:'shareListInfo',
				name: 'shareListInfo',
				meta:{
					title:'证照共享接口列表详情',
					icon:'iconuser',
				  routerType:'leftmenu'
				},
        hidden: true,
				 component: () => import('@/page/share/shareList/info'),
			},
			{
				path:'shareLogs',
				name: 'shareLogs',
				meta:{
					title:'证照接口调用日志',
					icon:'iconuser',
				  routerType:'leftmenu'
				},
				 component: () => import('@/page/share/shareLog/index'),
			},
      {
				path:'shareLogInfo',
				name: 'shareLogInfo',
				meta:{
					title:'证照接口调用详情',
					icon:'iconuser',
				  routerType:'leftmenu'
				},
        hidden: true,
				 component: () => import('@/page/share/shareLog/info'),
			}
		]
	},

	{
		path:'/analyManage',
		name: 'analyManage',
		meta: {
		  title:'电子证照统计分析',
		  icon: nav4,
		},
		component:Layout,
		children:[
		  {
			path:'analyList',
			name:'analyList',
			meta: {
					title:'数据统计分析',
					routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/fundIndex/index'),
		  },
		  {
			path:'analyLog',
			name:'analyLog',
			meta: {
				title:'数据操作日志',
				routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/fundLog/index'),
			}
		]
	},

	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: nav5,
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: Layout,
    // redirect: '/permission/page',
    children: [{
			path: 'role',
			name: 'role',
      meta: {
        title: '角色管理',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/role'),
    }, {
			path: 'number',
			name: 'number',
      meta: {
				title: '账号管理',
				roles:['editor']
      },
      component: () => import('@/page/permission/number'),
    }, {
			path: 'organ',
			name: 'organ',
      meta: {
				title: '机构管理',
				roles:['editor']
      },
      component: () => import('@/page/permission/organ'),
    }]
  },
  
	// { path: '*', redirect: '/404', hidden: true }
	];

	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 *
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 *
	 *
	 *
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 *
	 *
	 *
	 */
