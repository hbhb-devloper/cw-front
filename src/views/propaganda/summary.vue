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
        <el-select
          v-model="queryParams.hallId"
          placeholder="请选择营业厅"
          clearable
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
      <el-form-item label="状态" prop="detailState">
        <el-select
          v-model="queryParams.detailState"
          placeholder="请选择状态"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="item in StateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        <el-button icon="el-icon-refresh" size="mini" @click="save"
          >保存</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <div>
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="submit"
            >提交</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="handleExport"
            >导出</el-button
          >
        </el-col>
      </div>
      <div class="summarytitle checkerState">{{ checkerState }}</div>
    </el-row>

    <div class="summarytitle">宣传单页申请表</div>
    <el-table v-loading="loading" :data="singleList">
      <el-table-column align="center" label="序号" prop="lineNum" />
      <el-table-column
        align="center"
        label="营业厅"
        prop="hallName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="goodsName"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column align="center" label="物料归属单位" prop="unitName" />
      <el-table-column align="center" label="申请数量" prop="applyAmount" />
      <el-table-column
        align="center"
        label="修改后申请数量"
        prop="modifyAmount"
      >
        <template slot-scope="scope">
          <el-input
            type="number"
            v-model="scope.row.modifyAmount"
            placeholder="修改后申请数量"
            :disabled="scope.row.state == 1 || scope.row.state == 2"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="summarytitle">业务单式申请表</div>
    <el-table v-loading="loading" :data="simplexList">
      <el-table-column align="center" label="序号" prop="lineNum" />
      <el-table-column
        align="center"
        label="营业厅"
        prop="hallName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="goodsName"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column align="center" label="物料归属单位" prop="unitName" />
      <el-table-column align="center" label="申请数量" prop="applyAmount" />
      <el-table-column
        align="center"
        label="修改后申请数量"
        prop="modifyAmount"
      >
        <template slot-scope="scope">
          <el-input
            type="number"
            v-model="scope.row.modifyAmount"
            placeholder="修改后申请数量"
            :disabled="scope.row.state == 1 || scope.row.state == 2"
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
import {
  verifyList,
  verifySave,
  verifyChanger,
  verifySubmit,
} from "@/api/propaganda/summary";
import { resourceTree, roleMenuTreeselect } from "@/api/system/resource";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
import { prefix } from "@/api/propaganda/propaganda";
import { exportData1 } from "@/utils/export";
import { getHallSelect, getHallSelectHallByUserId } from "@/api/system/hall";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      // 转态下拉框
      StateOption: [],
      // 遮罩层
      loading: true,
      // 宣传单页表格数据
      singleList: [],
      simplexList: [],
      // 状态数据字典
      statusOptions: [
        { dictValue: 1, dictLabel: "正常" },
        { dictValue: 2, dictLabel: "停用" },
      ],
      // 部门树选项
      deptOptions: undefined,
      queryParams: {},
      timeOption: [],
      flag: true,
      checkerState: "",
      // 营业厅下拉框
      hallList: [],
      // 当前用户Id
      myUserId: undefined,
    };
  },
  created() {
    // this.getList();
    this.myUserId = this.$store.getters.id;
    this.getTreeselect();
    this.getStateOption();
    this.getDicts("publicity", "application_detail_state").then((response) => {
      this.StateOption = response;
    });
  },
  methods: {
    // 获取状态下拉框
    getStateOption() {},
    // 修改
    changer() {
      let that = this;
      this.$confirm("确认修改数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        let changeList = [];
        that.singleList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            modifyAmount: item.modifyAmount,
          });
        });
        that.simplexList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            modifyAmount: item.modifyAmount,
          });
        });
        verifyChanger(changeList).then((res) => {
          that.msgSuccess("修改成功");
          that.getList();
        });
      });
    },
    // 保存
    save() {
      let that = this;
      this.$confirm("确认保存数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        let changeList = [];
        that.singleList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            modifyAmount: item.modifyAmount,
          });
        });
        that.simplexList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            modifyAmount: item.modifyAmount,
          });
        });
        let dataObj = {
          goodsReqVO: that.queryParams,
          list: changeList,
        };
        verifySave(dataObj).then((res) => {
          that.msgSuccess("保存成功");
          that.getList();
        });
      });
    },
    // 提交
    submit() {
      let that = this;
      this.$confirm("提交保存数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        that.queryParams.flag = that.flag;
        let changeList = [];
        that.singleList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            goodsId: item.goodsId,
            modifyAmount: item.modifyAmount,
          });
        });
        that.simplexList.map((item) => {
          changeList.push({
            id: item.applicationDetailId,
            goodsId: item.goodsId,
            modifyAmount: item.modifyAmount,
          });
        });
        let dataObj = {
          goodsReqVO: that.queryParams,
          list: changeList,
        };
        verifySubmit(dataObj).then((res) => {
          that.msgSuccess("提交成功");
          that.getList();
        });
      });
    },
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
        getHallSelectHallByUserId({ userId: this.myUserId }).then((res) => {
          // if (res[0].id) {
          //   this.queryParams.hallId = res[0].id;
          // }
          this.hallList = res;
          goodsTime(this.queryParams.time).then((res) => {
            this.timeOption = res.goodsIndexList;
            this.$set(this.queryParams, "goodsIndex", res.goodsIndex);
            this.getList();
          });
        });
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      verifyList(this.queryParams).then((response) => {
        this.singleList = response.singleList;
        this.simplexList = response.simplexList;
        this.flag = response.flag;
        this.loading = false;
        this.checkerState = response.checkerState;
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

      this.$confirm("是否确认导出分公司汇总的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/verify/export`,
            "分公司汇总"
          );
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
.summarytitle {
  font-weight: bold;
  font-size: 18px;
}
.checkerState {
  position: absolute;
  right: 20px;
  color: red;
}
</style>