<template>
  <div class="containers">
    <div class="top-control">
      <el-col :span="24">
        <el-form ref="queryForm" :model="obj" :inline="true" label-width="100px">
          <el-form-item label="单位：" prop="unitId">
            <treeselect
              v-model="obj.unitId"
              :options="deptOptions"
              style="width: 200px"
              placeholder="请选择归属部门"
            />
          </el-form-item>
          <el-form-item style="margin-left: 30px">
            <el-radio-group v-model="radio">
              <el-radio :label="3">项目年度</el-radio>
              <el-radio :label="6">创建时间：</el-radio>
            </el-radio-group>

            <el-date-picker
              v-show="radio == 3"
              v-model="obj.projectYear"
              type="year"
              placeholder="请选择"
              style="width: 200px; margin-left: -25px"
               prop="createTime"
            >
            </el-date-picker>
            <el-date-picker
              v-show="radio == 6"
              v-model="obj.createTime"
              type="month"
              placeholder="选择月"
              style="width: 200px; margin-left: -25px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item label="项目类型：" prop="budgetId">
            <el-select
              v-model="obj.budgetId"
              filterable
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option :value="undefined" label="---全部类型---"></el-option>
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称：" prop="projectName">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectName"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px; margin-left: -5px"
            />
          </el-form-item>
          <el-form-item label="项目编号：" prop="projectNum">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectNum"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="项目状态：" prop="state">
            <el-select
              v-model="obj.state"
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option label="--默认--" value></el-option>
              <el-option
                v-for="(item, indexs) in stateArr"
                :key="indexs"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
            <el-button icon="el-icon-refresh" size="mini" @click="handleRest"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="table-btn-box">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="handleAdd"
        >新增签报</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-download"
        size="mini"
        @click="handleExport"
        v-hasPermi="['budget:project:export']"
        >导出数据</el-button
      >
      <div style="overflow: auto; margin-top: 20px">
        <el-table v-loading="loading" ref="multipleTable" :data="tableData">
          <el-table-column
            prop="projectNum"
            label="项目编号"
            align="center"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="projectName"
            style="color: #409eff"
            label="项目名称"
            align="center"
            width="180px"
          >
            <template style="color: #409eff" slot-scope="scope">
              <router-link
                style="color: #409eff"
                :to="'/budget/info/' + scope.row.id"
                >{{ scope.row.projectName }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="projectTypeName"
            label="项目类型"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="金额（万元）"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="cost"
            label="项目成本"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="vatAmount"
            label="增值税金额"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="unitName"
            label="单位"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createBy"
            align="center"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="origin"
            label="项目来源"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stateLabel"
            align="center"
            width="120px"
            label="流程状态"
          >
            <template slot-scope="scope">
              <router-link
                style="color: #409eff"
                :to="'/budget/info/' + scope.row.id"
                >{{ scope.row.stateLabel }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="itime"
            align="center"
            label="发起流程"
            fixed="right"
            width="120px"
          >
            <template slot-scope="scope">
              <router-link
                v-if="
                  scope.row.state == 20 ||
                  scope.row.state == 31 ||
                  scope.row.state == 50 ||
                  scope.row.state == 32
                "
                style="color: #409eff"
                :to="'/budget/info/' + scope.row.id"
                >查看流程</router-link
              >
              <el-button
                v-if="scope.row.state == 10"
                @click="handleLaunch(scope.row)"
                type="text"
                >发起审批</el-button
              >
              <el-button
                v-if="scope.row.state == 30 || scope.row.state == 40"
                @click="handleLaunch(scope.row)"
                type="text"
                >重新发起审批</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="编辑" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="
                  scope.row.state == 10 ||
                  scope.row.state == 30 ||
                  scope.row.state == 20
                "
                icon="el-icon-edit"
                :disabled="scope.row.state == 20 || scope.row.state == 50"
                @click="handleUpdata(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.state == 31 || scope.row.state == 40"
                icon="el-icon-edit"
                @click="handleUpdata(scope.row)"
                >调整</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="删除" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="删除调整"
            width="100px"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                :disabled="
                  scope.row.state == 10 ||
                  scope.row.state == 20 ||
                  scope.row.state == 31 ||
                  scope.row.state == 50 ||
                  scope.row.state == 32
                "
                @click="handleRevert(scope.row.id)"
                >删除调整</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="obj.pageNum"
          :limit.sync="obj.pageSize"
          @pagination="handleGetList"
        />
      </div>
    </div>

    <div class="updata-box">
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
  </div>
</template>

<script>
import {
  getList,
  getProejctType,
  deleteData,
  GetInfo,
  LaunchApprove,
  RevokeRevert,
} from "@/api/budget/report/report.js";
import { exportData } from "@/utils/export.js";
import { getToken } from "@/utils/auth";
import { dateTimes } from "@/utils/date.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapGetters } from "vuex";
import {resourceTreeByUN} from "@/api/system/unit";
import { FlowTypeList } from "@/api/flow/list.js";

export default {
  name: "standing",
  data() {
    return {
      fileList: [], //上传文件

      tableData: [],
      deptOptions: [],
      VatRateOption: [], //增值税
      obj: {
        //顶部条件查询
        unitId: undefined,
        projectYear: "",
        createTime: "",
        budgetId: undefined,
        projectName: undefined,
        projectNum: undefined,
        state: undefined,
        pageNum: 1, //页码
        pageSize: 20,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getToken(),
      },
      total: 0,
      radio: 3, //项目年度/创建时间
      centerDialogVisible: false, //新增修改弹窗
      options: [], //项目类型下拉菜单
      stateArr: [], //状态下拉菜单
      unitId: null, //单位id
      index: undefined,

      projectItem: [], //预算科目下拉菜单

      isLaunch: false, //选择流程弹窗
      LaunchOption: [], //流程类型
      LaunchId: 1, //流程类型id

      loading: true, //表格加载
      projectId: undefined, //记录id
      morenUnit:undefined
    };
  },
  created() {
    let times = new Date();
    this.radio = this.radioVal;
    this.obj = this.budgetSelect;
    if (!this.obj.projectYear) {
      this.$set(this.obj, "projectYear", times.getFullYear().toString());
    }
    this.handleLoad();
  },
  components: {
    Treeselect,
  },
  computed: {
    ...mapGetters(["budgetSelect", "radioVal"]),
    taxIncludeAmount() {
      return this.obj2.taxIncludeAmount;
    },
  },
  methods: {
    //页面初始化加载
    handleLoad() {
      //获取单位树形
      if (!this.obj.unitId) {
        resourceTreeByUN().then((res) => {
        this.obj.unitId = res.checked;
        this.morenUnit=res.checked;
        this.deptOptions = res.list;
        this.handleGetList();
      });
      }else{
        resourceTreeByUN().then((res) => {
        // this.obj.unitId = res.checked;
        this.morenUnit=res.checked;
        this.deptOptions = res.list;
        this.handleGetList();
      });

      }
      
      //获取状态下拉菜单
      this.getDicts("budget", "project_status").then((response) => {
        this.stateArr = response;
      });
      //获取项目类型下拉
      getProejctType().then((res) => {
        this.options = res;
      });
      //获取增值税下拉
      // this.getDicts("budget", "project_vat_rate").then((response) => {
      //   this.VatRateOption = response;
      // });
    },
    //获取列表
    handleGetList() {
      this.loading = true;
      this.obj.projectYear = dateTimes(this.obj.projectYear).substr(0, 4);
      this.obj.createTime = dateTimes(this.obj.createTime).substr(0, 7);
      if (this.radio != 3) {
        this.obj.projectYear = "";
      } else {
        this.obj.createTime = "";
      }
      this.$store.dispatch("SET_BUDGET_SELECT", this.obj);
      this.$store.dispatch("SET_BUDGET_RADIO", this.radio);
      let data = {};
      for (let key in this.obj) {
        if (!this.obj[key]) {
        } else {
          data[key] = this.obj[key];
        }
      }
      getList(data).then((res) => {
        this.total = res.count;
        this.tableData = res.list;
        this.loading = false;
      });
    },
    //回退版本
    handleRevert(id) {
      RevokeRevert(id).then((res) => {
        this.$message.success("回滚成功");
        this.handleLoad();
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.obj.pageNum = 1;
      console.log('this.obj', this.obj);
      // this.$store.dispatch("SET_BUDGET_SELECT", this.obj);
      this.handleGetList();
    },
    /** 重置按钮操作 */
    handleRest() {
      let times = new Date();
      this.resetForm("queryForm");
      this.obj.unitId=this.morenUnit
      this.obj.projectYear=times.getFullYear().toString()
      this.handleQuery();
    },

    // //重置
    // handleRest() {
    //   this.obj = {
    //     unitId: this.obj.unitId,
    //     projectYear: "",
    //     createTime: "",
    //     budgetId: "",
    //     projectName: "",
    //     projectNum: "",
    //     state: "",
    //     pageSize: this.obj.pageSize,
    //     pageNum: this.obj.pageNum,
    //   };
      // this.$store.dispatch("SET_BUDGET_SELECT", this.obj);
    // },

    //删除方法
    handleDelete(row) {
      GetInfo(row.id).then((res) => {
        if (res.state == 10 || res.state == 30) {
          this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              deleteData(row.id).then((res) => {
                this.handleGetList();
                this.$message.success("删除成功！");
              });
            })
            .catch(() => {});
        } else {
          this.$message.warning("当前记录不能删除！");
        }
      });
    },

    //修改
    handleUpdata(row) {
      var data = {};
      this.fileList = [];
      GetInfo(row.id).then((res) => {
        if (
          res.state == 10 ||
          res.state == 30 ||
          res.state == 31 ||
          res.state == 40
        ) {
          this.$router.push(`/budget/edit?id=${res.id}`);
        } else {
          this.$message.warning("当前记录不能进行修改调整！");
        }
      });
    },

    //添加数据
    handleAdd() {
      this.$router.push("/budget/info/add");
    },
    //关闭弹窗
    handleCancel() {
      this.isLaunch = false;
    },
    //流程
    handleLaunch(row) {
      GetInfo(row.id).then((res) => {
        if (
          res.state == 10 ||
          res.state == 30 ||
          res.state == 31 ||
          res.state == 40
        ) {
          this.projectId = row.id;
          FlowTypeList({ module: 100 }).then((response) => {
            this.LaunchOption = response;
            this.isLaunch = true;
            this.LaunchId = 1;
          });
        } else {
          this.$message.warning("当前记录不允许发起审批");
        }
      });
    },

    //发起审批
    SubmitLaunch() {
      if (!this.LaunchId) {
        this.$message.warning("请选择流程");
        return;
      }

      LaunchApprove({
        flowTypeId: this.LaunchId,
        projectId: this.projectId,
      }).then((res) => {
        this.isLaunch = false;
        this.LaunchId = undefined;
        this.handleGetList();
        this.$message.success("流程发起成功！");
        this.$router.push(`/budget/info/${this.projectId}`);
      });
    },
    //导出Excel表
    handleExport() {
      let queryForm = JSON.parse(JSON.stringify(this.obj));
      delete queryForm.pageNum;
      delete queryForm.pageSize;
      this.$confirm("是否确认导出签报的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        exportData(getToken(), queryForm, "/budget/project/export", "项目签报");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.containers {
  width: 95%;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .top-control {
    margin-bottom: 20px;

    label {
      margin-right: 30px;
    }
  }

  .textareas {
    display: flex;
    flex-direction: row;
    line-height: 40px;

    label {
      display: inline-block;
      width: 175px;
      text-align: right;
      padding-right: 15px;
    }
  }

  .upload-demo {
    margin: 15px 0 0 16.2%;
  }

  .btn_box {
    text-align: right;
  }
}

.table-btn-box {
  position: relative;
  background: #fff;
  padding: 30px 20px;
}

.el-icon-printer {
  position: absolute;
  right: 0;
  font-size: 21px;
  top: 5px;
}

.paging {
  margin: 20px 0 0 80px;
  display: flex;
  flex-direction: row;
}

.table-btn-box /deep/ .is-hidden {
  display: table-cell !important;
}
</style>
