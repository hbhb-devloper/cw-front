<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="起始时间" prop="startTimeFrom">
          <el-date-picker v-model="queryParams.startTimeFrom" type="date" placeholder="选择起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="startTimeTo" label-width="25px">
          <el-date-picker v-model="queryParams.startTimeTo" type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同截止时间" prop="contractDeadlineFrom">
          <el-date-picker v-model="queryParams.contractDeadlineFrom" type="date" placeholder="选择起始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="contractDeadlineTo" label-width="25px">
          <el-date-picker v-model="queryParams.contractDeadlineTo" type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractNum">
          <el-input
            v-model="queryParams.contractNum"
            placeholder="请输入合同编号"
            clearable
            size="small"
            style="width: 150px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="经办单位" prop="unitId">
          
          <el-select
            v-model="queryParams.unitId"
            placeholder="请选择经办单位"
            clearable
            size="small"
            style="width: 220px"
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同名称" prop="contractName">
          <el-input
            v-model="queryParams.contractName"
            placeholder="请输入合同名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible=true"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" prop="id" width="120" align="center" />
      <el-table-column label="类别" prop="category" width="150" align="center" />
      <el-table-column label="经办单位" prop="unit" width="150" align="center" />
      <el-table-column label="供应商" prop="supplier" width="150" align="center" />
      <el-table-column label="合同编号" prop="contractNum" width="150" align="center" />
      <el-table-column label="合同名称" prop="contractName" width="150" align="center" />
      <el-table-column label="发票号码" prop="invoiceNum" width="150" align="center" />
      <el-table-column label="起始时间" prop="startTime" width="150" align="center" />
      <el-table-column label="合同截止时间" prop="contractDeadline" width="150" align="center" />
      <el-table-column label="合同金额" prop="contractAmount" width="150" align="center" />
      <el-table-column label="开票日期" prop="invoiceTime" width="150" align="center" />
      <el-table-column label="发票类型" prop="invoiceType" width="150" align="center" />
      <el-table-column label="价款" prop="amount" width="150" align="center" />
      <el-table-column label="税额" prop="tax" width="150" align="center" />
      <el-table-column label="价税合计" prop="taxIncludeAmount" width="150" align="center" />
      <el-table-column label="工程名" prop="constructionName" width="150" align="center" />
      <el-table-column label="收款情况" prop="isReceived" width="150" align="center" />
      <el-table-column label="账龄" prop="aging" width="150" align="center" />
      <el-table-column label="应收" prop="receivable" width="150" align="center" />
      <el-table-column label="已收" prop="received" width="150" align="center" />
      <el-table-column label="未收" prop="unreceived" width="150" align="center" />
      <el-table-column label="款项类型" prop="paymentType" width="150" align="center" />
      <el-table-column label="当月收款金额" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="收款单号" prop="receiptNum" width="150" align="center" />
      <el-table-column label="收款人" prop="payee" width="150" align="center" />
      <!-- <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型名称" prop="flowTypeName">
          <el-input v-model="form.flowTypeName" placeholder="请输入类型名称" />
        </el-form-item>

        <el-form-item label="显示顺序" prop="sortNum">
          <el-input-number v-model="form.sortNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { listIncome } from "@/api/relocation/basis/receivables.js";

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
        pageNum: 1,
        pageSize: 10,
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
       // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 0, dictLabel: "停用" },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listIncome(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.count;
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
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
  },
};
</script>
