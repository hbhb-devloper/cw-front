<template>
  <div class="app-container">
    <div class="app-top">
      <div>
        <el-col :span="24" :xs="24">
          <el-form
            ref="queryForm"
            :model="obj2"
            :inline="true"
            label-width="100px"
          >
            <el-form-item label="发票代码：" prop="invoiceCode">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.invoiceCode"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="发票号码：" prop="invoiceNumber">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.invoiceNumber"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="开票日期：" prop="invoiceDate">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.invoiceDate"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="金额：" prop="money">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.money"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>

            <el-form-item label="购方税号：" prop="buyerTaxId">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.buyerTaxId"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="购方名称：" prop="buyerName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.buyerName"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="导入分公司：" prop="branch">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.branch"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="导入人员：" prop="personnel">
              <el-input
                placeholder="请输入关键词"
                v-model="obj2.personnel"
                clearable
                size="small"
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item label="导入时间：" prop="itime">
              <el-date-picker
                v-model="obj2.itime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="handleReset"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div class="table-box">
      <div class="table-btn-box">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleInsrt"
          >添加</el-button
        >
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdata"
          >修改</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelarr"
          >删除</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleBatchExport"
          >批量导出</el-button
        >
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-top: 20px; text-align: center"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column
            prop="lineNumber"
            label="行号（必输）"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="invoiceType"
            label="发票种类"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="invoiceCode"
            label="发票代码"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="invoiceNumber"
            label="发票号码"
            align="center"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="invoiceDate"
            label="开票日期"
            align="center"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="stateIdentity"
            label="是否注明旅客身份证"
            align="center"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="domesticAndForeign"
            label="国内/国际"
            align="center"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="taxFreeAmount"
            label="不含税金额"
            align="center"
            width="150"
          >
          </el-table-column>

          <el-table-column
            prop="taxCode"
            label="税码"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="fare" label="票价" align="center" width="120">
          </el-table-column>
          <el-table-column
            prop="mhFund"
            label="民航发展基金"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="ryAdditionalFee"
            label="燃油附加费"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="otherTaxes"
            label="其他税费"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="money" label="金额" align="center" width="120">
          </el-table-column>
          <el-table-column
            prop="reportableAmount"
            label="可报帐金额"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="buyerTaxId"
            label="购买方税号"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="buyerName"
            label="购买方名称"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="salesTaxNumber"
            label="销售方税号"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="sellerName"
            label="销售方名称"
            align="center"
            width="120"
          >
          </el-table-column>

          <el-table-column prop="branch" align="center" label="分公司">
          </el-table-column>

          <el-table-column
            prop="itime"
            align="center"
            width="220"
            label="导入时间"
          >
          </el-table-column>
          <el-table-column prop="personnel" label="导入人员" width="80">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
            background
            style="margin-top: 3px"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-count="pages"
          >
          </el-pagination>
          <el-select v-model="total" placeholder="请选择" style="width: 100px">
            <el-option value="10" label="10条/页"></el-option>
            <el-option value="20" label="20条/页"></el-option>
            <el-option value="30" label="30条/页"></el-option>
          </el-select>
        </div>
      </div>
      <div class="updatas">
        <el-dialog :visible.sync="centerDialogVisible">
          <el-form ref="obj" :inline="true" label-width="180px" name="obj">
            <el-form-item label="发票种类：" :required="true">
              <el-select
                v-model="obj.invoiceType"
                filterable
                placeholder="请选择关键词"
                style="width: 200px"
              >
                <el-option
                  label="----------默认----------"
                  value=""
                ></el-option>
                <el-option
                  v-for="dict in machineOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
                <!-- <el-option label="桥闸通行费" value="13"></el-option>
                <el-option label="一二级公路通行费" value="14"></el-option>
                <el-option label="其他不可抵扣发票" value="16"></el-option>
                <el-option label="代扣代缴税收缴款凭证" value="21"></el-option>
                <el-option label="其他可抵扣发票" value="22"></el-option>
                <el-option label="航空电子旅客行程单" value="23"></el-option>
                <el-option label="火车票" value="24"></el-option>
                <el-option label="其他车票船票" value="25"></el-option>
                <el-option label="试报账虚拟发票" value="26"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="发票号码：" :required="true">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.invoiceNumber"
                name="invoiceNumber"
                @blur="handleInput(2)"
                style="width: 200px"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="开票日期：" :required="true">
              <el-date-picker
                v-model="obj.invoiceDate"
                type="date"
                name="invoiceDate"
                style="width: 200px"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="金额：" :required="true">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.money"
                style="width: 200px"
                name="money"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="发票代码：" prop="invoiceCode">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.invoiceCode"
                @blur="handleInput(1)"
                name="invoiceCode"
                style="width: 200px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item
              v-if="
                obj.invoiceType == 23 ||
                obj.invoiceType == 24 ||
                obj.invoiceType == 25 ||
                obj.invoiceType == ''
              "
              label="是否注明旅客身份证："
              prop="stateIdentity"
            >
              <el-select
                v-model="obj.stateIdentity"
                name="stateIdentity"
                placeholder="请选择关键词"
                style="width: 200px"
              >
                <el-option label="是" value="Y"></el-option>
                <el-option label="否" value="N"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                obj.invoiceType == 23 ||
                obj.invoiceType == 24 ||
                obj.invoiceType == 25 ||
                obj.invoiceType == ''
              "
              label="国内/国际："
              prop="domesticAndForeign"
            >
              <el-select
                v-model="obj.domesticAndForeign"
                name="domesticAndForeign"
                style="width: 200px"
                placeholder="请选择关键词"
              >
                <el-option label="国内" value="IN"></el-option>
                <el-option label="国际" value="OUT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                obj.invoiceType == 21 ||
                obj.invoiceType == 22 ||
                obj.invoiceType == 26 ||
                obj.invoiceType == ''
              "
              label="不含税金额："
              prop="taxFreeAmount"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.taxFreeAmount"
                style="width: 200px"
                name="taxFreeAmount"
                clearable
                type="number"
                size="small"
              />
            </el-form-item>
            <el-form-item
              v-if="
                obj.invoiceType == 21 ||
                obj.invoiceType == 22 ||
                obj.invoiceType == 26 ||
                obj.invoiceType == ''
              "
              label="税码："
              prop="taxCode"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.taxCode"
                style="width: 200px"
                name="taxCode"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item
              v-if="obj.invoiceType == 23 || obj.invoiceType == ''"
              label="票价："
              prop="fare"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.fare"
                style="width: 200px"
                name="fare"
                clearable
                type="number"
                size="small"
              />
            </el-form-item>
            <el-form-item
              v-if="obj.invoiceType == 23 || obj.invoiceType == ''"
              label="民航发展基金："
              prop="mhFund"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.mhFund"
                style="width: 200px"
                name="mhFund"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item
              v-if="obj.invoiceType == 23 || obj.invoiceType == ''"
              label="燃油附加费："
              prop="ryAdditionalFee"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.ryAdditionalFee"
                style="width: 200px"
                name="ryAdditionalFee"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item
              v-if="obj.invoiceType == 23 || obj.invoiceType == ''"
              label="其他税费："
              prop="otherTaxes"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.otherTaxes"
                style="width: 200px"
                name="otherTaxes"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item
              v-if="obj.invoiceType == 24 || obj.invoiceType == ''"
              label="可报帐金额："
              prop="reportableAmount"
            >
              <el-input
                placeholder="请输入关键词"
                v-model="obj.reportableAmount"
                name="reportableAmount"
                style="width: 200px"
                type="number"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="销售方税号：" prop="salesTaxNumber">
              <el-input
                placeholder="请输入关键词"
                clearable
                v-model="obj.salesTaxNumber"
                style="width: 200px"
                name="salesTaxNumber"
                size="small"
              />
            </el-form-item>

            <el-form-item label="销售方名称：" prop="sellerName">
              <el-input
                placeholder="请输入关键词"
                v-model="obj.sellerName"
                style="width: 200px"
                clearable
                name="sellerName"
                size="small"
              />
            </el-form-item>
            <el-form-item
              style="width: 100%; text-align: right; margin-top: 20px"
            >
              <el-button
                type="primary"
                @click="handleCancel"
                style="margin-right: 50px"
                >取消</el-button
              >
              <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getList,
  adddata,
  update,
  delData,
  delarr,
  getInfo,
} from "@/api/invoice/common/common.js";
import { exportData, BatchExport } from "@/utils/export";
import { getToken } from "@/utils/auth";
import { dateTimes } from "@/utils/date.js";
import { param } from "@/utils";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      count: 0,
      total: 20,
      centerDialogVisible: false,
      obj: {
        branch: "",
        buyerName: "",
        buyerTaxId: "",
        domesticAndForeign: "",
        fare: "",
        invoiceCode: "",
        invoiceDate: "",
        invoiceNumber: "",
        invoiceType: "16",
        itime: "",
        machineInvoiceId: null,
        mhFund: "",
        money: "",
        otherTaxes: "",
        personnel: "",
        reportableAmount: "",
        ryAdditionalFee: "",
        salesTaxNumber: "",
        sellerName: "",
        stateIdentity: "",
        taxCode: "",
        taxFreeAmount: "",
      },
      insetUpdata: 1,
      delarrs: [],
      page: 1,
      pagesize: 20,
      obj2: {
        invoiceCode: undefined, //发票代码
        invoiceNumber: undefined, //发票号码
        invoiceDate: undefined, //开票日期
        money: undefined, //金额
        buyerTaxId: undefined, //购方税号
        buyerName: undefined, //购方名称
        branch: undefined, //分公司
        itime: undefined, //导入时间
        personnel: undefined, //导入人员
        pageNum: 1,
        pageSize: 20,
      },
      param: {},
      batch: {},
      machineOptions: [],
    };
  },
  mounted() {
    this.getDicts("invoice", "type_machine").then((response) => {
      this.machineOptions = response;
      this.handleSelect();
    });
  },
  computed: {
    pages() {
      let page = Math.ceil(this.count / this.total);
      return page;
    },
  },
  watch: {
    //监听选择条数
    total: function (newVal, oldVal) {
      this.obj2.pageNum = this.page;
      this.obj2.pageSize = newVal;
      this.handleSelect();
    },
  },
  methods: {
    //获取列表信息
    handleList(data) {
      this.token = getToken();
      getList(data).then((res) => {
        this.tableData = res.list;
        this.count = res.count;
      });
    },
    //模糊查询
    handleSelect() {
      let params = {};
      params = JSON.parse(JSON.stringify(this.obj2));
      if (params.itime) {
        params.beginTime = params.itime[0];
        params.endTime = params.itime[1];
      } else {
        params.beginTime = undefined;
        params.endTime = undefined;
      }
      delete params.itime;
      this.batch = params;
      getList(params).then((res) => {
        this.tableData = res.list;
        this.count = res.count;
      });
    },
    //验证发票代码号码长度
    handleInput(id) {
      switch (id) {
        case 1:
          if (this.obj.invoiceCode.length != 12) {
            this.$message.warning("发票代码必须为12位");
          }
          break;
        case 2:
          if (this.obj.invoiceNumber.length != 8) {
            this.$message.warning("发票号码必须为8位");
          }
          break;
      }
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.obj2.pageNum = val;
      this.obj2.pageSize = this.total;
      this.handleSelect();
    },
    //添加弹窗
    handleInsrt() {
      this.obj = {
        invoiceType: "16",
        invoiceCode: "",
        invoiceNumber: "",
        invoiceDate: "",
        stateIdentity: "",
        domesticAndForeign: "",
        taxFreeAmount: "",
        taxCode: "",
        fare: "",
        mhFund: "",
        ryAdditionalFee: "",
        otherTaxes: "",
        money: "",
        reportableAmount: "",
        buyerTaxId: "",
        buyerName: "",
        salesTaxNumber: "",
        sellerName: "",
        branch: "",
        itime: "",
        personnel: "",
      };
      this.centerDialogVisible = true;
      this.insetUpdata = 1;
    },
    //修改弹窗
    handleEdit(index, row, type) {
      this.insetUpdata = type || 2;
      this.centerDialogVisible = true;
      getInfo(row.machineInvoiceId).then((res) => {
        this.obj = res;
      });
    },
    //记录删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delData(row.machineInvoiceId).then((res) => {
            this.$message.success("删除成功！");
            this.handleSelect();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //选择
    handleSelectionChange(val) {
      let arr = [];
      for (let key of val) {
        arr.push(key.machineInvoiceId);
      }
      this.delarrs = arr;
      this.insetUpdata = 2;
    },
    //批量删除
    handleDelarr() {
      if (this.delarrs.length <= 0) {
        this.$message.warning("请选择要删除的记录");
        return;
      }
      this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delarr(this.delarrs).then((res) => {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.handleSelect();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //关闭弹窗
    handleCancel() {
      this.centerDialogVisible = false;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.obj2.pageNum = 1;
      this.total = 20;
      this.page = 1;
      this.batch = {};
      this.handleSelect();
    },
    //充置搜索
    handleReset() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    //修改记录
    handleUpdata() {
      if (this.delarrs.length != 1) {
        this.$message.warning("只能选择一条数据进行修改！");
        return;
      }
      getInfo(this.delarrs[0]).then((res) => {
        this.obj = res;
      });
      this.centerDialogVisible = true;
    },
    //信息提交
    handleSubmit() {
      if (this.obj.invoiceCode.length != 12) {
        this.$message.warning("发票代码必须为12位");
        return;
      }
      if (this.obj.invoiceNumber.length != 8) {
        this.$message.warning("发票号码必须为8位");
        return;
      }
      let data1 = {
        invoiceType: this.obj.invoiceType, //发票类型
        invoiceCode: this.obj.invoiceCode, //发票代码
        invoiceNumber: this.obj.invoiceNumber, //发票号码
        invoiceDate: dateTimes(this.obj.invoiceDate), //开票时间
        salesTaxNumber: this.obj.salesTaxNumber, //销售方税号
        sellerName: this.obj.sellerName, //销售方名称
      };
      if (
        this.obj.invoiceType == 13 ||
        this.obj.invoiceType == 14 ||
        this.obj.invoiceType == 16
      ) {
        data1.money = parseFloat(this.obj.money); //金额
      } else if (this.obj.invoiceType == 22 || this.obj.invoiceType == 21) {
        data1.taxFreeAmount = this.obj.taxFreeAmount; //不含税金额
        data1.taxCode = this.obj.taxCode; //税码
        data1.money = this.obj.money; //金额
      } else if (this.obj.invoiceType == 23) {
        data1.stateIdentity = this.obj.stateIdentity; //是否注明旅客身份
        data1.domesticAndForeign = this.obj.domesticAndForeign; //国内/国际
        data1.fare = parseFloat(this.obj.fare); //票价
        data1.mhFund = parseFloat(this.obj.mhFund); //民航发展基金
        data1.ryAdditionalFee = parseFloat(this.obj.ryAdditionalFee); //燃油附加费
        data1.otherTaxes = parseFloat(this.obj.otherTaxes); //其他税费
        data1.money = parseFloat(this.obj.money); //金额
      } else if (this.obj.invoiceType == 24) {
        data1.stateIdentity = this.obj.stateIdentity; //是否注明旅客身份
        data1.domesticAndForeign = this.obj.domesticAndForeign; //国内/国际
        data1.money = parseFloat(this.obj.money); //金额
        data1.reportableAmount = this.obj.reportableAmount; //可报帐金额
      } else if (this.obj.invoiceType == 25) {
        data1.stateIdentity = this.obj.stateIdentity; //是否注明旅客身份
        data1.domesticAndForeign = this.obj.domesticAndForeign; //国内/国际
        data1.money = this.obj.money; //金额
      } else if (this.obj.invoiceType == 26) {
        data1.taxFreeAmount = parseFloat(this.obj.taxFreeAmount); //不含税金额
        data1.taxCode = this.obj.taxCode; //税码
        data1.money = parseFloat(this.obj.money); //金额
      } else {
        data1 = this.obj;
      }
      if (
        !data1.invoiceType ||
        !data1.invoiceNumber ||
        !data1.invoiceDate ||
        !data1.money
      ) {
        this.$message.warning("必填项不能为空！");
        return;
      }
      if (this.insetUpdata == 1) {
        adddata(JSON.stringify(data1)).then((res) => {
          this.$message.success("添加成功！");
          this.handleSelect();
        });
      } else if (this.insetUpdata == 2) {
        this.obj.invoiceDate = dateTimes(this.obj.invoiceDate);
        update(this.obj).then((res) => {
          this.$message.success("修改成功！");
          this.handleSelect();
        });
      }

      this.centerDialogVisible = false;
    },
    //Excel导出
    handleExport() {
      if (this.delarrs.length == 0) {
        this.$message.warning("请勾选出需要导出的记录！");
        return;
      }
      exportData(
        getToken(),
        this.delarrs,
        "/invoice/invoice_machine/export",
        "通用机打发票"
      );
    },
    handleBatchExport() {
      this.$confirm("是否按当前搜索条件导出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delete this.batch.pageNum;
        delete this.batch.pageSize;
        BatchExport(
          getToken(),
          this.batch,
          "/invoice/invoice_machine/export/all",
          "通用机打发票"
        );
      });
    },
  },
};
</script>
<style scoped>
body {
  background: #f4f4f4;
}

.app-container {
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}

.table-box {
  padding: 15px 20px;
  margin-top: 20px;
  background: #fff;
}

.table-btn-box {
  position: relative;
}

.el-icon-printer {
  position: absolute;
  right: 0;
  font-size: 21px;
  top: 5px;
}

.paging {
  margin: 20px 0 0 80px;
  display: flex;
  flex-direction: row;
}
</style>
