<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
       <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="选择分公司"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="营业厅" prop="hallId">
        <el-input
          v-model="queryParams.hallId"
          placeholder="请输入营业厅"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          type="month"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
          value-format="yyyy-MM"
          format="yyyy-MM"
          @change="changeTime"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.goodsIndex"
          placeholder="请选择第几次"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="(dict,index) in timeOption"
            :key="index"
            :label="'第'+dict+'次'"
            :value="dict"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini"
          >提交</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini"
          >导出</el-button
        >
      </el-col>
    </el-row>
    
    <el-table v-loading="loading" :data="singleList">
      <el-table-column align="center" label="序号" prop="id" />
      <el-table-column
        align="center"
        label="营业厅"
        prop="roleName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="goodsName"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column align="center" label="物料归属单位" prop="sortNum" />
      <el-table-column align="center" label="申请数量" prop="applyAmount" />
      <el-table-column align="center" label="修改后申请数量" prop="sortNum" >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.state"
            placeholder="修改后申请数量"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { goodsTime } from "@/api/propaganda/flyer";
import { listUnit, UNroleMenuTreeselect } from "@/api/system/unit";
import { resourceTreeByUN } from "@/api/system/unit";
import { verifySingle , verifySimplex } from "@/api/propaganda/summary";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
import Treeselect from "@riophae/vue-treeselect";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 宣传单页表格数据
      singleList: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      // 部门树选项
      deptOptions: undefined,
      queryParams: {
        hallId: 1,
      },
      timeOption:[]
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();

  },
  methods: {
     // 根据时间获取一共有几次
    changeTime() {
      goodsTime(this.queryParams.time).then(res=>{
        this.timeOption=res.goodsIndexList
      })
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked[0];
        this.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      verifySingle(this.queryParams).then((response) => {
        this.singleList = response.singleList;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
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
