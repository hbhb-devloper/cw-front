<template>
  <div class="containers">
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="110px"
      :inline="true"
    >
      <el-form-item label="部门" prop="dptId">
        <treeselect
          v-model="queryParams.unitId"
          style="width: 200px"
          :options="deptOptions"
          placeholder="请选择部门"
        />
      </el-form-item>
      <el-form-item label="渠道名称">
        <el-input
          placeholder="请输入渠道名称"
          v-model="queryParams.channelName"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="渠道编号">
        <el-input
          placeholder="请输入渠道编号"
          v-model="queryParams.channelNum"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="导入时间">
        <el-date-picker
          v-model="itime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-row :span="12" style="margin-bottom: 30px">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="getList"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置</el-button
      >
    </el-row>
    <el-row :gutter="10" class="mb8" style="position: relative">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="handleImport"
        >导入</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-download"
        size="mini"
        @click="handleExport"
        >导出</el-button
      >
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="handleDownload"
          >下载导入模板</el-button
        >
      <span style="position: absolute; right: 0"
        >发票库表导入时间：{{ updateTime }}</span
      >
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        prop="unitId"
        width="200px"
        align="center"
        label="分公司"
      ></el-table-column>
      <el-table-column
        prop="channelNum"
        width="200px"
        align="center"
        label="渠道编号"
      ></el-table-column>
      <el-table-column
        prop="channelName"
        width="200px"
        align="center"
        label="渠道名称"
      ></el-table-column>
      <el-table-column align="center" label="上月余额">
        <el-table-column
          prop="lastReward"
          width="200px"
          align="center"
          label="业务酬金"
        ></el-table-column>
        <el-table-column
          prop="lastSubsidy"
          width="200px"
          align="center"
          label="综合补贴"
        ></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本月增加（计提）">
        <el-table-column width="200px" align="center" label="业务酬金">
          <el-table-column
            prop="rewardFreeAmount"
            width="200px"
            align="center"
            label="不含税金额"
          ></el-table-column>
          <el-table-column
            prop="rewardTaxAmount"
            width="200px"
            align="center"
            label="税额"
          ></el-table-column>
        </el-table-column>
        <el-table-column width="200px" align="center" label="综合补贴">
          <el-table-column
            prop="subsidyFreeAmount"
            width="200px"
            align="center"
            label="不含税金额"
          ></el-table-column>
          <el-table-column
            prop="subsidyTaxAmount"
            width="200px"
            align="center"
            label="税额"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本月减少（支付）">
        <el-table-column width="200px" align="center" label="业务酬金">
          <el-table-column
            prop="rewardFreePay"
            width="200px"
            align="center"
            label="不含税金额"
          ></el-table-column>
          <el-table-column
            prop="rewardTaxPay"
            width="200px"
            align="center"
            label="进项税转出税额"
          ></el-table-column>
        </el-table-column>
        <el-table-column width="200px" align="center" label="综合补贴">
          <el-table-column
            prop="subsidyFreePay"
            width="200px"
            align="center"
            label="不含税金额"
          ></el-table-column>
          <el-table-column
            prop="subsidyTaxPay"
            width="200px"
            align="center"
            label="进项税转出税额"
          ></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="本月余额">
        <el-table-column
          prop="thisReward"
          width="200px"
          align="center"
          label="业务酬金"
        ></el-table-column>
        <el-table-column
          prop="thisSubsidy"
          width="200px"
          align="center"
          label="综合补贴"
        ></el-table-column>
        <el-table-column
          prop="subtotal"
          width="200px"
          align="center"
          label="小计"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="channelBy"
        width="200px"
        align="center"
        label="渠道负责人"
      ></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog :visible.sync="open" width="400px">
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        :accept="'.xls,.xlsx'"
        multiple
        action="#"
        :http-request="UploadFile"
      >
        <el-button size="small" type="primary" class="uploadImgBtn"
          >导入数据</el-button
        >
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { resourceTreeByUN } from "@/api/system/unit";
import { GetList, getUpdateTime } from "@/api/invoice/contacts/index";
import { exportData } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      total: 0,
      queryParams: {
        pageSize: 20,
        pageNum: 1,
      }, //条件搜索表单
      tableData: [], //表格数据
      loading: true, //表格加载动画
      itime: [],
      deptOptions: [],
      updateTime: undefined,
      open: false,
      ActionUrl: process.env.VUE_APP_BASE_API + "/invoice/account/run/import",
    };
  },
  components: {
    Treeselect,
  },
  created() {
    this.getUnitId();
    this.getList();
    this.getUpdateTimes();
  },
  methods: {
    getUpdateTimes() {
      getUpdateTime().then((res) => {
        this.updateTime = res;
      });
    },
    //获取部门列表
    getUnitId() {
      resourceTreeByUN().then((res) => {
        this.queryParams.unitId = res.checked[0];
        this.deptOptions = res.list;
      });
    },
    //表格数据列表
    getList() {
      this.loading = true;
      if (this.itime.length == 2) {
        this.queryParams.beginTime = this.itime[0];
        this.queryParams.endTime = this.itime[1];
      }
      GetList(this.queryParams)
        .then((res) => {
          console.log(res);
          this.total = res.count;
          this.tableData = res.list;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    //充置搜索
    resetQuery() {
      this.queryParams = {
        unitId: this.queryParams.unitId,
        pageSize: 20,
        pageNum: 1,
      };
      this.itime = [];
      this.getList();
    },
    handleImport() {
      this.open = true;
    },
    UploadFile(param) {
      const _file = param.file;
      let params = new FormData();
      params.append("file", _file);
      axios({
        url: this.ActionUrl,
        method: "post",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getToken(),
        },
      }).then((res) => {
        if (res.data.status == 1000) {
          this.$message.success("数据导入成功");
          this.getList();
          this.getUpdateTimes();
        } else {
          this.msgError("数据导入失败");
        }
        this.open = false;
      });
    },
    //下载导入模板
    handleDownload(){
      this.$confirm("是否下载往来账模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = {}
        exportData(
          getToken(),
          data,
          "/invoice/account/run/export/template",
          "往来账导入模板"
        );
      });
    },
    //导出
    handleExport() {
      this.$confirm("是否导出往来账数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = JSON.parse(JSON.stringify(this.queryParams));
        data.pageSize = data.pageNum = undefined;
        exportData(getToken(), data, "/invoice/account/run/export", "往来账");
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
