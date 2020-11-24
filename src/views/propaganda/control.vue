<template>
  <div class="app-container">
      <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
        >保存</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="roleList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column
        align="center"
        label="单位名称"
        prop="roleName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="年初预算金额（元）"
        prop="roleKey"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" label="已使用金额" prop="sortNum" />
      <el-table-column align="center" label="备注" prop="sortNum" >
        <template slot-scope="scope">
          <el-input  v-model="scope.row.roleName" placeholder="请输入备注"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预算使用比例" prop="percentage" >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.percentage" v-if="scope.row.percentage"></el-progress>
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
.tips{
  width: 100%;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 10px;
}
</style>