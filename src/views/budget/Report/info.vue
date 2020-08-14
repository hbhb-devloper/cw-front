<template>
  <div class="container">
    <el-button icon="el-icon-back" type="primary" size="mini" style="margin-bottom: 20px" @click="handleBack">返回</el-button>
    <div class="program-box" v-if="parseInt(id)||info.state!=10">
      <div style="width: 100%;position: relative;">
        <div style="position: absolute;right:20%;top:-50px;">
          <el-button size="mini" v-if="info.state==30||info.state==31" @click="handleGetHistory">查看历史</el-button>
        </div>
      </div>
      <div style="width: 100%;text-align: center;font-weight: 900;" v-if="parseInt(state)"><span v-if="program[0]">{{program[0].projectFlowName}}</span></div>
      <div class="program" v-if="program">
        <div v-for="(item,index) in program" class="programList">
          <i class="el-icon-close" v-if="item.isDelete" @click="handleDeleteApprove(item)"></i>
          <div class="programList-div">
            <span>
              <i class="el-icon-success" v-if="item.operation.value==1"></i>
              <i class="el-icon-error" v-if="item.operation.value==0"></i>
              {{item.approverRole}}：
            </span>
            <el-select  placeholder="请选择" v-model="item.form.id" style="width:100px;" :disabled="item.approver.readOnly">
              <el-option
                v-for="items in item.approverSelect"
                :value="items.userId"
                :label="items.userName">
              </el-option>
            </el-select>
          </div>
          <div class="programList-div" style="height:32px">
            <el-button size="small" v-if="item.controlAccess==true" :disabled="item.operation.value==1||info.state==0?true:false" @click="handleGetDel">自定义流程</el-button>
            <el-button size="small" v-if="!item.operation.hidden" @click="handleApprove(item,1,index)">同意</el-button>
            <el-button size="small" v-if="!item.operation.hidden" @click="handleApprove(item,0,index)">拒绝</el-button>
          </div>
          <div class="programList-div">
            <span style="display: inline-block;">意见：</span>

            <el-input v-if="item.suggestion.readOnly" :disabled="item.suggestion.readOnly"
                      v-model="item.suggestion.value" style="width:180px" placeholder="请输入审批意见"></el-input>
