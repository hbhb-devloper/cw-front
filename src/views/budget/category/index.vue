
<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="年限" prop="importDate">
        <el-date-picker
          v-model="queryParams.importDate"
          type="year"
          placeholder="选择年"
          format="yyyy"
          value-format="yyyy"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目类别名称" prop="projectItem">
        <el-input
          v-model="queryParams.projectItem"
          placeholder="请输入项目类别名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd('unit')">新增科目</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd('item')">新增类型</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible=true"
          v-if="false"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-if="false"
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
    >
      <el-table-column prop="label" label="项目名称"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click.stop="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click.stop="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item
          label="预算编号"
          prop="budgetNum"
          v-if="addtype!='unit'"
          :rules="[
               { validator: checkData, trigger: 'blur'}
             ]"
        >
          <el-input placeholder="请输入预算编号" v-model="form.budgetNum" clearable size="small" />
        </el-form-item>
        <el-form-item label="项目名称" prop="label">
          <el-input placeholder="请输入项目名称" v-model="form.label" clearable size="small" />
        </el-form-item>
        <el-form-item label="预算科目" prop="budgetItemId" v-if="addtype!='unit'">
          <treeselect v-model="form.budgetItemId" :options="proOptions" placeholder="请选择预算科目" />
        </el-form-item>
        <el-form-item label="金额阀值" prop="threshold" v-if="addtype!='unit'">
          <el-input
            placeholder="请输入金额阀值"
            type="number"
            v-model="form.threshold"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="导入年限" prop="importDate" v-if="addtype!='unit'">
          <el-date-picker
            v-model="form.importDate"
            type="year"
            placeholder="选择年"
            format="yyyy"
            value-format="yyyy"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="remark" v-if="addtype!='unit'">
          <el-input placeholder="请输入备注" v-model="form.remark" clearable size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

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
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { DeptList } from "@/api/system/dept";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  listBudget,
  updateBudget,
  BudgetExport,
} from "@/api/budget/decompose/decompose";
import { getTree } from "@/api/budget/protypement/protypement";
import {
  AddBudget,
  AddBudgetItem,
  PutBudgetItem,
  PutBudget,
  GetBudget,
  DelBudgetItem,
  DelBudget,
  GetBudgetProject,
} from "@/api/budget/category";

export default {
  components: { Treeselect },
  data() {
    return {
      fileList: [],
      queryParams: {
        importDate: undefined,
        projectItem: undefined,
      },
      typeValue: "",
      unitId: undefined,
      tableData: [],
      city: "",
      year: "",
      centerDialogVisible: false,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      ActionUrl: process.env.VUE_APP_BASE_API + "/budget/import", // 上传的图片服务器地址
      // 部门树选项
      deptOptions: undefined,
      proOptions: undefined,
      addtype: "",
    };
  },
  created() {
    this.getList();
    this.getTreeselect();
  },
  methods: {
    checkData(rule, value, callback) {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error("预算编号不能输入汉字!"));
        } else {
          callback();
        }
      }
      callback();
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getList() {
      let that = this;
      getTree(this.queryParams).then((response) => {
        that.tableData = response;
      });
    },
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
      });
      GetBudgetProject().then((response) => {
        that.proOptions = response;
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
      this.handleQuery();
    },
    // 表单重置
    reset() {
      this.form = {
        itemName: undefined,
        budgetNum: undefined,
        balance: undefined,
        lastYearBalance: undefined,
        threshold: undefined,
        underUnitId: undefined,
        remark: undefined,
        budgetItemId: undefined,
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd(type) {
      this.reset();
      this.addtype = type;
      this.getList();
      this.getTreeselect();
      this.open = true;
      if (type == "item") {
        this.title = "添加项目类别";
      } else {
        this.title = "添加科目类别";
      }
    },
    //修改
    handleEdit(row) {
      this.reset();
      if (row.isParent) {
        this.addtype = "unit";
      } else {
        this.addtype = "item";
      }
      if (this.addtype == "unit") {
        this.form = JSON.parse(JSON.stringify(row));
        this.open = true;
        this.title = "预算科目调整";
      } else {
        GetBudget(row.id).then((response) => {
          this.form = response;
          this.open = true;
          this.title = "预算调整";
        });
      }
    },
    handleDelete(row) {
      this.$confirm(
        '是否确认删除项目名称为"' + row.label + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        if (row.isParent) {
          DelBudgetItem(row.id).then((response) => {
            this.msgSuccess("删除成功");
            this.getList();
          });
        } else {
          DelBudget(row.id).then((response) => {
            this.msgSuccess("删除成功");
            this.getList();
          });
        }
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      let that = this;
      if (this.form.id == undefined) {
        this.form.itemName = this.form.label;
        if (this.addtype == "unit") {
          AddBudgetItem(this.form)
            .then((response) => {
              this.msgSuccess("新增成功");
              that.open = false;
              that.getList();
            })
            .catch((err) => {
              this.msgError(err.message);
            });
        } else {
          this.form.projectItem = this.form.label;
          AddBudget(this.form)
            .then((response) => {
              this.msgSuccess("新增成功");
              that.open = false;
              that.getList();
            })
            .catch((err) => {
              this.msgError(err.message);
            });
        }
      } else {
        if (this.addtype == "unit") {
          this.form.itemName = this.form.label;
          PutBudgetItem(this.form)
            .then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              that.getList();
            })
            .catch((err) => {
              this.msgError(err.message);
            });
        } else {
          this.form.projectItem = this.form.label;
          PutBudget(this.form)
            .then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              that.getList();
            })
            .catch((err) => {
              this.msgError(err.message);
            });
        }
      }
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
    handleNodeClick(data) {
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出该部门的数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return BudgetExport(queryParams);
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
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  width: 120px !important;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 120px !important;
}
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
</style>
