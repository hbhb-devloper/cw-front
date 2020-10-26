<template>
  <div class="containers">
    <el-form :model="queryParams" ref="queryForm" label-width="70px" :inline="true">
      <el-form-item label="部门" prop="dptId">
        <treeselect v-model="queryParams.dptId" style="width:200px" :options="deptOptions" placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="代销商编号" prop="agentNum" label-width="100px">
        <el-input placeholder="请输入代销商编号" v-model="queryParams.agentNum" size="small" style="width:200px" />
      </el-form-item>
     <!-- <el-form-item label="导入时间" prop="peopleDownTime">
        <el-date-picker v-model="queryParams.peopleDownTime" type="date" placeholder="选择时间" style="width:200px" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item> -->
      <el-form-item label="账期" prop="accountPeriod">
        <el-date-picker v-model="queryParams.accountPeriod" type="month" style="width:200px" placeholder="选择时间" format="yyyy-MM"
          value-format="yyyyMM"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-download" size="mini" v-hasPermi="['budget:split:export']" @click="handleExport">导出</el-button>
      </el-col>
      <el-col :span="1.5">
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        multiple
        action="#"
        :accept="'.xls,.xlsx'"
        :http-request="imageUpload"
      >
        <el-button type="warning" icon="el-icon-download" size="mini" >导入</el-button>
      </el-upload>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column prop="city"   align="center" label="地区"></el-table-column>
      <el-table-column prop="unitId"   align="center" label="县市"></el-table-column>
      <el-table-column prop="marketCenter"   align="center" label="区域营销中心"></el-table-column>
      <el-table-column prop="channelType"   align="center" label="渠道类型"></el-table-column>
      <el-table-column prop="channelSonType"   align="center" label="渠道子类型"></el-table-column>
      <el-table-column prop="agentNum"   align="center" label="代销商编号"></el-table-column>
      <el-table-column prop="agent"   align="center" label="代销商"></el-table-column>
      <el-table-column prop="projectType"   align="center" label="科目类型"></el-table-column>
      <el-table-column prop="businessType"   align="center" label="业务类型"></el-table-column>
      <el-table-column prop="brand"   align="center" label="品牌"></el-table-column>
      <el-table-column prop="averagePrice"   align="center" label="平均单价"></el-table-column>
      <el-table-column prop="tally"   align="center" label="计算数量"></el-table-column>
      <el-table-column prop="ratReward"   align="center" label="酬金金额（含税）"></el-table-column>
      <el-table-column prop="actuallyPaid"   align="center" label="实付金额"></el-table-column>
      <el-table-column prop="calculationBasis"   align="center" label="计算依据"></el-table-column>
      <el-table-column prop="reward"   align="center" label="酬金金额（不含税）"></el-table-column>
      <el-table-column prop="accountPeriod"   align="center" label="账期"></el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {resourceTreeByUN} from "@/api/system/unit";
  import {exportData} from '@/utils/export.js'
  import {getToken} from '@/utils/auth'
   import {getLists} from '@/api/invoice/detailedfee/index'
   import axios from 'axios'
  export default {
    name: "index",
    data() {
      return {
        total: 0,
        queryParams: {
          dptId: undefined, //部门
          agentNum: undefined, //代销商编号
          peopleDownTime: undefined, //导入时间
          accountPeriod: undefined, //账期
          pageSize: 10,
          pageNum: 1
        }, //条件搜索表单
        deptOptions: [], //单位下拉
        tableData: [], //表格数据
        loading: false, //表格加载动画
      }
    },
    components: {
      Treeselect,
    },
    created() {
      this.getUnitId();
       this.getList();
    },
    methods: {
      //获取部门列表
      getUnitId() {
        resourceTreeByUN().then(res => {
          this.queryParams.dptId = res.checked[0];
          this.deptOptions = res.list;
        });
      },
      //表格数据列表
      getList() {
        this.loading = true;
        console.log(this.queryParams)
        getLists(this.queryParams).then(res => {
          this.total = res.count;
          this.tableData = res.list;
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      },
      //充置搜索
      resetQuery() {
        this.queryParams = {};
      },
      //导出
      handleExport() {
        this.$confirm(
          '是否导出酬金明细数据？',
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(res => {
          let data = JSON.parse(JSON.stringify(this.queryParams));
          data.pageSize = data.pageNum = undefined;
          exportData(getToken(), data, '/invoice/detailed/export', '酬金计提明细');
        });
      },
      //导入
      imageUpload(param){
        const _file = param.file;
        let params = new FormData();

        params.append('file', _file);
        axios({
          url: process.env.VUE_APP_BASE_API+'/invoice/detailed/import',
          method: 'post',
          data: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
        }).then(res => {
         if(res.data.status==1000){
           this.$message.success('导入成功！');
           this.getList()
         }else{
           this.msgError(res.data.message);
         }
        }).catch(err=>{
          this.msgError(err);
        })
      },
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
