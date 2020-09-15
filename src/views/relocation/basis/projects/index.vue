<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="合同编号" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入合同编号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="区域" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入区域"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="迁改项目编号" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入迁改项目编号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="赔补状态" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入赔补状态"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="未全额回款合同历时" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入未全额回款合同历时"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="工程名称" prop="flowTypeName">
          <el-input
            v-model="queryParams.flowTypeName"
            placeholder="请输入工程名称"
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
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-if="false"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-if="false"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="区域" prop="id" width="120" align="center" />
      <el-table-column label="迁改项目编号" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="EOMS迁移修缮管理流程工单号" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="EOMS光缆割接流程工单号" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="计划施工时间" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="计划完成时间" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="实际完工时间" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="施工单位" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="工程单位" prop="flowTypeName" width="150" align="center" />
      <el-table-column
        label="迁改涉及网络层级（省干、汇聚、接入、驻地网）"
        prop="flowTypeName"
        width="150"
        align="center"
      />
      <el-table-column label="是否农网" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="施工费（预算：元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="甲供材料费（预算：元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="施工费（送审结算：元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="甲供材料费（送审结算：元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="施工费审定金额（审计后：元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="主动迁改或者被动" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="性质归类" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="迁改原因" prop="flowTypeName" width="350" align="center" />
      <el-table-column label="对方单位" prop="flowTypeName" width="250" align="center" />
      <el-table-column label="对方联系人" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="对方联系电话" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="有无赔补" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="被动无赔类型" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="合同编号" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="赔补合同名" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="赔补金额（元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="预付款应付金额" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="预付款到账金额（元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="决算款到账金额（元）" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="赔补状态" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="未全额回款合同历时" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="赔补特殊情况备注" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="月报" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="年份" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="合同类型" prop="flowTypeName" width="150" align="center" />
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
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
            <el-form-item v-if="form.userId == undefined" label="区域" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入区域" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="迁改项目编号" prop="CheckPassword">
              <el-input v-model="form.CheckPassword" placeholder="请输入迁改项目编号" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EOMS迁移修缮管理流程工单号" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入EOMS迁移修缮管理流程工单号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EOMS观澜割接流程工单号" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入EOMS观澜割接流程工单号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划施工时间" prop="nickName">
              <el-date-picker v-model="form.data" type="date" placeholder="选择计划施工时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成时间" prop="nickName">
              <el-date-picker v-model="form.data" type="date" placeholder="选择计划完成时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="改签涉及网络层级（省干、汇聚、接入、驻地网）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入改签涉及网络层级" />
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
              <el-input v-model="form.nickName" placeholder="请输入甲供材料费" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费（送审结算：元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工费" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲供材料费（送审结算：元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入甲供材料费" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费审定金额（审计后：元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入施工费审定金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主动迁改或者被动" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入主动迁改或者被动" />
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
              <el-input v-model="form.nickName" placeholder="请输入对方联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方联系电话" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入对方联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无赔补" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入有无赔补" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="被动无赔类型" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入被动无赔类型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补合同名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额（元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付款到账金额（元）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入预付款到账金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="决算款到账金额（元）（注：决算款不包含预算款）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入决算款到账金额" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补状态" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补状态" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="未全款回款合同合同签订时长（年）" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入未全款回款合同合同签订时长" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补特殊请款备注" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入赔补特殊请款备注" />
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
</style>