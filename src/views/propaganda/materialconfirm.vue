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
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button
          icon="el-icon-refresh"
          size="mini"
          type="success"
          :disabled="multiple"
          @click="save(2)"
          >同意</el-button
        >
        <el-button
          icon="el-icon-refresh"
          size="mini"
          type="danger"
          :disabled="multiple"
          @click="save(3)"
          >拒绝</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="GoodsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column align="center" label="单位" prop="unitName" />
      <el-table-column align="center" label="物料名称" prop="goodsName" />
      <el-table-column align="center" label="本期申请数量" prop="modifyAmount">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="gotoDetail(scope.row)">{{
            scope.row.modifyAmount
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看明细详情弹窗 -->
    <el-dialog :title="title" :visible.sync="detailOpen" width="800px">
      <el-table v-loading="loading" :data="DetailList">
        <el-table-column align="center" label="分公司" prop="unitName" />
        <el-table-column align="center" label="营业厅" prop="hallName" />
        <el-table-column align="center" label="物料名称" prop="goodsName" />
        <el-table-column align="center" label="申请数量" prop="modifyAmount" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { goodsTime } from "@/api/propaganda/flyer";
import {
  applicationDetailList,
  applicationDetailHallList,
  saveApplication,
} from "@/api/propaganda/materialconfirm";
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
      // 查询条件
      queryParams: {},
      // 部门下拉框
      deptOptions: [],
      // 次数下拉框
      timeOption: [],
      // 详情列表
      DetailList: [],
      multiple: true,
      // 多选内容
      selection: [],
    };
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    save(state) {
      let saveData = {
        list: this.selection,
        detailState: state,
      };
      saveApplication(saveData).then((res) => {
        console.log("saveApplication", res);
        this.getList();
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.multiple = !selection.length;
    },
    gotoDetail(row) {
      let queryParams = {
        unitId: this.queryParams.unitId,
        goodsId: row.goodsId,
      };
      applicationDetailHallList(queryParams).then((res) => {
        console.log("applicationDetailHallList", res);
        this.DetailList = res;
        this.detailOpen = true;
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
      applicationDetailList(this.queryParams).then((response) => {
        this.GoodsList = response;
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
  },
};
</script>
