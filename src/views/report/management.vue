<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:47
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-06 15:12:34
-->
<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="save"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column
        align="center"
        label="管理内容名称"
        prop="unitName"
      >
      <template slot-scope="scope">
          <el-input
            v-model="scope.row.unitName"
            placeholder="请输入管理内容名称"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.remark"
            placeholder="请输入备注"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改人" prop="amountPaid" />
      <el-table-column align="center" label="修改时间" prop="proportion" />
      <el-table-column
        label="是否请用"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
       <el-table-column
        label="按月打包"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >启动按月打包</el-button
          >
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >保存</el-button
          >
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
        console.log("materialsPut", res);
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
