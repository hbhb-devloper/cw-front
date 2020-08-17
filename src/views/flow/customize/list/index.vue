<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="流程名称" prop="flowName">
        <el-input
          v-model="queryParams.flowName"
          placeholder="请输入流程名称"
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
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
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
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-if="false"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="flowList"
      @row-click="gotodetail"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="流程id" prop="flowId" width="120" align="center" />
      <el-table-column
        label="流程名称"
        prop="flowName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column label="流程类型名称" prop="flowTypeName" width="160" align="center" />
      <!-- <el-table-column label="显示顺序" prop="sortNum" width="100" align="center" /> -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime| dataFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click.stop="handleUpdate(scope.row)"
          >修改</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click.stop="handleDelete(scope.row)"
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
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="流程名称" prop="flowName">
          <el-input v-model="form.flowName" placeholder="请输入类型名称" />
        </el-form-item>
        <el-form-item label="类型名称" prop="flowName">
          <el-select
            v-model="form.flowTypeId"
            placeholder="请选择类型名称"
            clearable
            size="small"
            style="width: 150px"
          >
            <el-option
              v-for="dict in typeList"
              :key="dict.id"
              :label="dict.flowTypeName"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="显示顺序" prop="sortNum">
          <el-input-number v-model="form.sortNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="关联单位" prop="unitId">
          <el-tree
            :data="deptOptions"
            show-checkbox
            ref="dept"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注">
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
import {
  listFlow,
  addFlow,
  updateFlow,
  delarr,
  getFlow,
} from "@/api/flow/list";
import { listType } from "@/api/flow/type";
import { listUnit } from "@/api/system/unit";
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
      flowList: [],
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
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
      deptOptions: [],
    };
  },
  //定义私用局部过滤器。只能在当前 vue 对象中使用
  filters: {
    dataFormat(msg) {
      return msg.substring(0, 10);
    },
  },
  created() {
    this.getList();
    this.getTypeList();
    this.getMenuTreeselect();
  },
  methods: {
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      // let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
      // checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return halfCheckedKeys;
    },
    getMenuTreeselect() {
      listUnit().then((response) => {
        this.deptOptions = response;
      });
    },
    gotodetail(data) {
      this.$router.push(`/flow/customize/vfd/${data.flowId}`);
    },
    getTypeList() {
      listType().then((response) => {
        this.typeList = response.list;
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listFlow(this.queryParams).then((response) => {
        this.flowList = response.list;
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
      this.title = "添加流程";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const flowId = row.flowId || this.ids;
      getFlow(flowId).then((response) => {
        this.form = response;
        this.form.unitId = [];
        this.form.flowUnitInfoVOS.map((item) => {
          this.form.unitId.push(item.unitId);
        });
        this.$nextTick(() => {
          this.$refs.dept.setCheckedKeys(this.form.unitId);
        });
        this.open = true;
        this.title = "修改流程";
      });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.flowId != undefined) {
            this.form.unitId = this.getMenuAllCheckedKeys();
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
            this.form.unitId = this.getMenuAllCheckedKeys();
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
      const Flowname = row.flowName;
      const FlowId = row.flowId;
      this.$confirm(
        '是否确认删除流程名称为"' + Flowname + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delarr(FlowId);
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
