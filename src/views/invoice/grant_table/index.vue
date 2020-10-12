<template>
  <div class="app-container">
    <section class="import-box">
      <ul>
        <li class="import-title" @click="handleExportTemplate(0)">酬金发放表模板下载</li>
        <li>
          <el-button type="primary" @click="handleOpen(0)" round>酬金发放表导入</el-button>
        </li>
      </ul>
      <ul>
        <li class="import-title" @click="handleExportTemplate(1)">综合补贴模板下载</li>
        <li>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :accept="'.xls,.xlsx'"
            :http-request="imageUpload"
          >
            <el-button type="primary" @click="handleOpen(1)" round>综合补贴导入</el-button>
          </el-upload>
        </li>
      </ul>
      <ul>
        <li class="import-title" @click="handleExportTemplate(2)">往来账模板下载</li>
        <li>
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            multiple
            action="#"
            :accept="'.xls,.xlsx'"
            :http-request="imageUpload"
          >
            <el-button type="primary" @click="handleOpen(2)" round>往来账导入</el-button>
          </el-upload>
        </li>
      </ul>
    </section>
    <section class="search-table">
      <div class="search-box">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="110px">
          <el-form-item label="报账流水" prop="noticeTitle">
            <el-input
              v-model="queryParams.serialNumber"
              placeholder="请输入报账流水"
              clearable
              size="small"
              class="search-input"
            />
          </el-form-item>
          <el-form-item label="税率" prop="noticeType">
            <el-select v-model="queryParams.taxRate" placeholder="请选择税率" class="search-input" clearable size="small">
              <el-option
                v-for="dict in typeOptions"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getLists">查询</el-button>
            <el-button size="mini" @click="handleDelete">删除</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="loading" :data="tableData"  height="500">
        <el-table-column label="报账流水" prop="serialNumber" width="180" align="center"/>
        <el-table-column label="渠道月份" prop="channelMonth" width="130" align="center"/>
        <el-table-column label="渠道编号" prop="channelNumber" width="130" align="center"/>
        <el-table-column label="渠道名称" prop="channelName" width="180" align="center"/>
        <el-table-column label="营业执照对公账号名称" prop="accountTitle" width="180" align="center"/>
        <el-table-column label="开户支行" prop="bankName" width="180" align="center"/>
        <el-table-column label="银行账号" prop="bankAccount" width="180" align="center"/>
        <el-table-column label="酬金金额(元)" prop="amount" width="120" align="center"/>
        <el-table-column label="应付金额(元)" prop="amountDue" width="120" align="center"/>
        <el-table-column label="本次支付(元)" prop="payment" width="120" align="center"/>
        <el-table-column label="本次实付(元)" prop="actualPayment" width="120" align="center"/>
        <el-table-column label="代缴税费(元)" prop="taxPayment" width="120" align="center"/>
        <el-table-column label="发票编号" prop="invoiceNumber" width="130" align="center"/>
        <el-table-column label="发票税率" prop="taxRate" align="center"/>
        <el-table-column label="分公司" prop="unitName" align="center"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getLists"
      />
    </section>
    <section>
      <el-dialog :title="title" :visible.sync="open1">
        <el-form :inline="true" label-width="80px">
          <el-row :span="12">
            <el-form-item label="税率选择" required>
              <el-select v-model="tax" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in taxrate"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row :span="12">
            <el-form-item label="文件导入" required>
              <el-upload
                class="upload-demo"
                :show-file-list="false"
                multiple
                action="#"
                :accept="'.xls,.xlsx'"
                :http-request="imageUpload"
              >
                <el-button type="primary">导入</el-button>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-form>
        <el-table :data="tableData1" v-if="importType==0">
          <el-table-column label="数据导入检查结果" prop="date"/>
        </el-table>
        <el-button class="cancel" size="mini" @click="open1=false">关闭</el-button>
      </el-dialog>
    </section>
  </div>
</template>


