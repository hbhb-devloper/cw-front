<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-04 18:26:04
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-06 14:57:35
-->
<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="save"
          >保存</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column
        align="center"
        label="单位名称"
        prop="unitName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="年初预算金额（元）"
        prop="budget"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.budget"
            placeholder="请输入年初预算金额"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已使用金额" prop="amountPaid" />
      <el-table-column align="center" label="备注" prop="remark">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.remark"
            placeholder="请输入备注"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预算使用比例" prop="proportion">
        <template slot-scope="scope">
          <el-progress
            :percentage="scope.row.proportion"
            v-if="scope.row.proportion"
          ></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { materialsList, materialsPut } from "@/api/propaganda/control";
import { pageRole } from "@/api/system/role";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 角色表格数据
      controlList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    save() {
      materialsPut(this.controlList).then((res) => {
        this.$message.success("保存成功");
        this.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      materialsList().then((response) => {
        this.controlList = response;
        this.loading = false;
      });
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