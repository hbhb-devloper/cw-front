<template>
  <div class="containers">

    <section class="flow-box">
      <div class="program-box">
        <div style="width: 100%;position: relative;">
        </div>
        <div style="width: 100%;text-align: center;font-weight: 900;" ><span v-if="flowList[0]">{{flowList[0].projectFlowName}}</span></div>
        <div class="program" v-if="flowList">
          <div v-for="(item,index) in flowList" class="programList">
            <i class="el-icon-close" v-if="item.isDelete"></i>
            <div class="programList-div">
            <span style="max-width: 160px;line-height: 19px;">
              <i class="el-icon-success" v-if="item.operation.value==1"></i>
              <i class="el-icon-error" v-if="item.operation.value==0"></i>
              {{item.approverRole}}：
            </span>
              <el-select  v-if="item.operation.value==2" placeholder="请选择" v-model="item.form.id" style="width:120px;" :disabled="item.approver.readOnly">
                <el-option
                  v-for="items in item.approverSelect"
                  :value="items.userId"
                  :label="items.nickName">
                </el-option>
              </el-select>
              <el-select  v-else placeholder="请选择" v-model="item.nickName" style="width:120px;" :disabled="item.approver.readOnly">
                <el-option
                  v-for="items in item.approverSelect"
                  :value="items.userId"
                  :label="items.nickName">
                </el-option>
              </el-select>
            </div>
            <div class="programList-div" style="height:32px">
              <el-button size="small" v-if="item.controlAccess==true" :disabled="item.operation.value==1||info.state==0?true:false">自定义流程</el-button>
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
              <div v-if="item.operation.value!=2" ><span style="opacity: 0.7;">{{item.nickName}}</span>({{item.updateTime|filterTime}})</div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
    </section>

    <section class="info-date">
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">客户经理：</el-col><el-col :span="12">{{info.clientManager}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">开票金额：</el-col><el-col :span="12">{{info.invoiceAmount}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">发票账户：</el-col><el-col :span="12">{{info.invoiceAccount}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">单位名称：</el-col><el-col :span="12">{{info.unitName}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">单位编号：</el-col><el-col :span="12">{{info.unitNumber}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">开票内容：</el-col><el-col :span="12">{{info.invoiceContentLabel}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">办理业务内容：</el-col><el-col :span="12">{{info.businessLabel}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">欠费时间：</el-col><el-col :span="12">{{info.arrearageMonth}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">欠费金额：</el-col><el-col :span="12">{{info.arrearageMoney}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">计号费：</el-col><el-col :span="12">{{info.billingNumber}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">推送地址：</el-col><el-col :span="12">{{info.pushAddress}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">发票版本号：</el-col><el-col :span="12">{{info.versions}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">发票编号：</el-col><el-col :span="12">{{info.invoiceNumber}}</el-col></el-col>
        <el-col :span="12"><el-col :span="8" class="label-text">到账时间：</el-col><el-col :span="12">{{info.accountTime}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="12"><el-col :span="8" class="label-text">到账金额：</el-col><el-col :span="12">{{info.accountMoney}}</el-col></el-col>
      </el-row>
      <el-row :span="24" class="info-row">
        <el-col :span="4" class="label-text">备注：</el-col>
        <el-col :span="20">{{info.remark}}</el-col>
      </el-row>
      <el-row :span="24" >
        <el-col :span="4" class="label-text">附件：</el-col>
        <el-col :span="20">
          <el-table :data="fileTable" style="width: 100%">
            <el-table-column style="color:#409EFF" prop="fileName" label="标题">
              <template style="color:#409EFF" slot-scope="scope">
                <a :download="scope.row.fileName" :href="scope.row.filePath">{{scope.row.fileName}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column prop="fileSize" label="大小"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import {getInfo,getFlowList,advanceApprove} from '@/api/fund/management/info'
    export default {
      data(){
        return {
          flowList:[],
          info:{},
          fileTable:[],
          programObj: { //流程审核条件表单
            id: undefined,  //
            suggestion: undefined
          },
          opinion:[],
          form:{},
          disables:false,
        }
      },
      mounted() {
        this.getDateInfo(this.$route.params.id);
        this.getFlowLists(this.$route.params.id);
      },
      filters:{
        filterTime(e){
          if(e){
            return e.substr(0,19);
          }else{
            return undefined;
          }
        }
      },
      methods:{
        getDateInfo(id){
          getInfo(id).then(res=>{
            this.info=res;
            this.form=res;
            this.fileTable=[];
            for(let item in res.files){
              this.fileTable.push({fileName:res.files[item].fileName,createTime:res.files[item].createTime.substr(0,19),author:res.files[item].createBy,fileSize:res.files[item].fileSize})
            }
          })
        },
        getFlowLists(id){
          getFlowList(id).then(res=>{
            for(let key of res){
              key.form={
                id:key.approver.value||undefined,
                suggestion:undefined
              };
              key.isDelete=false;
            }
            this.flowList=res;
            let end=this.flowList[this.flowList.length-1];
            this.disables=end.operation.hidden;
          })
        },
        handleApprove(item, type,index) {
          if (!this.programObj.suggestion) {
            this.$message.warning('请输入你的审批意见');
            return;
          }
          this.programObj.approvers = [];
          for (let key of this.flowList) {
            this.programObj.approvers.push({flowNodeId: key.flowNodeId, userId: key.form.id});
          }

          this.programObj.operation = type;
          this.programObj.id = item.id;
          advanceApprove(this.programObj).then(res=>{
            console.log(res);
            this.getFlowLists(this.$route.params.id);
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .containers{
    width:95%;
    margin:20px auto;
    .flow-box{
      .program {
        width: 100%;
        margin-top: 20px;

        .programList {
          width: 330px;
          max-width: 380px;
          margin-left: 10px;
          float: left;
          margin-bottom: 30px;
          padding: 15px 0px 15px 15px;
          border:1.5px solid red;
          border-radius: 8px;
          position: relative;

          .el-icon-close {
            display: inline-block;
            margin: 0 0 10px 330px;
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
            span{
              font-size:13px;
            }
          }
        }
      }
    }

    .info-date{
      background: #fff;
      border-radius: 8px;
      padding:20px;
      .info-row{
        border-bottom: 1px solid #dfe6ec;
        line-height: 45px;
        .label-text{
          text-align: right;
        }
      }
      .label-text{
        text-align: right;
      }
    }
  }
</style>
