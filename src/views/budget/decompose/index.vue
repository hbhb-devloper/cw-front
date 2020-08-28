<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect v-model="queryParams.unitId" :options="deptOptions" placeholder="请选择单位" />
      </el-form-item>
      <el-form-item label="项目类型" prop="projectItem">
        <el-input placeholder="请输入项目类型" v-model="queryParams.projectItem" size="small" />
      </el-form-item>
      <el-form-item label="年份" prop="importDate">
        <el-date-picker
          v-model="queryParams.importDate"
          type="year"
          placeholder="选择年份"
          format="yyyy"
          value-format="yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible=true"
          v-hasPermi="['budget:split:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['budget:split:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :border="false"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren1'}"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      header-cell-class-name="is-center"
    >
      <el-table-column prop="itemName" label="项目类型" width="400"></el-table-column>
      <el-table-column prop="lastYearBalance" align="center" label="去年预算值(万元)"></el-table-column>
      <el-table-column prop="lastYearFinishedBalance" align="center" label="去年完成值(万元)"></el-table-column>
      <el-table-column prop="balance" align="center" label="本年预算值(万元)"></el-table-column>
      <!-- <el-table-column prop="threshold" align="center" label="金额阀值(万元)"></el-table-column> -->
      <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" v-if="!scope.row.hasChildren">调整</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />-->

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="预算科目：" prop="itemName">
          <el-input placeholder="请输入关键词" v-model="form.itemName" disabled clearable size="small" />
        </el-form-item>
        <el-form-item label="去年预算值：" prop="lastYearBalance">
          <el-input
            placeholder="请输入关键词"
            v-model="form.lastYearBalance"
            disabled
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="本年预算值：" prop="balance">
          <el-input placeholder="请输入关键词" v-model="form.balance" clearable size="small" />
        </el-form-item>
        <el-form-item label="金额阀值：" prop="threshold">
          <el-input placeholder="请输入关键词" v-model="form.threshold" clearable size="small" />
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input placeholder="请输入关键词" v-model="form.remark" clearable size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- <el-upload
        class="upload-demo"
        ref="upload"
        action="doUpload"
        :limit="1"
        :file-list="fileList"
        :before-upload="beforeUpload"
      >
        <el-button slot="trigger" type="primary" plain>选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
      </el-upload>
      <div class="btn-box">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
    </div>-->

    <el-dialog title="导入" :visible.sync="centerDialogVisible" width="500px">
      <div>
        <el-date-picker
          class="uploadCss"
          v-model="uploadData.importDate"
          type="year"
          placeholder="选择年份(默认当前年份)"
          format="yyyy"
          value-format="yyyy"
        ></el-date-picker>
        <el-button type="primary"  style="margin-botton:10px;">
          <a download="预算分解导入模板示例" :href="downPath+'预算分解导入模板示例.xlsx'">
            <i class="el-icon-download"></i>下载导入模板
          </a>
        </el-button>
      </div>
      <el-upload
        class="upload-demo"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-progress="handleupload"
        :on-error="handleFail"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :action="ActionUrl"
        :data="uploadData"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <!-- <div class="btn-box">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import { treeselect, DeptList } from "@/api/system/dept";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  listBudget,
  updateBudget,
  BudgetExport,
} from "@/api/budget/decompose/decompose";
import { exportData } from "@/utils/export";
import { getToken } from "@/utils/auth";
export default {
  components: { Treeselect },
  data() {
    return {
      loading: true,
      headers: {
        Authorization: getToken(),
      },
      uploadData: {},
      importDate: "",
      fileList: [],
      queryParams: {
        unitId: undefined,
        year: undefined,
        projectItem: undefined,
        // year: new Date()
      },
      unitId: undefined,
      tableData: [],
      city: "",
      year: "",
      centerDialogVisible: false,
      obj: {
        subject: "",
        company: "",
        budget: "",
        threshold: "",
        yearthis: "",
        remarks: "",
      },
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      ActionUrl: process.env.VUE_APP_BASE_API + "/budget/import", // 上传的图片服务器地址
      morenUnit: undefined,
    };
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("loading", loading);
      this.loadingoption = loading;
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      console.log("handleSuccess", res);
      this.fileList = [];
      this.loadingoption.close();
      this.centerDialogVisible = false;
      if (res.status == 1000) {
        this.$message.success("文件上传成功");
        this.getList();
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
        this.getList();
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listBudget(this.queryParams).then((response) => {
        this.tableData = response;
        // this.total = response.count;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked[0];
        that.queryParams.unitId = that.morenUnit;
        that.getList();
      });
    },
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
      // this.handleQuery();
    },
    // 表单重置
    reset() {
      this.form = {
        itemName: undefined,
        company: undefined,
        oldValue: undefined,
        newValue: undefined,
        difValue: undefined,
        remark: undefined,
      };
      this.resetForm("form");
    },
    //修改
    handleEdit(row) {
      this.reset();
      this.form = row;
      this.open = true;
      this.title = "预算调整";
    },
    /** 提交按钮 */
    submitForm: function () {
      updateBudget(this.form)
        .then((response) => {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        })
        .catch((err) => {
          this.msgError(err.message);
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm("是否确认导出该预算分解的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          // return BudgetExport(queryParams);
          return exportData(
            getToken(),
            queryParams,
            "/budget/export",
            "预算分解"
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
  },
};
</script>

<style lang="scss" scoped>

.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.container {
  width: 90%;
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
