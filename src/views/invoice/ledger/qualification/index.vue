<template>
  <div class="containers">
    <el-form
      :model="queryParams"
      ref="queryForm"
      label-width="160px"
      :inline="true"
    >
      <!--      <el-form-item label="分公司" prop="dptId">-->
      <!--        <treeselect v-model="queryParams.dptId" style="width:200px" :options="deptOptions" placeholder="请选择部门"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="渠道编号"  prop="channelNum">
        <el-input
          placeholder="请输入渠道编号"
          v-model="queryParams.channelNum"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="发票销售方名称" prop="sellerName">
        <el-input
          placeholder="请输入发票销售方名称"
          v-model="queryParams.sellerName"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="发票销售纳税人识别号" prop="sellerTaxpayerCode">
        <el-input
          placeholder="请输入发票销售纳税人识别号"
          v-model="queryParams.sellerTaxpayerCode"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="营业执照名称" prop="businessLicense">
        <el-input
          placeholder="请输入营业执照名称"
          v-model="queryParams.businessLicense"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="营业执照纳税人识别号" prop="businessTaxpayerCode">
        <el-input
          placeholder="请输入营业执照纳税人识别号"
          v-model="queryParams.businessTaxpayerCode"
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="纳税人资质" prop="taxpayerCredentials">
        <el-input
          placeholder="请输入纳税人资质"
          v-model="queryParams.taxpayerCredentials"
          size="small"
          style="width: 200px"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleImport"
          >导入</el-button
        >
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-download"
            size="mini"
            @click="handleDownload"
            >下载导入模板</el-button
          >
        </el-col>
      </el-col>
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
      <el-table-column
        prop="taxpayerCredentials"
        width="200px"
        align="center"
        label="纳税人资质"
      ></el-table-column>
      <el-table-column
        prop="taxRate"
        width="200px"
        align="center"
        label="税率"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        width="200px"
        align="center"
        label="数据更新时间"
      ></el-table-column>
      <el-table-column
        prop="sellerName"
        width="200px"
        align="center"
        label="发票销售方名称"
      ></el-table-column>
      <el-table-column
        prop="sellerTaxpayerCode"
        width="200px"
        align="center"
        label="发票销售纳税人识别号"
      ></el-table-column>
      <el-table-column
        prop="businessLicense"
        width="200px"
        align="center"
        label="营业执照名称"
      ></el-table-column>
      <el-table-column
        prop="businessTaxpayerCode"
        width="200px"
        align="center"
        label="营业执照纳税人识别号"
      ></el-table-column>
      <el-table-column
        prop="legalPerson"
        width="200px"
        align="center"
        label="法人"
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
import { GetList } from "@/api/invoice/qualification/index";
import { fundSelectExprot, exportData } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import axios from "axios";
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
      open: false,
      ActionUrl: process.env.VUE_APP_BASE_API + "/invoice/taxpayer/import",
      morenUnit:undefined
    };
  },
  components: {
    Treeselect,
  },
  created() {
    // this.getUnitId();
    this.getList();
  },
  methods: {
    //获取部门列表
    getUnitId() {
      resourceTreeByUN().then((res) => {
        this.queryParams.dptId = res.checked[0];
        this.morenUnit= res.checked[0];
        this.deptOptions = res.list;
      });
    },
    //表格数据列表
    getList() {
      this.loading = true;
      GetList(this.queryParams)
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
   
    handleImport() {
      this.open = true;
    },
    UploadFile(param) {
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
        url: this.ActionUrl,
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
            this.$message.success("数据导入成功");
            this.getList();
          } else {
            this.msgError("数据导入失败");
          }
          this.open = false;
        })
        .catch((err) => {
          loading.close();
        });
    },
    //下载导入模板
    handleDownload() {
      this.$confirm("是否下载渠道纳税人资质库导入模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        let data = {};
        exportData(
          getToken(),
          data,
          "/invoice/taxpayer/export/template",
          "渠道纳税人资质库导入模板"
        );
      });
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
        fundSelectExprot(
          getToken(),
          data,
          "/fund/history/export",
          "渠道纳税人资质库"
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
