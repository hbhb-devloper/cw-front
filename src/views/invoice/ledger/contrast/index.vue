<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-10-26 10:25:07
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-27 16:45:26
-->
<template>
  <div class="containers">
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="110px"
      :inline="true"
    >
      <el-form-item label="部门" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          style="width: 200px"
          :options="deptOptions"
          placeholder="请选择部门"
        />
      </el-form-item>
      <el-form-item label="渠道编号" prop="channelNum">
        <el-input
          placeholder="请输入渠道编号"
          v-model="queryParams.channelNum"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="付款名称" prop="payName">
        <el-input
          placeholder="请输入付款名称"
          v-model="queryParams.payName"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
    </el-form>

    <el-row :span="12" style="margin-bottom: 30px">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="handleQuery"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置</el-button
      >
    </el-row>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        prop="thisReward"
        width="200px"
        align="center"
        label="往来账余额（1业务酬金）"
      ></el-table-column>
      <el-table-column
        prop="thisSubsidy"
        width="200px"
        align="center"
        label="往来账余额（2综合补贴）"
      ></el-table-column>
      <el-table-column
        prop="subtotal"
        width="200px"
        align="center"
        label="往来账余额（3小计）"
      ></el-table-column>
      <el-table-column
        prop="taxRate"
        width="200px"
        align="center"
        label="税率"
      ></el-table-column>
      <el-table-column
        prop="reward"
        width="200px"
        align="center"
        label="集中化应付不含税(1业务酬金）"
      ></el-table-column>
      <el-table-column
        prop="taxAmount"
        width="200px"
        align="center"
        label="集中化应付不含税(2综合补贴）"
      ></el-table-column>
      <el-table-column
        prop="payableSum"
        width="200px"
        align="center"
        label="集中化应付不含税(3小计）"
      ></el-table-column>
      <el-table-column
        prop="lowReward"
        width="200px"
        align="center"
        label="A\E取低的结果"
      ></el-table-column>
      <el-table-column
        prop="lowSubsidy"
        width="200px"
        align="center"
        label="B\F取低的结果"
      ></el-table-column>
      <el-table-column
        prop="lowSubtotal"
        width="200px"
        align="center"
        label="C\G取低的结果"
      ></el-table-column>
      <el-table-column
        prop="channelNum"
        width="200px"
        align="center"
        label="渠道编号"
      ></el-table-column>
      <el-table-column
        prop="payName"
        width="200px"
        align="center"
        label="付款名称"
      ></el-table-column>
      <el-table-column
        prop="unitId"
        width="200px"
        align="center"
        label="分公司"
      ></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
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
import { getContrastList } from "@/api/invoice/contrast";
import { exportData1 } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import { prefix } from "@/api/invoice/invoice";
export default {
  name: "index",
  data() {
    return {
      total: 0,
      queryParams: {
        pageSize: 10,
        pageNum: 1,
      }, //条件搜索表单
      tableData: [], //表格数据
      loading: true, //表格加载动画
      deptOptions:[],
      morenUnit:undefined
    };
  },
  components: {
    Treeselect,
  },
  created() {
    this.getUnitId();
  },
  methods: {
    //获取部门列表
    getUnitId() {
      resourceTreeByUN().then((res) => {
        this.queryParams.unitId = res.checked;
        this.morenUnit= res.checked
        this.deptOptions = res.list;
        this.getList();
      });
    },
    //表格数据列表
    getList() {
      this.loading = true;
      getContrastList(this.queryParams)
        .then((res) => {
          this.total = res.total;
          this.tableData = res.list;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
      /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
      this.handleQuery();
    },
   
    //导出
    handleExport() {
      this.$confirm("是否导出对比表数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = JSON.parse(JSON.stringify(this.queryParams));
        data.pageSize = data.pageNum = undefined;
        exportData1(
          getToken(),
          data,
          `${prefix}/contrast/export/contrast`,
          "渠道发票对比表"
        );
      });
    },
  },
};
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
