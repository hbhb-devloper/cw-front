<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="金额范围" prop="amountFrom">
          <el-input
            v-model="queryParams.amountFrom"
            placeholder="请输入金额范围"
            clearable
            size="small"
            type="number"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="至" prop="amountTo" label-width="25px">
          <el-input
            v-model="queryParams.amountTo"
            placeholder="请输入金额范围"
            clearable
            size="small"
            type="number"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="开票时间" prop="invoiceTimeFrom">
          <el-date-picker
            v-model="queryParams.invoiceTimeFrom"
            type="date"
            placeholder="选择开票时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="invoiceTimeTo" label-width="25px">
          <el-date-picker
            v-model="queryParams.invoiceTimeTo"
            type="date"
            placeholder="选择开票时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="县区" prop="unitId">
          <treeselect
            v-model="queryParams.unitId"
            :options="deptOptions"
            placeholder="请选择县区"
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
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible = true"
          >导入</el-button
        >
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column
        label="类别"
        prop="category"
        width="120"
        align="center"
      />
      <el-table-column
        label="区域"
        prop="unitName"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补金额"
        prop="compensationAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="已到账金额"
        prop="paymentAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补合同名"
        prop="contractName"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同编号"
        prop="contractNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="收据编号"
        prop="receiptNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="收款情况"
        prop="isReceived"
        width="150"
        align="center"
      />
      <el-table-column
        label="已收"
        prop="received"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补金额到账情况说明"
        prop="paymentDesc"
        width="150"
        align="center"
      />
      <el-table-column
        label="本年开收据（元）"
        prop="receiptAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="开收据时间"
        prop="receiptTime"
        width="150"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.receiptTime | dataFormat
        }}</template>
      </el-table-column>
      <el-table-column
        label="备注格式：合同号；区县；款项性质；项目信息"
        prop="remake"
        width="150"
        align="center"
      />
      <el-table-column
        label="供应商信息"
        prop="supplier"
        width="150"
        align="center"
      />

      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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
    <!-- 导入弹框 -->
    <el-dialog title="导入" :visible.sync="centerDialogVisible" width="500px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="downTemplate">
          <i class="el-icon-download"></i>下载导入模板
        </el-button>
      </div>
      <el-upload
        class="upload-demo"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-progress="handleupload"
        :on-error="handleFail"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :action="ActionUrl"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table :data="codeMsgList">
        <el-table-column label="错误信息" prop="codeMsg" />
      </el-table>
    </el-dialog>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别" prop="category">
              <el-select
                v-model="form.category"
                placeholder="请选择类别"
                style="width: 220px"
                clearable
              >
                <el-option key="迁改" label="迁改" value="迁改" />
                <el-option key="搬迁" label="搬迁" value="搬迁" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"></el-col> -->
          <el-col :span="12">
            <el-form-item label="区域" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="请选择区域"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额" prop="compensationAmount">
              <el-input
                v-model="form.compensationAmount"
                placeholder="请输入赔补金额"
                type="number"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已到账金额" prop="paymentAmount">
              <el-input
                v-model="form.paymentAmount"
                placeholder="请输入已到账金额"
                type="number"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="contractName">
              <el-input
                v-model="form.contractName"
                placeholder="选择赔补合同名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNum">
              <el-input
                v-model="form.contractNum"
                placeholder="选择合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收据编号" prop="receiptNum">
              <el-input
                v-model="form.receiptNum"
                placeholder="选择收据编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额到账情况说明" prop="paymentDesc">
              <el-input
                v-model="form.paymentDesc"
                placeholder="请输入赔补金额到账情况说明"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本年开收据（元）" prop="receiptAmount">
              <el-input
                v-model="form.receiptAmount"
                placeholder="请输入本年开收据（元）"
                type="number"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开收据时间" prop="receiptTime">
              <el-date-picker
                v-model="form.receiptTime"
                type="date"
                placeholder="请输入开收据时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="备注格式：合同号；区县；款项性质；项目信息"
              prop="remake"
            >
              <el-input
                v-model="form.remake"
                placeholder="请输入备注格式：合同号；区县；款项性质；项目信息"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商信息" prop="supplier">
              <el-input
                v-model="form.supplier"
                placeholder="请输入供应商信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listReceipt,
  addReceipt,
  updateReceipt,
  delarr,
  receiptByreceiptNum,
} from "@/api/relocation/basis/receipt.js";
import { getToken } from "@/utils/auth";
import { exportData1 } from "@/utils/export";
import { resourceTreeByUN } from "@/api/system/unit";
import Treeselect from "@riophae/vue-treeselect";
import { prefix } from "@/api/relocation/relocation";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
    const validateReceiptNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("收据编号不能为空"));
      } else {
        var reg = /^[A-Za-z0-9]{1,30}$/;
        if (!reg.test(value)) {
          callback(new Error("收据编号不能输入中文"));
        }

        callback();
      }
    };
    return {
      morenUnit: undefined,
      deptOptions: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        flowTypeName: undefined,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        category: [
          { required: true, message: "类别不能为空", trigger: "blur" },
        ],
        unitId: [{ required: true, message: "区域不能为空", trigger: "blur" }],
        compensationAmount: [
          { required: true, message: "赔补金额不能为空", trigger: "blur" },
        ],
        paymentAmount: [
          { required: true, message: "已到账金额不能为空", trigger: "blur" },
        ],
        contractName: [
          { required: true, message: "赔补合同名不能为空", trigger: "blur" },
        ],
        contractNum: [
          { required: true, message: "合同编号不能为空", trigger: "blur" },
        ],
        receiptNum: [
          { required: true, validator: validateReceiptNum, trigger: "blur" },
        ],
        paymentDesc: [
          {
            required: true,
            message: "赔补金额到账情况说明不能为空",
            trigger: "blur",
          },
        ],
        receiptAmount: [
          { required: true, message: "本年开收据不能为空", trigger: "blur" },
        ],
        receiptTime: [
          { required: true, message: "开收据时间不能为空", trigger: "blur" },
        ],
        remake: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        supplier: [
          { required: true, message: "供应商不能为空", trigger: "blur" },
        ],
      },
      centerDialogVisible: false,
      ActionUrl: process.env.VUE_APP_GATEWAY_API + `${prefix}/receipt/import`, // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      errorMessage: [],
      codeMsgList: [],
    };
  },
  filters: {
    dataFormat(msg) {
      return msg.substring(0, 10);
    },
    dataFixed(num) {
      return num.toFixed(2);
    },
  },
  created() {
    // this.getList();
    this.getTreeselect();
  },
  methods: {
    downTemplate() {
      exportData1(
        getToken(),
        "",
        `${prefix}​/receipt​/export​/template`,
        "收据管理导入模板"
      );
    },
    getTreeselect() {
      let that = this;
      resourceTreeByUN().then((response) => {
        that.deptOptions = response.list;
        that.morenUnit = response.checked[0];
        that.queryParams.unitId = that.morenUnit;
        that.getList();
      });
    },
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在导入表格",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loadingoption = loading;
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      this.fileList = [];
      this.loadingoption.close();
      this.centerDialogVisible = false;
      if (res.code == "00000") {
        this.$message.success("导入成功");
        this.getList();
      } else if (res.code == "80898") {
        res.message = res.message.substr(1, res.message.length - 2);
        this.errorMessage = res.message.split(",");
        for (let i in this.errorMessage) {
          var j = {};
          j.codeMsg = this.errorMessage[i];
          this.codeMsgList.push(j);
        }
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
        this.getList();
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listReceipt(this.queryParams).then((response) => {
        this.typeList = response.list;
        this.total = response.totalRow;
        console.log(response);
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
      this.queryParams.unitId = this.morenUnit;
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm("是否确认导出收据管理的数据项?", "导出表格", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportData1(
            getToken(),
            queryParams,
            `${prefix}/receipt/export`,
            "收据管理"
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        flowTypeName: undefined,
        sortNum: 0,
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加类型";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const receiptNum = row.receiptNum;
      receiptByreceiptNum(receiptNum).then((response) => {
        this.form = response;
        this.open = true;
        this.title = "修改类型";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateReceipt(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReceipt(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const typeIds = row.id;
      this.$confirm(
        '是否确认删除合同编号为"' + row.contractNum + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delarr(typeIds);
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
<style scoped>
.el-dialog .el-form-item--medium /deep/ .el-form-item__label {
  line-height: 20px;
  font-size: 12px;
}
.el-dialog .el-form-item {
  display: flex;
  align-items: center;
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 220px;
}
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.el-col-12 {
  height: 59px;
}
</style>