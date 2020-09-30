<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="县区" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入县区"
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
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="地区" prop="unitName" align="center" />
      <el-table-column label="合同签订请款" align="center">
        <el-table-column label="有赔迁改项目数量（个）" prop="compensationAmount" width="150" align="center" />
        <el-table-column label="签订赔补协议数量（个）" prop="contractAmount" width="150" align="center" />
        <el-table-column label="已签订赔补协议项目数" prop="contractNumAmount" width="150" align="center" />
        <el-table-column label="未签订赔补协议项目数" prop="notContractNumAmount" width="150" align="center" />
        <el-table-column label="赔补合同签订率（按项目个数计）" prop="compensationRatio" width="150" align="center" />
        <el-table-column label="签订赔补协议金额（万元）" prop="contractAccount" width="150" align="center" />
        <el-table-column label="未签订赔补现已项目成本金额（万元）" prop="notContractAccount" width="150" align="center" />
      </el-table-column>
      <el-table-column label="合同履行情况" width="150" align="center">
        <el-table-column label="赔补款累计到账金额（万元）" prop="compensationTotal" width="150" align="center" />
        <el-table-column label="有赔迁改项目累计成本金额（万元）" prop="costTotal" width="150" align="center" />
        <el-table-column label="回款成本收支比" prop="costRation" width="150" align="center" />
        <el-table-column label="预付款未收金（万元）" prop="budgetNotAccount" width="150" align="center" />
        <el-table-column label="尾款未收金（万元）" prop="finalNotPayment" width="150" align="center" />
        <el-table-column label="未全额回款合同1年内（个）" prop="oneNotCostAmount" width="150" align="center" />
        <el-table-column label="未全额回款合同1-3年（个）" prop="twoNotCostAmount" width="150" align="center" />
        <el-table-column label="未全额回款合同3年以上（个）" prop="threeNotCostAmount" width="150" align="center" />
        <el-table-column label="当年赔补开票（万元）" prop="thisYearInvoiceAccount" width="150" align="center" />
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
            <el-form-item v-if="form.userId == undefined" label="地区" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入地区" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="县市" prop="CheckPassword">
              <el-input v-model="form.CheckPassword" placeholder="请输入县市" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票代码" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入发票代码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票号码" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入发票号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票点" prop="nickName">
              <el-date-picker v-model="form.data" type="date" placeholder="选择发票点"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型" prop="nickName">
              <el-date-picker v-model="form.data" type="date" placeholder="选择业务类型"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入发票类型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方税号" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入购方税号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购方名称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入购方名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票项目" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入开票项目" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入开票日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入税率" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税额" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入税额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价税合计" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入价税合计" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注格式：合同号；区县；款项性质；项目信息" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入备注格式：合同号；区县；款项性质；项目信息" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入申请人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票人" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入开票人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="票据状态" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入票据状态" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为自定义菜单开票" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入是否为自定义菜单开票" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户经理" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入客户经理" />
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
import { listType, addType, updateType, delFlowType } from "@/api/flow/type";

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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listType(this.queryParams).then((response) => {
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