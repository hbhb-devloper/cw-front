<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-10-30 09:20:31
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-12 13:55:41
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style>
  .app-main{
    background: #F4F4F4;
  }
  .el-table /deep/ .el-table__empty-text {
  position: absolute;
  left: 0;
  margin: 0 auto;
  right: 0;
}
/* ::-webkit-scrollbar {
  display: none;
} */
</style>
