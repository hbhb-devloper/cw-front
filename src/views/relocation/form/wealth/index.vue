<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-col :span="7">
          <el-form-item label="区县" prop="unitId">
            <treeselect
              v-model="queryParams.unitId"
              :options="deptOptions"
              placeholder="请选择区域"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="year">
            <el-date-picker
              v-model="queryParams.year"
              type="year"
              placeholder="选择年份"
              value-format="yyyy"
              style="width: 230px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="项目类型" prop="projectType">
            <el-input
              v-model="queryParams.projectType"
              placeholder="请输入项目类型"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="项目名称" prop="projectName">
            <el-input
              v-model="queryParams.projectName"
              placeholder="请输入项目名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目割接或完成时间" prop="planEndTime">
            <el-date-picker
              v-model="queryParams.planEndTime"
              type="date"
              placeholder="选择项目割接或完成时间"
              style="width: 230px"
              value-format="yyyy-mm-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="立项时间" prop="projectTime">
            <el-date-picker
              v-model="queryParams.projectTime"
              type="date"
              placeholder="选择立项时间"
              style="width: 230px"
              value-format="yyyy-mm-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="合同编号" prop="contractNum">
            <el-input
              v-model="queryParams.contractNum"
              placeholder="请输入合同编号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预付款是否完全到账" prop="receiptStatus">
            <el-select
              v-model="queryParams.receiptStatus"
              placeholder="请选择预付款是否完全到账"
              clearable
              style="width: 230px"
            >
              <el-option key="1" label="是" value="1" />
              <el-option key="0" label="否" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery" size="mini"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" @click="resetQuery" size="mini"
              >重置</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col> -->
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
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="县区" prop="unit" width="120" align="center" />
      <el-table-column
        label="项目类型"
        prop="projectType"
        width="150"
        align="center"
      />
      <el-table-column
        label="EOMS工单号"
        prop="eomsRepairNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="项目名称"
        prop="projectName"
        width="150"
        align="center"
      />
      <el-table-column
        label="项目割接或完成时间"
        prop="planEndTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="预算费用"
        prop="estimatedCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="材料费"
        prop="materialCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="施工费"
        prop="constructionCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="项目约定赔补金额"
        prop="compensationAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="理赔支付方式"
        prop="payType"
        width="150"
        align="center"
      />
      <el-table-column
        label="立项时间"
        prop="planStartTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="完工时间"
        prop="actualEndTime"
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
        label="合同甲方"
        prop="oppositeUnit"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同经办人"
        prop="oppositeContacts"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同金额"
        prop="oppositeAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="初始化已回收金额"
        prop="initRecoveredAmount"
        width="350"
        align="center"
      />
      <el-table-column
        label="预付款应收金额"
        prop="advanceReceivableAmount"
        width="250"
        align="center"
      />
      <el-table-column
        label="预付款回收金额"
        prop="advanceReceivedAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="预付款是否完全到账"
        prop="isAllReceived"
        width="150"
        align="center"
      />
      <el-table-column
        label="1月回款"
        prop="janReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="2月回款"
        prop="febReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="3月回款"
        prop="marReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="4月回款"
        prop="aprReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="5月回款"
        prop="mayReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="6月回款"
        prop="juneReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="7月回款"
        prop="julReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="8月回款"
        prop="augReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="9月回款"
        prop="sepReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="10月回款"
        prop="octReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="11月回款"
        prop="novReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="12月回款"
        prop="decReceivable"
        width="150"
        align="center"
      />
      <el-table-column
        label="待回收金额（合同金额-当前已回收金）"
        prop="unpaidCollection"
        width="150"
        align="center"
      />
      <el-table-column
        label="已开票金额"
        prop="invoicedAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="当年已回收金额"
        prop="yearRecoveredAmount"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
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
            <el-form-item
              v-if="form.userId == undefined"
              label="区域"
              prop="userName"
            >
              <el-input v-model="form.userName" placeholder="请输入区域" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.userId == undefined"
              label="迁改项目编号"
              prop="CheckPassword"
            >
              <el-input
                v-model="form.CheckPassword"
                placeholder="请输入迁改项目编号"
                type="password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EOMS迁移修缮管理流程工单号" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入EOMS迁移修缮管理流程工单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EOMS观澜割接流程工单号" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入EOMS观澜割接流程工单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划施工时间" prop="nickName">
              <el-date-picker
                v-model="form.data"
                type="date"
                placeholder="选择计划施工时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成时间" prop="nickName">
              <el-date-picker
                v-model="form.data"
                type="date"
                placeholder="选择计划完成时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="改签涉及网络层级（省干、汇聚、接入、驻地网）"
              prop="nickName"
            >
              <el-input
                v-model="form.nickName"
                placeholder="请输入改签涉及网络层级"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否农网" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入是否农网" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费（预算：元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工费" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲供材料费（预算：元）" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入甲供材料费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费（送审结算：元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工费" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲供材料费（送审结算：元）" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入甲供材料费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费审定金额（审计后：元）" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入施工费审定金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主动迁改或者被动" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入主动迁改或者被动"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质归类" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入性质归类" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="迁改原因" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入迁改原因" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方单位" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入对方单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方联系人" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入对方联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方联系电话" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入对方联系电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无赔补" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入有无赔补" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="被动无赔类型" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入被动无赔类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入赔补合同名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额（元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付款到账金额（元）" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入预付款到账金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="决算款到账金额（元）（注：决算款不包含预算款）"
              prop="nickName"
            >
              <el-input
                v-model="form.nickName"
                placeholder="请输入决算款到账金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补状态" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补状态" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="未全款回款合同合同签订时长（年）"
              prop="nickName"
            >
              <el-input
                v-model="form.nickName"
                placeholder="请输入未全款回款合同合同签订时长"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补特殊请款备注" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入赔补特殊请款备注"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月报" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入月报" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年份" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入年份" />
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
import { resourceTreeByUN } from "@/api/system/unit";
import { exportData } from "@/utils/export";
import { getToken } from "@/utils/auth";
import { listRefinance } from "@/api/relocation/form/wealth.js";
import Treeselect from "@riophae/vue-treeselect";
import {prefix} from '@/api/relocation/relocation'

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
    return {
      deptOptions: [],
      morenUnit: undefined,
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
      rules: {},
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked[0];
        that.queryParams.unitId = that.morenUnit;
        that.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      console.log("this.queryParams", this.queryParams);
      listRefinance(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.totalRow;
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
      this.title = "添加迁改项目管理信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const typeId = row.id || this.ids;
      //   getRole(typeId).then(response => {
      this.form = row;
      this.open = true;
      this.title = "修改迁改项目管理信息";
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
      this.$confirm("是否确认导出涉财统计的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData(
            getToken(),
            queryParams,
            `${prefix}/refinance/export`,
            "涉财统计"
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
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.el-col-7 {
  height: 60px;
}
</style>