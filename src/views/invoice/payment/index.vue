<template>
  <div class="containers">
    <section class="search-box">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="110px">
        <el-form-item label="部门" prop="dptId">
          <treeselect v-model="queryParams.unitId" style="width:200px" :options="unitList" placeholder="请选择部门"/>
        </el-form-item>
        <el-form-item label="报账流水" prop="noticeTitle">
          <el-input
            v-model="queryParams.serialNumber"
            placeholder="请输入报账流水"
            clearable
            size="small"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="渠道月份" prop="channelMonth">
          <el-date-picker
            v-model="queryParams.channelMonth"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            class="search-input"
            placeholder="选择月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道名称" prop="channelName">
          <el-input
            v-model="queryParams.channelName"
            placeholder="请输入渠道名称"
            clearable
            size="small"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="渠道编号" prop="channelNumber">
          <el-input
            v-model="queryParams.channelNumber"
            placeholder="请输入渠道编号"
            clearable
            size="small"
            type="number"
            :min="0"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="导入时间(账期)" prop="importDate">
          <el-date-picker
            v-model="queryParams.importDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="search-input"
            placeholder="选择日期">
          </el-date-picker>
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
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getLists">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-box">
      <el-row :gutter="10">
        <el-col :span="1.5">
          <el-button type="primary" size="mini" @click="handleExportExcel(0)">支付明细</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExportExcel(1)">酬金月份导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" size="mini" @click="handleExportExcel(2)">查验结果导出</el-button>
        </el-col>
      </el-row>
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
  </div>
</template>

<script>
  import {getTaxtype,getList} from '@/api/invoice/grant_table/index'
  import {listUnit} from "@/api/system/unit";
  import {exportData} from "@/utils/export"
  import {getToken} from '@/utils/auth'

  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    components:{
      Treeselect
    },
    data() {
      return {
        queryParams: {
          pageNum:1,
          pageSize:20
        },
        loading: false,
        tableData: [],
        total: undefined,
        unitList:[],
        typeOptions:[],
      }
    },
    mounted() {
      this.getLists();
      this.getListUnit();
    },
    methods: {
      getLists(){
        this.loading=true;
        getList(this.queryParams).then(res=>{
          this.total=res.count;
          this.tableData=res.list;
          this.loading=false;
        })
      },
      getListUnit(){
        listUnit().then(res=>{
          this.unitList=res;
        })
        getTaxtype().then(res=>{
          this.typeOptions=res;
        });
      },
      resetQuery(){
        this.queryParams={
          pageNum:1,
          pageSize:20
        }
        this.getLists();
      },
      handleExportExcel(type){
        let url=undefined,fileName=undefined;
        if(type==0){
          url='/invoice/remuneration/export/subsidy';
          fileName='支付明细'
        }else if(type==1){
          url='/invoice/remuneration/export/month';
          fileName='酬金月份'
        }else if(type==2){
          url='/invoice/remuneration/export/check';
          fileName='查验结果'
        }
        this.$confirm(`是否确认导出${fileName}数据?`, "数据导出", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          exportData(getToken(),this.queryParams,url,fileName)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .containers {
    width: 95%;
    margin: 15px auto;

    .search-box {
      .search-input{
        width: 200px;
      }
    }
  }
</style>
