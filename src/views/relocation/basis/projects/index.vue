<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-row>
        <el-form-item label="合同编号" prop="contractNum">
          <el-input
            v-model="queryParams.contractNum"
            placeholder="请输入合同编号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item label="区域" prop="unitId">
          <treeselect
            v-model="queryParams.unitId"
            :options="deptOptions"
            placeholder="请选择区域"
          />
        </el-form-item>
        <el-form-item label="迁改项目编号" prop="projectNum">
          <el-input
            v-model="queryParams.projectNum"
            placeholder="请输入迁改项目编号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="赔补状态" prop="compensationSate">
          <el-select
            v-model="queryParams.compensationSate"
            placeholder="赔补状态"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in compensationOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="未全额回款合同历时" prop="contractDuration">
          <el-input
            v-model="queryParams.contractDuration"
            placeholder="请输入未全额回款合同历时"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="工程名称" prop="projectName">
          <el-input
            v-model="queryParams.projectName"
            placeholder="请输入工程名称"
            clearable
            size="small"
            style="width: 240px"
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
      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="centerDialogVisible = true"
          >导入</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="typeList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column
        label="区域"
        prop="unitName"
        width="120"
        align="center"
      />
      <el-table-column
        label="工程名称"
        prop="projectName"
        width="120"
        align="center"
      />
      <el-table-column
        label="迁改项目编号"
        prop="projectNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="EOMS迁移修缮管理流程工单号"
        prop="eomsRepairNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="EOMS光缆割接流程工单号"
        prop="eomsCutNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="计划施工时间"
        prop="planStartTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="计划完成时间"
        prop="planEndTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="实际完工时间"
        prop="actualEndTime"
        width="150"
        align="center"
      />
      <el-table-column
        label="施工单位"
        prop="constructionUnit"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="工程单位" prop="flowTypeName" width="150" align="center" /> -->
      <el-table-column
        label="迁改涉及网络层级（省干、汇聚、接入、驻地网）"
        prop="networkHierarchy"
        width="150"
        align="center"
      />
      <!-- <el-table-column label="是否农网" prop="flowTypeName" width="150" align="center" /> -->
      <el-table-column
        label="施工费（预算：元）"
        prop="constructionBudget"
        width="150"
        align="center"
      />
      <el-table-column
        label="甲供材料费（预算：元）"
        prop="materialBudget"
        width="150"
        align="center"
      />
      <el-table-column
        label="施工费（送审结算：元）"
        prop="constructionCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="甲供材料费（送审结算：元）"
        prop="materialCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="施工费审定金额（审计后：元）"
        prop="constructionAuditCost"
        width="150"
        align="center"
      />
      <el-table-column
        label="主动迁改或者被动"
        prop="isInitiative"
        width="150"
        align="center"
      />
      <el-table-column
        label="性质归类"
        prop="projectType"
        width="150"
        align="center"
      />
      <el-table-column
        label="迁改原因"
        prop="cause"
        width="350"
        align="center"
      />
      <el-table-column
        label="对方单位"
        prop="oppositeUnit"
        width="250"
        align="center"
      />
      <el-table-column
        label="对方联系人"
        prop="oppositeContacts"
        width="150"
        align="center"
      />
      <el-table-column
        label="对方联系电话"
        prop="oppositeContactsNum"
        width="150"
        align="center"
      />
      <el-table-column
        label="有无赔补"
        prop="hasCompensation"
        width="150"
        align="center"
      />
      <el-table-column
        label="被动无赔类型"
        prop="compensationType"
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
        label="赔补合同名"
        prop="contractName"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补金额（元）"
        prop="compensationAmount"
        width="150"
        align="center"
      />
      <el-table-column
        label="预付款应付金额"
        prop="anticipatePayable"
        width="150"
        align="center"
      />
      <el-table-column
        label="预付款到账金额（元）"
        prop="anticipatePayment"
        width="150"
        align="center"
      />
      <el-table-column
        label="决算款到账金额（元）"
        prop="finalPayment"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补状态"
        prop="compensationSateName"
        width="150"
        align="center"
      />
      <el-table-column
        label="未全额回款合同历时"
        prop="contractDuration"
        width="150"
        align="center"
      />
      <el-table-column
        label="赔补特殊情况备注"
        prop="compensationRemake"
        width="150"
        align="center"
      />
      <el-table-column
        label="月报"
        prop="projectMonth"
        width="150"
        align="center"
      />
      <el-table-column
        label="年份"
        prop="projectYear"
        width="150"
        align="center"
      />
      <el-table-column
        label="合同类型"
        prop="contractType"
        width="150"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="200"
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px">
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域" prop="unitId">
              <treeselect
                v-model="form.unitId"
                :options="deptOptions"
                placeholder="请选择区域"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="迁改项目编号" prop="projectNum">
              <el-input
                v-model="form.projectNum"
                placeholder="请输入迁改项目编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程名称" prop="projectName">
              <el-input
                v-model="form.projectName"
                placeholder="请输入工程名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="EOMS迁移修缮管理流程工单号"
              prop="eomsRepairNum"
            >
              <el-input
                v-model="form.eomsRepairNum"
                placeholder="请输入EOMS迁移修缮管理流程工单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EOMS光缆割接流程工单号" prop="eomsCutNum">
              <el-input
                v-model="form.eomsCutNum"
                placeholder="请输入EOMS光缆割接流程工单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划施工时间" prop="planStartTime">
              <el-date-picker
                v-model="form.planStartTime"
                type="date"
                placeholder="选择计划施工时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划完成时间" prop="planEndTime">
              <el-date-picker
                v-model="form.planEndTime"
                type="date"
                placeholder="选择计划完成时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位" prop="constructionUnit">
              <el-input
                v-model="form.constructionUnit"
                placeholder="请输入施工单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="迁改涉及网络层级（省干、汇聚、接入、驻地网）"
              prop="networkHierarchy"
            >
              <el-input
                v-model="form.networkHierarchy"
                placeholder="请输入迁改涉及网络层级"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工费（预算：元）" prop="constructionBudget">
              <el-input
                v-model="form.constructionBudget"
                placeholder="请输入施工费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲供材料费（预算：元）" prop="materialBudget">
              <el-input
                v-model="form.materialBudget"
                placeholder="请输入甲供材料费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="施工费（送审结算：元）"
              prop="constructionCost"
            >
              <el-input
                v-model="form.constructionCost"
                placeholder="请输入施工费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="甲供材料费（送审结算：元）"
              prop="materialCost"
            >
              <el-input
                v-model="form.materialCost"
                placeholder="请输入甲供材料费"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="施工费审定金额（审计后：元）"
              prop="constructionAuditCost"
            >
              <el-input
                v-model="form.constructionAuditCost"
                placeholder="请输入施工费审定金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主动迁改或者被动" prop="isInitiative">
              <el-select
                v-model="form.isInitiative"
                placeholder="请选择主动迁改或者被动"
                clearable
                size="small"
                style="width:220px"
              >
                <el-option
                  v-for="dict in InitiativeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质归类" prop="projectType">
              <el-input
                v-model="form.projectType"
                placeholder="请输入性质归类"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="迁改原因" prop="cause">
              <el-input v-model="form.cause" placeholder="请输入迁改原因" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方单位" prop="oppositeUnit">
              <el-input
                v-model="form.oppositeUnit"
                placeholder="请输入对方单位"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方联系人" prop="oppositeContacts">
              <el-input
                v-model="form.oppositeContacts"
                placeholder="请输入对方联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对方联系电话" prop="oppositeContactsNum">
              <el-input
                v-model="form.oppositeContactsNum"
                placeholder="请输入对方联系电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无赔补" prop="hasCompensation">
              
              <el-select
                v-model="form.hasCompensation"
                placeholder="赔补状态"
                clearable
                size="small"
                style="width:220px"
              >
                <el-option
                  v-for="dict in compensateOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
              
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="被动无赔类型" prop="compensationType">
              <el-input
                v-model="form.compensationType"
                placeholder="请输入被动无赔类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractNum">
              <el-input
                v-model="form.contractNum"
                placeholder="请输入合同编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补合同名" prop="contractName">
              <el-input
                v-model="form.contractName"
                placeholder="请输入赔补合同名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补金额（元）" prop="compensationAmount">
              <el-input
                v-model="form.compensationAmount"
                placeholder="请输入赔补金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付款到账金额（元）" prop="anticipatePayment">
              <el-input
                v-model="form.anticipatePayment"
                placeholder="请输入预付款到账金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付款应付金额（元）" prop="anticipatePayable">
              <el-input
                v-model="form.anticipatePayable"
                placeholder="请输入预付款应付金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="决算款到账金额（元）（注：决算款不包含预算款）"
              prop="finalPayment"
            >
              <el-input
                v-model="form.finalPayment"
                placeholder="请输入决算款到账金额"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补状态" prop="compensationSate">
              <el-select
                v-model="form.compensationSate"
                placeholder="赔补状态"
                clearable
                size="small"
                style="width:220px"
              >
                <el-option
                  v-for="dict in compensationOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="未全款回款合同合同签订时长（年）"
              prop="contractDuration"
            >
              <el-input
                v-model="form.contractDuration"
                placeholder="请输入未全款回款合同合同签订时长"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赔补特殊情况备注" prop="compensationRemake">
              <el-input
                v-model="form.compensationRemake"
                placeholder="请输入赔补特殊情况备注"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月报" prop="projectMonth">
              <el-input v-model="form.projectMonth" placeholder="请输入月报" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年份" prop="projectYear">
              <el-input v-model="form.projectYear" placeholder="请输入年份" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入" :visible.sync="centerDialogVisible" width="500px">
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
    </el-dialog>
  </div>
