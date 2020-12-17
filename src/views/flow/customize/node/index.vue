<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择单位"
        />
      </el-form-item>
      <el-form-item label="流程名称" prop="flowId">
        <el-select
          v-model="queryParams.flowId"
          placeholder="请选择流程"
          clearable
          size="medium"
          style="width: 230px"
        >
          <el-option
            v-for="dict in flowOptions"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
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
    </el-form>

    <el-row :gutter="10" class="mb8">
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

    <el-table v-loading="loading" :data="nodeList">
      <el-table-column label="单位" prop="unitName" align="center" />
      <el-table-column
        label="流程名称"
        prop="flowName"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column label="节点名称" prop="flowNodeName" align="center" />
      <!-- <el-table-column label="环节名称" prop="linkName"  align="center" /> -->
      <el-table-column label="角色" prop="roleDescription" align="center" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click.stop="handleUpdate(scope.row)"
            >查看详情</el-button
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
    <el-dialog title="查看节点" :visible.sync="ItemVisible" width="50%">
      <el-radio-group v-model="FormType" style="margin-bottom: 30px">
        <el-radio-button label="jbxx">基本信息</el-radio-button>
        <el-radio-button label="xgtx">相关提醒</el-radio-button>
      </el-radio-group>
      <el-form
        ref="dataForm"
        :model="node"
        label-width="80px"
        v-if="FormType == 'jbxx'"
      >
        <el-form-item label="用户角色">
          <el-select
            v-model="node.flowRoleId"
            disabled
            placeholder="请选择角色"
            clearable
            size="medium"
          >
            <el-option
              v-for="dict in roleOptions"
              :key="dict.id"
              :label="dict.roleName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色范围">
          <treeselect
            disabled
            v-model="node.unitId"
            :options="deptOptions"
            :disable-branch-nodes="true"
            :show-count="true"
            placeholder="请选择角色范围"
          />
        </el-form-item>
        <el-form-item label="默认用户">
          <el-select
            v-model="node.userId"
            placeholder="请选择默认用户"
            disabled
            clearable
            size="medium"
          >
            <el-option
              v-for="dict in uesrOptions"
              :key="dict.id"
              :label="dict.label"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="环节">
            <el-input v-model="node.linkId" disabled></el-input>
          </el-form-item> -->
        <el-form-item label="分配者">
          <el-select
            v-model="node.assigner"
            placeholder="请选择分配者"
            disabled
            clearable
            size="medium"
          >
            <el-option
              v-for="dict in roleOptions"
              :key="dict.id"
              :label="dict.label"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否能够自定义流程">
          <el-checkbox
            v-model="node.controlAccess"
            :true-label="Istrue"
            :false-label="Isfalse"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="是否允许被不参与流程">
          <el-checkbox
            v-model="node.isJoin"
            :true-label="Istrue"
            :false-label="Isfalse"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="启用条件">
          <div style="width: 70px">项目金额</div>
          <el-select
            v-model="node.state"
            placeholder="关系"
            clearable
            disabled
            size="medium"
            style="width: 150px"
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
          <el-input
            v-model="node.amount"
            disabled
            style="width: 150px; margin-left: 10px"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" v-if="FormType == 'xgtx'">
        <el-table-column label="提醒流程" width="180" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.noticeNodeId"
              disabled
              placeholder="请选择"
            >
              <el-option
                v-for="dict in flownodeOptions"
                :key="dict.id"
                :label="dict.name"
                :value="dict.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="提醒状态" width="180" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.state" disabled placeholder="请选择">
              <el-option
                v-for="dict in remindOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="提醒信息" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.inform" disabled placeholder="请选择">
              <el-option
                v-for="dict in noticeOptions"
                :key="dict.id"
                :label="dict.content"
                :value="dict.content"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { addFlow, updateFlow, delarr } from "@/api/flow/list";
