<template>
  <div class="container">
    <div class="top-control">
      <el-col :span="24">
        <el-form ref="queryForm" :inline="true" label-width="100px">
          <el-form-item label="单位：">
            <treeselect v-model="obj.unitId" :options="deptOptions" style="width: 200px"
                        placeholder="请选择归属部门"/>
          </el-form-item>
          <el-form-item style="margin-left: 30px;">
            <el-radio-group v-model="radio">
              <el-radio :label="3">项目年度</el-radio>
              <el-radio :label="6">创建时间：</el-radio>
            </el-radio-group>

            <el-date-picker v-show="radio==3" v-model="obj.projectYear" type="year" placeholder="请选择" style="width: 200px;margin-left:-25px;">
            </el-date-picker>
            <el-date-picker v-show="radio==6" v-model="obj.createTime" type="month" placeholder="请选择" style="width: 200px;margin-left:-25px">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="项目类型：">
            <el-select v-model="obj.budgetId" filterable placeholder="请选择" style="width: 200px;">
              <el-option :value="undefined" label="---全部类型---"></el-option>
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称：" prop="userName">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectName"
              clearable

              name="invoiceCode"
              size="small"
              style="width: 200px;margin-left: -5px;"
            />
          </el-form-item>
          <el-form-item label="项目编号：" prop="userName">
            <el-input
              placeholder="请输入关键词"
              v-model="obj.projectNum"
              clearable
              name="invoiceCode"
              size="small"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-select v-model="obj.state" placeholder="请选择" style="width: 200px;">
              <el-option label="--默认--" value=""></el-option>
              <el-option
                v-for="(item,indexs) in stateArr"
                :key="indexs"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleGetList">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="handleRest">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <div class="table-btn-box">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增签报</el-button>
      <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['budget:project:export']">导出数据</el-button>
      <div style="height: 600px;overflow:auto;">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
        >
          <el-table-column
            prop="projectNum"
            label="项目编号"
            align="center"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="projectName"
            style="color:#409EFF;"
            label="项目名称"
            align="center"
            width="180px">
            <template style="color:#409EFF" slot-scope="scope">
              <router-link style="color:#409EFF;" :to="'/budget/info/'+scope.row.id">
                {{scope.row.projectName}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="projectTypeName"
            label="项目类型"
            align="center"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额（万元）"
            align="center"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="cost"
            label="项目成本"
            align="center"
            width="120px">
          </el-table-column>
          <el-table-column
            prop="vatAmount"
            label="增值税金额"
            align="center"
            width="120px">
          </el-table-column>
          <el-table-column
            prop="unitName"
            label="单位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createBy"
            align="center"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="origin"
            label="项目来源"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stateLabel"
            align="center"
            width="120px"
            label="流程状态">
            <template slot-scope="scope">
              <router-link style="color:#409EFF;" :to="'/budget/info/'+scope.row.id">{{scope.row.stateLabel}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="itime"
            align="center"
            label="发起流程"
            width="120px"
          >
            <template slot-scope="scope">
              <router-link v-if="scope.row.state==20||scope.row.state==31||scope.row.state==50||scope.row.state==32"
                           style="color:#409EFF;" :to="'/budget/info/'+scope.row.id">查看流程
              </router-link>
              <el-button v-if="scope.row.state==10" @click="handleLaunch(scope.row)" type="text">发起审批</el-button>
              <el-button v-if="scope.row.state==30||scope.row.state==40" @click="handleLaunch(scope.row)" type="text">
                重新发起审批
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="编辑"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.state==10||scope.row.state==30||scope.row.state==20"
                icon="el-icon-edit"
                :disabled="scope.row.state==20||scope.row.state==50"
                @click="handleUpdata( scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.state==31||scope.row.state==40"
                icon="el-icon-edit"
                @click="handleUpdata( scope.row)">调整
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="删除"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete( scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="删除调整"
            width="100px"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                :disabled="scope.row.state==10||scope.row.state==20||scope.row.state==31||scope.row.state==50"
                @click="handleRevert( scope.row.id)">删除调整
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          style="margin-top:3px;"
          :page-count="pages"
          @current-change="handleCurrentChange"
          layout="prev, pager, next">
        </el-pagination>
        <el-select v-model="obj.pageSize" placeholder="请选择" @change="handleGetList" style="width:100px">
          <el-option value="10" label="10条/页"></el-option>
          <el-option value="20" label="20条/页"></el-option>
          <el-option value="30" label="30条/页"></el-option>
        </el-select>
      </div>
    </div>

    <div class="updata-box">
      <el-dialog :visible.sync="centerDialogVisible">
        <el-form ref="queryForm" :inline="true" label-width="150px">
          <el-form-item v-if="stutic==1" class="menuItem" label="预算科目类型" :required="true">
            <el-select placeholder="请选择科目类型" v-model="obj2.budgetId" filterable @change="handleType"
                       style="width: 200px">
              <el-option v-for="item in projectItem" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="menuItem" label="项目名称" :required="true">
            <el-input
              placeholder="请输入项目名称"
              @blur="handleCheck(0)"
              v-model="obj2.projectName"
              style="width: 200px"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" v-if="quota" label="金额阀值">
            <el-input
              placeholder="请输入项目名称"
              @blur="handleCheck(0)"
              v-model="quota"
              style="width: 200px"
              clearable
              disabled
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="项目预算总额(万元)" :required="true">
            <el-input
              placeholder="请输入预算总额"
              v-model="obj2.amount"
              @blur="handleCheck(3)"
              style="width: 200px"
              type="number"
              min="0"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="可供分配预算(万元)" :required="true">
            <el-input
              placeholder="请输入可供分配预算额"
              v-model="obj2.availableAmount"
              style="width: 200px"
              type="number"
              min="0"
              clearable
              size="small"
            />
          </el-form-item>


          <el-form-item class="menuItem" label="本年价税合计(万元)" :required="true">
            <el-input
              placeholder="请输入本年价税合计"
              v-model="obj2.taxIncludeAmount"
              style="width: 200px"
              type="number"
              @input="handleCost"
              min="0"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="增值税率" :required="true">
            <el-select placeholder="-请选择-" v-model="obj2.vatRate" @change="handleCost" style="width: 200px">
              <el-option value="undefined" label="-请选择-"></el-option>
              <el-option v-for="(item,index) in VatRateOption" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="menuItem" label="本年项目成本(万元)" :required="true">
            <el-input
              placeholder="请输入本年项目成本额"
              v-model="obj2.cost"
              style="width: 200px"
              type="number"
              @input="handleAmount"
              min="0"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item class="menuItem" label="本年增值税金(万元)" :required="true">
            <el-input
              placeholder="请输入本年增值税金"
              v-model="obj2.vatAmount"
              type="number"
              min="0"
              style="width: 200px"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="责任人" :required="true">
            <el-input
              placeholder="请输入责任人"
              v-model="obj2.director"
              @blur="handleCheck(1)"
              style="width: 200px"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="工程编号">
            <el-input
              placeholder="请输入工程编号"
              v-model="obj2.engineeringNum"
              @blur="handleCheck(2)"
              style="width: 200px"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="项目开始时间" :required="true">
            <el-date-picker
              type="date"
              v-model="obj2.startTime"
              style="width: 200px"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="menuItem" label="项目结束时间" :required="true">
            <el-date-picker
              type="date"
              style="width: 200px"
              v-model="obj2.endTime"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="menuItem" label="供应商">
            <el-input
              placeholder="请输入供应商"
              style="width: 200px"
              v-model="obj2.supplier"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item class="menuItem" label="项目来源">
            <el-select placeholder="请选择" v-model="obj2.origin" style="width: 200px">
              <el-option value="新建" label="新建"></el-option>
              <el-option value="结转" label="结转"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="clear: both"></el-form-item>


        </el-form>
        <div class="textareas">
          <label>项目简介</label>
          <el-input
            placeholder="请输入项目简介信息"
            v-model="obj2.introduction"
            clearable
          />
        </div>
        <div class="textareas">
          <label>项目详细说明</label>
          <el-input
            placeholder="请输入项目详细说明信息"
            v-model="obj2.detail"
            clearable
            size="small"
          />
        </div>
        <div class="textareas">
          <label>项目实施目标</label>
          <el-input
            placeholder="请输入项目实施目标信息"
            v-model="obj2.target"
            clearable
            size="small"
          />
        </div>
        <div class="textareas">
          <label>备注</label>
          <el-input
            placeholder="请输入备注信息"
            v-model="obj2.remarks"
            clearable
            size="small"
          />
        </div>
        <el-upload
          class="upload-demo"
          :show-file-list="true"
          multiple
          action="#"
          :before-remove="beforeRemove"
          :http-request="imageUpload"
          :file-list="fileList"
        >
          <el-button slot="trigger" size="small" class="uploadImgBtn">选取文件</el-button>
          <span slot="tip"></span>
        </el-upload>

        <div class="btn_box">
          <el-button type="primary" @click="handleCancel" style="margin-right: 50px;">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="发起审批" :visible.sync="isLaunch" width="500px">
        <el-form>
          <el-form-item label="选择流程">
            <el-select v-model="LaunchId" filterable placeholder="请选择">
              <el-option
                v-for="item in LaunchOption"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div style="width: 100%;text-align:center;">
          <el-button type="primary" @click="handleCancel" style="margin-right: 50px;">取消</el-button>
          <el-button type="primary" @click="SubmitLaunch">提交</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {
    getCompany,
    getList,
    getProejctType,
    deleteData,
    addData,
    GetInfo,
    upData,
    getState,
    getQuota,
    DeleteFile,
    getLaunchType,
    LaunchApprove,
    getVatRate,
    RevokeRevert
  } from '@/api/budget/report/report.js'
  import {exportData} from '@/utils/export.js'
  import {getToken} from '@/utils/auth'
  import {dateTimes} from '@/utils/date.js'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import axios from 'axios'

  export default {
    name: 'standing',
    data() {
      return {
        fileList: [],//上传文件

        tableData: [],
        deptOptions: [],
        VatRateOption: [],//增值税
        obj: { //顶部条件查询
          unitId: undefined,
          projectYear: undefined,
          createTime: undefined,
          budgetId: undefined,
          projectName: undefined,
          projectNum: undefined,
          state: undefined,
          pageNum: undefined || 1,//页码
          pageSize: undefined || 10
        },
        headers: {"Content-Type": "multipart/form-data", 'Authorization': getToken()},
        pages: null,
        radio: 3, //项目年度/创建时间
        centerDialogVisible: false, //新增修改弹窗
        options: [],//项目类型下拉菜单
        stateArr: [],//状态下拉菜单
        status: null,
        unitId: null,//单位id
        index: undefined,

        obj2: {
          budgetId: undefined,//预算科目类型
          projectName: undefined,//项目名称
          amount: undefined,//项目预算总额
          availableAmount: undefined,//可供分配预算
          taxIncludeAmount: undefined,//本年价税合计
          cost: undefined,//本年项目成本
          vatRate: undefined,//增值税率
          vatAmount: undefined,//本年增值税金
          director: undefined,//责任人
          engineeringNum: undefined,//工程编号
          startTime: undefined,//项目开始时间
          endTime: undefined,//项目结束时间
          supplier: undefined,//供应商
          origin: undefined,//项目来源
          introduction: undefined,//项目简介
          detail: undefined,//项目详情说明
          target: undefined,//项目实施目标
          remarks: undefined,//备注
          files: []
        },
        ActionUrl: process.env.VUE_APP_BASE_API + '/file/upload', // 上传的图片服务器地址

        projectItem: [],//预算科目下拉菜单
        rate: [],//增值税率下拉
        stutic: 1,//1新增、2修改
        quota: null,//预算阀值

        isLaunch: false,//选择流程弹窗
        LaunchOption: [],//流程类型
        LaunchId: undefined,//流程类型id

        loading: true,//表格加载
        checkArr: [true, true, true],//校验是否正确
        projectId: undefined,//记录id
      }
    },
    created() {
      let times = new Date();
      this.obj.projectYear = times.getFullYear().toString();
      this.handleLoad();
    },
    components: {
      Treeselect
    },
    computed: {
      // unitid() {
      //   return this.obj.unitId;
      // },
      // type() {
      //   return this.obj.type;
      // },
      taxIncludeAmount() {
        return this.obj2.taxIncludeAmount;
      }
    },
    watch: {
      taxIncludeAmount(val) {
        if (!val) return;
        let vatRates = 1 + (this.obj2.vatRate / 100);
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost);
        this.obj2.vatAmount = countss.toFixed(6);
        console.log(this.obj2.vatRate, 1, this.obj2.vatAmount);
      }
    },
    methods: {
      //页面初始化加载
      handleLoad() {
        //获取单位树形
        getCompany().then(res => {
          this.obj.unitId = res.checked[0]
          this.deptOptions = res.list;
          this.handleGetList();
        });
        //获取状态下拉菜单
        getState().then(res => {
          this.stateArr = res;
        });
        //获取项目类型下拉
        getProejctType().then(res => {
          this.options = res;
        });
        //获取增值税下拉
        getVatRate().then(res => {
          this.VatRateOption = res;
        })
      },
      //获取列表
      handleGetList() {
        this.loading = true;
        this.obj.projectYear = dateTimes(this.obj.projectYear).substr(0, 4)
        this.obj.createTime = dateTimes(this.obj.createTime).substr(0, 7)
        if (this.radio != 3) {
          this.obj.projectYear = '';
        } else {
          this.obj.createTime = '';
        }
        let data = {}
        for (let key in this.obj) {
          if (!this.obj[key]) {
          } else {
            data[key] = this.obj[key];
          }
          ;

        }
        ;
        getList(data).then(res => {
          this.pages = Math.ceil(res.count / this.obj.pageSize);
          this.tableData = res.list;
          this.loading = false;
        });
      },
      //回退版本
      handleRevert(id) {
        RevokeRevert(id).then(res => {
          this.$message.success('回滚成功');
          this.handleLoad();
        })
      },
      //分页
      handleCurrentChange(curr) {
        this.obj.pageNum = curr;
        this.handleGetList();
      },
      //重置
      handleRest() {
        this.obj = {
          unitId: this.obj.unitId,
          projectYear: '',
          createTime: '',
          budgetId: '',
          projectName: '',
          projectNum: '',
          state: '',
          pageSize: this.obj.pageSize,
        }
      },
      //计算本年项目成本
      handleCost() {
        if (!this.obj2.vatRate) {
          // this.$message.warning('请选择增值税率');
          return;
        }
        let vatRate = 1 + (this.obj2.vatRate / 100);
        let counts = parseFloat(this.obj2.taxIncludeAmount) / vatRate;
        this.obj2.cost = counts.toFixed(6);
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost);
        this.obj2.vatAmount = countss.toFixed(6);

        console.log(this.obj2.vatRate, 2, this.obj2.vatAmount);
      },
      //计算本年价税合计
      handleAmount() {
        if (!this.obj2.vatRate) {
          // this.$message.warning('请选择增值税率');
          return;
        }
        let vatRate = 1 + (this.obj2.vatRate / 100);
        let counts = parseFloat(this.obj2.cost) * vatRate;
        this.obj2.taxIncludeAmount = counts.toFixed(6);
      },
      //校验
      handleCheck(type) {
        let filters = null;
        switch (type) {
          case 0:
            // filters=/^[\u4e00-\u9fa5]{0,}$/g;
            // if(!filters.test(this.obj2.projectName)){
            //   this.$message.warning('请输入正确的项目名称');
            //   this.checkArr[type]=false;
            // }else{
            //   this.checkArr[type]=true;
            // }
            this.checkArr[type] = true;
            break;
          case 1:
            filters = /^[\u4e00-\u9fa5]{2,4}$/g;
            if (!filters.test(this.obj2.director)) {
              this.$message.warning('请输入正确的责任人名称');
              this.checkArr[type] = false;
            } else {
              this.checkArr[type] = true;
            }
            break;
          case 2:
            filters = /^[A-Z0-9]{0,}$/g;
            if (!filters.test(this.obj2.engineeringNum)) {
              this.$message.warning('请输入正确的工程编号');
              this.checkArr[type] = false;
            } else {
              this.checkArr[type] = true;
            }
            break;
          case 3:
            if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
              this.$message.warning(`当前预算总额大于${this.quota}万元，请上传必要附件`);
            }
            break;
        }

      },

      //删除方法
      handleDelete(row) {
        GetInfo(row.id).then(res => {
          if (res.state == 10 || res.state == 30) {
            this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteData(row.id).then(res => {
                this.handleGetList();
                this.$message.success('删除成功！');
              });
            }).catch(() => {
            });
          } else {
            this.$message.warning('当前记录不能删除！');
          }
        })
      },

      //修改
      handleUpdata(row) {
        var data = {};
        this.fileList = [];
        GetInfo(row.id).then(res => {
          if (res.state == 10 || res.state == 30 || res.state == 31) {
            // for(let key of res.files){
            //   this.fileList.push({name:key.fileName,url:key.filePath,id:key.fileId});
            // }
            // // res.files=[];
            // getQuota(res.budgetId).then(res => {
            //   this.quota = res;
            //   // this.$message.warning(`当前项目预算总额阀值为${res}万元`);
            // });
            // res.vatRate=res.vatRate
            // this.obj2 = res;
            // this.centerDialogVisible = true;
            // this.stutic = 2;
            this.$router.push(`/budget/edit?id=${res.id}`);
          } else {
            this.$message.warning('当前记录不能进行修改调整！');
          }

        });
      },
      //获取金额阀值
      handleType() {
        if (!this.obj2.budgetId) return;
        getQuota(this.obj2.budgetId).then(res => {
          this.quota = res;
          // this.$message.warning(`当前项目预算总额阀值为${res}万元`);
        });
      },
      //添加数据
      handleAdd() {
        this.$router.push('/budget/info/add');
        return;
        this.fileList = [];
        this.obj2 = {
          budgetId: '',//预算科目类型
          projectName: '',//项目名称
          amount: '',//项目预算总额
          availableAmount: '',//可供分配预算
          taxIncludeAmount: '',//本年价税合计
          cost: '',//本年项目成本
          vatRate: '',//增值税率
          vatAmount: '',//本年增值税金
          director: '',//责任人
          engineeringNum: '',//工程编号
          startTime: '',//项目开始时间
          endTime: '',//项目结束时间
          supplier: '',//供应商
          origin: '新建',//项目来源
          introduction: '',//项目简介
          detail: '',//项目详情说明
          target: '',//项目实施目标
          remarks: '',//备注
          files: []
        };

        this.stutic = 1;
        getProejctType(this.obj.unitId).then(res => {
          this.projectItem = res;
        })
        this.centerDialogVisible = true;
      },
      //选择文件时
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择6个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
      },
      //删除文件之前
      beforeRemove(file, fileList) {
        this.$confirm(`确定移除 ${file.name}？`).then(res => {
          DeleteFile(file.id).then(res1 => {
            this.$message.success('文件删除成功！');
            this.obj2.files = this.obj2.files.filter(item => {
              return item.fileId != file.id;
            })
          });
        })
      },
      //文件上传
      imageUpload(param) {
        let that = this, list = {};
        const _file = param.file;
        let params = new FormData();
        params.append('files', _file);
        axios({
          url: this.ActionUrl,
          method: 'post',
          data: params,
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': getToken()
          }
        }).then(res => {
          list.fileId = res.data.data[0].id;
          this.fileList.push({name: res.data.data[0].fileName, id: res.data.data[0].id});
          this.$message.success('附件上传成功！');
          if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
            list.isApproved = 1;
          } else {
            list.isApproved = 0;
          }
          this.obj2.files.push(list);
        });
      },
      //关闭弹窗
      handleCancel() {
        this.centerDialogVisible = false;
        this.isLaunch = false;
      },
      //流程
      handleLaunch(row) {
        GetInfo(row.id).then(res => {
          if (res.state == 10 || res.state == 30 || res.state == 31 || res.state == 40) {
            this.projectId = row.id;
            getLaunchType().then(res => {
              this.LaunchOption = res;
            })
            this.isLaunch = true;
          } else {
            this.$message.warning('当前记录不允许发起审批');
          }
        });
      },
      //信息提交
      handleSubmit() {
        let _this = this;
        this.obj2.startTime = dateTimes(this.obj2.startTime).substr(0, 10);
        this.obj2.endTime = dateTimes(this.obj2.endTime).substr(0, 10);
        if (!this.obj2.projectName || !this.obj2.amount || !this.obj2.availableAmount || !this.obj2.taxIncludeAmount || !this.obj2.cost || !this.obj2.vatRate || !this.obj2.director
          || !this.obj2.startTime || !this.obj2.endTime) {
          this.$message.warning('必填项不能为空');
          return;
        }
        ;
        if (parseFloat(this.obj2.cost) + parseFloat(this.obj2.vatAmount) != parseFloat(this.obj2.taxIncludeAmount)) {
          this.$message.warning('本年价税合计有误，请填写正确值');
          return;
        }
        ;
        if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
          if (this.obj2.files.length == 0) {
            this.$message.warning(`当前预算金额超过${this.quota}万元，请上传必要附件`);
            console.log(this.obj2.files);
            return;
          }
        }
        ;

        let checkLangth = this.checkArr.filter(item => {
          return item == false;
        }).length;
        if (checkLangth != 0) return;
        if (this.stutic == 1) {
          addData(this.obj2).then(res => {
            this.$message.success('添加成功');
            this.handleGetList();
            this.centerDialogVisible = false;
          });
        } else if (this.stutic == 2) {
          upData(this.obj2).then(res => {
            this.$message.success('修改成功');
            this.handleGetList();
            this.centerDialogVisible = false;
          });
        }
        ;
      },
      //发起审批
      SubmitLaunch() {
        if (!this.LaunchId) {
          this.$message.warning('请选择流程');
          return;
        }

        LaunchApprove({flowTypeId: this.LaunchId, projectId: this.projectId}).then(res => {
          this.isLaunch = false;
          this.LaunchId = undefined;
          this.handleGetList();
          this.$message.success('流程发起成功！');
          this.$router.push(`/budget/info/${this.projectId}`);
        })
      },
      //导出Excel表
      handleExport() {
        let ids = [];
        if (this.tableData.length == 0) {
          return;
        } else {
          for (let key of this.tableData) {
            ids.push(key.id);
          }
        }
        ;
        this.$confirm('是否确认导出签报的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          exportData(getToken(), ids, '/budget/project/export', '项目签报');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 90%;
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

    .tables {
      width: 100%;
      height: 600px;
      /*margin-top:20px;*/
      text-align: center;
      overflow: auto;
    }
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
</style>
