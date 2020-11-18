<template>
  <div class="app-container">
    <el-form :model="queryParams"
             ref="queryForm"
             :inline="true">
      <el-row>
        <el-form-item label="起始时间"
                      prop="startTimeFrom">
          <el-date-picker v-model="queryParams.startTimeFrom"
                          type="date"
                          placeholder="选择起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="至"
                      prop="startTimeTo"
                      label-width="25px">
          <el-date-picker v-model="queryParams.startTimeTo"
                          type="date"
                          placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同截止时间"
                      prop="contractDeadlineFrom">
          <el-date-picker v-model="queryParams.contractDeadlineFrom"
                          type="date"
                          placeholder="选择起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="至"
                      prop="contractDeadlineTo"
                      label-width="25px">
          <el-date-picker v-model="queryParams.contractDeadlineTo"
                          type="date"
                          placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号"
                      prop="contractNum">
          <el-input v-model="queryParams.contractNum"
                    placeholder="请输入合同编号"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="经办单位"
                      prop="unitId">
          <treeselect v-model="queryParams.unitId"
                      :options="deptOptions"
                      placeholder="请选择经办单位" />
        </el-form-item>
        <el-form-item label="合同名称"
                      prop="contractName">
          <el-input v-model="queryParams.contractName"
                    placeholder="请输入合同名称"
                    clearable
                    size="small"
                    style="width: 240px"
                    @keyup.enter.native="handleQuery" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     size="mini"
                     @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh"
                     size="mini"
                     @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row :gutter="10"
            class="mb8">
      <el-col :span="1.5">
        <el-button type="success"
                   icon="el-icon-download"
                   size="mini"
                   @click="centerDialogVisible = true">导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning"
                   icon="el-icon-download"
                   size="mini"
                   @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading"
              :data="typeList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="序号" prop="id" width="120" align="center" /> -->
      <el-table-column label="序号"
                       type="index"
                       align="center"
                       width="50">
      </el-table-column>
      <el-table-column label="类别"
                       prop="category"
                       width="150"
                       align="center" />
      <el-table-column label="经办单位"
                       prop="unit"
                       width="150"
                       align="center" />
      <el-table-column label="供应商"
                       prop="supplier"
                       width="150"
                       align="center" />
      <el-table-column label="合同编号"
                       prop="contractNum"
                       width="150"
                       align="center" />
      <el-table-column label="合同名称"
                       prop="contractName"
                       width="150"
                       align="center" />
      <el-table-column label="发票号码"
                       prop="invoiceNum"
                       width="150"
                       align="center" />
      <el-table-column label="起始时间"
                       prop="startTime"
                       width="150"
                       align="center" />
      <el-table-column label="合同截止时间"
                       prop="contractDeadline"
                       width="150"
                       align="center" />
      <el-table-column label="合同金额"
                       prop="contractAmount"
                       width="150"
                       align="center" />
      <el-table-column label="开票日期"
                       prop="invoiceTime"
                       width="150"
                       align="center" />
      <el-table-column label="发票类型"
                       prop="invoiceType"
                       width="150"
                       align="center" />
      <el-table-column label="价款"
                       prop="amount"
                       width="150"
                       align="center" />
      <el-table-column label="税额"
                       prop="tax"
                       width="150"
                       align="center" />
      <el-table-column label="价税合计"
                       prop="taxIncludeAmount"
                       width="150"
                       align="center" />
      <el-table-column label="工程名"
                       prop="constructionName"
                       width="150"
                       align="center" />
      <el-table-column label="收款情况"
                       prop="isReceived"
                       width="150"
                       align="center" />
      <el-table-column label="账龄"
                       prop="aging"
                       width="150"
                       align="center" />
      <el-table-column label="应收"
                       prop="receivable"
                       width="150"
                       align="center" />
      <el-table-column label="已收"
                       prop="received"
                       width="150"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="Showproject(scope.row, 0)">{{ scope.row.received }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="未收"
                       prop="unreceived"
                       width="150"
                       align="center" />
      <el-table-column label="款项类型"
                       prop="paymentType"
                       width="150"
                       align="center" />
      <el-table-column label="当月收款金额"
                       prop="monthAmount"
                       width="150"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="Showproject(scope.row, 1)">{{ scope.row.monthAmount }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="150"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleAdd(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList" />
    <el-dialog title="导入"
               :visible.sync="centerDialogVisible"
               width="500px">
      <!-- <div style="margin-bottom: 10px">
        <el-button type="primary" @click="downTemplate">
          <i class="el-icon-download"></i>下载导入模板
        </el-button>
      </div> -->
      <el-upload class="upload-demo"
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
                 :file-list="fileList">
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </el-upload>
    </el-dialog>
    <el-dialog :title="title"
               :visible.sync="open"
               width="600px">
      <el-table v-loading="loading1"
                :data="IncomeDetailList">
        <el-table-column label="本次收款金额"
                         prop="amount"
                         align="center"
                         width="150">
        </el-table-column>
        <el-table-column label="收款月份"
                         prop="payMonth"
                         align="payMonth"
                         width="150">
        </el-table-column>
        <el-table-column label="收款人"
                         prop="payee"
                         align="payee"
                         width="150">
        </el-table-column>
        <el-table-column label="收款单号"
                         prop="receiptNum"
                         align="receiptNum"
                         width="150">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title"
               :visible.sync="open1"
               width="500px">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="120px">
        <el-form-item label="本次收款金额"
                      prop="amount">
          <el-input v-model="form.amount"
                    placeholder="请输入类型名称" />
        </el-form-item>
        <el-form-item label="收款月份"
                      prop="payMonth">
          <el-date-picker v-model="form.payMonth"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月"
                          value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="收款人" prop="payee">
          <el-input v-model="form.payee" placeholder="请输入类型名称" />
        </el-form-item> -->
        <el-form-item label="收款单号"
                      prop="receiptNum">
          <el-input v-model="form.receiptNum"
                    placeholder="请输入类型名称" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listIncome,
  listIncomeDetail,
  addIncome,
} from "@/api/relocation/basis/receivables.js";
import { exportData1 } from "@/utils/export";
import { getToken } from "@/utils/auth";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { prefix } from '@/api/relocation/relocation'

export default {
  name: "Flowtype",
  components: { Treeselect },
  data () {
    return {
      morenUnit: undefined,
      deptOptions: [],
      // 遮罩层
      loading: true,
      loading1: false,
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
      open1: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        flowTypeName: undefined,
      },
      centerDialogVisible: false,
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
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/income/import`, // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      IncomeDetailList: [],
    };
  },
  created () {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    Showproject (row, isNeed) {
      this.open = true;
      this.loading1 = true;
      listIncomeDetail(row.id, isNeed).then((res) => {
        this.loading1 = false;
        this.IncomeDetailList = res;
      });
    },
    handleAdd (row) {
      this.reset();
      this.form.incomeId = row.id;
      this.title = "添加收款";
      this.open1 = true;
    },
    /** 提交按钮 */
    submitForm: function () {
      addIncome(this.form)
        .then((response) => {
          this.msgSuccess("新增成功");
          this.open1 = false;
          this.getList();
        })
        .catch((err) => {
          this.msgError(err.message);
        });
    },
    getTreeselect () {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked[0];
        that.queryParams.unitId = that.morenUnit;
        that.getList();
      });
    },
    handleupload () {
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loadingoption = loading;
    },
    handleFail () {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove (file, fileList) { },
    handlePreview (file) { },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess (res) {
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
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /** 查询角色列表 */
    getList () {
      this.loading = true;
      listIncome(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.totalRow;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.open1 = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        amount: undefined,
        payMonth: undefined,
        payee: undefined,
        receiptNum: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
      this.queryParams.unitId = this.morenUnit;
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;

      this.$confirm("是否确认导出收款管理的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/income/export`,
            "收款管理"
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () { });
    },
  },
};
</script>
<style scoped>
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
</style>