<script>
    import axios from "axios";
    import {getToken} from '@/utils/auth'
    import {getTaxtype,getList,DeleteSerialNumber} from '@/api/invoice/grant_table/index'
    import {getCompany} from '@/api/budget/report/report'
    import Treeselect from "@riophae/vue-treeselect";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import {exportData} from "../../../utils/export";

    export default {
      components:{
        Treeselect
      },
      data(){
        return {
          typeOptions:[],
          tableData:[],
          tableData1:[],
          queryParams:{
            pageNum:1,
            pageSize:20
          },
          total:undefined,
          loading:false,
          ActionUrl:undefined,
          open1:false,
          title:'',
          taxrate:[],
          tax:undefined,
          importType:undefined,
          unitList:[]
        }
      },
      mounted() {
        // this.getLists();
        this.getListUnit();
      },
      methods:{
        getLists(){
          this.loading=true;
          getList(this.queryParams).then(res=>{
            this.total=res.count;
            this.tableData=res.list;
            this.loading=false;
          })
        },
        getListUnit(){
          getCompany().then(res=>{
            this.unitList=res.list;
          })
          getTaxtype().then(res=>{
            this.typeOptions=res;
          });
        },
        handleOpen(type){
          this.importType=type;
          this.tax=undefined;
          if(type==0){
            this.ActionUrl=process.env.VUE_APP_BASE_API+'/invoice/remuneration/import/reward';
            this.title='酬金发放表导入';
            getTaxtype().then(res=>{
              this.taxrate=res;
              this.open1=true;
            });
          }else if(type==1){
            this.ActionUrl=process.env.VUE_APP_BASE_API+'/invoice/remuneration/import/subsidy';
          }else if(type==2){
            this.ActionUrl=process.env.VUE_APP_BASE_API+'/invoice/remuneration/import/account';

          }
        },
        resetQuery(){
          this.queryParams={
            pageNum:1,
            pageSize:20
          }
          this.tableData=[];
        },
        imageUpload(param){
          const _file = param.file;
          let params = new FormData();
          if(this.importType==0){
            if(!this.tax){
              this.msgError('请选择税率');
              return;
            }
            params.append('taxRate', this.tax);
          }
          params.append('file', _file);
          axios({
            url: this.ActionUrl,
            method: 'post',
            data: params,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': getToken()
            }
          }).then(res => {
           if(res.data.status==1000){
             this.$message.success('导入成功！');
             if(this.importType==0){
               this.tableData1=[];
               for(let item in res.data.data){
                 this.tableData1.push({date:res.data.data[item]});
               }
             }
           }else{
             this.msgError(res.data.message);
           }
          }).catch(err=>{
            this.msgError(err);
          })
        },
        handleDelete(){
          this.$confirm("是否确认删除该些数据?", "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(()=>{
            let serialNumberList=[];
            for(let item in this.tableData){
              serialNumberList.push(this.tableData[item].serialNumber);
            }
            serialNumberList=[...new Set(serialNumberList)];
            DeleteSerialNumber(serialNumberList).then(res=>{
              this.msgSuccess('删除成功');
              this.getLists();
            })
          })
        },
        handleExportTemplate(type){
          let url=undefined,excelName=undefined;
          if(type==0){
            url='/invoice/remuneration/export/reward/template';
            excelName='酬金发放表模板';
          }else if(type==1){
            url='/invoice/remuneration/export/subsidy/template';
            excelName='综合补贴模板';
          }else{
            url='/invoice/remuneration/export/account/template';
            excelName='往来账模板'
          }
          exportData(getToken(),undefined,url,excelName);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .import-box{
    width: 100%;
    border-radius: 15px;
    background: #fff;
    color:#0d8efd;
    padding:20px;
    display: flex;
    flex-direction: row;
    border:1px solid #0d8efd;

    ul{
      width: 20%;
      text-align: center;
      margin:0 20px;
      li{
        line-height: 45px;
      }
      li:nth-child(1){
        cursor: pointer;
      }
    }
  }
  .search-table{
    width: 100%;
    border-radius: 15px;
    background: #fff;
    border:1px solid #0d8efd;
    padding:20px;
    margin-top:30px;
    .search-box{
      .search-input{
        width: 200px;
      }
    }
  }
  .cancel{
    margin:30px 0 0 0;
  }
</style>