</template>

<script>
import { resourceTreeByUN } from "@/api/system/unit";
import {
  listProject,
  addProject,
  updateProject,
  delarr,
  compensationSate,
} from "@/api/relocation/basis/projects.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
export default {
  name: "Flowtype",
  components: { Treeselect },
  data() {
    var validatePass = (rule, value, callback) => {
        if (this.form.hasCompensation === '0') {
          callback(new Error('请输入被动无赔类型'));
        } 
      };
    return {
      
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
      },
      // 赔补状态
      compensationOptions:[],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表单校验
      rules: {
        eomsRepairNum: [
          {
            required: true,
            message: "请输入EOMS迁移修缮管理流程工单号",
            trigger: "blur",
          },
        ],
        eomsCutNum: [
          {
            required: true,
            message: "请输入EOMS光缆割接流程工单号",
            trigger: "blur",
          },
        ],
        planStartTime: [
          { required: true, message: "请选择计划施工时间", trigger: "blur" },
        ],
        planEndTime: [
          { required: true, message: "请选择计划完成时间", trigger: "blur" },
        ],
        constructionUnit: [
          { required: true, message: "请输入施工单位", trigger: "blur" },
        ],
        projectName: [
          { required: true, message: "请输入工程名称", trigger: "blur" },
        ],
        networkHierarchy: [
          {
            required: true,
            message: "请输入迁改涉及网络层级",
            trigger: "blur",
          },
        ],
        constructionBudget: [
          { required: true, message: "请输入施工费", trigger: "blur" },
        ],
        materialBudget: [
          { required: true, message: "请输入甲供材料费", trigger: "blur" },
        ],
        isInitiative: [
          {
            required: true,
            message: "请选择主动迁改或者被动",
            trigger: "blur",
          },
        ],
        projectType: [
          { required: true, message: "请输入性质归类", trigger: "blur" },
        ],
        oppositeUnit: [
          { required: true, message: "请输入对方单位", trigger: "blur" },
        ],
        cause: [{ required: true, message: "请输入迁改原因", trigger: "blur" }],
        oppositeContacts: [
          { required: true, message: "请输入对方联系人", trigger: "blur" },
        ],
        oppositeContactsNum: [
          { required: true, message: "请输入对方联系电话", trigger: "blur" },
        ],
        hasCompensation: [
          { required: true, message: "请选择有无赔补", trigger: "blur" },
        ],
        compensationType: [
          {validator: validatePass, trigger: "blur" },
        ],
        contractNum: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        contractName: [
          { required: true, message: "请输入赔补合同名", trigger: "blur" },
        ],
        compensationAmount: [
          { required: true, message: "请输入赔补金额", trigger: "blur" },
        ],
        anticipatePayable: [
          { required: true, message: "请输入预付款应付金额", trigger: "blur" },
        ],
        anticipatePayment: [
          { required: true, message: "请输入预付款到账金额", trigger: "blur" },
        ],
        finalPayment: [
          { required: true, message: "请输入决算款到账金额", trigger: "blur" },
        ],
        compensationSate: [
          { required: true, message: "请选择赔补状态", trigger: "blur" },
        ],
        projectMonth: [
          { required: true, message: "请输入月份", trigger: "blur" },
        ],
        projectYear: [
          { required: true, message: "请输入年份", trigger: "blur" },
        ],
        contractType: [
          { required: true, message: "请输入合同类型", trigger: "blur" },
        ],
      },
      // 状态数据字典
      statusOptions: [
        { dictValue: '1', dictLabel: "正常" },
        { dictValue: '0', dictLabel: "停用" },
      ],
      // 有无赔补
      compensateOptions: [
        { dictValue: '1', dictLabel: "有" },
        { dictValue: '0', dictLabel: "无" },
      ],
      // 主动迁改火被动
      InitiativeOptions: [
        { dictValue: true, dictLabel: "主动" },
        { dictValue: false, dictLabel: "被动" },
      ],
      morenUnit: undefined,
      deptOptions: [],
      centerDialogVisible: false,
      ActionUrl: process.env.VUE_APP_BASE_API + "/relocation/project/import", // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
    };
  },
  created() {
    // this.getList();
    compensationSate().then((response) => {
      this.compensationOptions = response;
      this.getTreeselect();
    });
  },
  methods: {
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
      if (res.status == 1000) {
        this.$message.success("文件上传成功");
        this.getList();
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
      let that = this;
      listProject(this.queryParams).then((response) => {
        response.list.map((item) => {
          if (item.hasCompensation) {
            item.hasCompensation = "有";
          } else {
            item.hasCompensation = "无";
          }
          that.compensationOptions.map((sationItem) => {
            if (item.compensationSate == sationItem.value) {
              item.compensationSateName = sationItem.label;
            }
          });
        });
        console.log("res", response);
        this.typeList = response.list;
        this.total = response.count;
        this.loading = false;
      });
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加迁改项目管理信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const typeId = row.id || this.ids;
      //   getRole(typeId).then(response => {
      this.form = row;
      this.open = true;
      this.title = "修改迁改项目管理信息";
      //   });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateProject(this.form)
              .then((response) => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          } else {
            addProject(this.form)
              .then((response) => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              })
              .catch((err) => {
                this.msgError(err.message);
              });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const typeIds = row.id;
      this.$confirm(
        '是否确认删除工程名称为"' + row.projectName + '"的数据项?',
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
  margin: auto 0;
}
.el-dialog .el-form-item {
  display: flex;
  /* align-items: center; */
}
.el-dialog .el-form-item--medium /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 220px;
}
.el-form-item--medium /deep/ .el-form-item__content {
  width: 230px;
}
.el-form-item--medium /deep/ .el-form-item__error {
  top: 37px;
}
.el-col-12 {
  height: 59px;
}
</style>