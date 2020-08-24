<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
      <el-form-item label="单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择单位"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="开票金额" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入开票金额"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="业务内容" prop="flowRoleId">
        <el-select
          v-model="queryParams.flowRoleId"
          placeholder="请选择业务内容"
          clearable
          size="medium"
          style="width: 240px"
        >
          <el-option
            v-for="dict in roleOptions"
            :key="dict.id"
            :label="dict.roleName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流程状态" prop="flowRoleId">
        <el-select
          v-model="queryParams.flowRoleId"
          placeholder="请选择流程状态"
          clearable
          size="medium"
          style="width: 240px"
        >
          <el-option
            v-for="dict in roleOptions"
            :key="dict.id"
            :label="dict.roleName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户经理" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入客户经理"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="单位编号" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入单位编号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="单位名称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入单位名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="发票编号" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入发票编号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="flowList">
      <el-table-column label="序号" prop="unitName" align="center" />
      <el-table-column label="发票开具部门" prop="roleName" align="center" width="180" />
      <el-table-column label="对应用户" prop="nickName" align="center" />
      <el-table-column label="客户经理" prop="nickName" align="center" />
      <el-table-column label="发票金额（元）" prop="nickName" align="center" width="180" />
      <el-table-column label="单位编号" prop="nickName" align="center" />
      <el-table-column label="单位名称" prop="nickName" align="center" />
      <el-table-column label="发票内容" prop="nickName" align="center" />
      <el-table-column label="办理业务" prop="nickName" align="center" />
      <el-table-column label="欠费月份" prop="nickName" align="center" />
      <el-table-column label="欠费金额" prop="nickName" align="center" />
      <el-table-column label="计费号" prop="nickName" align="center" />
      <el-table-column label="发票账户" prop="nickName" align="center" />
      <el-table-column label="发票版本号" prop="nickName" align="center" width="180" />
      <el-table-column label="发票编号" prop="nickName" align="center" />
      <el-table-column label="到账时间" prop="nickName" align="center" />
      <el-table-column label="到账金额（元）" prop="nickName" align="center" width="180" />
      <el-table-column label="发票人" prop="nickName" align="center" />
      <el-table-column label="发票时间" prop="nickName" align="center" />
      <el-table-column prop="state" align="center" label="流程状态">
        <template slot-scope="scope">
          <span style="color:#409EFF;" v-if="scope.row.state==0">审批未发起</span>
          <span style="color:#409EFF;" v-if="scope.row.state==1">正在审批</span>
          <span style="color:#409EFF;" v-if="scope.row.state==2">审批未通过</span>
          <span style="color:#409EFF;" v-if="scope.row.state==3">审批通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" align="center" label="发起流程">
        <template slot-scope="scope">
          <el-button size="mini" type="text" :disabled="scope.row.state==0" @click="examined">发起审批</el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="itemName" align="center" label="编辑"></el-table-column>-->
      <!--      <el-table-column prop="itemName" align="center" label="编辑发票"></el-table-column>-->
      <!--      <el-table-column prop="itemName" align="center" label="编辑附件"></el-table-column>-->
      <el-table-column prop="itemName" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.state==1||scope.row.state==3"
            icon="el-icon-delete"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.state==1||scope.row.state==3"
            icon="el-icon-delete"
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
    <el-dialog :title="title" :visible.sync="open" width="900px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-col :span="12">
          <el-form-item label="客户经理" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入客户经理" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票金额" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入开票金额" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票账户" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入发票账户" />
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-form-item label="单位名称" prop="flowName">
            <el-select
              v-model="form.flowTypeId"
              placeholder="请选择单位名称"
              clearable
              size="medium"
              style="width: 100%"
            >
              <el-option
                v-for="dict in typeList"
                :key="dict.id"
                :label="dict.flowTypeName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位编号" prop="flowName">
            <el-select
              v-model="form.flowTypeId"
              placeholder="请选择单位编号"
              clearable
              size="medium"
              style="width: 100%"
            >
              <el-option
                v-for="dict in typeList"
                :key="dict.id"
                :label="dict.flowTypeName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票内容" prop="flowName">
            <el-select
              v-model="form.flowTypeId"
              placeholder="请选择开票内容"
              clearable
              size="medium"
              style="width: 100%"
            >
              <el-option
                v-for="dict in typeList"
                :key="dict.id"
                :label="dict.flowTypeName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理业务内容" prop="flowName">
            <el-select
              v-model="form.flowTypeId"
              placeholder="请选择办理业务内容"
              clearable
              size="medium"
              style="width: 100%"
            >
              <el-option
                v-for="dict in typeList"
                :key="dict.id"
                :label="dict.flowTypeName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计号费" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入计号费" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推送地址" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入推送地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票版本号" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入发票版本号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票编号" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入发票编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账时间" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入到账时间" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账金额" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入到账金额" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" style="width:100%;">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 发起审批 -->
    <el-dialog :title="title" :visible.sync="open1" width="450px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="flowName">
          <el-input v-model="form.flowName" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item label="选择流程" prop="flowName">
          <el-select v-model="form.flowTypeId" placeholder="请选择流程" clearable size="medium">
            <el-option
              v-for="dict in typeList"
              :key="dict.id"
              :label="dict.flowTypeName"
              :value="dict.id"
            />
          </el-select>
          <el-button size="mini" type="text">
            <router-link :to="'/flow/customize/list'">查看流程</router-link>
          </el-button>
        </el-form-item>

        <el-form-item label="备注" style="width:100%;">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFlow, addFlow, updateFlow, delarr } from "@/api/flow/list";
import { listFlowRole, listFlowRoles, delRoleUser } from "@/api/flow/flowrole";
import { listType } from "@/api/flow/type";
import { listUnit } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { exportData } from "@/utils/export";
import { getToken } from "@/utils/auth";
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
      flowList: [],
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限",
        },
        {
          value: "2",
          label: "自定数据权限",
        },
        {
          value: "3",
          label: "本部门数据权限",
        },
        {
          value: "4",
          label: "本部门及以下数据权限",
        },
        {
          value: "5",
          label: "仅本人数据权限",
        },
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        flowName: undefined,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        flowName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
        sortNum: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" },
        ],
      },
      roleOptions: [],
    };
  },
  created() {
    this.getList();
    this.getRoleList();
    this.getMenuTreeselect();
  },
  methods: {
    getMenuTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = response;
      });
    },

    getRoleList() {
      listFlowRoles().then((response) => {
        this.roleOptions = response;
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listFlowRole(this.queryParams).then((response) => {
        this.flowList = response.list;
        this.total = response.count;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.open1 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        flowName: undefined,
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
    examined() {
      this.open1 = true;
      this.title = "发起审批";
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
            updateFlow(this.form)
              .then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          } else {
            addFlow(this.form)
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
      const flowRoleUserId = row.flowRoleUserId;
      this.$confirm("是否确认删除该关联关系的数据项?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delRoleUser(flowRoleUserId);
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
      console.log("queryParams", queryParams);
      this.$confirm("是否确认导出所有流程角色列表?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          console.log("queryParams", queryParams);
          return exportData(
            getToken(),
            queryParams,
            "/flow/role/export",
            "流程角色列表"
          );
          // exportRole(queryParams);
        })
        .catch(function () {});
    },
  },
};
</script>
<style scoped>
/* .el-form-item--medium /deep/ .el-form-item__content {
  width: 240px;
} */
.el-col-12 {
  height: 58px;
}
</style>
