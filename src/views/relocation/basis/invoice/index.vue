<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="金额范围" prop="amountFrom">
          <el-input
            v-model="queryParams.amountFrom"
            placeholder="请输入金额范围"
            clearable
            size="small"
            type="number"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="至" prop="amountTo" label-width="25px">
          <el-input
            v-model="queryParams.amountTo"
            placeholder="请输入金额范围"
            clearable
            size="small"
            type="number"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="开票时间" prop="invoiceTimeFrom">
          <el-date-picker
            v-model="queryParams.invoiceTimeFrom"
            type="date"
            placeholder="选择开票时间"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="invoiceTimeTo" label-width="25px">
          <el-date-picker
            v-model="queryParams.invoiceTimeTo"
            type="date"
            placeholder="选择开票时间"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="县市" prop="unitId">
          <treeselect
            v-model="queryParams.unitId"
            :options="deptOptions"
            placeholder="请选择县市"
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible = true"
          >导入</el-button
        >
      </el-col>
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

    <el-table v-loading="loading" :data="typeList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="序号" prop="id" align="center" /> -->
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <!-- <el-table-column label="类型名称" prop="flowTypeName" width="150" align="center" /> -->
      <el-table-column
        label="类别"
        prop="category"
        width="150"
        align="center"
      />
      <el-table-column
        label="经办单位"
        prop="unit"
        width="150"
        align="center"
      />
      <el-table-column
        label="迁改收款责任人"
        prop="applicant"
        width="150"
        align="center"
      />
      <el-table-column
        label="供应商"
        prop="supplier"
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
        label="合同名称"
        prop="contractName"
        width="150"
        align="center"
      />
      <el-table-column
        label="起始时间"
        prop="startTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同截止时间"
        prop="contractDeadline"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同金额"
        prop="contractAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="开票日期"
        prop="invoiceTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="发票号码"
        prop="invoiceNumber"
        width="170"
        align="center"
      />
      <el-table-column
        label="发票类型"
        prop="invoiceType"
        width="150"
        align="center"
      />
      <el-table-column label="价款" prop="amount" width="150" align="center" />
      <el-table-column
        label="税额"
        prop="taxAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="价税合计"
        prop="taxIncludeAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="工程名"
        prop="constructionName"
        width="350"
        align="center"
      />
      <el-table-column
        label="账龄分类"
        prop="amountType"
        width="150"
        align="center"
      />
      <el-table-column
        label="账龄（月）"
        prop="aging"
        width="150"
        align="center"
      />
      <el-table-column
        label="收款情况"
        prop="isReceived"
        width="150"
        align="center"
      />
      <el-table-column
        label="应收"
        prop="receivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="已收"
        prop="received"
        width="150"
        align="center"
      />
      <el-table-column
        label="未收"
        prop="unreceived"
        width="150"
        align="center"
      />
      <el-table-column label="备注" prop="remake" width="150" align="center" />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别" prop="category">
              <el-input v-model="form.category" placeholder="请输入类别" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"></el-col> -->
          <el-col :span="12">
            <el-form-item label="经办单位" prop="unit">
              <treeselect
                v-model="form.unit"
                :options="deptOptions"
                placeholder="请选择经办单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="迁改收款责任人" prop="applicant">
              <el-input
                v-model="form.applicant"
                placeholder="请输入迁改收款责任人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商" prop="supplier">
              <el-input v-model="form.supplier" placeholder="请输入供应商" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNum">
              <el-input
                v-model="form.contractNum"
                placeholder="选择合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称" prop="contractName">
              <el-input
                v-model="form.contractName"
                placeholder="选择合同名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同起始时间" prop="startTime">
              <el-date-picker
                v-model="form.startTime"
                type="date"
                placeholder="请输入合同起始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同截止时间" prop="contractDeadline">
              <el-date-picker
                v-model="form.contractDeadline"
                type="date"
                placeholder="请输入开票日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input
                v-model="form.contractAmount"
                placeholder="请输入合同金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期" prop="invoiceTime">
              <el-date-picker
                v-model="form.invoiceTime"
                type="date"
                placeholder="请输入开票日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票号码" prop="invoiceNumber">
              <el-input
                v-model="form.invoiceNumber"
                placeholder="请输入发票号码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="invoiceType">
              <el-select
                v-model="form.invoiceType"
                placeholder="请选择发票类型"
                clearable
                style="width: 220px"
              >
                <el-option
                  v-for="(item, index) in invoiceTypeOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价款" prop="amount">
              <el-input
                v-model="form.amount"
                type="number"
                placeholder="请输入价款"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税额" prop="taxAmount">
              <el-input
                v-model="form.taxAmount"
                type="number"
                placeholder="请输入税额"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="价税合计" prop="taxIncludeAmount">
              <el-input
                v-model="form.taxIncludeAmount"
                type="number"
                placeholder="请输入价税合计"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程名" prop="constructionName">
              <el-input
                v-model="form.constructionName"
                placeholder="请输入工程名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账龄分类" prop="amountType">
              <el-input
                v-model="form.amountType"
                placeholder="请输入账龄分类"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账龄（月）" prop="aging">
              <el-input
                v-model="form.aging"
                type="number"
                placeholder="请输入账龄"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款情况" prop="isReceived">
              <el-input
                v-model="form.isReceived"
                placeholder="请输入收款情况"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应收" prop="receivable">
              <el-input
                v-model="form.receivable"
                type="number"
                placeholder="请输入应收"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已收" prop="received">
              <el-input
                v-model="form.received"
                type="number"
                placeholder="请输入已收"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="未收" prop="unreceived">
              <el-input
                v-model="form.unreceived"
                type="number"
                placeholder="请输入未收"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remake">
              <el-input v-model="form.remake" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入" :visible.sync="centerDialogVisible" width="700px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="downTemplate">
          <i class="el-icon-download"></i>下载导入模板
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
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table :data="codeMsgList">
        <el-table-column label="错误信息" prop="codeMsg" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  listInvoice,
  addInvoice,
  updateInvoice,
  delarr,
  exportTemplate,
  getInvoice,
} from "@/api/relocation/basis/invoice.js";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
import { prefix } from "@/api/relocation/relocation";
import { exportData1 } from "@/utils/export";
export default {
  name: "Flowtype",
  components: { Treeselect },
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
        pageNum: 1,
        pageSize: 10,
        flowTypeName: undefined,
      },
      // 表单参数
      form: {
        businessType: "财务开票",
        taxAmount: 0,
        amount: 0,
        taxRate: 0,
        taxIncludeAmount: 0,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        category: [
          { required: true, message: "类别不能为空", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "经办单位不能为空", trigger: "blur" },
        ],
        applicant: [
          {
            required: true,
            message: "迁改收款责任人不能为空",
            trigger: "blur",
          },
        ],
        supplier: [
          { required: true, message: "供应商不能为空", trigger: "blur" },
        ],
        contractNum: [
          { required: true, message: "合同编号不能为空", trigger: "blur" },
        ],
        contractName: [
          { required: true, message: "合同名称不能为空", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "起始时间不能为空", trigger: "blur" },
        ],
        contractDeadline: [
          { required: true, message: "合同截止时间不能为空", trigger: "blur" },
        ],
        contractAmount: [
          { required: true, message: "合同金额不能为空", trigger: "blur" },
        ],
        invoiceTime: [
          { required: true, message: "开票日期不能为空", trigger: "blur" },
        ],
        invoiceNumber: [
          { required: true, message: "发票号码不能为空", trigger: "blur" },
        ],
        invoiceType: [
          { required: true, message: "发票类型不能为空", trigger: "blur" },
        ],
        amount: [{ required: true, message: "价款不能为空", trigger: "blur" }],
        taxAmount: [
          { required: true, message: "税额不能为空", trigger: "blur" },
        ],
        taxIncludeAmount: [
          { required: true, message: "价税合计不能为空", trigger: "blur" },
        ],
        amountType: [
          { required: true, message: "账龄分类不能为空", trigger: "blur" },
        ],
        aging: [
          {
            required: true,
            message: "账龄不能为空",
            trigger: "blur",
          },
        ],
        isReceived: [
          { required: true, message: "收款情况不能为空", trigger: "blur" },
        ],
        receivable: [
          { required: true, message: "应收不能为空", trigger: "blur" },
        ],
        received: [
          { required: true, message: "已收不能为空", trigger: "blur" },
        ],
        unreceived: [
          { required: true, message: "未收不能为空", trigger: "blur" },
        ],
      },
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
      deptOptions: [],
      morenUnit: undefined,
      centerDialogVisible: false,
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/invoice/import`, // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      invoiceTypeOption: [],
      errorMessage: [],
      codeMsgList: [],
    };
  },
  watch: {
    // form: {
    //   handler: function (val) {
    //     this.form.taxAmount = val.amount * val.taxRate;
    //     this.form.taxIncludeAmount = Number(val.amount) + Number(val.taxAmount);
    //   },
    //   deep: true,
    // },
  },
  created() {
    // this.getList();
    // this.getTreeselect();
    this.getDicts("relocation", "invoice_type").then((response) => {
      this.invoiceTypeOption = response;

      this.getTreeselect();
    });
  },
  methods: {
    downTemplate() {
      exportData1(
        getToken(),
        "",
        `${prefix}/invoice/exportTemplate`,
        "发票管理"
      );
    },
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
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
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      this.fileList = [];
      this.loadingoption.close();
      this.centerDialogVisible = false;
      if (res.code == "00000") {
        this.$message.success("导入成功");
        this.getList();
      } else if (res.code == "80898") {
        res.message = res.message.substr(1, res.message.length - 2);
        this.errorMessage = res.message.split(",");
        for (let i in this.errorMessage) {
          var j = {};
          j.codeMsg = this.errorMessage[i];
          this.codeMsgList.push(j);
        }
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
      listInvoice(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.totalRow;
        this.loading = false;
      });
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
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        businessType: "财务开票",
        taxAmount: 0,
        amount: 0,
        taxRate: 0,
        taxIncludeAmount: 0,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.data = [];
      this.resetForm("queryForm");
      this.handleQuery();
      this.queryParams.unitId = this.morenUnit;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加发票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const InvoiceId = row.id || this.ids;
      getInvoice(InvoiceId).then((response) => {
        this.form = response;
        this.open = true;
        this.title = "修改发票";
      });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.remake = this.form.remake.replace(/\;/g, "；");
          console.log("this.form.remake", this.form.remake);
          if (this.form.id != undefined) {
            updateInvoice(this.form)
              .then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          } else {
            addInvoice(this.form)
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
          return delarr(typeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm("是否确认导出发票管理的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/invoice/export`,
            "发票管理"
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
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.el-col-12 {
  height: 59px;
}
</style>