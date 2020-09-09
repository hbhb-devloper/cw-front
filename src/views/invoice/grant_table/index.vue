<template>
  <div class="app-container">
    <section class="import-box">
      <ul>
        <li class="import-title">酬金发放表模板下载</li>
        <li>酬金发放表导入</li>
      </ul>
      <ul>
        <li class="import-title">综合补贴模板下载</li>
        <li>综合补贴导入</li>
      </ul>
      <ul>
        <li class="import-title">往来账模板下载</li>
        <li>往来账导入</li>
      </ul>
    </section>
    <section class="search-table">
      <div class="search-box">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="报账流水" prop="noticeTitle">
            <el-input
              v-model="queryParams.noticeTitle"
              placeholder="请输入报账流水"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="税率" prop="noticeType">
            <el-select v-model="queryParams.noticeType" placeholder="请选择税率" clearable size="small">
              <el-option
                v-for="dict in typeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          typeOptions:[],
          queryParams:{}
        }
      },
      methods:{

      }
    }
</script>

<style lang="scss" scoped>
  .import-box{
    width: 100%;
    border-radius: 15px;
    background: #fff;
    color:#0d8efd;
    padding:20px;
    display: flex;
    flex-direction: row;
    border:1px solid #0d8efd;
    ul{
      width: 15%;
      text-align: center;
      margin:0 20px;
      li{
        line-height: 45px;
      }
      li:nth-last-child(1){
        border:1.5px solid #00afff;
        border-radius: 30px;
      }
    }
  }
</style>
