<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2021-01-23 16:33:29
 * @LastEditors: CYZ
 * @LastEditTime: 2021-02-02 10:31:53
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
        v-if="typeName == 'HallRepotr'"
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
          clearable
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
          clearable
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
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
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
        >
        </el-date-picker>
        <el-select
          v-model="queryParams.periodInfo"
          placeholder="请选择"
          clearable
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
        <el-button icon="el-icon-refresh" size="mini" @click="openDialog"
          >上报报表</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 暂时隐藏导出按钮 -->
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出订单
        </el-button>
      </el-col>
    </el-row> -->
    <!-- 报表表单 -->
    <el-table
      v-loading="loading"
      :data="reportList"
      @selection-change="handleSelectionChange"
      @row-click="showFlow"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        align="center"
        label="序号"
        prop="lineNumber"
        width="50"
      />
      <el-table-column align="center" label="关联单名称" prop="relationName" />
      <el-table-column align="center" label="有无业务" prop="hasBizName" />
      <el-table-column align="center" label="管理内容" prop="manageName" />
      <el-table-column align="center" label="报表名称" prop="reportName" />
      <el-table-column align="center" label="报表周期" prop="periodName" />
      <el-table-column align="center" label="创建人" prop="founderName" />
      <el-table-column align="center" label="创建时间" prop="launchTime" />
      <el-table-column align="center" label="流程状态" prop="stateName" />
      <el-table-column
        label="操作"
        align="center"
        width=""
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click.stop="deleteReport(scope.row)"
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
    <!-- 添加或修改内容管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <div
        style="
          text-align: center;
          font-size: 16px;
          font-weight: bolder;
          color: red;
        "
      >
        {{ nodeName }}
      </div>
      <el-row style="margin-bottom: 25px" v-if="detailFileList.length > 0">
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
                <div>{{ item.nickName }} ({{ item.approveTime }})</div>
                <i class="el-icon-success" v-if="item.operation.value == 1"></i>
                <i class="el-icon-error" v-if="item.operation.value == 0"></i>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-table :data="detailFileList" v-if="detailFileList.length > 0">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column align="center" label="文件名称" prop="fileName" />
        <el-table-column align="center" label="创建人" prop="author" />
        <el-table-column align="center" label="创建时间" prop="createTime" />
        <el-table-column align="center" label="文件大小" prop="fileSize" />
        <el-table-column align="center" label="sheet数量" prop="sheetNum" />
        <el-table-column
          label="操作"
          align="center"
          width=""
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="exportFile(scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form
        v-else
        :model="form"
        ref="form"
        :inline="true"
        label-width="90px"
        :rules="rules"
      >
        <el-form-item label="上报单位" prop="unitId">
          <treeselect
            v-model="form.unitId"
            :options="deptOptions"
            placeholder="选择上报单位"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item
          label="营业厅"
          prop="hallId"
          v-if="typeName == 'HallRepotr'"
        >
          <el-select
            v-model="form.hallId"
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
            v-model="form.manageId"
            placeholder="请选择管理内容"
            clearable
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
            v-model="form.categoryId"
            placeholder="请选择报表名称"
            clearable
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
        <!-- <el-form-item label="报表状态" prop="state">
          <el-select
            v-model="form.state"
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
        </el-form-item> -->
        <el-form-item label="有无业务" prop="hasBiz">
          <el-select
            v-model="form.hasBiz"
            placeholder="请选择有无业务"
            clearable
            size="small"
            style="width: 200px"
          >
            <el-option
              v-for="dict in hasBizOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报表周期" prop="period">
          <el-select
            v-model="form.period"
            placeholder="请选择报表周期"
            clearable
            size="small"
            style="width: 200px"
            @change="changePeriod"
          >
            <el-option
              v-for="dict in periodOption1"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <el-date-picker
            v-model="form.launchTime"
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
            v-model="form.periodInfo"
            placeholder="请选择"
            clearable
            size="small"
            style="width: 200px"
            v-if="
              form.period == '1' || form.period == '3' || form.period == '4'
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

        <el-row>
          <el-form-item label="上传附件">
            <el-upload
              class="upload-demo"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              :on-progress="handleupload"
              :on-error="handleFail"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :action="ActionUrl"
              :file-list="fileList"
              accept=".xlsx,.xls,.zip"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件名称" prop="fileName">
            <el-input v-model="form.fileName"></el-input>
          </el-form-item>
        </el-row>
        <el-table :data="form.files" v-if="form.files.length >= 1">
          <el-table-column align="center" label="文件名称" prop="fileName" />
          <el-table-column align="center" label="文件大小" prop="fileSize" />
          <el-table-column
            label="操作"
            align="center"
            width=""
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="deleteFile(scope.row)"
                >删除附件</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="detailFileList.length <= 0"
      >
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reportList,
  reportAdd,
  reportDelete,
  reportFlowList,
  reportFlowApprove,
  reportInfo,
  reportExport,
} from "@/api/report/unitRepotr";
import { manageSelect } from "@/api/report/management";
import { categoryName, propertyPeriod } from "@/api/report/reportName";
import { resourceTreeByUN } from "@/api/system/unit";
import { getHallSelect, getHallSelectHallByUserId } from "@/api/system/hall";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { prefix as systemPrefix } from "@/api/system/system";
import { prefix as reportPrefix } from "@/api/report/report";
import { getToken } from "@/utils/auth";
import { getList as getOpinion } from "@/api/flow/opinion.js";
import { exportData1 } from "@/utils/export";
import { dateFormat } from "@/utils/index";
export default {
  name: "Role",
  components: { Treeselect },
  data() {
    return {
      // 表单校验
      rules: {
        unitId: [
          { required: true, message: "上报单位不能为空", trigger: "blur" },
        ],
        hallId: [
          { required: true, message: "营业厅不能为空", trigger: "blur" },
        ],
        manageId: [
          { required: true, message: "管理内容不能为空", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "报表名称不能为空", trigger: "blur" },
        ],
        hasBiz: [
          { required: true, message: "有无业务不能为空", trigger: "blur" },
        ],
        period: [
          { required: true, message: "报表周期不能为空", trigger: "blur" },
        ],
      },
      // 意见下拉框
      opinionList: [],
      // 选中的数组
      ids: [],
      // 弹窗标题
      title: undefined,
      // 表单参数
      form: {
        files: [],
      },
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
      },
      // 管理内容下拉框
      manageOptions: [],
      // 周期下拉框
      periodOption: [],
      periodOption1: [],
      // 报表状态下拉框
      reportStateOption: [],
      // 报表名称下拉框
      reportNameOptions: [],
      // 营业厅下拉框
      hallList: [],
      // 弹窗判断
      open: false,
      // 上传附件模块
      ActionUrl:
        process.env.VUE_APP_GATEWAY_API +
        `${systemPrefix}/file/upload?bizType=70`, // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      hasBizOptions: [
        {
          value: true,
          label: "有",
        },
        {
          value: false,
          label: "无",
        },
      ],
      // 流程列表
      flowList: [],
      // 流程名称
      nodeName: undefined,
      // 选中流程id
      reportId: undefined,
      // 报表详情文件列表
      detailFileList: [],
      // 从工作台获取的报表id
      reportId: undefined,
      // 页面类型
      typeName: undefined,
      // 旬、季度、半年下拉框
      reportTheDays: [],
      // 日期展现格式
      dataTypeFormat: "yyyy-MM",
      // 日期选择类型
      dataType: undefined,
      // 当前用户Id
      myUserId: undefined,
    };
  },
  created() {
    this.myUserId = this.$store.getters.id;
    this.typeName = this.$route.name;
    this.getopinion();
    this.getTreeselect();
    this.getDicts("report", "report_period").then((response) => {
      this.periodOption1 = response;
    });
    this.getDicts("report", "report_approver_state").then((response) => {
      this.reportStateOption = response;
    });
    this.reportId = this.$route.query.reportId;
    if (this.reportId) {
      reportFlowList(this.reportId).then((res) => {
        this.nodeName = res.name;
        this.flowList = res.nodes;
        this.open = true;
        this.title = "流程查看审批";
        reportInfo({ reportId: this.reportId }).then((response) => {
          this.detailFileList = response;
        });
      });
    }
  },
  methods: {
    // 下载详情文件
    exportFile(row) {
      exportData1(
        getToken(),
        { fileId: row.fileId, reportId: row.reportId },
        `${reportPrefix}/report/export`,
        row.fileName
      ).then((response) => {
        this.download(response.msg);
      });
    },
    // 获取意见拉下框
    getopinion() {
      getOpinion().then((res) => {
        this.opinionList = res;
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
      reportFlowApprove(programObj).then((res) => {
        this.$message.success("提交成功");
        reportFlowList(this.reportId).then((res) => {
          this.nodeName = res.name;
          this.flowList = res.nodes;
        });
      });
    },
    // 展现报表流程
    showFlow(row) {
      this.reportId = row.id;
      if (row.hasBiz) {
        reportFlowList(row.id).then((res) => {
          this.nodeName = res.name;
          this.flowList = res.nodes;
          this.open = true;
          this.title = "流程查看审批";
          reportInfo({ reportId: row.id }).then((response) => {
            this.detailFileList = response;
          });
        });
      }
      // else {
      //   reportInfo({ reportId: row.id }).then((response) => {
      //     this.detailFileList = response;
      //     this.nodeName = row.relationName;
      //     this.open = true;
      //     this.title = "流程查看审批";
      //   });
      // }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
    },
    // 改变unit的值
    // changeUnit(value) {
    //   getHallSelect(value).then((res) => {
    //     if (this.typeName == "HallRepotr") {
    //       this.queryParams.hallId = res[0].id;
    //     }
    //     this.hallList = res;
    //   });
    // },
    deleteReport(row) {
      let reportIds = [];
      if (row.id) {
        reportIds.push(row.id);
      } else {
        reportIds = this.ids;
      }
      this.$confirm(
        '是否确认删除报表名称为"' + row.reportName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return reportDelete(reportIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    // 删除文件按钮
    deleteFile(row) {
      console.log("row", row);
      let fileIndex = this.form.files.findIndex((val) => val.id == row.id);
      console.log("fileIndex", fileIndex);
      this.form.files.splice(fileIndex, 1);
    },
    // 上传文件模块
    handleupload() {
      const loading = this.$loading({
        lock: true,
        text: "正在上传附件",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.loadingoption = loading;
    },
    beforeAvatarUpload(file) {
      console.log("file", file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log("testmsg", testmsg);
      const isJPG = testmsg === ("xlsx" || "xls" || "zip");
      // const isLt2M = file.size / 1024 / 1024 < 2;
      console.log("isJPG", isJPG);

      if (!isJPG) {
        this.$message.error("上传文件只能是 xlsx/xls/zip 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG;
    },
    handleFail() {
      this.loadingoption.close();
      this.$message.error("上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(res) {
      if (res.code == "00000") {
        res.data.fileId = res.data.id;
        this.form.files.push(res.data);
        this.form.fileName = res.data.fileName;
        this.fileList = [];
        this.loadingoption.close();
        this.$message.success("文件上传成功");
      } else {
        this.$message({
          message: res.message,
          type: "error",
        });
        this.loadingoption.close();
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 提交表单按钮
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.files.length < 1) {
            this.$message.error("请上传附件");
          } else {
            reportAdd(this.form).then((res) => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    reset() {
      this.form = {
        files: [],
      };
      this.detailFileList = [];
      this.resetForm("form");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 打开上报报表弹窗
    openDialog() {
      this.reset();
      this.open = true;
      if (this.typeName != "HallRepotr") {
        this.title = "分公司上传文件";
      } else {
        this.title = "营业厅上传文件";
      }
    },
    // 通过修改管理内容获取管理名称下拉框
    changeManage(val) {
      categoryName({ manageId: val }).then((res) => {
        this.reportNameOptions = res;
        this.queryParams.categoryId = res[0].id;
        // this.getPropertyPeriod(res[0].id);
      });
    },

    // 通过修改报表名称获取报表周期
    changeCategory(val) {
      // this.getPropertyPeriod(val);
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
    /** 查询部门下拉树结构 */
    getTreeselect() {
      resourceTreeByUN().then((response) => {
        this.deptOptions = response.list;
        this.queryParams.unitId = response.checked;
        getHallSelectHallByUserId({ userId: this.myUserId }).then((res) => {
          if (this.typeName == "HallRepotr") {
            this.$set(this.queryParams, "hallId", res[0].id);
            // this.queryParams.hallId = res[0].id;
          }
          this.hallList = res;
          manageSelect().then((res) => {
            this.manageOptions = res;
            this.queryParams.manageId = res[0].id;
            categoryName({ manageId: res[0].id }).then((res) => {
              this.reportNameOptions = res;
              this.queryParams.categoryId = res[0].id;
              this.getDicts("report", "report_period").then((response) => {
                this.periodOption = response;
                this.getList();
              });
              // this.getPropertyPeriod(res[0].id);
            });
          });
        });
      });
    },
    /** 查询报表列表 */
    getList() {
      this.loading = true;
      reportList(this.queryParams).then((response) => {
        this.reportList = response.list;
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
      this.$confirm("是否确认导出所有采购及需求汇总项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return goodsExport(queryParams);
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