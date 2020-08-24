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
      <el-form-item label="年份" prop="importr">
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
          v-hasPermi="['budget:history:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['budget:history:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="budgetId"
      :border="false"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren1'}"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      header-cell-class-name="is-center"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column prop="budgetName" label="项目类型" width="380"></el-table-column>
      <!-- <el-table-column prop="company" label="计量单位" align="center" width="180"></el-table-column> -->
      <el-table-column prop="oldValue" align="center" label="调整前预算值(万元)"></el-table-column>
      <el-table-column prop="newValue" align="center" label="调整后预算值(万元)"></el-table-column>
      <el-table-column prop="difValue" align="center" label="差额(万元)"></el-table-column>
      <!-- <el-table-column prop="threshold" align="center" label="金额阀值(万元)"></el-table-column> -->
      <!-- <el-table-column prop="createTime" align="center" label="调整时间"></el-table-column> -->
      <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" v-if="!scope.row.hasChildren" v-hasPermi="['budget:history:edit']" >调整</el-button>
        </template>
      </el-table-column>
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
        <el-form-item label="预算科目：" prop="budgetName">
          <el-input placeholder="请输入关键词" v-model="form.budgetName" disabled clearable size="small" />
        </el-form-item>
        <!-- <el-form-item label="计量单位：" prop="company">
          <el-input placeholder="请输入关键词" v-model="form.company" disabled clearable size="small" />
        </el-form-item>-->
        <el-form-item label="调整前预算值：" prop="oldValue">
          <el-input
            placeholder="请输入调整前预算值"
            v-model="form.oldValue"
            disabled
            clearable
            size="small"
          />
        </el-form-item>

        <el-form-item label="调整后预算值：" prop="newValue">
          <el-input
            placeholder="请输入调整后预算值"
            v-model="form.newValue"
            clearable
            disabled
            size="small"
            type="number"
          />
        </el-form-item>
        <el-form-item label="差额：" prop="difValue">
          <el-input placeholder="请输入差额：" v-model="form.difValue" clearable disabled size="small" />
        </el-form-item>
        <el-form-item label="金额阀值" prop="threshold">
          <el-input
            placeholder="请输入金额阀值"
            v-model="form.threshold"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input placeholder="请输入备注" v-model="form.remark" clearable size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="centerDialogVisible" width="500px">
      <el-date-picker
        class="uploadCss"
        v-model="uploadData.importDate"
        type="year"
        placeholder="选择年份(默认当前年份)"
        format="yyyy"
        value-format="yyyy"
      ></el-date-picker>
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
import { getBudget } from "@/api/budget/metaphase";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { updateBudget } from "@/api/budget/decompose/decompose";
import { exportData } from "@/utils/export";
import { getToken } from "@/utils/auth";
export default {
  components: { Treeselect },
  data() {
    return {
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      loading: true,
      queryParams: {
        unitId: undefined,
        year: undefined,
      },
      uploadData: {},
      importDate: "",
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
      deptOptions: undefined,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      ActionUrl: process.env.VUE_APP_BASE_API + "/budget/history/import", // 上传的图片服务器地址
      morenUnit: undefined,
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    deepClone(obj) {
      let result = typeof obj.splice === "function" ? [] : {};
      if (obj && typeof obj === "object") {
        for (let key in obj) {
          if (obj[key] && typeof obj[key] === "object") {
            result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
          } else {
            result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
          }
        }
        return result;
      }
      return obj;
    },
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
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message.error(res.message);
      }

    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      getBudget(this.queryParams).then((response) => {
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
        balance: undefined,
        id: undefined,
      };
      this.resetForm("form");
    },
    //修改
    handleEdit(row) {
      this.reset();
      // const budgetId = row.budgetId || this.ids;
      // getRole(budgetId).then(response => {
      this.form = this.deepClone(row);
      this.open = true;
      this.title = "中期预算调整";
      // });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.form.balance = this.form.newValue;
      this.form.id = this.form.budgetId;
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
      console.log("queryParams", queryParams);
      this.$confirm("是否确认导出所有中期预算数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          console.log("queryParams", queryParams);
          return exportData(
            getToken(),
            queryParams,
            "/budget/history/export",
            "中期预算调整"
          );
          // exportRole(queryParams);
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
/deep/ .el-table__row--level-0{
  background: #f5f7fa;
}
</style>
