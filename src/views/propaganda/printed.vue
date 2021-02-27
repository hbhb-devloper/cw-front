<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="单位" prop="unitId">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择归属部门"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="日期" prop="applyTime">
        <el-date-picker
          v-model="queryParams.applyTime"
          type="month"
          placeholder="选择日期时间"
          size="small"
          style="width: 200px"
          format="yyyy-MM"
          value-format="yyyy-MM"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审批状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择审批状态"
          clearable
          size="small"
          style="width: 200px"
        >
          <el-option
            v-for="dict in invoiceStatue"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请单名称" prop="printName">
        <el-input
          v-model="queryParams.printName"
          placeholder="请输入申请单名称"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请单号" prop="printNum">
        <el-input
          v-model="queryParams.printNum"
          placeholder="请输入申请单号"
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >添加新申请</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="printList">
      <el-table-column
        align="center"
        label="申请单号"
        prop="printNum"
        width="180"
      />
      <el-table-column
        align="center"
        label="申请单名称"
        prop="printName"
        width="180"
      />
      <el-table-column align="center" label="申请单位" prop="unitName" />
      <el-table-column
        align="center"
        label="申请时间"
        prop="applyTime"
        width="180"
      />
      <el-table-column
        align="center"
        label="申请人"
        prop="userName"
        width="120"
      />
      <el-table-column
        align="center"
        label="预估金额（元）"
        prop="predictAmount"
        width="180"
      />
      <el-table-column
        label="查看"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="gotoProAdd(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        label="流程状态"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="gotoProAdd(scope.row)">{{
            scope.row.stateLabel
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="发起流程"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleLaunch(scope.row)"
            :disabled="scope.row.state != 10"
            >发起流程</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            :disabled="!(scope.row.state == 10 || scope.row.state == 30)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['propaganda:printed:delete']"
            >强制删除</el-button
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
            disabled
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
import { FlowTypeList } from "@/api/flow/list.js";
import {
  listPrint,
  printToApprove,
  deletePrint,
} from "@/api/propaganda/printed";
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
      SetVisible: false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 印刷品表格数据
      printList: [],
      // 状态数据字典
      invoiceStatue: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 流程弹窗判断
      isLaunch: false,
      // 流程下拉框
      LaunchOption: [],
      // 流程状态
      LaunchId: undefined,
      printId: undefined,
      userId: undefined,
      morenUnit: undefined,
    };
  },
  created() {
    this.getDicts("fund", "invoice_status").then((response) => {
      // getBusiness().then((res) => {
      this.invoiceStatue = response;
      this.getTreeselect();
    });
  },
  methods: {
    // 关闭弹窗
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
        userId: this.userId,
        printId: this.printId,
        flowTypeId: this.LaunchId,
      };
      printToApprove(dataObj).then((res) => {
        console.log("printToApprove", res);
        this.isLaunch = false;
        this.LaunchId = undefined;
        this.$router.push(
          `/propaganda/propagandaAdd?id=${this.printId}&type=printed`
        );
        this.$message.success("流程发起成功！");
      });
    },
    //打开发起审批流程
    handleLaunch(row) {
      console.log("row", row);
      this.userId = row.userId;
      this.printId = row.id;
      FlowTypeList().then((response) => {
        this.LaunchOption = response;
        this.isLaunch = true;
        this.LaunchId = 37;
      });
    },
    gotoProAdd(row) {
      this.$router.push(`/propaganda/propagandaAdd?id=${row.id}&type=printed`);
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        this.morenUnit = response.checked;
        this.getList();
      });
    },
    handleAdd() {
      this.$router.push(`/propaganda/propagandaAdd?type=printed`);
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listPrint(this.queryParams).then((response) => {
        if (response.list) {
          response.list.map((item) => {
            this.invoiceStatue.map((statueItem) => {
              if (statueItem.value == item.state) {
                item.stateLabel = statueItem.label;
              }
            });
          });
        }

        this.printList = response.list;
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
      this.resetForm("queryForm");
      this.queryParams.unitId = this.morenUnit;
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const printname = row.printName;
      const printId = row.id;
      this.$confirm(
        '是否确认删除流程名称为"' + printname + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return deletePrint(printId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
  },
};
</script>
