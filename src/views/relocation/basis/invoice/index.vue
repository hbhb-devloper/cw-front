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
        label="地区"
        prop="district"
        width="150"
        align="center"
      />
      <el-table-column label="县市" prop="unit" width="150" align="center" />
      <el-table-column
        label="发票代码"
        prop="invoiceCode"
        width="150"
        align="center"
      />
      <el-table-column
        label="发票号码"
        prop="invoiceNumber"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="开票点"
                       prop="invoiceSite"
                       width="150"
                       align="center" /> -->
      <el-table-column
        label="业务类型"
        prop="businessType"
        width="150"
        align="center"
      />
      <el-table-column
        label="发票类型"
        prop="invoiceType"
        width="150"
        align="center"
      />
      <el-table-column
        label="购方税号"
        prop="buyerTax"
        width="150"
        align="center"
      />
      <el-table-column
        label="购方名称"
        prop="buyerName"
        width="150"
        align="center"
      />
      <el-table-column
        label="开票项目"
        prop="invoiceProject"
        width="150"
        align="center"
      />
      <el-table-column
        label="开票日期"
        prop="invoiceTime"
        width="170"
        align="center"
      />
      <el-table-column label="金额" prop="amount" width="150" align="center" />
      <el-table-column label="税率" prop="taxRate" width="150" align="center" />
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
        label="备注格式：合同号；区县；款项性质；项目信息"
        prop="remake"
        width="350"
        align="center"
      />
      <el-table-column
        label="申请人"
        prop="applicant"
        width="150"
        align="center"
      />
      <el-table-column
        label="开票人"
        prop="issuer"
        width="150"
        align="center"
      />
      <el-table-column
        label="票据状态"
        prop="state"
        width="150"
        align="center"
      />
      <el-table-column
        label="是否为自定义菜单开票"
        prop="isImport"
        width="150"
        align="center"
      />
      <el-table-column
        label="客户经理"
        prop="manager"
        width="150"
        align="center"
      />
      <el-table-column
        label="描述"
        prop="describe"
        width="150"
        align="center"
      />
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
            <el-form-item label="地区" prop="district">
              <treeselect
                v-model="form.district"
                :options="deptOptions"
                placeholder="请选择地区"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"></el-col> -->
          <el-col :span="12">
            <el-form-item label="县市" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="请选择县市"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票代码" prop="invoiceCode">
              <el-input
                v-model="form.invoiceCode"
                placeholder="请输入发票代码"
              />
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
          <!-- <el-col :span="12">
            <el-form-item label="开票点" prop="invoiceSite">
              <el-date-picker v-model="form.invoiceSite" type="date" placeholder="选择开票点"></el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="业务类型" prop="businessType">
              <el-input
                v-model="form.businessType"
                placeholder="选择业务类型"
              ></el-input>
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
                <el-option :key="0" label="增值税专用发票" :value="0" />
                <el-option :key="1" label="增值税普通发票" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方税号" prop="buyerTax">
              <el-input v-model="form.buyerTax" placeholder="请输入购方税号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方名称" prop="buyerName">
              <el-input v-model="form.buyerName" placeholder="请输入购方名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票项目" prop="invoiceProject">
              <el-input
                v-model="form.invoiceProject"
                placeholder="请输入开票项目"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期" prop="invoiceTime">
              <el-date-picker
                v-model="form.invoiceTime"
                type="date"
                placeholder="请输入开票日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="amount">
              <el-input
                v-model="form.amount"
                type="number"
                placeholder="请输入金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率" prop="taxRate">
              <el-input
                v-model="form.taxRate"
                type="number"
                placeholder="请输入税率"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税额" prop="taxAmount">
              <el-input
                v-model="form.taxAmount"
                disabled
                placeholder="请输入税额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价税合计" prop="taxIncludeAmount">
              <el-input
                v-model="form.taxIncludeAmount"
                disabled
                placeholder="请输入价税合计"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="申请人" prop="applicant">
              <el-input v-model="form.applicant" placeholder="请输入申请人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票人" prop="issuer">
              <el-input v-model="form.issuer" placeholder="请输入开票人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="票据状态" prop="state">
              <el-select
                v-model="form.state"
                placeholder="请选择票据状态"
                clearable
                style="width: 220px"
              >
                <el-option :key="1" label="蓝字" :value="1" />
                <el-option :key="0" label="红字" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为自定义菜单开票" prop="isImport">
              <el-select
                v-model="form.isImport"
                placeholder="请选择是否为自定义菜单开票"
                clearable
                style="width: 220px"
              >
                <el-option :key="1" label="是" :value="1" />
                <el-option :key="0" label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="备注格式：合同号；区县；款项性质；项目信息"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入备注格式：合同号；区县；款项性质；项目信息"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述" prop="describe">
              <el-input v-model="form.describe" placeholder="请输入描述" />
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
        flowTypeName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
        invoiceCode: [
          { required: true, message: "发票代码不能为空", trigger: "blur" },
        ],
        invoiceNumber: [
          { required: true, message: "发票号码不能为空", trigger: "blur" },
        ],
        invoiceType: [
          { required: true, message: "发票类型不能为空", trigger: "blur" },
        ],
        buyerTax: [
          { required: true, message: "购方税号不能为空", trigger: "blur" },
        ],
        buyerName: [
          { required: true, message: "购方名称不能为空", trigger: "blur" },
        ],
        invoiceProject: [
          { required: true, message: "开票项目不能为空", trigger: "blur" },
        ],
        invoiceTime: [
          { required: true, message: "开票日期不能为空", trigger: "blur" },
        ],
        amount: [{ required: true, message: "金额不能为空", trigger: "blur" }],
        taxRate: [{ required: true, message: "税率不能为空", trigger: "blur" }],
        taxAmount: [
          { required: true, message: "税额不能为空", trigger: "blur" },
        ],
        taxIncludeAmount: [
          { required: true, message: "价税合计不能为空", trigger: "blur" },
        ],
        applicant: [
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
        issuer: [
          { required: true, message: "开票人不能为空", trigger: "blur" },
        ],
        state: [
          { required: true, message: "票据状态不能为空", trigger: "blur" },
        ],
        isImport: [
          {
            required: true,
            message: "是否为自定义菜单开票不能为空",
            trigger: "blur",
          },
        ],
        remake: [{ required: true, message: "备注不能为空", trigger: "blur" }],
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
    form: {
      handler: function (val) {
        this.form.taxAmount = val.amount * val.taxRate;
        this.form.taxIncludeAmount = Number(val.amount) + Number(val.taxAmount);
      },
      deep: true,
    },
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
        `${prefix}/invoice/export/template`,
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