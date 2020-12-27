<template>
  <div class="containers">
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="70px"
      :inline="true"
    >
      <el-form-item label="县市" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          style="width: 200px"
          :options="deptOptions"
          placeholder="请选择县市"
        />
      </el-form-item>
      <el-form-item label="代销商编号" prop="agentNum" label-width="100px">
        <el-input
          placeholder="请输入代销商编号"
          v-model="queryParams.agentNum"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <!-- <el-form-item label="导入时间" prop="peopleDownTime">
        <el-date-picker v-model="queryParams.peopleDownTime" type="date" placeholder="选择时间" style="width:200px" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item> -->
      <el-form-item label="账期" prop="accountPeriod">
        <el-date-picker
          v-model="queryParams.accountPeriod"
          type="month"
          style="width: 200px"
          placeholder="选择时间"
          format="yyyy-MM"
          value-format="yyyyMM"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
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
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          v-hasPermi="['invoice:ledger:detailedfee:export']"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          v-hasPermi="['invoice:ledger:detailedfee:import']"
          @click="handleImport"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          v-hasPermi="['invoice:ledger:detailedfee:import']"
          @click="handleDownload"
          >下载导入模板</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="city"
        align="center"
        label="地区"
      ></el-table-column>
      <el-table-column
        prop="unitId"
        align="center"
        label="县市"
      ></el-table-column>
      <el-table-column
        prop="marketCenter"
        align="center"
        label="区域营销中心"
      ></el-table-column>
      <el-table-column
        prop="channelType"
        align="center"
        label="渠道类型"
      ></el-table-column>
      <el-table-column
        prop="channelSonType"
        align="center"
        label="渠道子类型"
      ></el-table-column>
      <el-table-column
        prop="agentNum"
        align="center"
        label="代销商编号"
      ></el-table-column>
      <el-table-column
        prop="agent"
        align="center"
        label="代销商"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        align="center"
        label="科目类型"
      ></el-table-column>
      <el-table-column
        prop="businessType"
        align="center"
        label="业务类型"
      ></el-table-column>
      <el-table-column
        prop="brand"
        align="center"
        label="品牌"
      ></el-table-column>
      <el-table-column
        prop="averagePrice"
        align="center"
        label="平均单价"
      ></el-table-column>
      <el-table-column
        prop="tally"
        align="center"
        label="计算数量"
      ></el-table-column>
      <el-table-column
        prop="ratReward"
        align="center"
        label="酬金金额（含税）"
      ></el-table-column>
      <el-table-column
        prop="actuallyPaid"
        align="center"
        label="实付金额"
      ></el-table-column>
      <el-table-column
        prop="calculationBasis"
        align="center"
        label="计算依据"
      ></el-table-column>
      <el-table-column
        prop="reward"
        align="center"
        label="酬金金额（不含税）"
      ></el-table-column>
      <el-table-column
        prop="accountPeriod"
        align="center"
        label="账期"
      ></el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog title="导入" :visible.sync="open" width="400px">
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        :accept="'.xls,.xlsx'"
        multiple
        action="#"
        :http-request="imageUpload"
      >
        <el-button size="small" type="primary" class="uploadImgBtn"
          >导入数据</el-button
        >
      </el-upload>
      <el-table :data="tableData1">
        <el-table-column label="数据导入检查结果" prop="date" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { resourceTreeByUN } from "@/api/system/unit";
import { exportData1 } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import { getLists } from "@/api/invoice/detailedfee/index";
import { prefix } from "@/api/invoice/invoice";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      open: false,
      total: 0,
      queryParams: {
        unitId: undefined, //部门
        agentNum: undefined, //代销商编号
        peopleDownTime: undefined, //导入时间
        accountPeriod: undefined, //账期
        pageSize: 10,
        pageNum: 1,
      }, //条件搜索表单
      deptOptions: [], //单位下拉
      tableData: [], //表格数据
      loading: false, //表格加载动画
      morenUnit: undefined,
      tableData1: [],
    };
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
      resourceTreeByUN().then((res) => {
        this.queryParams.unitId = res.checked;
        this.morenUnit = res.checked;
        this.deptOptions = res.list;
      });
    },
    //表格数据列表
    getList() {
      this.loading = true;
      console.log(this.queryParams);
      getLists(this.queryParams)
        .then((res) => {
          this.total = res.count;
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
      this.$confirm("是否导出酬金明细数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = JSON.parse(JSON.stringify(this.queryParams));
        data.pageSize = data.pageNum = undefined;
        exportData1(
          getToken(),
          data,
          `${prefix}/detailed/export`,
          "酬金计提明细"
        );
      });
    },
    //下载导入模板
    handleDownload() {
      this.$confirm("是否下载酬金明细导入模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = {};
        exportData1(
          getToken(),
          data,
          `${prefix}/detailed/export/template`,
          "酬金计提明细导入模板"
        );
      });
    },
    handleImport() {
      this.tableData1 = [];
      this.open = true;
    },
    //导入
    imageUpload(param) {
      const _file = param.file;
      let params = new FormData();

      params.append("file", _file);
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      axios({
        url: process.env.VUE_APP_GATEWAY_API + `${prefix}/detailed/import`,
        method: "post",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getToken(),
        },
      })
        .then((res) => {
          loading.close();
          if (res.data.status == 1000) {
            if (res.data.data == "") {
              this.$message.success("导入成功！");
              this.open = false;
              this.getList();
            } else {
              this.tableData1 = [];
              for (let item in res.data.data) {
                this.tableData1.push({ date: res.data.data[item] });
              }
            }
          } else {
            this.msgError(res.data.message);
          }
        })
        .catch((err) => {
          loading.close();
          this.msgError(err);
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