<!--            <el-input :disabled="item.suggestion.readOnly" v-model="programObj.suggestion" :placeholder="'请输入审批意见'"></el-input>-->
            <el-select
              v-else
              v-model="programObj.suggestion"
              slot="empty"
              filterable
              allow-create
              style="width:150px"
              default-first-option
              placeholder="请输入审批意见">
              <el-option
                v-for="(items,indexs) in opinion"
                :key="items.id"
                :label="items.suggestion"
                :value="items.suggestion">
              </el-option>
            </el-select>
          </div>
          <div style="height:32px">
            <div v-if="item.operation.value!=2" ><span style="opacity: 0.7;">{{item.userName}}</span>({{item.updateTime}})</div>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <header class="header">
      <div>
        <label>项目类型：<span v-if="projectItem[0]">{{projectItem[0].budgetNum}}_{{projectItem[0].label}}</span></label>
      </div>
      <div>
        <label @click="handleGetProject(31)">项目类别统计：<span class="click">已审批：{{headinfo.declared}}({{headinfo.declaredPer?headinfo.declaredPer:0}}%)</span></label>
        <label @click="handleGetProject(20)" class="click">申报中：{{headinfo.declaring}}({{headinfo.declaringPer?headinfo.declaringPer:0}}%)</label>
        <label @click="handleGetProject(10)" class="click">未申报：{{headinfo.declaration}}({{headinfo.declarationPer?headinfo.declarationPer:0}}%)</label>
      </div>
    </header>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50px">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="科目名称"
          width="200px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="company"
          label="计量单位"
          align="center">
        </el-table-column>
        <el-table-column
          prop="budgetBalance"
          label="本单位预算额"
          width="120px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="unitName"
          label="预算单位"
          width="120px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="budgetBalance"
          label="科目总预算"
          width="120px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="declared"
          align="center"
          label="已审批">
        </el-table-column>
        <el-table-column
          prop="declaring"
          align="center"
          label="申报中">
        </el-table-column>
        <el-table-column
          prop="surplus"
          align="center"
          label="剩余预算">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <div>
      <!--  tab切换    -->
      <el-tabs v-model="activeName" >
        <el-tab-pane v-if="parseInt(state)" label="项目信息" name="project">
          <label>基本信息</label>
          <div>
            <div class="row-div">
              <label>项目编号：</label>
              <span>{{info.projectNum}}</span>
              <label>项目名称：</label>
              <span>{{info.projectName}}</span>
            </div>
            <div class="row-div">
              <label>项目预算总额（万元）：</label>
              <span>{{info.amount}}</span>
              <label>可供分配预算（万元）：</label>
              <span>{{info.availableAmount}}</span>
            </div>
            <div class="row-div">
              <label>本年价税合计（万元）：</label>
              <span>{{info.taxIncludeAmount}}</span>
              <label>本年项目成本（万元）：</label>
              <span>{{info.cost}}</span>
            </div>
            <div class="row-div">
              <label>增值税：</label>
              <span>{{parseFloat(info.vatRate).toFixed(1)}}%</span>
              <label>本年增值税金（万元）：</label>
              <span>{{info.vatAmount}}</span>
            </div>
            <div class="row-div">
              <label>责任人：</label>
              <span>{{info.director}}</span>
              <label>预算编号：</label>
              <span>{{info.engineeringNum}}</span>
            </div>
            <div class="row-div">
              <label>项目开始时间：</label>
              <span>{{info.startTime}}</span>
              <label>项目结束时间：</label>
              <span>{{info.endTime}}</span>
            </div>
            <div class="row-div">
              <label>供应商：</label>
              <span>{{info.supplier}}</span>
              <label>项目来源：</label>
              <span>{{info.origin}}</span>
            </div>
            <div class="row-div">
              <label>项目简介：</label>
              <span>{{info.introduction}}</span>
            </div>
            <div class="row-div">
              <label>项目详细说明：</label>
              <span style="width:79%">{{info.detail}}</span>
            </div>
            <div class="row-div">
              <label>项目实施目标：</label>
              <span style="width:79%">{{info.target}}</span>
            </div>
            <div class="row-div">
              <label>备注：</label>
              <span style="width:79%">{{info.remarks}}</span>
            </div>
            <div class="row-div">
              <label>附件：</label>
              <div style="width:79%">
                <el-table :data="fileTable1" style="width: 100%">
                  <el-table-column style="color:#409EFF" prop="fileName" label="标题">
                    <template style="color:#409EFF" slot-scope="scope">
                      <a :download="scope.row.fileName" :href="scope.row.filePath">{{scope.row.fileName}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="author" label="作者"></el-table-column>
                  <el-table-column prop="createTime" label="时间"></el-table-column>
                  <el-table-column prop="fileSize" label="大小"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="row-div">
              <label>管理层审批附件：</label>
              <div style="width:79%">
                <el-table :data="fileTable2" style="width: 100%">
                  <el-table-column style="color:#409EFF" prop="fileName" label="标题">
                    <template style="color:#409EFF" slot-scope="scope">
                      <a :download="scope.row.fileName" :href="scope.row.filePath">{{scope.row.fileName}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="author" label="作者"></el-table-column>
                  <el-table-column prop="createTime" label="时间"></el-table-column>
                  <el-table-column prop="fileSize" label="大小"></el-table-column>
                </el-table>
              </div>
            </div>

          </div>
        </el-tab-pane>

        <el-tab-pane v-if="state=='add'" label="项目信息" name="project">
          <add-eidt @changeType="handleStatistics" :stutic="state"/>
        </el-tab-pane>
        <el-tab-pane v-if="state==undefined" label="项目信息" name="project">
          <add-eidt @changeType="handleStatistics" :stutic="'eidt'"/>
        </el-tab-pane>
        <el-tab-pane label="分类预算" name="budget">
          <div>
            <p style="color:red;">备注：1.填写的金额应与本年项目成本一致<br/>2.如果项目属于跨年项目，请调整项目信息中的结束时间！</p>
            <label>项目分类预算信息</label>
            <div>
              <el-col :span="20">
                <el-form ref="queryForm" :inline="true" label-width="120px">
                  <el-form-item label="年份：" v-if="Span" :required="true">
                    <el-select v-model="form.years" placeholder="请选择年份">
                      <el-option
                        v-for="item in endTime"
                        :key="item"
                        :label="item"
                        v-if="item>=startTime"
                        :value="item">
                      </el-option>
                    </el-select>

                  </el-form-item>
                  <el-form-item label="名称：" :required="true">
                    <el-input
                      placeholder="请输入名称"
                      v-model="form.className"
                      style="width: 200px"
                      clearable
                      size="small"
                    />
                  </el-form-item>
                  <el-form-item label="科目：" :required="true">
                    <el-select placeholder="请选择" v-model="form.budgetId" disabled @change="handleType"
                               style="width: 200px">
                      <el-option v-for="item in projectItem" :value="item.id" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="单价(万元)：">
                    <el-input
                      placeholder="请输入单价"
                      v-model="form.price"
                      style="width: 200px"
                      @input="handleProduct"
                      clearable
                      size="small"
                      type="number"
                      min="0"
                    />
                  </el-form-item>
                  <el-form-item label="数量：">
                    <el-input
                      placeholder="请输入数量"
                      v-model="form.amount"
                      @input="handleProduct"
                      style="width: 200px"
                      clearable
                      size="small"
                      type="number"
                      min="0"
                    />
                  </el-form-item>
                  <el-form-item label="金额(万元)：" :required="true">
                    <el-input
                      placeholder="请输入金额"
                      v-model="form.cost"
                      style="width: 200px"
                      clearable
                      size="small"
                      type="number"
                      min="0"
                    />
                  </el-form-item>
                  <br>
                  <el-form-item label="说明：">
                    <el-input
                      type="textarea"
                      placeholder="请输入说明内容"
                      v-model="form.explains"
                      maxlength="30"
                      show-word-limit
                      style="width: 460%;"
                    >
                    </el-input>
                  </el-form-item>
                  <br>
                  <br>
                  <el-form-item style="margin-left: 9%;">
                    <el-button type="primary" size="mini" :disabled="info.state==20||info.state==50||state=='add'" @click="handleQuery">添加</el-button>
                  </el-form-item>
                </el-form>
                <label>项目分类预算信息</label>
                <div>
                  <el-table :data="tableDatas" style="width: 100%">>
                    <el-table-column prop="id" label="序号">
                      <template slot-scope="scope">
                        <span>{{scope.$index+1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="years" label="年份">
                      <template slot-scope="scope">
                        <span>{{scope.row.years.substr(0,4)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="className" label="名称"></el-table-column>
                    <el-table-column prop="amount" label="数量"></el-table-column>
                    <el-table-column prop="price" label="单价(万元)"></el-table-column>
                    <el-table-column prop="cost" label="金额(万元)"></el-table-column>
                    <el-table-column prop="itemName" width="120px" label="科目"></el-table-column>
                    <el-table-column prop="explains" label="说明"></el-table-column>
                    <el-table-column prop="address" label="编辑">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                          :disabled="info.state==20||info.state==50"
                          @click="handleEidt(scope.$index, scope.row)">编辑
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="删除">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-delete"
                          :disabled="info.state==20||info.state==50"
                          @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane v-if="parseInt(state)" label="导出word文件" name="export">
          <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--  分类预算修改    -->
    <div class="updata-box">
      <el-dialog :visible.sync="centerDialogVisible">
        <el-form ref="queryForms" :inline="true" label-width="140px">
          <el-form-item label="年份：" v-if="Span" :required="true">
            <el-select v-model="form2.years" placeholder="请选择年份" >
              <el-option
                v-for="item in endTime"
                :key="item"
                :label="item"
                v-if="item>=startTime"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称：" :required="true">
            <el-input
              placeholder="请输入关键词"
              v-model="form2.className"
              style="width: 200px"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="科目：" :required="true">
            <el-select placeholder="请选择" v-model="form2.budgetId" disabled @change="handleType" style="width: 200px">
              <el-option v-for="item in projectItem" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价(万元)：">
            <el-input
              placeholder="请输入关键词"
              v-model="form2.price"
              @input="handleProduct"
              style="width: 200px"
              clearable
              size="small"
              type="number"
              min="0"
            />
          </el-form-item>
          <el-form-item label="数量：">
            <el-input
              placeholder="请输入关键词"
              v-model="form2.amount"
              @input="handleProduct"
              style="width: 200px"
              clearable
              size="small"
              type="number"
              min="0"
            />
          </el-form-item>
          <el-form-item label="金额(万元)：" :required="true">
            <el-input
              placeholder="请输入关键词"
              v-model="form2.cost"
              style="width: 200px"
              clearable
              size="small"
              type="number"
              min="0"
            />
          </el-form-item>
          <br>
          <el-form-item label="说明：">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form2.explains"
              maxlength="30"
              show-word-limit
              style="width: 160%;"
            >
            </el-input>
          </el-form-item>
          <br>
          <br>
          <el-form-item style="margin-left: 9%;">
            <el-button type="primary" size="mini" :disabled="info.state==20||info.state==50||state=='add'" @click="handleQuery">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog :title="titleProject" :visible.sync="projectPopup">
        <el-table
          :data="tableProjectData"
          style="width: 100%">
          <el-table-column prop="projectNum" width="150px" label="项目编号"></el-table-column>
          <el-table-column prop="projectName"  label="项目名称"></el-table-column>
          <el-table-column prop="amount" width="150px" label="本年项目成本(万元)"></el-table-column>
          <el-table-column prop="unitName" label="单位"></el-table-column>
          <el-table-column prop="creatBy" label="创建人"></el-table-column>
          <el-table-column prop="createTime" width="180px" label="创建时间"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 流程查看历史记录    -->
      <el-dialog title="历史流程" :visible.sync="programOpen">
        <el-table
          :data="programTable"
          style="width: 100%">
          <el-table-column prop="moder" label="流程版本">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger">{{scope.row.moder}}</span>
              <span v-else  >{{scope.row.moder}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleDesc" label="处理环节">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger" >{{scope.row.roleDesc}}</span>
              <span v-else >{{scope.row.roleDesc}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="处理人">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger" >{{scope.row.userName}}</span>
              <span v-else >{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="suggestion" label="处理意见">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger" >{{scope.row.suggestion}}</span>
              <span v-else >{{scope.row.suggestion}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="arrivalTime" label="到达时间">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger" >{{scope.row.arrivalTime}}</span>
              <span v-else >{{scope.row.arrivalTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sendingTime" label="发出时间">
            <template slot-scope="scope">
              <span v-if="scope.row.operation==0" class="danger" >{{scope.row.sendingTime}}</span>
              <span v-else >{{scope.row.sendingTime}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--  重新发起流程    -->
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
  import { GetInfo, getProejctType, getQuota, addData, getSubject,getLaunchType,LaunchApprove } from '@/api/budget/report/report.js'
  import {
    getTypeInfo,
    addClass,
    getTable,
    getClassInfo,
    UpdateClass,
    ClassDelete,
    getBudgetName,
    getProject,
    getFlow,
    SubmitApprove,
    deleteApprove,
    getHistory,
    getDeleteApprove
  } from '@/api/budget/report/info.js'
  import {getList} from '@/api/flow/opinion.js'
  import { dateTimes } from '@/utils/date.js'
  import AddEidt from './add'
  import { mapGetters } from 'vuex'
  import { exportWord } from '@/utils/export.js'
  import { getToken } from '@/utils/auth'


  export default {
    name: 'add',
    data() {
      return {
        tableData: [],
        tableDatas: [],
        programTable: [],//历史流程表
        programOpen: false,//历史弹窗
        fileTable1: [],//普通文件
        fileTable2: [],//管理层文件
        form: {},
        info: {},
        download: process.env.FILE_DOWNLOAD_PATH,
        headinfo: {},
        activeName: 'project',
        state: this.$route.params.id,
        projectItem: [],//预算科目下拉
        budgetid: null,
        quota: null,//预算阀值
        Span: false,
        centerDialogVisible: false,//弹窗
        form2: {}, //分解修改表单
        statics: 1,  //1添加2修改
        startTime: undefined,//开始时间
        endTime: undefined,//结束时间
        titleProject: undefined,//弹窗标题
        tableProjectData: [],//审批未审批数据表
        projectPopup: false,//弹窗
        program: [],//流程节点
        programObj: { //流程审核条件表单
          id: undefined,  //
          suggestion: undefined
        },
        isLaunch:false,//选择流程弹窗
        LaunchOption:[],//流程类型
        LaunchId:undefined,//流程类型id
        projectId:undefined,//记录id
        budgetId:undefined,//类型id
        opinion:[],//意见下拉
      }
    },
    components:{
      AddEidt
    },
    computed:{
      ...mapGetters(['projectIds']),
    },
    mounted() {
      if(parseInt(this.state)){
        this.handleLoad()
      }else if(this.state==undefined){
        this.$store.dispatch('PROJECTID',this.$route.query.id);
        if(!this.projectIds)return;

        GetInfo(this.projectIds).then(res => {
          this.form.budgetId = res.budgetId;
          this.startTime = parseInt(res.startTime.substr(0, 4));
          this.endTime = parseInt(res.endTime.substr(0, 4));
          if (this.endTime == this.startTime) {
            this.Span = false;
          } else {
            this.Span = true;
          }
        });
        //分解预算表
        getTable(this.projectIds).then(res1 => {
          this.tableDatas = res1
        })
      }
    },
    methods: {
      handleLoad() {
        //详情
        GetInfo(this.$route.params.id).then(res => {
          this.info = res;
          this.form.budgetId = res.budgetId;
          this.fileTable1 = res.files.filter(item=>{
            if(item.required==0){
              return item;
            }
          });
          this.fileTable2 = res.files.filter(item=>{
            if(item.required==1){
              return item;
            }
          });
          if(res.state!=10){
            getFlow(this.$route.params.id).then(res1 => {
              for(let key of res1){
                key.form={
                  id:key.approver.value||undefined,
                  suggestion:undefined
                };
                key.isDelete=false;
              }
              this.program = res1;
            })
          }
          this.handleStatistics(res.budgetId)
          this.startTime = parseInt(res.startTime.substr(0, 4))
          this.endTime = parseInt(res.endTime.substr(0, 4))
          if (this.endTime == this.startTime) {
            this.Span = false
          } else {
            this.Span = true
          }

        })
        //分解预算表
        getTable(this.$route.params.id).then(res1 => {
          this.tableDatas = res1
        });
        getList().then(res=>{
          this.opinion=res;
        })

      },
      //子组件改变父组件
      handleStatistics(budgetId){
        this.budgetId=budgetId;
        this.projectItem=this.tableData=[]
        getSubject({ budgetId:budgetId}).then(res1 => {
          let table = {
            lineNumber: res1.lineNumber,//序号
            itemName: res1.projectItemName,//科目名称
            company: '万元',//计量单位
            budgetBalance: res1.budgetBalance,//本单位预算额
            unitName: res1.unitName,//预算单位
            declared: res1.declared,//已审批
            declaring: res1.declaring,//申报中
            surplus: res1.surplus,//剩余预算
            remark: res1.remark
          }
          this.headinfo = res1;
          this.tableData = [table];
        });
        getBudgetName(budgetId).then(res1 => {
          this.projectItem = [res1];
        })
      },
      //返回
      handleBack(){
        this.$router.go(-1);
      },
      //金额求和
      handleProduct() {
        let count = undefined
        if (this.statics == 1) {
          count = this.form.price * this.form.amount;
          this.form.cost = count.toFixed(6);
        } else {
          count = this.form2.price * this.form2.amount;
          this.form2.cost = count.toFixed(6);
        }
      },
      handleGetDel(){
        getDeleteApprove(this.$route.params.id).then(res=>{
          console.log(res);
          for(let obj of this.program){
            for(let val of res){
              if(obj.id==val){
                obj.isDelete=true;
              }
            }
          }
        });
      },
      //查询已审批未审批审批中
      handleGetProject(type) {
        let data = {
          budgetId: this.info.budgetId||this.budgetId,
          unitId: this.info.unitId
        };
        if (type == 10) {
          this.titleProject = '未发起审批和审批拒绝项目列表(未申报)：'
          data.state = type;
          getProject(data).then(res => {
            this.tableProjectData = res;
          });
        } else if (type == 20) {
          this.titleProject = '审批中项目列表：'
          data.state = type
          getProject(data).then(res => {
            this.tableProjectData = res;
          });
        } else if (type == 31) {
          this.titleProject = '已审批通过项目列表：'
          data.state = type
          getProject(data).then(res => {
            this.tableProjectData = res
          })
        }
        this.projectPopup = true
      },

      //分解表记录修改
      handleEidt(index, row) {
        this.statics = 2
        this.centerDialogVisible = true
        getClassInfo(row.id).then(res => {
          this.form2 = res
        })
      },
      //流程节点删除
      handleDeleteApprove(row) {
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApprove(row.id).then(res => {
            this.handleLoad()
            this.$message.success('删除成功')
          })
        })
      },
      //删除
      handleDelete(index, id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ClassDelete(id.id).then(res => {
            getTable(this.$route.params.id).then(res1 => {
              this.tableDatas = res1
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      },
      handleType() {
        if (!this.obj2.budgetId) return
        getQuota(this.obj2.budgetId).then(res => {
          this.quota = res
        })
      },
      //关闭弹窗
      handleCancel() {
        this.isLaunch=false;
      },
      //流程
      handleRestLaunch(){
        GetInfo(this.$route.params.id).then(res => {
          if (res.state == 10 || res.state == 30|| res.state == 31) {
            getLaunchType().then(res=>{
              this.LaunchOption=res;
            })
            this.isLaunch=true;
          }else{
            this.$message.warning('当前记录不允许发起审批');
          }
        });
      },
      //流程历史查看
      handleGetHistory(){
        this.programOpen=true;
        getHistory(this.$route.params.id).then(res=>{
          this.programTable=res;
        })
      },
      //发起审批
      SubmitLaunch(){
        if(!this.LaunchId){
          this.$message.warning('请选择流程');
          return;
        }

        LaunchApprove({flowTypeId:this.LaunchId,projectId:this.$route.params.id}).then(res=>{
          this.isLaunch=false;
          this.handleLoad();
          this.LaunchId=undefined;
          this.$message.success('流程发起成功！');
        })
      },
      //分解添加
      handleQuery() {
        if(this.state==undefined){
          this.projectId=this.form2.projectId=this.form.projectId=this.projectIds;
        }else if(this.state=='add'){
          return;
        }else{
          this.projectId=this.form2.projectId=this.form.projectId=this.state;
        }
        if (this.statics == 1) {
          if (!this.form.className || !this.form.budgetId || !this.form.cost) {
            this.$message.warning('必填项不能为空！')
            return
          }

          addClass(this.form).then(res => {
            this.$message.success('添加成功')
            this.form = {
              budgetId: this.form.budgetId
            }
            getTable(this.projectId).then(res1 => {
              this.tableDatas = res1
            })
          })
        } else {
          if (!this.form2.className || !this.form2.budgetId || !this.form2.cost) {
            this.$message.warning('必填项不能为空！')
            return
          }
          UpdateClass(this.form2).then(res => {
            this.$message.success('修改成功')
            getTable(this.projectId).then(res1 => {
              this.tableDatas = res1
            })
            this.centerDialogVisible = false
            this.statics = 1
          })
        }
      },

      //提交审批
      handleApprove(item, type,index) {
        if (!this.programObj.suggestion) {
          this.$message.warning('请输入你的审批意见')
          return
        }
        this.programObj.approvers = []
        for (let key of this.program) {
          this.programObj.approvers.push({ flowNodeId:key.flowNodeId,userId:key.form.id})
        }

        this.programObj.operation = type;
        this.programObj.id=item.id;
        SubmitApprove(this.programObj).then(res => {
          this.handleLoad();
          this.programObj.suggestion=undefined;
          this.$message.success('提交成功')
        })

      },
      //导出
      handleExport(){
        this.$confirm('是否确认导出签报的详情数据数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(5555)
          exportWord(getToken(), { id:parseInt(this.$route.params.id),budgetId:this.info.budgetId }, '/budget/project/exports',this.info.projectName);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 95%;
    margin: 30px auto 30px auto;
    padding: 30px 20px;
    background: #fff;

    .program {
      width: 100%;
      margin-top: 20px;

      .programList {
        width: 300px;
        margin-left: 30px;
        float: left;
        margin-bottom: 30px;
        background: #F4F4F4;
        padding: 15px 25px;
        border-radius: 8px;
        position: relative;

        .el-icon-close {
          display: inline-block;
          margin: 0 0 10px 370px;
          cursor: pointer;
        }

        div {
          display: flex;
          flex-direction: row;
          line-height: 40px;

          .el-icon-success {
            color: #67c23a;
            font-size: 27px;
          }

          .el-icon-error {
            color: #f56c6c;
            font-size: 27px;
          }
        }

        .programList-div {
          margin-bottom: 10px;
        }
      }
    }

    .header {
      line-height: 50px;

      label {
        display: inline-block;
        margin-right: 50px;
        font-size: 13px;
      }

      .click {
        display: inline-block;
        color: rgb(64, 158, 255);
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .row-div {
      line-height: 40px;
      width: 100%;
      border-bottom: 1px solid #dfe6ec;
      display: flex;
      flex-direction: row;
      font-size: 14px;
      color: #606266;

      label {
        display: inline-block;
        width: 20%;
        text-align: right;
        color: #515a6e;
      }

      span {
        display: inline-block;
        width: 20%;
        text-align: left;
        word-wrap: break-word;
        word-break: normal;
      }
    }

    .row-div:last-child {
      border: none;
    }

    .textareas {
      display: flex;
      flex-direction: row;
      line-height: 40px;
      margin-bottom: 15px;

      label {
        display: inline-block;
        width: 140px;
        text-align: right;
        padding-right: 15px;
      }
    }
    .danger{
      color:red;
    }
  }
</style>
