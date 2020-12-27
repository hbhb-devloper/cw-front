<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect v-model="queryParams.unitId" :options="deptOptions" placeholder="请选择单位" />
      </el-form-item>
      <el-form-item label="项目类型" prop="projectItem">
        <el-input placeholder="请输入项目类型" v-model="queryParams.projectItem" size="small" />
      </el-form-item>
      <el-form-item label="时间" prop="year">
        <el-date-picker v-model="queryParams.year" value-format="yyyy" type="year" placeholder="选择年份"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['budget:progress:export']"
        >导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :border="false"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren1'}"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      highlight-current-row
      header-cell-class-name="is-center"
    >
      <el-table-column prop="itemName" label="项目类别名称" width="300"></el-table-column>
      <el-table-column prop="balance" label="本年预算值(万元)" align="center" width="150"></el-table-column>
      <el-table-column prop="amount" align="center" label="已立项值(万元)" width="150"> 
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="Showproject(scope.row)"
            :disabled="scope.row.itemName=='合计'"
          >{{scope.row.amount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="surplus" label="本年结余(万元)" align="center" width="150"></el-table-column>
      <el-table-column prop="percentage" align="center" label="预算进度百分比" >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.percentage" v-if="scope.row.percentage"></el-progress>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="已立项值" :visible.sync="outerVisible">
      <el-table
        :data="ProjectList"
        v-loading="loading1"
        @row-click="gotodetail"
        row-class-name="pointer"
      >
        <el-table-column property="projectNum" label="编号" width="200">
          <template style="color:#409EFF" slot-scope="scope">
            <div style="color:#409EFF;">{{scope.row.projectNum}}</div>
          </template>
        </el-table-column>
        <el-table-column property="projectName" label="项目名称" width="200"></el-table-column>
        <el-table-column property="projectItemName" label="项目类别名称" width="200"></el-table-column>
        <el-table-column property="amount" label="金额"></el-table-column>
      </el-table>
      <el-dialog title="签报详情" :visible.sync="innerVisible" append-to-body width="1000px">
        <el-form ref="queryForm" :inline="true" label-position="top">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目名称">
                <el-input v-model="obj2.projectName" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目预算总额(万元)">
                <el-input v-model="obj2.amount" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可供分配预算(万元)">
                <el-input v-model="obj2.availableAmount" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本年项目成本(万元)">
                <el-input v-model="obj2.cost" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="增值税率">
                <el-select placeholder="-请选择-" v-model="obj2.vatRate" disabled>
                  <el-option value="1" label="1%"></el-option>
                  <el-option value="1.5" label="1.5%"></el-option>
                  <el-option value="3" label="3%"></el-option>
                  <el-option value="6" label="6%"></el-option>
                  <el-option value="10" label="10%"></el-option>
                  <el-option value="11" label="11%"></el-option>
                  <el-option value="13" label="13%"></el-option>
                  <el-option value="16" label="16%"></el-option>
                  <el-option value="17" label="17%"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本年增值税金(万元)">
                <el-input v-model="obj2.vatAmount" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本年价税合计(万元)">
                <el-input v-model="obj2.taxIncludeAmount" size="small" disabled />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="责任人">
                <el-input v-model="obj2.director" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工程编号">
                <el-input v-model="obj2.engineeringNum" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目开始时间">
                <el-date-picker type="date" v-model="obj2.startTime" placeholder="选择日期" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目结束时间">
                <el-date-picker type="date" v-model="obj2.endTime" placeholder="选择日期" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商">
                <el-input v-model="obj2.supplier" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目来源">
                <el-select placeholder="请选择" v-model="obj2.origin" disabled>
                  <el-option value="新建" label="新建"></el-option>
                  <el-option value="结转" label="结转"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目简介">
                <el-input v-model="obj2.introduction" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目详细说明">
                <el-input v-model="obj2.detail" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目实施目标">
                <el-input v-model="obj2.target" size="small" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="obj2.remarks" size="small" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { updateBudget } from "@/api/budget/decompose/decompose";
import { getProgressList, getProjectList } from "@/api/budget/schedule";
import { getToken } from "@/utils/auth";
import { exportData1 } from "@/utils/export";
import { prefix } from "@/api/budget/budget";
import { GetInfo , GetProjectInfo} from "@/api/budget/report/report";

export default {
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 遮罩层
      loading1: true,
      obj2: {},
      fileList: [],
      queryParams: {
        unitId: undefined,
        year: undefined,
      },
      unitId: undefined,
      tableData: [],
      city: "",
      year: "",
      obj: {
        subject: "",
        company: "",
        budget: "",
        threshold: "",
        yearthis: "",
        remarks: "",
      },
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      ActionUrl: process.env.VUE_APP_BASE_API + "/budget/import", // 上传的图片服务器地址
      outerVisible: false,
      innerVisible: false,
      ProjectList: [],
      morenUnit: undefined,
    };
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    gotodetail(row) {
      if (row.id) {
         GetProjectInfo(row.projectNum).then((res) => {
      // GetInfo(row.id).then((res) => {
        res.vatRate=String(Number(res.vatRate)*100) 
        this.innerVisible = true;
        this.obj2 = res;
      });
      }else{
        this.$message.error("该项目无详细信息")
      }
     
    },
    Showproject(row) {
      this.outerVisible = true;
      this.loading1 = true;
      let qParams = {};
      qParams.unitId = this.queryParams.unitId;
      qParams.budgetId = row.id;
      getProjectList(qParams).then((res) => {
        this.loading1 = false;
        this.ProjectList = res;
      });
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      getProgressList(this.queryParams).then((response) => {
        console.log("getProgressList", response);
        response.map((item) => {
          if (item.amount) {
            item.amount = item.amount.toFixed(2);
          }
          if (item.balance) {
            item.balance = item.balance.toFixed(2);
          }
          if (item.percentage) {
            item.percentage = item.percentage.toFixed(2);
          }
          if (item.surplus) {
            item.surplus = item.surplus.toFixed(2);
          }
          if (item.children) {
            item.children.map((childrenItem) => {
              if (childrenItem.amount) {
                childrenItem.amount = childrenItem.amount.toFixed(2);
              }
              if (childrenItem.balance) {
                childrenItem.balance = childrenItem.balance.toFixed(2);
              }
              if (childrenItem.percentage) {
                childrenItem.percentage = childrenItem.percentage.toFixed(2);
              }
              if (childrenItem.surplus) {
                childrenItem.surplus = childrenItem.surplus.toFixed(2);
              }
            });
          }
        });
        this.tableData = response;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked;
        that.queryParams.unitId = response.checked;
        that.getList();
      });
    },
    handleQuery() {
      // if (this.queryParams.year) {
      //   this.queryParams.date =
      //     this.queryParams.year.getFullYear() +
      //     "-" +
      //     (this.queryParams.year.getMonth() + 1);
      // } else {
      //   this.queryParams.date = undefined;
      // }
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
    },
    // 表单重置
    reset() {
      this.form = {
        itemName: undefined,
        company: undefined,
        oldValue: undefined,
        newValue: undefined,
        difValue: undefined,
        remark: undefined,
      };
      this.resetForm("form");
    },
    //修改
    handleEdit(row) {
      this.reset();
      this.form = row;
      this.open = true;
      this.title = "预算调整";
    },
    /** 提交按钮 */
    submitForm: function () {
      updateBudget(this.form)
        .then((response) => {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        })
        .catch((err) => {
          this.msgError(err.message);
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //提交
    handleSubmit() {
      this.centerDialogVisible = false;
    },
    /** 导出按钮操作 */
    handleExport() {
      let that = this;
      this.$confirm("是否确认导出该部门的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            that.queryParams,
            `${prefix}/progress/export`,
            "预算目标与进度"
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function (err) {});
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}

.container {
  width: 90%;
  margin: 20px auto 0 auto;

  .top-control {
    margin-bottom: 20px;

    label {
      margin-right: 30px;
    }
  }
}

.el-col-8 {
  height: 100px;
}

/deep/ .el-table__row--level-0 {
  background: #f5f7fa;
}

.pointer {
  cursor: pointer;
}
</style>
