<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <el-input
          v-model="queryParams.unitId"
          placeholder="请输入单位"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="审批状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择审批状态"
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
      <el-form-item label="申请单名称" prop="printName">
        <el-input
          v-model="queryParams.printName"
          placeholder="请输入申请单名称"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请单号" prop="printNum">
        <el-input
          v-model="queryParams.printNum"
          placeholder="请输入申请单号"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
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

    <el-table v-loading="loading" :data="printList">
      <el-table-column align="center" label="申请单号" prop="printNum" />
      <el-table-column align="center" label="申请单名称" prop="printName" />
      <el-table-column align="center" label="申请单位" prop="unitName" />
      <el-table-column align="center" label="申请时间" prop="applyTime" />
      <el-table-column align="center" label="申请人" prop="userName" />
      <el-table-column
        align="center"
        label="预估金额（万元）"
        prop="predictAmount"
      />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog
      title="中国移动通信集团印刷品申请单"
      :visible.sync="SetVisible"
      width="600px"
    >
      <el-row>
        <el-col :span="8">
          <div class="flowItem">
            <el-form>
              <el-form-item label="印刷品申请人">
                <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
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
              <el-form-item label="同意原因">
            <el-select
                  v-model="queryParams.state"
                  placeholder="请选择审批状态"
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
                李华  2020/4/28 14:05:11
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { listUnit, UNroleMenuTreeselect } from "@/api/system/unit";
import { pageRole } from "@/api/system/role";
import { listPrint } from "@/api/propaganda/printed";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
export default {
  name: "Role",
  data() {
    return {
      SetVisible: true,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 印刷品表格数据
      printList: [],
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
      listPrint(this.queryParams).then((response) => {
        this.printList = response.list;
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
.tips {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 10px;
}
</style>