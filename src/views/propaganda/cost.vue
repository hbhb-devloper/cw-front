<template>
  <div class="app-container">
    <el-row style="margin-bottom: 25px" v-if="flowList">
      <el-col
        v-for="(item, index) in flowList"
        :key="index"
        :span="8"
        style="
          width: 300px;
          margin: 10px;
          height: 190px;
          border: 2px solid red;
          border-radius: 10px;
        "
      >
        <div class="flowItem">
          <el-form label-width="auto" label-position="left">
            <el-form-item :label="item.roleDesc">
              <el-select
                v-model="item.approver.value"
                placeholder="请选择审批人"
                clearable
                :disabled="item.approver.readOnly"
                filterable
                v-if="!item.approver.readOnly"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in item.approverSelect"
                  :key="dict.id"
                  :label="dict.label"
                  :value="dict.id"
                />
              </el-select>
              <el-input
                v-else
                disabled
                v-model="item.nickName"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="40px">
              <el-button
                size="small"
                v-if="item.controlAccess == true"
                :disabled="
                  item.operation.value == 1 || info.state == 0 ? true : false
                "
                @click="handleGetDel"
                >自定义流程</el-button
              >
              <el-button
                size="small"
                v-if="!item.operation.hidden"
                @click="handleApprove(item, 1)"
                >同意</el-button
              >
              <el-button
                size="small"
                v-if="!item.operation.hidden"
                @click="handleApprove(item, 0)"
                >拒绝</el-button
              >
            </el-form-item>
            <el-form-item label="意见">
              <el-input
                v-if="item.suggestion.readOnly"
                :disabled="item.suggestion.readOnly"
                v-model="item.suggestion.value"
                placeholder="请输入审批意见"
              ></el-input>
              <el-select
                v-else
                v-model="item.suggestion.value"
                placeholder="请选择审批意见"
                filterable
                allow-create
                default-first-option
                clearable
              >
                <el-option
                  v-for="dict in opinionList"
                  :key="dict.id"
                  :label="dict.suggestion"
                  :value="dict.suggestion"
                />
              </el-select>
            </el-form-item>
            <div class="flowItemDown" v-if="item.operation.value != 2">
              <div>
                {{ item.nickName }} ({{ item.approveTime | filterTime }})
              </div>
              <i class="el-icon-success" v-if="item.operation.value == 1"></i>
              <i class="el-icon-error" v-if="item.operation.value == 0"></i>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="选择分公司"
          style="width: 200px"
          @input="changeUnit"
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
          @click="handleLaunch"
          :disabled="!flag"
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
      <!-- <el-table-column align="center" label="物料名称" prop="goodsName" />
      <el-table-column align="center" label="计量单位" prop="unit" />
      <el-table-column align="center" label="申请数量" prop="amount" /> -->
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
        <!-- <el-table-column
          align="center"
          label="业务单式申请数量"
          prop="simplexAmount"
        /> -->
        <el-table-column align="center" label="申请数量" prop="amount" />
      </el-table>
      <div class="summarytitle">业务单式申请表</div>
      <el-table v-loading="loading" :data="detailSimpleList">
        <el-table-column align="center" label="序号" prop="lineNum" />
        <el-table-column align="center" label="单位" prop="unitName" />
        <el-table-column align="center" label="物料名称" prop="goodsName" />
        <el-table-column align="center" label="计量单位" prop="unit" />
        <el-table-column align="center" label="申请数量" prop="amount" />
        <!-- <el-table-column
          align="center"
          label="宣传单页申请数量"
          prop="singleAmount"
        /> -->
      </el-table>
    </el-dialog>

    <!-- 查看状态详情弹窗 -->
    <el-dialog :title="title" :visible.sync="StateOpen" width="800px">
      <el-table v-loading="loading" :data="StateList">
        <el-table-column
          align="center"
          label="单位"
          prop="unitName"
          width="100"
        />
        <el-table-column align="center" label="状态" prop="state" />
      </el-table>
    </el-dialog>
    <!-- 发起审批弹窗 -->
    <el-dialog title="发起审批" :visible.sync="isLaunch" width="500px">
      <el-form>
        <el-form-item label="选择流程">
          <el-select
            v-model="LaunchId"
            filterable
            :placeholder="
              LaunchOption.length == 0 ? '该单位没有流程类型' : '请选择'
            "
          >
            <el-option
              v-for="item in LaunchOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div style="width: 100%; text-align: center">
        <el-button
          type="primary"
          @click="handleCancel"
          style="margin-right: 50px"
          >取消</el-button
        >
        <el-button type="primary" @click="SubmitLaunch">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  applicationGoods,
  applicationDetailInfoList,
  applicationDetailStateList,
  applicationToApprove,
  applicationFlow,
  SubmitApprove,
} from "@/api/propaganda/cost";
import { goodsTime } from "@/api/propaganda/flyer";
import { FlowTypeList } from "@/api/flow/list.js";
import { getList } from "@/api/flow/opinion.js";
import { resourceTreeByUN } from "@/api/system/unit";
import { getHallSelect } from "@/api/system/hall";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      // 判断条件
      flag: true,
      // 选择列表
      chooseForm: [],
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
      // 发起审批判断
      isLaunch: false,
      // 流程类型下拉框
      LaunchOption: [],
      // 流程列表
      flowList: [],
      // 意见下拉框
      opinionList: [],
      LaunchId: undefined,
      batchNum: undefined,
      // 营业厅下拉框
      hallList: [],
    };
  },
  filters: {
    filterTime(e) {
      if (e) {
        return e.substr(0, 19);
      } else {
        return undefined;
      }
    },
  },
  created() {
    // this.getList();
    this.getTreeselect();
    console.log("this.$route.query.batchNum", this.$route.query.batchNum);
  },
  methods: {
    // 改变unit的值
    changeUnit(value) {
      getHallSelect(value).then((res) => {
        this.queryParams.hallId = res[0].id;
        this.hallList = res;
      });
    },
    //提交审批
    handleApprove(item, type) {
      if (!item.suggestion.value) {
        this.$message.warning("请输入你的审批意见");
        return;
      }
      let programObj = {};
      programObj.approvers = [];
      for (let key of this.flowList) {
        programObj.approvers.push({
          flowNodeId: key.flowNodeId,
          id: key.id,
          userId: key.approver.value,
        });
      }
      programObj.suggestion = item.suggestion.value;
      programObj.underUnitId = this.queryParams.unitId;
      programObj.operation = type;
      programObj.id = item.id;
      SubmitApprove(programObj).then((res) => {
        this.$message.success("提交成功");
        applicationFlow(this.batchNum).then((res) => {
          this.flowList = res.nodes;
        });
      });
    },
    handleCancel() {
      this.isLaunch = false;
    },
    //发起审批
    SubmitLaunch() {
      if (!this.LaunchId) {
        this.$message.warning("请选择流程");
        return;
      }
      let dataObj = {
        time: this.queryParams.time,
        goodsIndex: this.queryParams.goodsIndex,
        flowTypeId: this.LaunchId,
        underUnitId: this.queryParams.unitId,
      };
      applicationToApprove(dataObj).then((res) => {
        console.log("applicationToApprove", res);
        this.isLaunch = false;
        this.LaunchId = undefined;
        this.getList();
        this.$message.success("流程发起成功！");
      });
    },
    //打开发起审批流程
    handleLaunch() {
      FlowTypeList().then((response) => {
        this.LaunchOption = response;
        this.isLaunch = true;
        this.LaunchId = 36;
      });
    },
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
        this.detailSimpleList = res.simList;
        this.detailOpen = true;
        this.title = "查看详情";
      });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      var date = new Date();
      if (this.$route.query.batchNum) {
        let month =
          this.$route.query.batchNum.slice(0, 4) +
          "-" +
          this.$route.query.batchNum.slice(4, 6);
        this.$set(this.queryParams, "time", month);
      } else {
        this.$set(
          this.queryParams,
          "time",
          date.getFullYear() +
            "-" +
            (date.getMonth() + 1).toString().padStart(2, "0")
        );
      }
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        if (this.$route.query.batchNum) {
          this.queryParams.unitId = Number(this.$route.query.unitId);
        } else {
          this.queryParams.unitId = response.checked;
        }
        getHallSelect(response.checked).then((res) => {
          this.hallList = res;
        });
        goodsTime(this.queryParams.time).then((res) => {
          this.timeOption = res.goodsIndexList;
          if (this.$route.query.batchNum) {
            let index = Number(this.$route.query.batchNum.slice(6));
            this.$set(this.queryParams, "goodsIndex", index);
          } else {
            this.$set(this.queryParams, "goodsIndex", res.goodsIndex);
          }
          this.getList();
        });
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      applicationGoods(this.queryParams).then((response) => {
        this.flag = response.flag;
        this.GoodsList = response.list;
        this.loading = false;
        this.batchNum = response.batchNum;
        applicationFlow(response.batchNum).then((res) => {
          this.flowList = res.nodes;
          // 获取意见下拉框
          getList().then((res) => {
            this.opinionList = res;
          });
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
<style lang="scss" scoped>
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
.flowItem {
  margin: 10px;
  padding-right: 10px;
  // border-right: 1px solid #e6e6e6;
  height: 100%;
  padding-bottom: 10px;
  .flowItemDown {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .el-icon-success {
      color: #67c23a;
      font-size: 27px;
    }

    .el-icon-error {
      color: #f56c6c;
      font-size: 27px;
    }
  }
}
</style>