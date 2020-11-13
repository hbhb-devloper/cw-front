<template>
  <div class="containers">
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="70px"
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
      <!--        <el-form-item label="渠道名称" prop="channelName">-->
      <!--          <el-input-->
      <!--            v-model="queryParams.channelName"-->
      <!--            placeholder="请输入渠道名称"-->
      <!--            clearable-->
      <!--            class="search-input"-->
      <!--            size="small"-->

      <!--          />-->
      <!--        </el-form-item>-->
      <el-form-item label="渠道编号" prop="channelNum">
        <el-input
          v-model="queryParams.channelNum"
          placeholder="请输入渠道编号"
          clearable
          class="search-input"
          size="small"
        />
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
        <!-- <el-button type="warning" icon="el-icon-download" size="mini" v-hasPermi="['budget:split:export']">导出</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleImport"
          >导入</el-button
        >
        
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
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
      <el-table-column prop="unitId" label="分公司" width="" align="center">
      </el-table-column>
      <el-table-column
        prop="channelNum"
        label="渠道编号"
        width=""
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        width=""
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="taxAmount"
        label="综合激励含税金额"
        width=""
        align="center"
      >
      </el-table-column>
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
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import { getLists } from "@/api/invoice/excitation/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { resourceTreeByUN } from "@/api/system/unit";
import { fundSelectExprot,exportData } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      open: false,
      total: 0,
      queryParams: {
        unitId: undefined, //部门
        // channelName:undefined, 渠道名称
        channelNum: undefined, //渠道编号
        pageSize: 10,
        pageNum: 1,
      }, //条件搜索表单
      deptOptions: [], //单位下拉

      tableData: [], //表格数据
      loading: false, //表格加载动画
      morenUnit:undefined
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
        this.queryParams.unitId = res.checked[0];
        this.morenUnit = res.checked[0];
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
        .catch((err) => {});
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
      this.$confirm("是否导出数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = JSON.parse(JSON.stringify(this.queryParams));
        data.pageSize = data.pageNum = undefined;
        fundSelectExprot(getToken(), data, "", "综合激励");
      });
    },
    handleImport() {
      this.open = true;
    },
    //下载导入模板
    handleDownload(){
      this.$confirm("是否下载综合激励导入模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = {}
        exportData(
          getToken(),
          data,
          "/invoice/incentive/export/template",
          "综合激励导入模板"
        );
      });
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
        url: process.env.VUE_APP_BASE_API + "/invoice/incentive/import ",
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
            this.$message.success("导入成功！");
            this.getList();
          } else {
            this.msgError(res.data.message);
          }
          this.open = false;
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
