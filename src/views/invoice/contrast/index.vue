<template>
  <div class="containers">
    <el-form :model="queryParams" ref="queryForm" label-width="110px" :inline="true">
      <el-form-item label="部门" prop="dptId">
        <treeselect v-model="queryParams.dptId" style="width:200px" :options="deptOptions" placeholder="请选择部门"/>
      </el-form-item>
      <el-form-item label="渠道编号">
        <el-input
          placeholder="请输入渠道编号"
          v-model="queryParams.groupName"
          size="small"
          style="width:200px"
        />
      </el-form-item>
      <el-form-item label="付款名称">
        <el-input
          placeholder="请输入付款名称"
          v-model="queryParams.groupName"
          size="small"
          style="width:200px"
        />
      </el-form-item>
    </el-form>

    <el-row :span="12" style="margin-bottom: 30px;">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </el-row>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button  type="primary" icon="el-icon-plus" size="mini" @click="handleExport">添加</el-button>
        <el-button  type="success" icon="el-icon-edit" size="mini" @click="handleExport">修改</el-button>
        <el-button  type="danger" icon="el-icon-delete" size="mini" @click="handleExport">删除</el-button>
        <el-button  type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="fcCode" width="200px" align="center" label="往来账余额（1业务酬金）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="往来账余额（2综合补贴）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="往来账余额（3小计）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="税率"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="集中化应付不含税(1业务酬金）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="集中化应付不含税(2综合补贴）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="集中化应付不含税(3小计）"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="A\E取低的结果"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="B\F取低的结果"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="C\G取低的结果"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="渠道编号"></el-table-column>
      <el-table-column prop="fcCode" width="200px" align="center" label="付款名称"></el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import { resourceTreeByUN } from "@/api/system/unit";
  import {getHistroyList,getUnitList} from '@/api/fund/fundSelect'
  import {fundSelectExprot} from '@/utils/export.js'
  import {getToken} from '@/utils/auth'
  export default {
    name: "index",
    data() {
      return {
        total:0,
        queryParams:{
          pageSize:10,
          pageNum:1
        },//条件搜索表单
        tableData:[],//表格数据
        loading:true,//表格加载动画
      }
    },
    components:{
      Treeselect,
    },
    created() {
      this.getUnitId();
      this.getList();
    },
    methods:{
      //获取部门列表
      getUnitId(){
        resourceTreeByUN().then(res=>{
          this.queryParams.dptId=res.checked[0];
          this.deptOptions=res.list;
        });
      },
      //表格数据列表
      getList(){
        this.loading=true;
        getHistroyList(this.queryParams).then(res=>{
          this.total=res.count;
          this.tableData=res.list;
          this.loading=false;
        }).catch(err=>{
          this.loading=false;
        })
      },
      //充置搜索
      resetQuery(){
        this.queryParams={};
      },
      //导出
      handleExport(){
        this.$confirm(
          '是否导出数据？',
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(res=>{
          let data=JSON.parse(JSON.stringify(this.queryParams));
          data.pageSize=data.pageNum=undefined;
          fundSelectExprot(getToken(),data,'/fund/history/export','渠道纳税人资质库');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item--medium /deep/ .el-form-item__content {
    width: 230px;
  }
  .containers {
    width: 95%;
    margin: 20px auto 0 auto;

    .top-control {
      margin-bottom: 20px;

      label {
        margin-right: 30px;
      }
    }
  }
  .uploadCss {
    margin-bottom: 10px;
  }
  /deep/ .el-table__row--level-0 {
    background: #f5f7fa;
  }
</style>
