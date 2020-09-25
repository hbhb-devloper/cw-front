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
            style="width: 150px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="至" prop="amountTo" label-width="25px">
          <el-input
            v-model="queryParams.amountTo"
            placeholder="请输入金额范围"
            clearable
            size="small"
            style="width: 150px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="开票时间" prop="invoiceTimeFrom">
          <el-date-picker v-model="queryParams.invoiceTimeFrom" type="date" placeholder="选择开票时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="invoiceTimeTo" label-width="25px">
          <el-date-picker v-model="queryParams.invoiceTimeTo" type="date" placeholder="选择开票时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="县区" prop="unitId">
          <el-select
            v-model="queryParams.unitId"
            placeholder="请选择县区"
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
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
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

    <el-table v-loading="loading" :data="typeList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="类别" prop="category" width="120" align="center" />
      <el-table-column label="区域" prop="unit" width="150" align="center" />
      <el-table-column label="赔补金额" prop="compensationAmount" width="150" align="center" />
      <el-table-column label="已到账金额" prop="paymentAmount" width="150" align="center" />
      <el-table-column label="赔补合同名" prop="contractName" width="150" align="center" />
      <el-table-column label="合同编号" prop="contractNum" width="150" align="center" />
      <el-table-column label="赔补金额到账情况说明" prop="paymentDesc" width="150" align="center" />
      <el-table-column label="本年开收据（元）" prop="receiptAmount" width="150" align="center" />
      <el-table-column label="开收据时间" prop="receiptTime" width="150" align="center" />
      <el-table-column
        label="备注格式：合同号；区县；款项性质；项目信息"
        prop="remake"
        width="150"
        align="center"
      />
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
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
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="区域" prop="unitId">
              <el-input v-model="form.unitId" placeholder="请输入区域" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额" prop="compensationAmount">
              <el-input v-model="form.compensationAmount" placeholder="请输入赔补金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已到账金额" prop="paymentAmount">
              <el-input v-model="form.paymentAmount" placeholder="请输入已到账金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="contractName">
              <el-date-picker v-model="form.contractName" type="date" placeholder="选择赔补合同名"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNum">
              <el-date-picker v-model="form.contractNum" type="date" placeholder="选择合同编号"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额到账情况说明" prop="paymentDesc">
              <el-input v-model="form.paymentDesc" placeholder="请输入赔补金额到账情况说明" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本年开收据（元）" prop="receiptAmount">
              <el-input v-model="form.receiptAmount" placeholder="请输入本年开收据（元）" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开收据时间" prop="receiptTime">
              <el-input v-model="form.receiptTime" placeholder="请输入开收据时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注格式：合同号；区县；款项性质；项目信息" prop="remake">
              <el-input v-model="form.remake" placeholder="请输入备注格式：合同号；区县；款项性质；项目信息" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listReceipt, addReceipt, updateReceipt, delarr } from "@/api/relocation/basis/receipt.js";

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
      listReceipt(this.queryParams).then((response) => {
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
            updateReceipt(this.form)
              .then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          } else {
            addReceipt(this.form)
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
</style>