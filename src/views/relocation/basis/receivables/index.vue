<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="起始时间" prop="startTimeFrom">
          <el-date-picker
            v-model="queryParams.startTimeFrom"
            type="date"
            placeholder="选择起始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="startTimeTo" label-width="25px">
          <el-date-picker
            v-model="queryParams.startTimeTo"
            type="date"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合同截止时间" prop="contractDeadlineFrom">
          <el-date-picker
            v-model="queryParams.contractDeadlineFrom"
            type="date"
            placeholder="选择起始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="contractDeadlineTo" label-width="25px">
          <el-date-picker
            v-model="queryParams.contractDeadlineTo"
            type="date"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNum">
          <el-input
            v-model="queryParams.contractNum"
            placeholder="请输入合同编号"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="经办单位" prop="unitId">
          <treeselect
            v-model="queryParams.unitId"
            :options="deptOptions"
            placeholder="请选择经办单位"
          />
        </el-form-item>
        <el-form-item label="合同名称" prop="contractName">
          <el-input
            v-model="queryParams.contractName"
            placeholder="请输入合同名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
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
      <!-- <el-table-column label="序号" prop="id" width="120" align="center" /> -->
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column label="类别" prop="category" width="150" align="center" />
      <el-table-column label="经办单位" prop="unit" width="150" align="center" />
      <el-table-column label="供应商" prop="supplier" width="150" align="center" />
      <el-table-column label="合同编号" prop="contractNum" width="150" align="center" />
      <el-table-column label="合同名称" prop="contractName" width="150" align="center" />
      <el-table-column label="发票号码" prop="invoiceNum" width="150" align="center">
        <template slot-scope="scope">
          <div
            style="color: #409eff; cursor: pointer"
            @click="gotoInvoiceDetail(scope.row)"
          >
            {{ scope.row.invoiceNum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="起始时间" prop="startTime" width="150" align="center" />
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
      <el-table-column label="开票日期" prop="invoiceTime" width="150" align="center" />
      <el-table-column label="发票类型" prop="invoiceType" width="150" align="center" />
      <el-table-column label="价款" prop="amount" width="150" align="center" />
      <el-table-column label="税额" prop="tax" width="150" align="center" />
      <el-table-column
        label="价税合计"
        prop="taxIncludeAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="工程名"
        prop="constructionName"
        width="150"
        align="center"
      />
      <el-table-column label="收款情况" prop="isReceived" width="150" align="center" />
      <el-table-column label="账龄" prop="aging" width="150" align="center" />
      <el-table-column label="应收" prop="receivable" width="150" align="center" />
      <el-table-column label="已收" prop="received" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="Showproject(scope.row, 0)"
            >{{ scope.row.received }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="未收" prop="unreceived" width="150" align="center" />
      <el-table-column label="款项类型" prop="paymentType" width="150" align="center" />
      <el-table-column label="当月收款金额" prop="monthAmount" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="Showproject(scope.row, 1)"
            >{{ scope.row.monthAmount }}
          </el-button>
        </template>
      </el-table-column>

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
            icon="el-icon-edit"
            @click="handleAdd(scope.row)"
            >添加</el-button
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
    <el-dialog title="导入" :visible.sync="centerDialogVisible" width="500px">
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
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-table v-loading="loading1" :data="IncomeDetailList">
        <el-table-column label="本次收款金额" prop="amount" align="center" width="150">
        </el-table-column>
        <el-table-column label="收款月份" prop="payMonth" align="payMonth" width="150">
        </el-table-column>
        <el-table-column label="收款人" prop="payee" align="payee" width="150">
        </el-table-column>
        <el-table-column
          label="收款单号"
          prop="receiptNum"
          align="receiptNum"
          width="150"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加收款对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="本次收款金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入" type="number" />
        </el-form-item>
        <el-form-item label="收款月份" prop="payMonth">
          <el-date-picker
            v-model="form.payMonth"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="收款人" prop="payee">
          <el-input v-model="form.payee" placeholder="请输入类型名称" />
        </el-form-item> -->
        <el-form-item label="收款单号" prop="receiptNum">
          <el-input v-model="form.receiptNum" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看收据详情 -->
    <el-dialog :title="title" :visible.sync="receiptOpen" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别" prop="category">
              <el-select
                v-model="form.category"
                placeholder="请选择类别"
                style="width: 220px"
                clearable
                disabled
              >
                <el-option key="迁改" label="迁改" value="迁改" />
                <el-option key="搬迁" label="搬迁" value="搬迁" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"></el-col> -->
          <el-col :span="12">
            <el-form-item label="区域" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="请选择区域"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额" prop="compensationAmount">
              <el-input
                v-model="form.compensationAmount"
                placeholder="请输入赔补金额"
                type="number"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已到账金额" prop="paymentAmount">
              <el-input
                v-model="form.paymentAmount"
                placeholder="请输入已到账金额"
                type="number"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="contractName">
              <el-input
                v-model="form.contractName"
                placeholder="选择赔补合同名"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNum">
              <el-input
                v-model="form.contractNum"
                placeholder="选择合同编号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额到账情况说明" prop="paymentDesc">
              <el-input
                v-model="form.paymentDesc"
                placeholder="请输入赔补金额到账情况说明"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本年开收据（元）" prop="receiptAmount">
              <el-input
                v-model="form.receiptAmount"
                placeholder="请输入本年开收据（元）"
                type="number"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开收据时间" prop="receiptTime">
              <el-date-picker
                v-model="form.receiptTime"
                type="date"
                placeholder="请输入开收据时间"
                disabled
              />
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
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>

    <!-- 发票详情对话框 -->
    <el-dialog :title="title" :visible.sync="invoiceOpen" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="地区" prop="district">
              <treeselect
                v-model="form.district"
                :options="deptOptions"
                placeholder="请选择地区"
                disabled
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
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票代码" prop="invoiceCode">
              <el-input
                v-model="form.invoiceCode"
                placeholder="请输入发票代码"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票号码" prop="invoiceNumber">
              <el-input
                v-model="form.invoiceNumber"
                placeholder="请输入发票号码"
                disabled
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
                disabled
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
                disabled
              >
                <el-option :key="0" label="增值税专用发票" :value="0" />
                <el-option :key="1" label="增值税普通发票" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方税号" prop="buyerTax">
              <el-input v-model="form.buyerTax" disabled placeholder="请输入购方税号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方名称" prop="buyerName">
              <el-input v-model="form.buyerName" disabled placeholder="请输入购方名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票项目" prop="invoiceProject">
              <el-input
                v-model="form.invoiceProject"
                placeholder="请输入开票项目"
                disabled
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
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="amount">
              <el-input
                v-model="form.amount"
                type="number"
                placeholder="请输入金额"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率" prop="taxRate">
              <el-input
                v-model="form.taxRate"
                type="number"
                placeholder="请输入税率"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税额" prop="taxAmount">
              <el-input v-model="form.taxAmount" disabled placeholder="请输入税额" />
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
              <el-input v-model="form.applicant" disabled placeholder="请输入申请人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票人" prop="issuer">
              <el-input v-model="form.issuer" disabled placeholder="请输入开票人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="票据状态" prop="state">
              <el-select
                v-model="form.state"
                placeholder="请选择票据状态"
                clearable
                style="width: 220px"
                disabled
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
                disabled
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
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述" prop="describe">
              <el-input v-model="form.describe" disabled placeholder="请输入描述" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  listIncome,
  listIncomeDetail,
  addIncome,
} from "@/api/relocation/basis/receivables.js";
import { receiptByreceiptNum } from "@/api/relocation/basis/receipt.js";
import { invoiceByInvoiceNum } from "@/api/relocation/basis/invoice.js";
import { exportData1 } from "@/utils/export";
import { getToken } from "@/utils/auth";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { prefix } from "@/api/relocation/relocation";

export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
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
      receiptOpen: false,
      invoiceOpen: false,
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
        flowTypeName: [{ required: true, message: "类型名称不能为空", trigger: "blur" }],
        sortNum: [{ required: true, message: "显示顺序不能为空", trigger: "blur" }],
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
      errorMessage: [],
      codeMsgList: [],
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    downTemplate() {
      exportData1(getToken(), "", `${prefix}/income/export/template`, "收款管理导入模板");
    },
    gotoInvoiceDetail(row) {
      console.log("row", row);
      if (row.invoiceTypeLabel == 50) {
        receiptByreceiptNum(row.invoiceNum).then((response) => {
          console.log("receiptByreceiptNum", response);
          if (response) {
            this.form = response;
            this.receiptOpen = true;
            this.title = "收据详情";
          } else {
            this.$message.error("无法匹配到收据详情");
          }
        });
      } else {
        invoiceByInvoiceNum(row.invoiceNum).then((response) => {
          console.log("invoiceByInvoiceNum", response);
          if (response) {
            this.form = response;
            this.invoiceOpen = true;
            this.title = "发票详情";
          } else {
            this.$message.error("无法匹配到发票详情");
          }
        });
      }
    },
    Showproject(row, isNeed) {
      this.open = true;
      this.loading1 = true;
      listIncomeDetail(row.id, isNeed).then((res) => {
        this.loading1 = false;
        this.IncomeDetailList = res;
      });
    },
    handleAdd(row) {
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
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked[0];
        that.queryParams.unitId = that.morenUnit;
        that.getList();
      });
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
      if (res.code == "00000") {
        if (res.data == "") {
          this.$message.success("导入成功");
          this.getList();
          this.centerDialogVisible = false;
        } else {
          for (let i in res.data) {
            var j = {};
            j.codeMsg = res.data[i];
            this.codeMsgList.push(j);
          }
          console.log('this.codeMsgList',this.codeMsgList);
        }
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
      listIncome(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.totalRow;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.open1 = false;
      this.receiptOpen = false;
      this.invoiceOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
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
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
      this.queryParams.unitId = this.morenUnit;
    },
    /** 导出按钮操作 */
    handleExport() {
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
