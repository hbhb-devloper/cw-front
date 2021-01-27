<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-06 10:22:55
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-27 13:51:17
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
        />
      </el-form-item>
      <el-form-item
        label="营业厅"
        prop="hallId"
        v-if="typeName == 'HallUpload'"
      >
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
          size="small"
          style="width: 200px"
          @change="changeCategory"
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
          @change="changePeriod"
        >
          <el-option
            v-for="dict in periodOption"
            :key="dict.id"
            :label="dict.label"
            :value="dict.id"
          />
        </el-select>
        <el-date-picker
          v-model="queryParams.launchTime"
          :type="dataType"
          placeholder="选择报表周期"
          size="small"
          style="width: 200px"
          :value-format="dataTypeFormat"
          :format="dataTypeFormat"
          :clearable="false"
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.periodInfo"
          placeholder="请选择"
          size="small"
          style="width: 200px"
          v-if="
            queryParams.period == '1' ||
            queryParams.period == '3' ||
            queryParams.period == '4'
          "
        >
          <el-option
            v-for="dict in reportTheDays"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 报表表单 -->
    <el-table v-loading="loading" :data="reportList">
      <el-table-column
        align="center"
        label="序号"
        prop="lineNumber"
        width="50"
      />
      <el-table-column
        align="center"
        label="营业厅名称"
        prop="hallName"
        v-if="typeName == 'HallUpload'"
      />
      <el-table-column
        align="center"
        label="分公司名称"
        prop="unitName"
        v-else
      />
      <el-table-column align="center" label="管理内容" prop="manageName" />
      <el-table-column align="center" label="报表名称" prop="reportName" />
      <el-table-column align="center" label="报表周期" prop="periodName" />
      <el-table-column align="center" label="报表时间" prop="launchTime" />
      <el-table-column align="center" label="报表状态" prop="stateName" />
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
import { getHallSelect, getHallSelectHallByUserId } from "@/api/system/hall";
import { reportUnitList } from "@/api/report/unitUpload";
import { manageSelect } from "@/api/report/management";
import { categoryName, propertyPeriod } from "@/api/report/reportName";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
import { prefix } from "@/api/report/report";
import { exportData1 } from "@/utils/export";
import { dateFormat } from "@/utils/index";
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
        unitId: undefined,
        hallId: undefined,
        manageId: undefined,
        categoryId: undefined,
        state: undefined,
        period: undefined,
        launchTime: undefined,
        periodInfo: undefined,
        relationName: undefined,
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
      // 日期选择类型
      dataType: undefined,
      // 日期展现格式
      dataTypeFormat: "yyyy-MM",
      // 旬、季度、半年下拉框
      reportTheDays: [],
      // 页面类型
      typeName: undefined,
      // 自己的userId
      myUserId: undefined,
    };
  },
  created() {
    this.myUserId = this.$store.getters.id;
    this.typeName = this.$route.name;
    this.getTreeselect();
    
    // this.getDicts("report", "report_period").then((response) => {
    //   this.periodOption = response;
    // });
    this.getDicts("report", "report_approver_state").then((response) => {
      this.reportStateOption = response;
    });
  },
  methods: {
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
    // 修改报表周期
    changePeriod(val) {
      this.queryParams.periodInfo = undefined;
      let date = new Date();
      let nowDay = dateFormat("YYYY-mm-dd", date);
      let nowMonth = dateFormat("YYYY-mm", date);
      let nowYear = dateFormat("YYYY", date);
      if (val == "0") {
        this.dataTypeFormat = "yyyy-MM-dd";
        this.dataType = "date";
        this.queryParams.launchTime = nowDay;
      } else if (val == "1") {
        this.dataType = "month";
        this.dataTypeFormat = "yyyy-MM";
        this.queryParams.launchTime = nowMonth;
        this.getDicts("report", "report_the_days").then((response) => {
          this.reportTheDays = response;
        });
      } else if (val == "2") {
        this.dataTypeFormat = "yyyy-MM";
        this.dataType = "month";
        this.queryParams.launchTime = nowMonth;
      } else if (val == "3") {
        this.dataTypeFormat = "yyyy";
        this.dataType = "year";
        this.queryParams.launchTime = nowYear;
        this.getDicts("report", "report_season").then((response) => {
          this.reportTheDays = response;
        });
      } else if (val == "4") {
        this.dataTypeFormat = "yyyy";
        this.queryParams.launchTime = nowYear;
        this.dataType = "year";
        this.getDicts("report", "report_half_year").then((response) => {
          this.reportTheDays = response;
        });
      } else if (val == "5") {
        this.dataTypeFormat = "yyyy";
        this.queryParams.launchTime = nowYear;
        this.dataType = "year";
      }
    },
    // 通过修改管理内容获取管理名称下拉框
    changeManage(val) {
      categoryName({ manageId: val }).then((res) => {
        this.reportNameOptions = res;
        this.queryParams.categoryId = res[0].id;
        this.getPropertyPeriod(res[0].id);
      });
    },
    // 通过修改报表名称获取报表周期
    changeCategory(val) {
      this.getPropertyPeriod(val);
    },
    // 报表名称变换
    getPropertyPeriod(categoryId) {
      propertyPeriod({ categoryId: categoryId }).then((res) => {
        this.periodOption = res;
        if (res.length > 0) {
          this.$set(this.queryParams, "period", res[0].id);
          // this.queryParams.period = res[0].id;
          this.changePeriod(res[0].id);
        } else {
          this.queryParams.period = undefined;
          this.queryParams.launchTime = undefined;
          this.queryParams.periodInfo = undefined;
        }
        this.getList();
      });
    },
    /** 查询报表列表 */
    getList() {
      this.loading = true;
      reportUnitList(this.queryParams).then((response) => {
        this.reportList = response.list;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 改变unit的值
    // changeUnit(value) {
    //   getHallSelect(value).then((res) => {
    //     if (this.typeName == "HallUpload") {
    //       this.queryParams.hallId = res[0].id;
    //     }
    //     this.hallList = res;
    //   });
    // },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        getHallSelectHallByUserId({userId:this.myUserId}).then((res) => {
          if (this.typeName == "HallUpload") {
            this.queryParams.hallId = res[0].id;
          }
          this.hallList = res;
        manageSelect().then((res) => {
          this.manageOptions = res;
          this.queryParams.manageId = res[0].id;
          categoryName({ manageId: res[0].id }).then((res) => {
            this.reportNameOptions = res;
            this.queryParams.categoryId = res[0].id;
            this.getPropertyPeriod(res[0].id);
          });
        });
        });
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出上传情况汇总项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/report/count/export`,
            "上传情况汇总项"
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