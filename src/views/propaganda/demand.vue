<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="归属部门" prop="roleName">
         <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="roleName">
        <el-date-picker
          v-model="queryParams.value1"
          type="datetime"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.state"
          placeholder="请选择归属部门"
          clearable
          size="small"
          style="width: 200px"
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
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    
    <el-table v-loading="loading" :data="roleList">
      
      <el-table-column
        align="center"
        label="物料名称"
        prop="roleName"
      />
      <el-table-column align="center" label="计量单位" prop="roleName" />
      <el-table-column align="center" label="申请数量" prop="roleName" />
      <el-table-column align="center" label="尺寸" prop="roleName" />
      <el-table-column align="center" label="联次" prop="roleName" />
      <el-table-column align="center" label="纸张" prop="roleName" />
      <el-table-column align="center" label="归属部门" prop="roleName" />
      <el-table-column align="center" label="物料负责人" prop="roleName" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listUnit, UNroleMenuTreeselect } from "@/api/system/unit";
import { pageRole } from "@/api/system/role";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleType: "UN",
        roleName: undefined,
        roleKey: undefined,
        state: undefined,
      },
    };
  },
  created() {
    this.getList();
    this.getMenuTreeselect();
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      pageRole(this.queryParams).then((response) => {
        this.roleList = response.list;
        this.total = response.count;
        this.loading = false;
      });
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      listUnit().then((response) => {
        this.menuOptions = response;
      });
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
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有角色数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportRole(queryParams);
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

</style>