import { listType } from "@/api/flow/type";
import { getremindList } from "@/api/flow/remind";
import {
  getFlowProp,
  getFlowRoleUser,
  addFlowProp,
  putFlowProp,
  addFlowPropNotice,
  getFlowPropNotice,
  getFlowPropNodeRole,
} from "@/api/flow/vfd";
import { listNode, listflow } from "@/api/flow/node";
import { listUnit } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listFlowRoles } from "@/api/flow/flowrole";
import { getProject } from "@/api/flow/project";
import {prefix} from '@/api/flow/flow'
import { exportData1 } from "@/utils/export";
import { getToken } from "@/utils/auth";
export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
    return {
      Istrue: 1,
      Isfalse: 2,
      node: {},
      ItemVisible: false,
      FormType: "jbxx",
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 角色表格数据
      nodeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 部门列表
      deptOptions: [],
      uesrOptions: [],
      flowOptions: [],
      roleOptions: [],
      noticeOptions: [],
      remindOptions: [
        { dictValue: 10, dictLabel: "默认提醒" },
        { dictValue: 20, dictLabel: "不同意时" },
        { dictValue: 30, dictLabel: "流程完成时" },
      ],
      statusOptions: [
        { dictValue: 10, dictLabel: "小于" },
        { dictValue: 20, dictLabel: "小于等于" },
        { dictValue: 30, dictLabel: "等于" },
        { dictValue: 40, dictLabel: "大于" },
        { dictValue: 50, dictLabel: "大于等于" },
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        unitId: undefined,
        flowId: undefined,
      },
      // 表单参数
      form: {},
      projectdata: {},
    };
  },
  computed: {
    flowRoleId() {
      return this.node.flowRoleId;
    },
    unitId() {
      return this.node.unitId;
    },
    flownodeOptions() {
      return this.projectdata.nodeList;
    },
  },
  created() {
    this.getList();
    this.getFlowList();
    this.getRoleList();
    this.getTreeselect();
    this.getRemindList();
  },
  methods: {
    getRemindList() {
      getremindList().then((res) => {
        this.noticeOptions = res;
      });
    },
    getTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = response;
        let morendept = {
          id: 0,
          label: "流程发起人所在部门",
        };
        this.deptOptions.push(morendept);
      });
    },
    getRoleList() {
      listFlowRoles().then((response) => {
        this.roleOptions = response;
      });
    },
    getFlowList() {
      listflow().then((response) => {
        this.flowOptions = response;
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listNode(this.queryParams).then((response) => {
        this.nodeList = response.list;
        this.total = response.totalRow;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.node = {
        type: undefined,
        name: undefined,
        flowRoleAid: undefined,
        roleDescription: undefined,
        unitId: undefined,
        userId: undefined,
        linkId: undefined,
        flowRoleLid: undefined,
        customProcess: 0,
        notParticipate: 0,
        state: undefined,
        amount: undefined,
      };
      this.resetForm("dataForm");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const nodeId = row.flowNodeId;
      const flowId = row.flowId;
      let that = this;
      getFlowProp(nodeId).then((response) => {
        if (response) {
          this.node = response;
          getFlowRoleUser(that.flowRoleId, that.unitId).then((res) => {
            that.uesrOptions = res;
          });
        } else {
          this.node.flowNodeId = nodeId;
        }
        this.ItemVisible = true;
      });
      getFlowPropNotice(nodeId).then((response) => {
        console.log("response", response);
        if (response) {
          this.tableData = response;
          this.tablelength = response.length;
        } else {
          this.tableData = [];
        }
        this.ItemVisible = true;
      });
      getProject(flowId).then((response) => {
        this.projectdata = response;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出流程节点的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          // return BudgetExport(queryParams);
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/node/export`,
            "流程节点导出"
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
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  width: auto;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  width: 160px !important;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 160px !important;
  display: flex;
}
.el-dialog .el-form-item--medium /deep/ .el-select {
  width: 100%;
}
</style>