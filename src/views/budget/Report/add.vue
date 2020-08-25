<template>
  <div>
    <el-col :span="24">
      <el-form :inline="true" label-width="160px">
        <el-form-item label="预算项目类型" v-if="stutic=='add'" :required="true">
          <el-select placeholder="请选择科目类型" v-model="obj2.budgetId" class="input-select-length" filterable
                     @change="handleType">
            <el-option v-for="item in projectItem" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目名称" :required="true">
          <el-input placeholder="请输入项目名称" @blur="handleCheck(0)" v-model="obj2.projectName" style="width: 200px"
                    clearable/>
        </el-form-item>

        <el-form-item label="项目预算总额(万元)" :required="true">
          <el-input placeholder="请输入预算总额" class="input-select-length" v-model="obj2.amount" @blur="handleCheck(3)"
                    type="number" min="0" clearable/>
        </el-form-item>

        <el-form-item label="项目可分配预算(万元)" :required="true">
          <el-input placeholder="请输入可供分配预算额" class="input-select-length" v-model="obj2.availableAmount" type="number"
                    min="0" clearable/>
        </el-form-item>

        <el-form-item label="本年价税合计" :required="true">
          <el-input placeholder="请输入本年价税合计" class="input-select-length" v-model="obj2.taxIncludeAmount" type="number"
                    @input="handleCost" min="0" clearable/>
        </el-form-item>

        <el-form-item label="增值税" :required="true">
          <el-select placeholder="-请选择-" class="input-select-length" v-model="obj2.vatRate" @change="handleCost">
            <el-option value="undefined" label="-请选择-"></el-option>
            <el-option v-for="(item,index) in VatRateOption" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="本年项目成本(万元)" :required="true">
          <el-input placeholder="请输入本年项目成本额" class="input-select-length" v-model="obj2.cost" style="width: 200px"
                    type="number"
                    @input="handleAmount" min="0" clearable/>
        </el-form-item>

        <el-form-item label="本年增值税金(万元)" :required="true">
          <el-input placeholder="请输入本年增值税金" class="input-select-length" v-model="obj2.vatAmount" type="number" min="0"
                    clearable/>
        </el-form-item>

        <el-form-item label="责任人" :required="true">
          <el-input placeholder="请输入责任人" class="input-select-length" v-model="obj2.director" @blur="handleCheck(1)"
                    clearable/>
        </el-form-item>

        <el-form-item label="预算编号">
          <el-input placeholder="请输入工程编号" class="input-select-length" v-model="obj2.engineeringNum"
                    @blur="handleCheck(2)" clearable/>
        </el-form-item>

        <el-form-item label="项目开始时间" :required="true">
          <el-date-picker type="date" class="input-select-length" v-model="obj2.startTime"
                          placeholder="请选择开始时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="项目结束时间" :required="true">
          <el-date-picker type="date" class="input-select-length" v-model="obj2.endTime"
                          placeholder="请选择开始时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="供应商">
          <el-input placeholder="请输入供应商" class="input-select-length" v-model="obj2.supplier" clearable/>
        </el-form-item>
        <el-form-item label="来源">
          <el-select placeholder="请选择" class="input-select-length" v-model="obj2.origin">
            <el-option value="0" label="新建"></el-option>
            <el-option value="1" label="结转"></el-option>
          </el-select>
        </el-form-item>

        <br>
        <el-form-item label="项目简介"
                      :form-class="formClass"
                      :content-class="contentClass">
          <el-input
            type="textarea"
            placeholder="请输入项目简介信息"
            v-model="obj2.introduction"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <br>
        <el-form-item label="项目详细说明"
                      :form-class="formClass"
                      :content-class="contentClass">
          <el-input
            type="textarea"
            placeholder="请输入项目详细说明信息"
            v-model="obj2.detail"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="项目实施目标" :form-class="formClass"
                      :content-class="contentClass">
          <el-input
            type="textarea"
            placeholder="请输入项目实施目标信息"
            v-model="obj2.target"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="备注" :form-class="formClass"
                      :content-class="contentClass">
          <el-input
            type="textarea"
            placeholder="请输入备注信息"
            v-model="obj2.remarks"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="附件">
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
            <div v-for="(item,index) in fileList" v-if="item.type==0"><i class="el-icon-folder"></i><span
              class="fileName">{{item.name}}</span><span @click="beforeRemove(item)"
                                                         class="el-icon-circle-close"></span></div>
          </div>
        </el-form-item>
        <br>
        <el-form-item label="管理层审批附件">
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :http-request="imageUpload2"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" class="uploadImgBtn">选取文件</el-button>
          </el-upload>
          <div class="file-box">
                        <div v-for="(item,index) in fileList" v-if="item.type==1"><i class="el-icon-folder"></i><span class="fileName">{{item.name}}</span><span @click="beforeRemove(item)" class="el-icon-circle-close"></span></div>
                      </div>
        </el-form-item>
        <br>
        <el-form-item >
          <el-button class="btn" type="primary" :disabled="formSubMit" v-if="!obj2.state" @click="handleSubmit">保存</el-button>
          <el-button class="btn" type="primary" v-if="obj2.state==10||obj2.state==30" @click="handleSubmit">修改保存</el-button>
          <el-button class="btn" type="primary" v-if="obj2.state==31" @click="handleSubmit">调整保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import {
    getCompany,
    getList,
    getProejctType,
    addData,
    GetInfo,
    upData,
    getQuota,
    DeleteFile,
    getLaunchType,
    LaunchApprove,
    getVatRate
  } from '@/api/budget/report/report.js'
  import {getToken} from '@/utils/auth'
  import {dateTimes} from '@/utils/date.js'
  import axios from 'axios'
  import ElFormItem from '@/components/customize/ElFormItem';

  import {mapGetters} from 'vuex'

  export default {
    props: ['stutic'],
    data() {
      return {
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
        need: false,//管理层必要文件
        formSubMit: false,//防表单重复提交
        formClass: 'column is-12 no-padding',
        contentClass: 'column is-9 no-padding'
      }
    },
    computed: {
      ...mapGetters(['projectIds', 'nickName']),
      taxIncludeAmount() {
        return this.obj2.taxIncludeAmount
      }
    },
    components: {
      ElFormItem
    },
    watch: {
      taxIncludeAmount(val) {
        if (!val) return
        let vatRates = 1 + (this.obj2.vatRate / 100)
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost)
        this.obj2.vatAmount = countss.toFixed(6)
      }
    },
    mounted() {
      this.obj2.director = this.nickName;
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
          this.fileList = [];
          GetInfo(this.$route.query.id).then(res => {
            for (let key of res.files) {
              this.fileList.push({name: key.fileName, url: key.filePath, id: key.fileId, type: key.required})
            }
            // res.files=[];
            this.$emit('changeType', 0, res.budgetId)
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
        let vatRate = 1 + (this.obj2.vatRate / 100);
        let counts = parseFloat(this.obj2.taxIncludeAmount) / vatRate;
        this.obj2.cost = counts.toFixed(6);
        let countss = parseFloat(this.obj2.taxIncludeAmount) - parseFloat(this.obj2.cost);
        this.obj2.vatAmount = countss.toFixed(6);
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
            filters = /^[\u4e00-\u9fa5]{2,}$/g
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
              this.need = true;
            } else {
              this.need = false;
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
            this.fileList = this.fileList.filter(item => {
              return item.id != file.id
            });
            this.obj2.files = this.obj2.files.filter(item => {
              return item.fileId != file.id
            })
          })
        })
      },
      //文件上传普通附件
      imageUpload(param) {
        let that = this, list = {isApproved: 0};
        if (this.stutic != 'add') {
          list.isApproved = this.obj2.state == 31 || this.obj2.state == 32 ? 1 : 0;
        }
        console.log(param);
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
          list.fileId = res.data.data[0].id;
          this.$message.success('附件上传成功！');
          list.required = 0; //非必传

          this.fileList.push({name: res.data.data[0].fileName, id: res.data.data[0].id, type: list.required});
          this.obj2.files.push(list);
        })
      },
      //文件上传管理层附件
      imageUpload2(param) {
        let that = this, list = {isApproved: 0};
        if (this.stutic != 'add') {
          list.isApproved = this.obj2.state == 31 || this.obj2.state == 32 ? 1 : 0;
        }
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
          list.fileId = res.data.data[0].id;
          this.$message.success('附件上传成功！');
          list.required = 1;
          this.fileList.push({name: res.data.data[0].fileName, id: res.data.data[0].id, type: list.required});
          this.obj2.files.push(list);
        })
      },
      //修改

      //获取金额阀值
      handleType() {
        if (!this.obj2.budgetId) return;
        let engineeringNum = undefined, str = undefined;
        str = this.projectItem.filter(item => {
          if (this.obj2.budgetId == item.id) {
            engineeringNum = item.label;
            return item;
          }
        });
        this.obj2.engineeringNum = engineeringNum.substr(0, engineeringNum.indexOf('_'));

        this.$emit('changeType', 0, this.obj2.budgetId);
        getQuota(this.obj2.budgetId).then(res => {
          this.quota = res;
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
        if (parseFloat(this.obj2.amount) >= parseFloat(this.quota)) {
          let fileLength = this.obj2.files.filter(item => {
            if (item.required == 1) {
              return item;
            }
          }).length;
          if (fileLength == 0) {
            this.$message.warning(`项目预算总额超过${this.quota}万元，请上传管理层审批附件`);
            return
          }
        }

        let checkLangth = this.checkArr.filter(item => {
          return item == false
        }).length
        if (checkLangth != 0) return
        if (this.stutic == 'add') {
          this.formSubMit = true;
          addData(this.obj2).then(res => {
            this.$message.success('添加成功');
            this.formSubMit = false;
            // this.obj2={
            //   files: [],
            // };
            // this.fileList=[];
            this.$emit('changeType', 1, res);
            this.obj2.id = res;
            this.$store.dispatch('PROJECTID',res);
            this.$emit('changeType', 2, undefined);

            // this.$router.go(-1);
          }).catch(err => {
            this.formSubMit = false;
          })
        } else {
          upData(this.obj2).then(res => {
            if (this.obj2.state == 10 || this.obj2.state == 30) {
              this.$message.success('修改成功');
            } else if (this.obj2.state == 31 || this.obj2.state == 40) {
              this.$message.success('调整成功');
            } else {
              this.$message.success('修改成功');
            }
            if (!this.$router.query.id) return;
            this.handleLoad();
            // this.$router.go(-1);
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-select-length {
    width: 200px;
  }
  .file-box {
    color: #606266;

    div {
    }

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
  .btn{
    margin-left: 165px;
  }
</style>
