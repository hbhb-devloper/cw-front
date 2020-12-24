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
            v-for="(dict, index) in timeOption"
            :key="index"
            :label="'第' + dict + '次'"
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

    <el-table v-loading="loading" :data="purchaseList">
      <el-table-column align="center" label="物料名称" prop="goodsName" />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column align="center" label="申请数量" prop="modifyAmount" />
      <el-table-column align="center" label="尺寸" prop="size" />
      <el-table-column align="center" label="联次" prop="attribute" />
      <el-table-column align="center" label="纸张" prop="paper" />
      <el-table-column align="center" label="归属部门" prop="unitName" />
      <el-table-column align="center" label="物料负责人" prop="checker" />
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
import { goodsPurchase } from "@/api/propaganda/demand";
import { goodsTime } from "@/api/propaganda/flyer";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
import { resourceTreeByUN } from "@/api/system/unit";
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
      // 采购需求表格数据
      purchaseList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    // 根据时间获取一共有几次
    changeTime() {
      goodsTime(this.queryParams.time).then((res) => {
        this.timeOption = res.goodsIndexList;
        this.queryParams.goodsIndex = res.goodsIndex;
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      var date = new Date();
      this.$set(
        this.queryParams,
        "time",
        date.getFullYear() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0")
      );
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        goodsTime(this.queryParams.time).then((res) => {
          this.timeOption = res.goodsIndexList;
          this.$set(this.queryParams, "goodsIndex", res.goodsIndex);
          this.getList();
        });
      });
    },

    /** 查询角色列表 */
    getList() {
      this.loading = true;
      goodsPurchase(this.queryParams).then((response) => {
        this.purchaseList = response.list;
        this.total = response.totalRow;
        this.loading = false;
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