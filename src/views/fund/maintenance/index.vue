<template>
  <div class="app-container">
    <div class="uploadList">
      <div style="color:blue;">发票单位信息导入模板下载</div>
      <div style="color:red;">注意：导入单位模块后，请认真查看返回信息，若没有提示导入成功，则需要重新编辑模板导入</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column prop="date" label="数据导入检查结果" ></el-table-column>
      </el-table>
    </div>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位名称" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择单位"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="单位编号" prop="flowRoleId">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入单位编号"
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
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" v-if="false">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="flowList">
      <el-table-column label="序号" prop="id" align="center" />
      <el-table-column label="单位名称" prop="unitName" align="center" />
      <el-table-column label="单位编号" prop="unitCode" align="center" />
      <el-table-column label="是否启用(1为是,0为否)" prop="state" align="center" />
      <el-table-column label="期初金额" prop="initialAmount" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click.stop="handleDelete(scope.row)">提交</el-button>
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
  </div>
</template>

<script>
import { getUnitList} from "@/api/fund/maintenance/index";
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
      tableData: [
        {
          date: "3行A列单位名称数据重复",
        },
        {
          date: "3行A列单位名称数据重复",
        },
      ],
      fileList: [],
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
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
    getList() {
      this.loading = true;
      getUnitList(this.queryParams).then(response=> {
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
  width: 230px;
} */
.uploadList {
  width: 100%;
  padding: 15px;
  border: 1px solid #0d8efd;
  border-radius: 15px;
  margin-bottom: 15px;
}
</style>
