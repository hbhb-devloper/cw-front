<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect v-model="queryParams.unitId" :options="deptOptions" placeholder="请选择单位" />
      </el-form-item>
      <el-form-item label="项目类型" prop="projectItem">
        <el-input
          placeholder="请输入项目类型"
          v-model="queryParams.projectItem"
          size="small"
        />
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker v-model="queryParams.year" type="year" placeholder="选择年" format="yyyy"></el-date-picker>
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
          v-hasPermi="['budget:monthCheck:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          :disabled="true"
          v-hasPermi="['budget:monthCheck:import']"
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
    >
      <el-table-column prop="lineNumber" label="序号" align="center"  width="50"></el-table-column>
      <el-table-column prop="budgetItem" label="项目类型" align="center"  width="170"></el-table-column>
      <el-table-column prop="nowBudgetBalance" align="center" label="本年预算值"></el-table-column>
      <el-table-column prop="afterAdjustmentValue" align="center" label="本期调整后完成值"></el-table-column>
      <el-table-column prop="beforeCompletionValue" align="center" label="调整前累计完成值"></el-table-column>
      <el-table-column prop="afterCompletionValue" align="center" label="调整后累计完成值"></el-table-column>
      <el-table-column prop="adjustmentValue" align="center" label="调整值"></el-table-column>
      <el-table-column prop="completionRatio" align="center" label="累计完成比例"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="centerDialogVisible" width="500px">
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>

      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { updateBudget } from "@/api/budget/decompose/decompose";
import { exportData } from "@/utils/export";
import { getToken } from "@/utils/auth";

import { listMonth } from "@/api/budget/assessment";
export default {
  components: { Treeselect },
  data() {
    return {
      loading:true,
      fileList: [],
      queryParams: {
        unitId: undefined,
        year: undefined
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
        remarks: ""
      },
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      ActionUrl: process.env.VUE_APP_BASE_API + "/budget/import", // 上传的图片服务器地址
      morenUnit:undefined
    };
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleSuccess(res) {
      this.fileList = [];
      this.centerDialogVisible = false;
      this.getList();
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listMonth(this.queryParams).then(response => {
        this.tableData = response;
        // this.total = response.count;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then(response => {
        that.deptOptions = response.list;
        that.queryParams.unitId = response.checked;
        that.morenUnit = response.checked;
        that.getList();
      });
    },
    handleQuery() {
      if (this.queryParams.year) {
        this.queryParams.date = this.queryParams.year.getFullYear();
      }
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
    },
    // 表单重置
    reset() {
      this.form = {
        itemName: undefined,
        company: undefined,
        oldValue: undefined,
        newValue: undefined,
        difValue: undefined,
        remark: undefined
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
    submitForm: function() {
      updateBudget(this.form)
        .then(response => {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        })
        .catch(err => {
          this.msgError(err.message);
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //提交
    handleSubmit() {
      this.centerDialogVisible = false;
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出该部门的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportData(
            getToken(),
            queryParams,
            "/budget/export",
            "月度考核情况"
          );
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
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
/deep/ .el-table__row--level-0{
  background: #f5f7fa;
}
</style>
