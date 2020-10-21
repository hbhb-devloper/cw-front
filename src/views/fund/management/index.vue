<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">
      <el-form-item label="单位">
        <treeselect
          v-model="queryParams.unitId"
          :options="deptOptions"
          placeholder="请选择单位"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="开票金额" prop="invoiceAmount">
        <el-input
          v-model="queryParams.invoiceAmount"
          placeholder="请输入开票金额"
          clearable
          size="small"
          :min="0"
          type="number"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="业务内容" prop="business">
        <el-select
          v-model="queryParams.business"
          placeholder="请选择业务内容"
          clearable
          size="medium"
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeList"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流程状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择流程状态"
          clearable
          size="medium"
          style="width: 100%"
        >
          <el-option
            v-for="dict in StateOptions"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户经理" prop="clientManager">
        <el-input
          v-model="queryParams.clientManager"
          placeholder="请输入客户经理"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="queryParams.isCancellation">是否作废</el-checkbox>
      </el-form-item>
      <el-form-item label="单位编号" prop="unitNumber">
        <el-input
          v-model="queryParams.unitNumber"
          placeholder="请输入单位编号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="单位名称" prop="unitName">
        <el-input
          v-model="queryParams.unitName"
          placeholder="请输入单位名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="发票编号" prop="invoiceNumber">
        <el-input
          v-model="queryParams.invoiceNumber"
          placeholder="请输入发票编号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="tableData">
      <el-table-column label="序号" type="index" align="center"/>

      <el-table-column label="发票开具部门" prop="invoiceUnit" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceUnit}}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户经理" prop="clientManager" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.clientManager}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票金额（元）" prop="invoiceAmount" width="120" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位编号" prop="unitNumber" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.unitNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位名称" prop="unitName" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.unitName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票内容" prop="invoiceContent" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceContentLabel}}</span>
        </template>
      </el-table-column>

      <el-table-column label="办理业务" prop="businessLabel" width="130" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.businessLabel}}</span>
        </template>
      </el-table-column>

      <el-table-column label="欠费月份" prop="arrearageMonth" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.arrearageMonth}}</span>
        </template>
      </el-table-column>

      <el-table-column label="欠费金额" prop="arrearageMoney" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.arrearageMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column label="计费号" prop="billingNumber" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.billingNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票账户" prop="invoiceAccount" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceAccount}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票版本号" prop="versions" width="130" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.versions}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票编号" prop="invoiceNumber" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="到账时间" prop="accountTime" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.accountTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="到账金额（元）" prop="accountMoney" width="130" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.accountMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column label="开票人" prop="invoiceUser" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceUser}}</span>
        </template>
      </el-table-column>

      <el-table-column label="出票时间" prop="invoiceCreateTime" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.isCancellation?'red':''">{{scope.row.invoiceCreateTime?scope.row.invoiceCreateTime.substr(0,19):scope.row.invoiceCreateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="stateLabel" align="center" label="流程状态" width="130">
        <template slot-scope="scope">
          <router-link :class="scope.row.isCancellation?'red':''" style="color:#409EFF;font-size: 12px;" :to="scope.row.isCancellation?'#':'/fund/management/info/'+scope.row.id">{{scope.row.stateLabel}}</router-link>
        </template>
      </el-table-column>

      <el-table-column prop="itemName" align="center" label="发起流程">
        <template slot-scope="scope">
          <el-button :class="scope.row.isCancellation?'red':''" size="mini" type="text" :disabled="scope.row.state==20||scope.row.state==31||scope.row.state==30"
                     @click="examined(scope.row)">发起审批
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button :class="scope.row.isCancellation?'red':''"
            size="mini"
            type="text"
            :disabled="scope.row.state==20||parseInt(scope.row.state)==31"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button :class="scope.row.isCancellation?'red':''"
            size="mini"
            type="text"
            :disabled="parseInt(scope.row.state)==20||parseInt(scope.row.state)==31"
            @click="handleDelete(scope.row)"
            icon="el-icon-delete"
          >删除
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="编辑到账" prop="invoiceCreateTime" align="center">
        <template slot-scope="scope">
          <el-button :class="scope.row.isCancellation?'red':''" size="mini" type="text" :disabled="scope.row.state!=31" @click="handleEdits(scope.row)">编辑</el-button>
        </template>
      </el-table-column>


      <el-table-column label="是否作废" prop="isCancellation" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isCancellation" @change="handleTovoid(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否含文件" width="130" prop="isFile" align="center">
        <template slot-scope="scope">
           <span :class="scope.row.isCancellation?'red':''">{{scope.row.isFile==1?'是':'否'}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px">
      <el-form ref="form" :model="form" label-width="120px">
        <el-col :span="12">
          <el-form-item label="客户经理" :required="true">
            <el-input v-model="form.clientManager" :disabled="form.state==20" placeholder="请输入客户经理"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票金额" :required="true">
            <el-input v-model="form.invoiceAmount" :disabled="form.state==20" type="number" min="0" placeholder="请输入开票金额"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票账户" :required="true">
            <el-input v-model="form.invoiceAccount" :disabled="form.state==20" placeholder="请输入发票账户"/>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-form-item label="单位名称" :required="true">
            <el-select v-model="form.unitName" @change="handleSearchUnit(true)" filterable placeholder="请选择"
                       style="width: 100%">
              <el-option
                v-for="item in UnitList"
                :key="item.id"
                :label="item.unitName"
                :value="item.unitName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位编号" :required="true">
            <el-select v-model="form.unitNumber" @change="handleSearchUnit(false)" filterable placeholder="请选择"
                       style="width: 100%">
              <el-option
                v-for="item in UnitList"
                :key="item.id"
                :label="item.unitCode"
                :value="item.unitCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票内容" :required="true">
            <el-select
              v-model="form.invoiceContent"
              placeholder="请选择开票内容"
              clearable
              size="medium"
              style="width: 100%"
              :disabled="form.business==10||form.business==20"
              @change="handleInvoiceContent"
            >
              <el-option value="undefined" label="--请选择业务内容--"></el-option>
              <el-option
                v-for="dict in InvoiceContentList"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="12">
          <el-form-item label="办理业务内容" :required="true">
            <el-select
              v-model="form.business"
              placeholder="请选择办理业务内容"
              clearable
              size="medium"
              style="width: 100%"
              @change="handleBusiness"
            >
              <el-option
                v-for="dict in formTypeList"
                :label="dict.label"
                :value="dict.value"
                :disabled="dict.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="parseInt(form.business)==20">
          <el-form-item label="欠费时间" :required="true">
            <el-date-picker
              v-model="form.arrearageMonth"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="parseInt(form.business)==20">
          <el-form-item label="欠费金额" :required="true">
            <el-input v-model="form.arrearageMoney" type="number" min="0" placeholder="请输入欠费金额"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计号费" :required="true">
            <el-input v-model="form.billingNumber" placeholder="请输入计号费"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推送地址" :required="true">
            <el-input v-model="form.pushAddress" placeholder="请输入推送地址"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票版本号" :required="true">
            <el-input v-model="form.versions" disabled placeholder="请输入发票版本号"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票编号" :required="true">
            <el-input v-model="form.invoiceNumber" disabled placeholder="请输入发票编号"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账时间" :required="true">
            <el-date-picker
              v-model="form.accountTime"
              type="date"
              style="width: 100%"
              disabled
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到账金额" :required="true">
            <el-input v-model="form.accountMoney" disabled type="number" min="0" placeholder="请输入到账金额"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" style="width:100%;" >
            <el-input v-model="form.remark" type="remark" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件" style="width:100%;">
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              multiple
              action="#"
              :http-request="UploadFile"
              :file-list="fileList"
            >
              <el-button size="small" type="primary" class="uploadImgBtn">添加</el-button>
            </el-upload>
            <div class="file-box">
              <div v-for="(item,index) in fileList"><i class="el-icon-folder"></i><span class="fileName">{{item.fileName}}</span><span
                @click="beforeRemove(item)" class="el-icon-circle-close"></span></div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 发起审批 -->
    <el-dialog :title="title" :visible.sync="open1" width="450px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!--        <el-form-item label="名称" prop="flowName">-->
        <!--          <el-input v-model="form.flowName" placeholder="请输入名称"/>-->
        <!--        </el-form-item>-->

        <el-form-item label="选择流程" prop="flowName">
          <el-select v-model="flow.flowTypeId" placeholder="请选择流程" clearable size="medium">
            <el-option
              v-for="dict in typeState"
              :key="dict.id"
              :label="dict.label"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'编辑到账'" :visible.sync="open2" width="480px">
      <el-form ref="form2" :model="form2" label-width="120px">
<!--        <el-form-item label="发票版本号" :required="true">-->
<!--          <el-input v-model="form2.versions" placeholder="请输入发票版本号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="发票编号" :required="true">-->
<!--          <el-input v-model="form2.invoiceNumber" placeholder="请输入发票编号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出票时间" :required="true">-->
<!--          <el-date-picker-->
<!--            v-model="form2.invoiceCreateTime"-->
<!--            type="date"-->
<!--            style="width: 100%"-->
<!--            format="yyyy-MM-dd"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择日期">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
        <el-form-item label="到账金额" :required="true">
          <el-input v-model="form2.accountMoney" type="number" min="0" placeholder="请输入到账金额"/>
        </el-form-item>
        <el-form-item label="到账时间" :required="true">
          <el-date-picker
            v-model="form2.accountTime"
            type="date"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm3">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getListTable,
    getBusiness,
    getUnitList,
    getContentList,
    getStatusList,
    addDate,
    upaDate,
    getInfo,
    fileDelete,
    DeleteDate,
    approveFlow,
    updateInfo,
    cancellation,
    getCompany
  } from "@/api/fund/management/index";
  import {getFlowList} from '@/api/fund/management/info'
  import {getLaunchType} from '@/api/budget/report/report'
  import {listUnit} from "@/api/system/unit";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {exportData} from "@/utils/export";
  import {getToken} from "@/utils/auth";
  import ElFormItem from "../../../components/customize/ElFormItem/index";
  import {mapGetters} from 'vuex'
  import axios from "axios";

  export default {
    name: "Flowtype",
    components: {ElFormItem, Treeselect},
    data() {
      return {
        ActionUrl: process.env.VUE_APP_BASE_API + '/file/invoice',
        fileList: [],
        // 遮罩层
        loading: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 角色表格数据
        tableData: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        open1: false,
        open2: false,
        // 是否显示弹出层（数据权限）
        openDataScope: false,
        // 日期范围
        dateRange: [],
        // 部门列表
        deptOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
        },
        // 表单参数
        form: {},
        form2: {},
        flow: {},
        defaultProps: {
          children: "children",
          label: "label",
        },
        // 表单校验
        rules: {
          flowName: [
            {required: true, message: "类型名称不能为空", trigger: "blur"},
          ],
          sortNum: [
            {required: true, message: "显示顺序不能为空", trigger: "blur"},
          ],
        },
        StateOptions: [],
        InvoiceContentList: [],
        invoiceDisabel: false,
        BusinessList: [],
        UnitList: [],
        typeList: [],
        formTypeList: [],
        typeState: [],
      };
    },
    computed: {
      ...mapGetters(['nickName']),
    },
    created() {
      this.getMenuTreeselect();
      this.handleGetBusiness();
      this.handleGetContent();
      this.handleGetStatusList();
    },
    methods: {
      getMenuTreeselect() {
        getCompany().then((response) => {
          this.queryParams.unitId = response.checked[0]
          this.deptOptions = response.list;
          this.getList();
        });
      },
      handleGetBusiness() {
        getBusiness().then(res => {
          this.typeList = res;
          this.formTypeList=res;
        })
      },
      handleGetContent() {
        getContentList().then(res => {
          this.InvoiceContentList = res;
        })
      },
      handleGetStatusList() {
        getStatusList().then(res => {
          this.StateOptions = res;
        })
      },
      /** 查询角色列表 */
      getList() {
        this.loading = true;
        getListTable(this.queryParams).then((response) => {
          this.tableData = response.list;
          this.total = response.count;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.open1 = false;
        this.open2 = false;
      },
      handleInvoiceContent(){
        if(this.form.invoiceContent){
          this.formTypeList.map(item=>{
            if(parseInt(item.value)==10||parseInt(item.value)==20){
              item.disabled=true;
            }
          })
        }else{
          this.formTypeList.map(item=>{
            if(parseInt(item.value)==10||parseInt(item.value)==20){
              item.disabled=false;
            }
          })
        }
      },
      handleBusiness(){
        if(parseInt(this.form.business)==10||parseInt(this.form.business)==20){
          this.invoiceDisabel=true;
        }else{
          this.invoiceDisabel=false;
        }
      },
      // 表单重置
      reset() {
        this.form = {};
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
        this.queryParams={
          unitId:this.queryParams.unitId,
          pageNum: 1,
          pageSize: 20,
        }
        this.handleQuery();
      },
      // 单位筛选
      handleSearchUnit(type) {
        let str = this.UnitList.filter(item => {
          if (type) {
            if (item.unitName === this.form.unitName) {
              this.form.unitNumber = item.unitCode;
              return item;
            }
          } else {
            if (item.unitCode === this.form.unitNumber) {
              this.form.unitName = item.unitName;
              return item;
            }
          }
        })
      },
      //文件上传
      UploadFile(param) {
        const _file = param.file;
        let params = new FormData();
        params.append('files', _file);
        axios({
          url: this.ActionUrl,
          method: 'post',
          data: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
        }).then(res => {
          this.fileList.push({
            fileId: res.data.data[0].id,
            fileName: res.data.data[0].fileName,
            fileSize: res.data.data[0].fileSize
          });
          this.form.files.push({
            fileId: res.data.data[0].id,
            fileName: res.data.data[0].fileName,
            fileSize: res.data.data[0].fileSize
          });
          this.$message.success('附件上传成功！');
        })
      },
      examined(row) {
        if(row.isCancellation){
          this.$message.warning('该发票已作废');
          return;
        }
        getLaunchType({module: 101}).then(res => {
          this.typeState = res;
          this.open1 = true;
          this.title = "发起审批";
          this.flow.invoiceId = row.id
        })
      },
      handleEdits(row) {
        if(row.isCancellation){
          this.$message.warning('该发票已作废');
          return;
        }
        getInfo(row.id).then(res => {
          if (res.state != 31) {
            this.msgError('当前记录不在审批中！无法编辑');
            return;
          }
          this.open2 = true;
          this.form2={};
          this.form2.id = row.id;
        })

      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        // this.getMenuTreeselect();
        getUnitList().then(res => {
          this.UnitList = res;
          this.open = true;
          this.title = "添加";
          this.form.clientManager = this.nickName
          this.formTypeList.map(item=>{
            if(parseInt(item.value)==10||parseInt(item.value)==20){
              item.disabled=false;
            }
          });
          this.invoiceDisabel=false;
          this.fileList = [];
          this.form.files = [];
        });
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        if(row.isCancellation){
          this.$message.warning('该发票已作废');
          return;
        }
        this.reset();
        const typeId = row.id;
        getInfo(typeId).then(response => {
          response.invoiceContent = String(response.invoiceContent);
          response.business = String(response.business);
          if (response.files) {
            this.fileList = response.files;
          };
          response.files = [];
          this.form = response;
          this.open = true;
          this.title = "修改类型";
        });
      },
      //文件删除
      beforeRemove(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fileDelete(row.fileId).then(res => {
            this.fileList = this.fileList.filter(item => {
              if (item.fileId != row.fileId) {
                return item;
              }
            })
            this.form.files = this.form.files.filter(item => {
              if (item.fileId != row.fileId) {
                return item;
              }
            })
            this.msgSuccess('删除成功！')
          })
        })

      },

      /** 提交按钮 */
      submitForm: function () {
        if (parseInt(this.form.business) == 20) {
          if (!this.form.clientManager ||
            !this.form.invoiceAmount ||
            !this.form.invoiceAccount ||
            !this.form.unitName ||
            !this.form.unitNumber ||
            !this.form.arrearageMonth||
            !this.form.arrearageMoney||
            !this.form.business ||
            !this.form.billingNumber ||
            !this.form.pushAddress
          ) {
            this.msgError("必填项不能为空！");
            return;
          }
        } else if(parseInt(this.form.business) == 10){
          if (!this.form.clientManager ||
            !this.form.invoiceAmount ||
            !this.form.invoiceAccount ||
            !this.form.unitName ||
            !this.form.unitNumber ||
            !this.form.business ||
            !this.form.billingNumber ||
            !this.form.pushAddress
          ) {
            this.msgError("必填项不能为空！");
            return;
          }
        }else if (!this.form.clientManager ||
          !this.form.invoiceAmount ||
          !this.form.invoiceAccount ||
          !this.form.unitName ||
          !this.form.unitNumber ||
          !this.form.invoiceContent ||
          !this.form.business ||
          !this.form.billingNumber ||
          !this.form.pushAddress
        ) {
            this.msgError("必填项不能为空！");
            return;
        }
        if (this.form.invoiceAmount) {
          this.form.invoiceAmount = parseFloat(this.form.invoiceAmount).toFixed(2);
        }
        if(this.form.arrearageMoney){
          this.form.arrearageMoney=parseFloat(this.form.arrearageMoney).toFixed(2)
        }
        if (this.form.accountMoney) {
          this.form.accountMoney = parseFloat(this.form.accountMoney).toFixed(2);
        }
        if (this.form.id != undefined) {
          let datas = JSON.parse(JSON.stringify(this.form))
          datas.invoiceContent = parseInt(datas.invoiceContent);
          datas.business = parseInt(datas.business);
          upaDate(datas)
            .then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
              this.form.files = [];
              this.fileList = [];
            })
        } else {
          addDate(this.form)
            .then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.form.files = [];
              this.fileList = [];
            })
        }
      },
      submitForm2() {
        if (!this.flow.flowTypeId) {
          this.msgError('请选择流程');
          return;
        }
        approveFlow(this.flow).then(res => {
          this.open1 = false;
          this.getList();
          this.msgSuccess('流程发起成功！');
          this.$router.push({path:`/fund/management/info/${this.flow.invoiceId}`});
          this.flow = {};
        })
      },

      submitForm3() {
        if (!this.form2.accountMoney || !this.form2.accountTime) {
          this.msgError('必填项不能为空');
          return;
        }
        this.form2.accountMoney = parseFloat(this.form2.accountMoney).toFixed(2)
        updateInfo(this.form2).then(res => {
          this.form2 = {};
          this.open2 = false;
          this.msgSuccess('编辑成功');
          this.getList();
        })
      },
      //是否作废
      handleTovoid(row){
        cancellation(row.id,row.isCancellation).then(res=>{
          if(!res){
            if(row.isCancellation){
              this.msgSuccess('已作废')
              this.getList();
            }else{
              this.msgSuccess('已启用')
              this.getList();
            }
          }
        }).catch(err=>{
          this.getList();
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        if(row.isCancellation){
          this.$message.warning('该发票已作废');
          return;
        }
        this.$confirm("是否确认删除该条数据?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return DeleteDate(row.id);
          })
          .then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm("是否确认导出发票预开列表?", "导出表格", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(function () {
            return exportData(
              getToken(),
              queryParams,
              "/fund/advance/export",
              "发票预开管理"
            );
          })
          .catch(function () {
          });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-col-12 {
    height: 58px;
  }

  .file-box {
    color: #606266;

    .fileName {
      font-size: 13px;
      text-align: left;
      margin: 0 30px 0 15px;
    }

    .el-icon-circle-close {
      width: 20px;
      cursor: pointer;
    }
  }
  .red{
    color:red !important;
  }
</style>
