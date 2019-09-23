<template>
    <div id="app">
		   <router-view></router-view>
    </div>
</template>

<script>
    export default {
    	name:'App'
    }
</script>

<style lang="less">
    @import './style/variables';
	@import './style/element-ui';
	@import './style/common';
	@import './style/scrollBar';
  .el-menu  {
    background: transparent ;
  }
  .el-menu {
    background: transparent !important;
  }
  .el-submenu .el-menu {
    background: #192A5E !important;
    box-shadow: inset 0 2px 8px 0 rgba(15,24,42,0.50);
  }
  .el-menu-item,.el-submenu__title, .el-menu-item{
    border-left: 3px solid transparent;
  }
  .el-menu-item:focus {
     background: #344F8D !important;
  }
  .el-submenu__title:hover, .el-menu-item:hover{
    background: #344F8D !important;
    border-left: 3px #32ABFF solid;

  }
  .el-menu--vertical {
    background-image: linear-gradient(-180deg, #2C4381 0%, #111F4C 100%);
  }
  .el-menu .el-submenu__icon-arrow {
    right: 10px;
  }
  .el-menu.el-menu--horizontal {
    border: none !important;
  }
  * {
    -moz-user-select:none;
   -ms-user-select: none;
   -webkit-user-select: none;
   user-select: none;
  }
</style>
