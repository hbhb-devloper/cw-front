<template>
  <div class="container">
    <header class="header">
      <div>
        <label>项目类型：<span v-if="projectItem[0]">{{projectItem[0].budgetNum}}_{{projectItem[0].label}}</span></label>
      </div>
      <div>
        <label @click="handleGetProject(31)">项目列表统计：<span class="click">已审批：{{headinfo.declared}}({{headinfo.declaredPer?headinfo.declaredPer:0}}%)</span></label>
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
      <el-tabs v-model="activeName" >
        <el-tab-pane label="项目信息" name="project">
          <div class="form-box">
            <div class="form1">
              <label class="form-label" v-if="stutic=='add'">
                <span><i>*</i>预算科目类型</span>
                <el-select placeholder="请选择科目类型" v-model="obj2.budgetId" filterable @change="handleType" style="width: 200px">
                  <el-option v-for="item in projectItem" :value="item.id" :label="item.label"></el-option>
                </el-select>
              </label>
              <label class="form-label" v-if="quota">
                <span>金额阀值(万元)</span>
                <el-input placeholder="请输入项目名称" @blur="handleCheck(0)" v-model="quota" style="width: 200px" clearable disabled
                          size="small"/>
              </label>
              <label class="form-label">
                <span><i>*</i>项目名称</span>
                <el-input placeholder="请输入项目名称" @blur="handleCheck(0)" v-model="obj2.projectName" style="width: 200px" clearable
                          size="small"/>
              </label>
              <labe class="form-label">
                <span><i>*</i>项目预算总额(万元)</span>
                <el-input placeholder="请输入预算总额" v-model="obj2.amount" @blur="handleCheck(3)" style="width: 200px" type="number"
                          min="0" clearable size="small"/>
              </labe>
              <label class="form-label">
                <span><i>*</i>项目可分配预算(万元)</span>
                <el-input placeholder="请输入可供分配预算额" v-model="obj2.availableAmount" style="width: 200px" type="number" min="0"
                          clearable size="small"/>
              </label>
              <label class="form-label">
                <span><i>*</i>本年价税合计(万元)</span>
                <el-input placeholder="请输入本年价税合计" v-model="obj2.taxIncludeAmount" style="width: 200px" type="number"
                          @input="handleCost" min="0" clearable size="small"/>
              </label>
              <label class="form-label">
                <span><i>*</i>增值税</span>
                <el-select placeholder="-请选择-" v-model="obj2.vatRate" @change="handleCost" style="width: 200px">
                  <el-option value="undefined" label="-请选择-"></el-option>
                  <el-option v-for="(item,index) in VatRateOption" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </label>
              <label class="form-label">
                <span><i>*</i>本年项目成本(万元)</span>
                <el-input placeholder="请输入本年项目成本额" v-model="obj2.cost" style="width: 200px" type="number" @input="handleAmount"
                          min="0" clearable size="small"/>
              </label>
              <label class="form-label">
                <span><i>*</i>本年增值税金(万元)</span>
                <el-input placeholder="请输入本年增值税金" v-model="obj2.vatAmount" type="number" min="0"
                          style="width: 200px"
                          clearable
                          size="small"
                />
              </label>
              <label class="form-label">
                <span><i>*</i>责任人</span>
                <el-input placeholder="请输入责任人" v-model="obj2.director" @blur="handleCheck(1)" style="width: 200px" clearable
                          size="small"/>
              </label>
              <label class="form-label">
                <span>工程编号</span>
                <el-input placeholder="请输入工程编号" v-model="obj2.engineeringNum" @blur="handleCheck(2)" style="width: 200px"
                          clearable size="small"/>
              </label>
              <label class="form-label">
                <span><i>*</i>项目开始时间</span>
                <el-date-picker type="date" v-model="obj2.startTime" style="width: 200px" placeholder="请选择开始时间"></el-date-picker>
              </label>
              <label class="form-label">
                <span><i>*</i>项目结束时间</span>
                <el-date-picker type="date" style="width: 200px" v-model="obj2.endTime" placeholder="请选择结束时间"></el-date-picker>
              </label>
              <label class="form-label">
                <span>供应商</span>
                <el-input placeholder="请输入供应商" style="width: 200px" v-model="obj2.supplier" clearable size="small"/>
              </label>
              <label class="form-label">
                <span>来源</span>
                <el-select placeholder="请选择" v-model="obj2.origin" style="width: 200px">
                  <el-option value="新建" label="新建"></el-option>
                  <el-option value="结转" label="结转"></el-option>
                </el-select>
              </label>
            </div>
            <div class="form2">
              <div class="textarea-box">
                <span>项目简介</span>
                <el-input
                  placeholder="请输入项目简介信息"
                  v-model="obj2.introduction"
                  clearable
                  type="textarea"
                  class="textareas"
                />
              </div>
              <div class="textarea-box">
                <span>项目详细说明</span>
                <el-input
                  placeholder="请输入项目详细说明信息"
                  v-model="obj2.detail"
                  clearable
                  size="small"
                  type="textarea"
                  class="textareas"
                />
              </div>
              <div class="textarea-box">
                <span>项目实施目标</span>
                <el-input
                  placeholder="请输入项目实施目标信息"
                  v-model="obj2.target"
                  clearable
                  size="small"
                  type="textarea"
                  class="textareas"
                />
              </div>
              <div class="textarea-box">
                <span>备注</span>
                <el-input
                  placeholder="请输入备注信息"
                  v-model="obj2.remarks"
                  clearable
                  type="textarea"
                  size="small"
                  class="textareas"
                />
              </div>
              <div class="textarea-box">
                <span>附件</span>
                <div>
                  <el-upload
                    class="upload-demo"
                    :show-file-list="false"
                    multiple
                    action="#"
                    :http-request="imageUpload"
                    :file-list="fileList"
                  >
                    <el-button slot="trigger" size="small" class="uploadImgBtn">选取文件</el-button>
                  </el-upload>
                  <div class="file-box">
                    <div v-for="(item,index) in fileList" v-if="item.type==0"><i class="el-icon-folder"></i><span class="fileName">{{item.name}}</span><span @click="beforeRemove(item)" class="el-icon-circle-close"></span></div>
                  </div>
                </div>
              </div>
              <div v-if="need" class="textarea-box">
                <span></span>
                <div>
                  <div style="padding-bottom: 10px;color:red;">管理层审批附件</div>
                  <el-upload
                    class="upload-demo"
                    :show-file-list="false"
                    multiple
                    action="#"
                    :http-request="imageUpload"
                    :file-list="fileList"
                  >
                    <el-button slot="trigger" size="small" class="uploadImgBtn">选取文件</el-button>
                  </el-upload>
                  <div class="file-box">
                    <div v-for="(item,index) in fileList" v-if="item.type==1"><i class="el-icon-folder"></i><span class="fileName">{{item.name}}</span><span @click="beforeRemove(item)" class="el-icon-circle-close"></span></div>
                  </div>
                </div>
              </div>
              <div class="textarea-box">
                <span></span>
                <div>
                  <el-button type="primary" v-if="!obj2.state" @click="handleSubmit">提交</el-button>
                  <el-button type="primary" v-if="obj2.state==10||obj2.state==30" @click="handleSubmit">修改保存</el-button>
                  <el-button type="primary" v-if="obj2.state==31" @click="handleSubmit">调整保存</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分类预算" name="budget">
          <div>
            <p style="color:red;">备注：1.填写的金额应与本年项目成本一致<br/>2.如果项目属于跨年项目，请调整项目信息中的结束时间！</p>
            <label>项目分类预算信息</label>
            <div>
              <el-col :span="20">
                <el-form ref="queryForm" :inline="true" label-width="120px">
                  <el-form-item label="年份：" v-if="Span">
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
      </el-tabs>

    </div>
    <!--  分类预算修改    -->
    <div class="updata-box">
      <el-dialog :visible.sync="centerDialogVisible">
        <el-form ref="queryForms" :inline="true" label-width="140px">
          <el-form-item label="年份：" v-if="Span">
            <el-select v-model="form2.years" placeholder="请选择年份">
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
    getVatRate
  } from '@/api/budget/report/report.js'
  import { getToken } from '@/utils/auth'
  import { dateTimes } from '@/utils/date.js'
  import axios from 'axios'

  export default {
    name: 'addAndSplit',
    data(){
      return {
        activeName:'project',
        fileList: [],//上传文件
        ActionUrl: process.env.VUE_APP_BASE_API + '/file/upload', // 上传的图片服务器地址
        obj2: {  //修改新增
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
          origin: '新建',//项目来源
          introduction: undefined,//项目简介
          detail: undefined,//项目详情说明
          target: undefined,//项目实施目标
          remarks: undefined,//备注
          files: []
        },
        projectItem: [],//预算科目下拉菜单
        rate: [],//增值税率下拉
        //stutic: 1,//1新增、2修改
        quota: null,//预算阀值
        checkArr: [true, true, true],//校验是否正确
        projectId: undefined,//记录id
        VatRateOption: [],//增值税下拉
        need:false,//管理层必要文件
      }
    },
    computed: {
      ...mapGetters(['projectIds','nickName']),
      taxIncludeAmount() {
        return this.obj2.taxIncludeAmount
      }
    },
    watch: {
      taxIncludeAmount(val) {
        if (!val) return
        let vatRates = 1 + (this.obj2.vatRate / 100)
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost)
        this.obj2.vatAmount = countss.toFixed(6)
        console.log(this.obj2.vatRate, 1, this.obj2.vatAmount)
      }
    },
    mounted() {
      this.obj2.director=this.nickName;
      this.handleLoad()
    },
    methods: {
      //页面初始化加载
      handleLoad() {

        //获取项目类型下拉
        getProejctType().then(res => {
          this.projectItem = res
        })
        //获取增值税下拉
        getVatRate().then(res => {
          this.VatRateOption = res;
        })
        if (this.stutic == 'eidt') {
          GetInfo(this.$route.query.id).then(res => {
            for (let key of res.files) {
              this.fileList.push({ name: key.fileName, url: key.filePath, id: key.fileId })
            }
            // res.files=[];
            this.$emit('changeType', res.budgetId)
            getQuota(res.budgetId).then(res => {
              this.quota = res
              // this.$message.warning(`当前项目预算总额阀值为${res}万元`);
            })
            res.vatRate = res.vatRate;
            this.obj2 = res;
          })
        }
      },
      //计算本年项目成本
      handleCost() {
        if (!this.obj2.vatRate) {
          // this.$message.warning('请选择增值税率');
          return
        }
        let vatRate = 1 + (this.obj2.vatRate / 100)
        let counts = parseFloat(this.obj2.taxIncludeAmount) / vatRate
        this.obj2.cost = counts.toFixed(6)
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost)
        this.obj2.vatAmount = countss.toFixed(6)

        console.log(this.obj2.vatRate, 2, this.obj2.vatAmount)
      },
      //计算本年价税合计
      handleAmount() {
        if (!this.obj2.vatRate) {
          // this.$message.warning('请选择增值税率');
          return
        }
        let vatRate = 1 + (this.obj2.vatRate / 100)
        let counts = parseFloat(this.obj2.cost) * vatRate
        this.obj2.taxIncludeAmount = counts.toFixed(6)
      },
      //校验
      handleCheck(type) {
        let filters = null
        switch (type) {
          case 0:
            // filters=/^[\u4e00-\u9fa5]{0,}$/g;
            // if(!filters.test(this.obj2.projectName)){
            //   this.$message.warning('请输入正确的项目名称');
            //   this.checkArr[type]=false;
            // }else{
            //   this.checkArr[type]=true;
            // }
            this.checkArr[type] = true
            break
          case 1:
            filters = /^[\u4e00-\u9fa5]{2,4}$/g
            if (!filters.test(this.obj2.director)) {
              this.$message.warning('请输入正确的责任人名称')
              this.checkArr[type] = false
            } else {
              this.checkArr[type] = true
            }
            break
          case 2:
            filters = /^[A-Z0-9]{0,}$/g
            // if (!filters.test(this.obj2.engineeringNum)) {
            //   this.$message.warning('请输入正确的工程编号')
            //   this.checkArr[type] = false
            // } else {
            this.checkArr[type] = true
            // }
            break
          case 3:
            if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
              this.$message.warning(`项目预算总额超过该项目阀值，请上传管理层审批附件`);
              this.need=true;
            }else{
              this.need=false;
            }
            break
        }

      },
      //选择文件时
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择6个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
      },
      //删除文件
      beforeRemove(file) {
        this.$confirm(`确定移除 ${file.name}？`).then(res => {
          if (!file.id) return
          DeleteFile(file.id).then(res1 => {
            this.$message.success('文件删除成功！');
            this.fileList=this.fileList.filter(item => {
              return item.id != file.id
            });
            this.obj2.files = this.obj2.files.filter(item => {
              return item.fileId != file.id
            })
          })
        })
      },
      //文件上传
      imageUpload(param) {
        let that = this, list = {};
        const _file = param.file;
        let params = new FormData();
        params.append('files', _file);
        console.log(params);
        axios({
          url: this.ActionUrl,
          method: 'post',
          data: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
          }
        }).then(res => {
          list.fileId = res.data.data[0].id;
          this.$message.success('附件上传成功！');
          if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
            list.isApproved = 1; //必传
          } else {
            list.isApproved = 0; //非必传
          }
          this.fileList.push({ name: res.data.data[0].fileName, id: res.data.data[0].id ,type:list.isApproved});
          this.obj2.files.push(list);
        })
      },
      //修改

      //获取金额阀值
      handleType() {
        if (!this.obj2.budgetId) return;
        let engineeringNum=undefined,str=undefined;
        str=this.projectItem.filter(item=>{
          if(this.obj2.budgetId==item.id){
            engineeringNum=item.label;
            return item;
          }
        });
        this.obj2.engineeringNum=engineeringNum.substr(0,engineeringNum.indexOf('_'));

        this.$emit('changeType', this.obj2.budgetId)
        getQuota(this.obj2.budgetId).then(res => {
          this.quota = res
          // this.$message.warning(`当前项目预算总额阀值为${res}万元`);
        })
      },
      //信息提交
      handleSubmit() {

        let _this = this
        this.obj2.startTime = dateTimes(this.obj2.startTime).substr(0, 10)
        this.obj2.endTime = dateTimes(this.obj2.endTime).substr(0, 10)
        if (!this.obj2.projectName || !this.obj2.amount || !this.obj2.availableAmount || !this.obj2.taxIncludeAmount || !this.obj2.cost || !this.obj2.vatRate || !this.obj2.director
          || !this.obj2.startTime || !this.obj2.endTime) {
          this.$message.warning('必填项不能为空')
          return
        }

        if (parseFloat(this.obj2.cost) + parseFloat(this.obj2.vatAmount) != parseFloat(this.obj2.taxIncludeAmount)) {
          this.$message.warning('本年价税合计有误，请填写正确值')
          return
        }

        if (parseFloat(this.obj2.amount) > parseFloat(this.quota)) {
          if (this.obj2.files.length == 0) {
            this.$message.warning(`项目预算总额超过${this.quota}万元，请上传必要附件`)
            console.log(this.obj2.files)
            return
          }
        }

        let checkLangth = this.checkArr.filter(item => {
          return item == false
        }).length
        if (checkLangth != 0) return
        if (this.stutic == 'add') {
          addData(this.obj2).then(res => {
            this.$message.success('添加成功')
            this.$router.go(-1);
          })
        } else if (this.stutic == 'eidt') {
          upData(this.obj2).then(res => {
            if(this.obj2.state==10||this.obj2.state==30){
              this.$message.success('修改成功');
            }else if(this.obj2.state==31||this.obj2.state==40){
              this.$message.success('调整成功');
            }
            this.$router.go(-1);
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    width: 95%;
    margin: 30px auto 30px auto;
    padding: 30px 20px;
    background: #fff;

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

    .form-box {
      width: 100%;

      .form1{
        width:100%;

        .form-label {
          display: inline-block;
          width: 49%;
          margin-bottom: 15px;

          span {
            display: inline-block;
            width:166px;
            text-align: right;
            font-weight: initial;
            i{
              color:red;
              padding-right: 5px;
            }
          }
        }
      }
      .form2{
        width:80%;
        .file-box{
          color:#606266;
          div{
            padding:6px 0;
          }
          .fileName{
            font-size: 13px;
            text-align: left;
            width: 300px;
            margin-left: 15px;
          }
          .el-icon-circle-close{
            width:20px;
            cursor: pointer;
          }
        }
        .textarea-box{
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-bottom: 15px;
          span{
            display: inline-block;
            width:166px;
            text-align: right;
            margin-right: 5px;
          }
          .textareas{
            display: inline-block;
            width:80%;
          }
        }
      }

      .menuItem {
        width: 48%;
        text-align: center;
      }
    }

    .queryForms {
      width: 86%;
      margin: 0 auto;

      .textarea-box {
        width: 100%;

        .textarea {
          width: 360%;
        }

      }
    }

    @media screen and (max-width: 1000px) {
      .queryForms {
        width: 96%;
        margin: 0 auto;
      }
      .textarea {
        width: 310% !important;
      }
    }
  }
</style>
