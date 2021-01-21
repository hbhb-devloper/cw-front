<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:22:55
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-21 10:14:43
-->
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="上报单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="选择上报单位"
          style="width: 200px"
          @input="changeUnit"
        />
      </el-form-item>
      <el-form-item label="营业厅" prop="hallId">
        <el-select
          v-model="queryParams.hallId"
          placeholder="请选择营业厅"
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in hallList"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理内容" prop="manageId">
        <el-select
          v-model="queryParams.manageId"
          placeholder="请选择管理内容"
          clearable
          size="small"
          style="width: 200px"
          @change="changeManage"
        >
          <el-option
            v-for="dict in manageOptions"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报表名称" prop="categoryId">
        <el-select
          v-model="queryParams.categoryId"
          placeholder="请选择管理内容"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in reportNameOptions"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报表状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择报表状态"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in reportStateOption"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报表周期" prop="period">
        <el-select
          v-model="queryParams.period"
          placeholder="请选择报表周期"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in periodOption"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <el-date-picker
          v-model="queryParams.launchTime"
          type="month"
          placeholder="选择报表周期"
          size="small"
          style="width: 200px"
          value-format="yyyy-MM"
          format="yyyy-MM"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关联单名称" prop="relationName">
        <el-input
          v-model="queryParams.relationName"
          placeholder="请输入关联单名称"
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
      </el-form-item>
    </el-form>
    
    <!-- 报表表单 -->
    <el-table
      v-loading="loading"
      :data="reportList"
    >
      <el-table-column
        align="center"
        label="序号"
        prop="lineNumber"
        width="50"
      />
      <el-table-column align="center" label="关联单名称" prop="relationName" />
      <el-table-column align="center" label="有无业务" prop="hasBizName" />
      <el-table-column align="center" label="管理内容" prop="manageName" />
      <el-table-column align="center" label="报表名称" prop="reportName" />
      <el-table-column align="center" label="报表周期" prop="periodName" />
      <el-table-column align="center" label="创建人" prop="founderName" />
      <el-table-column align="center" label="创建时间" prop="createTime" />
      <el-table-column align="center" label="流程状态" prop="stateName" />
      <el-table-column
        label="操作"
        align="center"
        width=""
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="deleteReport(scope.row)"
            >删除</el-button
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
    
  </div>
</template>
<script>
import { resourceTreeByUN } from "@/api/system/unit";
import { getHallSelect } from "@/api/system/hall";
import { reportUnitList } from "@/api/report/unitUpload";
import { manageSelect } from "@/api/report/management";
import { categoryName } from "@/api/report/reportName";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      // 部门树选项
      deptOptions: undefined,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 报表列表
      reportList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
       // 管理内容下拉框
      manageOptions: [],
      // 周期下拉框
      periodOption: [],
      // 报表状态下拉框
      reportStateOption: [],
      // 报表名称下拉框
      reportNameOptions: [],
      // 营业厅下拉框
      hallList: [],
    };
  },
  created() {
    this.getTreeselect();
    this.getManageSelect();
    this.getDicts("report", "report_period").then((response) => {
      this.periodOption = response;
    });
    this.getDicts("report", "report_approver_state").then((response) => {
      this.reportStateOption = response;
    });
  },
  methods:{
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
    // 通过修改管理内容获取管理名称下拉框
    changeManage(val) {
      categoryName({ manageId: val }).then((res) => {
        this.reportNameOptions = res;
      });
    },
      /** 查询报表列表 */
    getList() {
      this.loading = true;
      reportUnitList(this.queryParams).then((response) => {
        this.reportList = response.list;
        this.total = response.totalRow;
        this.loading = false;
      });
    },
      // 获取管理内容下拉框
    getManageSelect() {
      manageSelect().then((res) => {
        this.manageOptions = res;
      });
    },
      // 改变unit的值
    changeUnit(value) {
      getHallSelect(value).then((res) => {
        this.queryParams.hallId = res[0].id;
        this.hallList = res;
      });
    },
       /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        getHallSelect(response.checked).then((res) => {
          this.queryParams.hallId = res[0].id;
          this.hallList = res;
          this.getList();
        });
      });
    },
  }
}
</script>