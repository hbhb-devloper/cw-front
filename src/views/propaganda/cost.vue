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
          >发起审批</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tips">
      如果发起审批，等待审核的默认审核通过，没有提交的同意采购数为0。
      <el-button size="mini" type="text" @click="openState"
        >查看各单位状态</el-button
      >
      <el-button size="mini" type="text" @click="openDetail"
        >查看明细</el-button
      >
    </div>
    <el-table v-loading="loading" :data="GoodsList">
      <el-table-column align="center" label="序号" prop="lineNum" />
      <el-table-column align="center" label="单位" prop="unitName" />
      <el-table-column align="center" label="物料名称" prop="goodsName" />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column
        align="center"
        label="业务单式申请数量"
        prop="simplexAmount"
      />
      <el-table-column
        align="center"
        label="宣传单页申请数量"
        prop="singleAmount"
      />
    </el-table>

    <!-- 查看明细详情弹窗 -->
    <el-dialog :title="title" :visible.sync="detailOpen" width="800px">
      <div class="summarytitle">宣传单页申请表</div>
      <el-table v-loading="loading" :data="detailSingleList">
        <el-table-column align="center" label="序号" prop="lineNum" />
        <el-table-column align="center" label="单位" prop="unitName" />
        <el-table-column align="center" label="物料名称" prop="goodsName" />
        <el-table-column align="center" label="计量单位" prop="unit" />
        <el-table-column
          align="center"
          label="业务单式申请数量"
          prop="simplexAmount"
        />
        <el-table-column
          align="center"
          label="宣传单页申请数量"
          prop="singleAmount"
        />
      </el-table>
      <div class="summarytitle">业务单式申请表</div>
      <el-table v-loading="loading" :data="detailSimpleList">
        <el-table-column align="center" label="序号" prop="lineNum" />
        <el-table-column align="center" label="单位" prop="unitName" />
        <el-table-column align="center" label="物料名称" prop="goodsName" />
        <el-table-column align="center" label="计量单位" prop="unit" />
        <el-table-column
          align="center"
          label="业务单式申请数量"
          prop="simplexAmount"
        />
        <el-table-column
          align="center"
          label="宣传单页申请数量"
          prop="singleAmount"
        />
      </el-table>
    </el-dialog>

    <!-- 查看状态详情弹窗 -->
    <el-dialog :title="title" :visible.sync="StateOpen" width="800px">
      <el-table v-loading="loading" :data="StateList">
        <el-table-column align="center" label="单位" prop="unitName" width="100"/>
        <el-table-column align="center" label="状态" prop="state" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  applicationGoods,
  applicationDetailInfoList,
  applicationDetailStateList,
} from "@/api/propaganda/cost";
import { goodsTime } from "@/api/propaganda/flyer";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      title: "",
      // 详情弹窗判断
      detailOpen: false,
      // 遮罩层
      loading: true,
      // 费用签报表格数据
      GoodsList: [],
      // 详情表格数据
      detailList: [],
      queryParams: {},
      deptOptions: [],
      timeOption: [],
      detailSimpleList: [],
      detailSingleList: [],
      StateOpen: false,
      StateList: [],
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    // 打开状态弹窗
    openState() {
      applicationDetailStateList(this.queryParams).then((res) => {
        this.StateList = res;
        this.StateOpen = true;
        this.title = "查看状态";
      });
    },
    // 打开详情弹窗
    openDetail() {
      applicationDetailInfoList(this.queryParams).then((res) => {
        this.detailSingleList = res.singList;
        this.detailSimpleList = res.singList;
        this.detailOpen = true;
        this.title = "查看详情";
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        this.getList();
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      applicationGoods(this.queryParams).then((response) => {
        this.GoodsList = response.list;
        this.loading = false;
      });
    },
    // 根据时间获取一共有几次
    changeTime() {
      goodsTime(this.queryParams.time).then((res) => {
        this.timeOption = res.goodsIndexList;
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
<style scoped>
.tips {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 10px;
}
.summarytitle {
  font-weight: bold;
  font-size: 18px;
}
</style>