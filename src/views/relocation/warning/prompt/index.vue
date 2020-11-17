<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="未全额回款合同历时" prop="contractDuration">
          <el-input
            v-model="queryParams.contractDuration"
            placeholder="请输入未全额回款合同历时"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNum">
          <el-input
            v-model="queryParams.contractNum"
            placeholder="请输入合同编号"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNum">
          <el-input
            v-model="queryParams.projectNum"
            placeholder="请输入项目编号"
            clearable
            size="small"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>

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

    <el-table
      v-loading="loading"
      :data="typeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="项目编号"
        prop="projectNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="区市"
        prop="unitName"
        width="150"
        align="center"
      />
      <el-table-column
        label="施工单位"
        prop="constructionUnit"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="工程单位" prop="flowTypeName" width="150" align="center" /> -->
      <el-table-column
        label="对方单位"
        prop="oppositeUnit"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同编号"
        prop="contractNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="预付款到账金额（元）"
        prop="anticipatePayment"
        width="150"
        align="center"
      />
      <el-table-column
        label="是否已经收款"
        prop="isReceived"
        width="150"
        align="center"
      />
      <el-table-column
        label="决算款到账金额（元）（注：决算款不包含预算款）"
        prop="finalPayment"
        width="150"
        align="center"
      />
      <el-table-column
        label="未全款回款合同历时"
        prop="contractDuration"
        width="150"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-upload2"
            @click="handleDelete(scope.row)"
            >上传附件</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listWarn } from "@/api/relocation/warning/prompt.js";
import { prefix } from '@/api/relocation/relocation'

import { exportData1 } from "@/utils/export";
import { getToken } from "@/utils/auth";
export default {
  name: "Flowtype",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        flowTypeName: undefined,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        flowTypeName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
        sortNum: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listWarn(this.queryParams).then((response) => {
        this.typeList = response;
        // this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        flowTypeName: undefined,
        sortNum: 0,
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.data = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加类型";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const typeId = row.id || this.ids;
      //   getRole(typeId).then(response => {
      this.form = row;
      this.open = true;
      this.title = "修改类型";
      //   });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateType(this.form)
              .then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          } else {
            addType(this.form)
              .then((response) => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出提示信息的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/warn/export`,
            "提示信息"
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const typeIds = row.id;
      this.$confirm(
        '是否确认删除流程类型名称为"' + row.flowTypeName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delFlowType(typeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
  },
};
</script>
<style scoped>
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 12px;
}
.el-dialog .el-form-item {
  display: flex;
  align-items: center;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 220px;
}
body .el-table /deep/ th.gutter {
  display: table-cell !important;
}

body .el-table /deep/ colgroup.gutter {
  display: table-cell !important;
}
</style>