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
        class-name="small-padding fixed-width"
        width="200"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="openview(scope.row)" icon="el-icon-folder"
            >查看附件</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-upload2"
            @click="handleImportant(scope.row)"
            >上传附件</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="上传附件"
      :visible.sync="centerDialogVisible"
      width="500px"
    >
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
        :data="importantData"
        :limit="1"
        :on-exceed="handleExceed"
        :action="ActionUrl"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-dialog>
    <el-dialog
      title="查看附件"
      :visible.sync="viewattachmentshow"
      width="500px"
    >
      <el-table :data="upFileList">
        <el-table-column
          label="文件名称"
          prop="fileName"
          width="150"
          align="center"
        />

        <el-table-column
          label="操作"
          align="center"
          width=""
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="viewattachment(scope.row)"
              >查看附件</el-button
            >

            <el-button
              size="mini"
              type="text"
              @click="handleDownload(scope.row)"
              >下载附件</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  listWarn,
  WarnAdd,
  warnfile,
} from "@/api/relocation/warning/prompt.js";
import { prefix } from "@/api/relocation/relocation";

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
      viewattachmentshow: false,
      centerDialogVisible: false,
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/warn/upload`, // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      importantData: {},
      upFileList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleDownload(row) {
      this.$confirm("是否下载" + row.fileName + "？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = row.filepath;
        link.download = row.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    openview(row) {
      this.viewattachmentshow = true;
      let obj = {
        warnId: row.id,
      };
      warnfile(obj)
        .then((res) => {
          this.upFileList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewattachment(row) {
      let obj = {
        warnId: row.id,
      };

      if (/.(pdf|PDF)$/.test(row)) {
        window.open(row.filepath);
      } else if (/.(zip|ZIP)$/.test(row)) {
        this.$message({
          showClose: true,
          message: "该文件格式无法预览",
          type: "error",
        });
      } else {
        window.open(
          "https://view.officeapps.live.com/op/view.aspx?src=" + row.filepath
        );
      }
    },
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在上传附件",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loadingoption = loading;
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      if (res.code == "00000") {
        let data = {
          warnId: this.importantData.warnId,
          fileId: res.data.id,
        };
        WarnAdd(data).then((response) => {
          this.fileList = [];
          this.loadingoption.close();
          this.centerDialogVisible = false;
          this.$message.success("文件上传成功");
          this.getList();
        });
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
    handleImportant(row) {
      this.importantData.warnId = row.id;
      this.centerDialogVisible = true;
    },
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