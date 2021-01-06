<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:24:22
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-06 15:19:26
-->
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
      <el-form :model="queryParams" ref="queryForm" :inline="true">
     
      
       <el-form-item label="管理内容" prop="hallId">
        <el-input
          v-model="queryParams.hallId"
          placeholder="请输入管理内容"
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
          >添加</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >批量修改管理内容下报表起止时间</el-button
        >
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="controlList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column
        align="center"
        label="管理内容名称"
        prop="unitName"
      />
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
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
        <el-table-column
        label="批量修改"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            >修改报表起止时间</el-button
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
